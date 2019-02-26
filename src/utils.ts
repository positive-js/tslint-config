import * as utils from 'tsutils';
import * as ts from 'typescript';


export function isElseIf(node: ts.IfStatement): node is ts.IfStatement &
    { parent: ts.IfStatement & { elseStatement: ts.IfStatement } } {

    /* tslint:disable:no-non-null-assertion */
    const parent = node.parent!;

    return utils.isIfStatement(parent) &&
        parent.elseStatement === node;
}

export function isUnderscoredProperty(property: ts.PropertyDeclaration) {
    return property && property.name.getText().startsWith('_');
}

export function getAccessorsByUnderscoredProperty(property: ts.PropertyDeclaration):
    { getter: ts.ClassElement | undefined; setter: ts.ClassElement | undefined} {

    const propertyName = property.name.getText();

    let getter;
    let setter;

    if (isUnderscoredProperty(property) && utils.hasModifier(property.modifiers, ts.SyntaxKind.PrivateKeyword,
        ts.SyntaxKind.ProtectedKeyword)) {

        const getterOrSetterName = propertyName.slice(1);

        getter = property.parent.members.find((member) => {
            return utils.isGetAccessorDeclaration(member) && member.name.getText() === getterOrSetterName;
        }) as ts.GetAccessorDeclaration;

        setter = property.parent.members.find((member) => {
            return utils.isSetAccessorDeclaration(member) && member.name.getText() === getterOrSetterName;
        }) as ts.SetAccessorDeclaration;
    }

    return {
        getter,
        setter
    };
}
