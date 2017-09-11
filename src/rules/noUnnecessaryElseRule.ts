import * as Lint from 'tslint';
import * as utils from 'tsutils';
import * as ts from 'typescript';

import { isElseIf } from '../utils';
import { AbstractIfStatementWalker } from '../walker';

const FAIL_MESSAGE = 'unnecessary else';

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new IfWalker(sourceFile, this.ruleName, undefined));
    }
}

class IfWalker extends AbstractIfStatementWalker<void> {

    /* tslint:disable:function-name */
    protected _checkIfStatement(node: ts.IfStatement) {
        if (node.elseStatement !== undefined &&
            !isElseIf(node) &&
            utils.endsControlFlow(node.thenStatement)) {

            /* tslint:disable:no-non-null-assertion */
            /* tslint:disable:no-magic-numbers */
            /* tslint:disable:no-single-line-block-comment */
            this.addFailureAtNode(node.getChildAt(5 /*else*/, this.sourceFile)!, FAIL_MESSAGE);
        }
    }
}
