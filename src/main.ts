import angular from './configs/angular';
import tslintOverride from './configs/tslint-override';
    
module.exports = {
    extends: [
        'codelyzer',
        'tslint-eslint-rules',
        'tslint-microsoft-contrib',
        'tslint:recommended',
        './rules'
    ],
    rules: {
        ...angular.rules,
        ...tslintOverride.rules
    }
};
