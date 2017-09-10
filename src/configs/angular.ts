
export default {
    rules: {
        // Functionality
        "banana-in-box": true,
        "no-access-missing-member": true,
        "invoke-injectable": true,
        "template-to-ng-template": true,
        "templates-no-negated-async": true,
        "templates-use-public": true,

        // Maintainability
        "no-attribute-parameter-decorator": true,
        "no-forward-ref": true,
        "no-input-rename": true,
        "no-output-rename": true,
        "use-life-cycle-interface": true,
        "use-pipe-transform-interface": true,
        "use-view-encapsulation": true,

        // Style
        "angular-whitespace": [true, "check-interpolation", "check-pipe"],
        "component-class-suffix": true,
        "component-selector": [true, "element", "sg", "kebab-case"],
        "directive-class-suffix": true,
        "directive-selector": [true, "attribute", "sg", "camelCase"],
        "pipe-naming": [true, "camelCase", "sg"],
        "use-input-property-decorator": true,
        "use-host-property-decorator": true,
        "use-output-property-decorator": true
    }
};
