import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';


/**
 * Rule that enforces order getter property > setter property > private _property .
 */
export class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new Walker(sourceFile, this.getOptions()));
    }
}

class Walker extends Lint.RuleWalker {
    visitGetAccessor(getter: ts.GetAccessorDeclaration) {
        if (getter.parent && tsutils.isClassDeclaration(getter.parent)) {
            const getterName = getter.name.getText();

            const setter = getter.parent.members.find((member) => {
                return tsutils.isSetAccessorDeclaration(member) && member.name.getText() === getterName;
            }) as ts.SetAccessorDeclaration | undefined;

            if (setter && setter.pos < getter.pos) {
                this.addFailureAtNode(getter, 'Getters must be declared before setters.');
            }
        }

        super.visitGetAccessor(getter);
    }

    visitSetAccessor(setter: ts.SetAccessorDeclaration) {
        if (setter.parent && tsutils.isClassDeclaration(setter.parent)) {
            const setterName = setter.name.getText();

            const getter = setter.parent.members.find((member) => {
                return tsutils.isGetAccessorDeclaration(member) && member.name.getText() === setterName;
            }) as ts.GetAccessorDeclaration | undefined;

            if (getter && getter.pos > setter.pos) {
                this.addFailureAtNode(setter, 'Setters must be declared after getters.');
            }
        }

        super.visitSetAccessor(setter);
    }

    visitPropertyDeclaration(property: ts.PropertyDeclaration) {
        const propertyName = property.name.getText();
        const getterOrSetterName = propertyName.slice(1);

        if (propertyName.startsWith('_') && tsutils.hasModifier(property.modifiers, ts.SyntaxKind.PrivateKeyword)) {
            const getter = property.parent.members.find((member) => {
                return tsutils.isGetAccessorDeclaration(member) && member.name.getText() === getterOrSetterName;
            }) as ts.GetAccessorDeclaration | undefined;

            const setter = property.parent.members.find((member) => {
                return tsutils.isSetAccessorDeclaration(member) && member.name.getText() === getterOrSetterName;
            }) as ts.SetAccessorDeclaration | undefined;

            if (!getter && !setter) {
                this.addFailureAtNode(property,
                    'Private property with leading underscore must be used only for getter or setter.');
            }

            if ((getter && property.pos < getter.pos) ||
                    (setter && property && property.pos < setter.pos)) {
                this.addFailureAtNode(property,
                    'Private property for getter or setter must be declared after them.');
            }
        }

        super.visitPropertyDeclaration(property);
    }
}
