import angular from './configs/angular';
import customRules from './configs/custom-rules';
import tslintMSContrib from './configs/tslint-microsoft-contrib-override';
import tslintOverride from './configs/tslint-override';

module.exports = {
    rulesDirectory: [
        './rules/'
    ],
    extends: [
        'codelyzer',
        'tslint-eslint-rules',
        'tslint-microsoft-contrib',
        'tslint:recommended'
    ],
    rules: {
        ...angular.rules,
        ...tslintMSContrib.rules,
        ...tslintOverride.rules,
        ...customRules.rules
    }
};
