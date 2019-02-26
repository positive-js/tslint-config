export const customRules = {
    rules: {
        'orthodox-getter-and-setter': true,
        'member-ordering-advanced': [
            true, {
                order: [
                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',

                    'public-constructor',
                    'protected-constructor',
                    'private-constructor',

                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method'
                ]
            }],
        'blank-lines': [
            true,
            {
                'after-imports': 2
            }
        ],
        'naming-convention': [
            true,
            { type: 'default', format: 'camelCase', leadingUnderscore: 'forbid', trailingUnderscore: 'forbid' },

            { type: 'variable', format: ['camelCase', 'UPPER_CASE'] },
            { type: 'function', format: ['strictCamelCase'] },

            { type: 'type', format: 'StrictPascalCase' },
            { type: 'enum', format: 'StrictPascalCase' },

            { type: 'parameter', modifiers: 'unused', leadingUnderscore: 'allow' },
            { type: 'parameter', format: 'strictCamelCase' },

            { type: 'enumMember', format: ['UPPER_CASE', 'PascalCase'] },

            { type: 'property', format: ['camelCase', 'UPPER_CASE'] },
            { type: 'property', modifiers: 'private', leadingUnderscore: 'allow' },

            { type: 'class', modifiers: 'abstract', prefix: 'Abstract' },
            { type: 'class', format: 'StrictPascalCase' },

            { type: 'interface', format: 'StrictPascalCase', prefix: 'I' }
        ]
    }
};
