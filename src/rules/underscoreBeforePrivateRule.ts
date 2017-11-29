import * as Lint from 'tslint';
import * as ts from 'typescript';

const UNDERSCORE = '_'.charCodeAt(0);

type RelevantClassMember =
    | ts.MethodDeclaration
    | ts.PropertyDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration;

export class Rule extends Lint.Rules.AbstractRule {
    public static metadata: Lint.IRuleMetadata = {
        ruleName: 'underscore-before-private',
        description: 'Enforces underscore before private member\'s name',
        rationale: 'Helps maintain a readable style in your codebase.',
        optionsDescription: 'Not configurable.',
        options: {},
        optionExamples: [true],
        type: 'style',
        typescriptOnly: false
    };

    public static FAILURE_STRING = 'private member\'s name must be prefixed with an underscore';

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new UnderscoreBeforePrivateWalker(sourceFile, this.ruleName, undefined));
    }
}

class UnderscoreBeforePrivateWalker extends Lint.AbstractWalker<void> {
    public walk(sourceFile: ts.SourceFile): void {
        this._traverse(sourceFile);
    }

    private _isRelevantClassMember(node: ts.Node): node is RelevantClassMember {
        switch (node.kind) {
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.PropertyDeclaration:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return true;
            default:
                return false;
        }
    }

    private _nameStartsWithUnderscore(text: string) {
        return text.charCodeAt(0) === UNDERSCORE;
    }

    private _memberIsPrivate(node: ts.Declaration) {
        return Lint.hasModifier(node.modifiers, ts.SyntaxKind.PrivateKeyword);
    }

    private _nameIsIdentifier(node: ts.Node): node is ts.Identifier {
        return node.kind === ts.SyntaxKind.Identifier;
    }

    private _checkNodeForViolations(node: ts.Node): void {
        if (!this._isRelevantClassMember(node)) {
            return;
        }

        // The declaration might have a computed property name or a numeric name.
        const name = node.name;
        if (!this._nameIsIdentifier(name)) {
            return;
        }

        if (!this._nameStartsWithUnderscore(name.text) && this._memberIsPrivate(node)) {
            this.addFailureAtNode(name, Rule.FAILURE_STRING);
        }
    }

    private _traverse(node: ts.Node): void {
        this._checkNodeForViolations(node);

        return ts.forEachChild(node, this._traverse.bind(this));
    }
}
