export default {
    rules: {

        "no-submodule-imports": false,

        // TypeScript-specific
        "member-access": [true, "no-public"],
        "promise-function-async": false,

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
        "whitespace": [
                true,
                "check-branch",
                "check-decl",
                "check-operator",
                "check-module",
                "check-separator",
                "check-rest-spread",
                "check-type",
                "check-typecast",
                "check-type-operator",
                "check-preblock"
        ],
        "no-unnecessary-type-assertion": true,
        "match-default-export-name": true,
        "no-boolean-literal-compare": true,
        "no-unnecessary-qualifier": true,
        "return-undefined": false,

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
        "no-unsafe-any": false,
        "no-floating-promises": false,
        "no-inferred-empty-object-type": true,
        "no-use-before-declare": true,
        "no-void-expression": [true, "ignore-arrow-function-shorthand"],
        "restrict-plus-operands": true,
        "strict-boolean-expressions": false,
        "strict-type-predicates": true,
        "use-default-type-parameter": true,

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
        "no-duplicate-imports": true,
        "prefer-readonly": true,
        "completed-docs": false
    }
};
