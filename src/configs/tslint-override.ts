export default {
    rules: {
        // TypeScript-specific
        "member-access": [true, "no-public"],

        // Style
        "array-type": [
            true,
            "array"
        ],
        "arrow-parens": true,
        "no-angle-bracket-type-assertion": false,
        "object-literal-key-quotes": [true, "as-needed"],
        "prefer-method-signature": true,
        "no-unnecessary-callback-wrapper": true,
        "prefer-template": true,
        "variable-name": [true, "check-format", "allow-leading-underscore", "allow-pascal-case"],

        // Functionality
        "await-promise": [
            true,
            "PromiseLike"
        ],
        "import-blacklist": [true, "lodash", "rxjs"],
        "label-position": true,
        "no-switch-case-fall-through": true,
        "no-unbound-method": {
            options: ["ignore-static"]
        },
        "ordered-imports": [
            true,
            {
                "import-sources-order": "lowercase-first",
                "grouped-imports": true,
                "named-imports-order": "any"
            }
        ],
        "radix": false,
        "no-consecutive-blank-lines": false,
        "no-console": [true, "log", "debug", "error"],
        "no-duplicate-switch-case": true,
        "no-for-in-array": true,
        "no-implicit-dependencies": [true, "dev"],
        "no-this-assignment": [
            true,
            {
                "allowed-names": [
                    "^self$"
                ]
            }
        ],
        "prefer-object-spread": true,

        // Maintainability
        "cyclomatic-complexity": true,
        "linebreak-style": [
            false
        ],
        "max-classes-per-file": [
            false
        ],
        "no-require-imports": false,
        "object-literal-sort-keys": false,
        "trailing-comma": [
            true,
            {
                multiline: "never",
                singleline: "never"
            }
        ],
        "quotemark": [true, "single"],
        "no-import-side-effect": [true, {"ignore-module": "(\\.html|\\.css|\\.less|\\.scss|\\.styl)$"}],
        "no-magic-numbers": true,
        "no-parameter-reassignment": true,
        "deprecation": true,
        "indent": [true, "spaces", 4],
        "no-duplicate-imports": true
    }
};
