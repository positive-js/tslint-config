
export default {
    rules: {
        // Errors
        "ter-no-irregular-whitespace": true,

        // ES6
        "ter-arrow-body-style": [
            true,
            "as-needed",
            {
                requireReturnForObjectLiteral: false
            }
        ],
        "ter-arrow-spacing": [
            true
        ],
        "ter-prefer-arrow-callback": [
            true,
            {
                allowNamedFunctions: false
            }
        ],

        // Style
        "no-multi-spaces": true,
        "object-curly-spacing": [
            true,
            "always"
        ],
        "space-in-parens": [
            true,
            "never"
        ],
        // tslint:disable:no-magic-numbers
        "ter-indent": [
            true,
            4,
            {
                SwitchCase: 1
            }
        ],
        "ter-max-len": [
            true,
            120,
            {
                ignoreUrls: true,
                ignoreComments: false
            }
        ]
    }
};
