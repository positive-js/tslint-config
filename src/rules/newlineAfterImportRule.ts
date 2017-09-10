/**
 * @license
 * Copyright 2017 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AbstractWalker, IRuleMetadata, RuleFailure, Rules } from 'tslint';
import { getNextStatement, isImportDeclaration } from 'tsutils';
import {
    getLeadingCommentRanges, ImportDeclaration,
    isLineBreak, isWhiteSpaceLike, SourceFile, TextRange
} from 'typescript';

export class Rule extends Rules.AbstractRule {
    public static metadata: IRuleMetadata = {
        ruleName: 'newline-after-import',
        description: 'Enforces blank line after import. And make sure import declaration is one on the line.',
        rationale: 'Helps maintain a readable style in your codebase.',
        optionsDescription: 'Not configurable.',
        options: {},
        optionExamples: [true],
        type: 'style',
        typescriptOnly: false
    };

    public static TOO_MANY_BLANK_LINES_FAILURE_STRING: string = 'Too many blank lines after import';
    public static NO_BLANK_LINE_FAILURE_STRING: string = 'Missing blank line after import';

    public apply(sourceFile: SourceFile): RuleFailure[] {
        return this.applyWithWalker(new NewlineAfterImportWalker(sourceFile, this.ruleName, undefined));
    }
}

const enum CharacterCodes {
    lineFeed = 0x0A,              // \n
    carriageReturn = 0x0D         // \r
}

class NewlineAfterImportWalker extends AbstractWalker<void> {
    public walk({ statements }: SourceFile): void {
        for (const statement of statements) {
            if (!isImportDeclaration(statement)) {
                continue;
            }

            this.visitImportDeclaration(statement);
        }
    }

    private visitImportDeclaration(node: ImportDeclaration) {
        const next = getNextStatement(node);
        if (next === undefined) {
            // there are no any statements afterward the last import
            // so we can just ignore blank lines if there are any
            return;
        }

        // TODO: we need to rewrite all of the logic because tsc omits blank lines
        // when ts.getLineAndCharacterOfPosition is used
        const nextText = next.getFullText() || '';
        const nextStart = next.getStart();
        const nextFullStart = next.getFullStart();
        const fullOffset = nextStart - nextFullStart;
        const offsetChars = nextText.slice(0, fullOffset).split('');
        const sameLine = !fullOffset || !offsetChars.some(item => isLineBreak(item.charCodeAt(0) || 0));

        if (sameLine) {
            // Import statement and next statement are on the same line
            return this.addFailureAtNode(node, Rule.NO_BLANK_LINE_FAILURE_STRING);
        }

        const linesThreshold = 2;
        let consecutiveLines = 0;
        let seriesStartedAt = 0;

        const possibleErrors: TextRange[] = nextText
            .split('')
            .reduce<TextRange[]>(
            (memo, char, index, text) => {
                const code = char.charCodeAt(0) || 0;

                if (isLineBreak(code)) {
                    const prevChar = index > 0 ? text[index - 1] : '';
                    const prevCarriageReturn =
                        prevChar.charCodeAt(0) === CharacterCodes.carriageReturn && code === CharacterCodes.lineFeed;

                    seriesStartedAt = !consecutiveLines ? index : seriesStartedAt;
                    consecutiveLines = !prevCarriageReturn ? consecutiveLines + 1 : consecutiveLines;
                } else if (isWhiteSpaceLike(code) && consecutiveLines) {
                    return memo;
                } else if (consecutiveLines && consecutiveLines <= linesThreshold) {
                    consecutiveLines = 0;
                } else if (consecutiveLines > linesThreshold) {
                    memo.push({
                        end: nextFullStart + index,
                        pos: nextFullStart + seriesStartedAt
                    });

                    consecutiveLines = 0;
                }

                return memo;
            },
            []
            );

        const comments = getLeadingCommentRanges(this.sourceFile.text, next.pos) || [];

        const errors = possibleErrors
            .map(possibleError => {
                const { pos, end } = possibleError;

                for (const comment of comments) {
                    const { pos: commentPos, end: commentEnd } = comment;

                    if (pos >= commentPos && end <= commentEnd) {
                        return undefined;
                    }
                }

                return possibleError;
            })
            .filter(possibleError => possibleError);

        if (errors.length) {
            // Lines count between import and next statement is exceeding the threshold
            return this.addFailureAtNode(node, Rule.TOO_MANY_BLANK_LINES_FAILURE_STRING);
        }
    }
}
