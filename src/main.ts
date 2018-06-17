import customRules from './configs/custom-rules';
import tslintMicrosoftContribOverride from './configs/tslint-microsoft-contrib-override';
import tslintOverride from './configs/tslint-override';


module.exports = {
    rulesDirectory: [
        './rules/'
    ],
    extends: [
        'tslint-eslint-rules',
        'tslint-microsoft-contrib',
        'tslint:recommended'
    ],
    rules: {
        ...tslintMicrosoftContribOverride.rules,
        ...tslintOverride.rules,
        ...customRules.rules
    }
};
