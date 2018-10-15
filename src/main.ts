import customRules from './configs/custom-rules';
import { rxjsOvverideConfig } from './configs/rxjs-override';
import tslintMicrosoftContribOverride from './configs/tslint-microsoft-contrib-override';
import tslintOverride from './configs/tslint-override';


module.exports = {
    rulesDirectory: [
        './rules/'
    ],
    extends: [
        'tslint-eslint-rules',
        'tslint-microsoft-contrib',
        'tslint:recommended',
        'rxjs-tslint-rules'
    ],
    rules: {
        ...tslintMicrosoftContribOverride.rules,
        ...tslintOverride.rules,
        ...customRules.rules,
        ...rxjsOvverideConfig.rules
    }
};
