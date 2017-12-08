import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';


const AFTER_IMPORTS = 'after-imports';
const ABOVE_CONDITIONAL = 'above-conditional';
const ABOVE_METHOD = 'above-method';

const DEFAULT_COUNT_OF_BLANK_LINES = 1;

interface Options {
    afterImports: number;
    aboveConditional: number;
    aboveMethod: number;
}

interface ConfigOptions {
    'after-imports': number;
    'above-conditional': number;
    'above-method': number;
}

const parseConfigOptions = (configOptions: ConfigOptions): Options => {
    const options: Options = {
        afterImports: DEFAULT_COUNT_OF_BLANK_LINES,
        aboveConditional: DEFAULT_COUNT_OF_BLANK_LINES,
        aboveMethod: DEFAULT_COUNT_OF_BLANK_LINES
    };

    if (configOptions) {
        options.afterImports = configOptions[AFTER_IMPORTS] || DEFAULT_COUNT_OF_BLANK_LINES;
        options.aboveConditional = configOptions[ABOVE_CONDITIONAL] || DEFAULT_COUNT_OF_BLANK_LINES;
        options.aboveMethod = configOptions[ABOVE_METHOD] || DEFAULT_COUNT_OF_BLANK_LINES;
    }

    return options;
};

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'blank-lines',
        description: 'Disallows one or more blank lines in a row after or above statements.',
        type: 'style',
        typescriptOnly: false,
        options: {
            properties: {
                [AFTER_IMPORTS]: {
                    type: 'number',
                    minimum: '1'
                },
                [ABOVE_CONDITIONAL]: {
                    type: 'number',
                    minimum: '1'
                },
                [ABOVE_METHOD]: {
                    type: 'number',
                    minimum: '1'
                }
            },
            type: 'object'
        },
        optionsDescription: Lint.Utils.dedent`
            Three options must be provided on an object:
            * \`${AFTER_IMPORTS}\` sets count of blank lines after imports.
            * \`${ABOVE_CONDITIONAL}\` sets count of blank lines above conditional.
            * \`${ABOVE_METHOD}\` sets count of blank lines above method.`,
        optionExamples: [
            true,
            [
                true,
                {
                    [AFTER_IMPORTS]: 2,
                    [ABOVE_CONDITIONAL]: 1,
                    [ABOVE_METHOD]: 1
                }
            ]
        ],
        rationale: 'Helps maintain a readable style in your codebase.'
    };

    public static FAILURE_STRING_FACTORY(failureType: string, allowed: number): string {
        return `You need to use ${allowed} consecutive blank lines ${failureType.replace('-', ' ')}`;
    }

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const options = parseConfigOptions((this.ruleArguments as [ConfigOptions])[0]);

        return this.applyWithWalker(new BlankLinesWalker(sourceFile, this.ruleName, options));
    }
}

class BlankLinesWalker extends Lint.AbstractWalker<Options> {
    public walk(sourceFile: ts.SourceFile): void {
        ts.forEachChild(sourceFile, (child) => this.visitNode(child));
    }

    private visitNode(node: ts.Node): void {
        switch (node.kind) {
            case ts.SyntaxKind.ImportDeclaration:
                return this.visitImportDeclaration(node as ts.ImportDeclaration);
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
                return this.visitConditionalExpression(node as ts.Statement);
            case ts.SyntaxKind.MethodDeclaration:
                return this.visitMethodDeclaration(node as ts.Statement);
            default:
                return ts.forEachChild(node, (child) => this.visitNode(child));
        }
    }

    private visitImportDeclaration(node: ts.ImportDeclaration): void {
        const next = utils.getNextStatement(node);

        if (next === undefined || utils.isImportDeclaration(next)) {
            // there are no any statements afterward import or it isn't the last import
            // so we can just ignore blank lines if there are any
            return;
        }

        const blankLinesAfterImport: number = this.getBlankLines(next);

        if (blankLinesAfterImport !== this.options.afterImports) {
            this.addFailureAtNode(node, Rule.FAILURE_STRING_FACTORY(AFTER_IMPORTS, this.options.afterImports));
        }
    }

    private visitMethodDeclaration(node: ts.Statement): void {
        const blankLinesAboveMethod: number = this.getBlankLines(node);

        if (blankLinesAboveMethod !== this.options.aboveMethod) {
            this.addFailureAt(
                node.getStart(),
                1,
                Rule.FAILURE_STRING_FACTORY(ABOVE_METHOD, this.options.aboveMethod)
            );
        }
    }

    private visitConditionalExpression(node: ts.Statement): void {
        const prev = utils.getPreviousStatement(node);

        if (prev === undefined) {
            return;
        }

        const blankLinesAboveConditional: number = this.getBlankLines(node);

        if (blankLinesAboveConditional !== this.options.aboveConditional) {
            this.addFailureAt(
                node.getStart(),
                1,
                Rule.FAILURE_STRING_FACTORY(ABOVE_CONDITIONAL, this.options.aboveConditional)
            );
        }
    }

    private getBlankLines(node: ts.Node): number {
        const nodeText = node.getFullText();
        let isLineBreakAtStart = true;

        return nodeText
            .split('')
            .reduce<number>(
                (memo, char) => {
                    const code = char.charCodeAt(0) || 0;

                    if (isLineBreakAtStart && ts.isLineBreak(code)) {
                        return memo + 1;
                    } else if (!ts.isWhiteSpaceLike(code)) {
                        isLineBreakAtStart = false;
                    }

                    return memo;
                },
                // first line break it isn't a blank line
                -1
            );
    }
}
