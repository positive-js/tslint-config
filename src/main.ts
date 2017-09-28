import angular from './configs/angular';
import tslintMSContrib from './configs/tslint-microsoft-contrib-override';
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
        ...tslintMSContrib.rules,    
        ...tslintOverride.rules
    }
};
