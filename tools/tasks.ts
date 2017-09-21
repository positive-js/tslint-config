import * as util from './utils';
import { helperRoot } from './utils';

const dist = helperRoot('dist');

const root = helperRoot('');
const packageSrc = helperRoot('src');
const packageDist = `${dist}/@ptsecurity/tslint-config`;

console.log(packageSrc);

export function removeDistFolder() {
    return util.exec('rimraf', [packageDist]);
}

export async function lint() {
    await util.exec('tslint', [`${packageSrc}/src/**/*.ts --project ${root}/tsconfig.json`]);
}

export async function compileTS() {
    await util.exec('tsc', []);
}

export async function copyMetaFiles() {
    const files = [
        {from: `${root}/package.json`,      to: `${packageDist}/package.json`},
        {from: `${root}/package-lock.json`, to: `${packageDist}/package-lock.json`},
        {from: `${root}/CHANGELOG.md`,      to: `${packageDist}/CHANGELOG.md`},
        {from: `${root}/README.md`,         to: `${packageDist}/README.md`}
    ];

    await util.mapAsync(files, async file => {
        await util.copy(file.from, file.to);
    });
}

export async function testRules() {
    await util.exec('tslint', [`-r ${packageDist}/rules --test ${root}/test/rules/**/*`]);
}
