import { createBuilder } from './utils';
import * as tasks from './tasks';

export const build = createBuilder([
    ['Removing "./dist/@ptsecurity/tslint-config" folder', tasks.removeDistFolder],
    ['Lint source code', tasks.lint],
    ['Compiling TypeScript', tasks.compileTS],
    ['Copy meta files', tasks.copyMetaFiles],
    ['Testing custom rules', tasks.testRules]
]);
