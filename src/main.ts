import angular from './configs/angular';

module.exports = {
    extends: [
        'codelyzer',
        'tslint-eslint-rules',
        'tslint-microsoft-contrib',
        'tslint:recommended',
        './rules'
    ],
    rules: {
        ...angular.rules
    }
};