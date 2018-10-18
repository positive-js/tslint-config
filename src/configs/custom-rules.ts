export const customRules = {
    rules: {
        'orthodox-getter-and-setter': true,
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

            { type: 'property', format: ['strictCamelCase', 'UPPER_CASE'] },

            { type: 'class', modifiers: 'abstract', prefix: 'Abstract' },
            { type: 'class', format: 'StrictPascalCase' },

            { type: 'interface', format: 'StrictPascalCase', prefix: 'I' }
        ]
    }
};
