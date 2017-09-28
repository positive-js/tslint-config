
export default {
    rules: {
        // Style
        "array-type": [
            true,
            "array"
        ],
        "arrow-parens": [
            true,
            "ban-single-arg-parens"
        ],
        "no-angle-bracket-type-assertion": false,

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
        "radix": false,
        // Maintainability
        "cyclomatic-complexity": true,
        "linebreak-style": [
            false
        ],
        "max-classes-per-file": [
            false
        ],
        "object-literal-sort-keys": false,
        "trailing-comma": [
            true,
            {
                multiline: "never",
                singleline: "never"
            }
        ],
        "quotemark": [true, "single"]
    }
};
