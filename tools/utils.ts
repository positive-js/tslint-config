import * as cp from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as rimraf from 'rimraf';


interface PackageDescription {
    name: string;
}

interface Config {
    packages: PackageDescription[];
}
export type RunnerFn = (config: Config) => Promise<any>;
export type TaskDef = [string, RunnerFn];
export type BaseFn = (command: string) => string;


const root = path.resolve(__dirname, '..');

export function helperRoot(args: any) {
    args = Array.prototype.slice.call(arguments, 0);

    return path.join.apply(path, [root].concat(args));
}

export function writeFile(target: string, contents: string) {
    return new Promise((resolve, reject) => {
        fs.writeFile(target, contents, err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

export function removeRecursively(glob: string) {
    return new Promise((resolve, reject) => {
        rimraf(glob, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

export function fromNpm(command: string) {
    return baseDir(`./node_modules/.bin/${command}`);
}

export function exec(
    command: string,
    args: string[],
    base: BaseFn = fromNpm
): Promise<string> {
    return new Promise((resolve, reject) => {
        cp.exec(`${base(command)} ${args.join(' ')}`, (err, stdout) => {
            if (err) {
                return reject({ err, stdout });
            }

            resolve(stdout.toString());
        });
    });
}

export function cmd(command: string, args: string[]): Promise<string> {
    /* tslint:disable:no-shadowed-variable */
    return exec(command, args, (command: string) => command);
}

export function git(args: string[]): Promise<string> {
    return cmd('git', args);
}

/* tslint:disable:no-var-requires */
/* tslint:disable:no-require-imports */
const ora = require('ora');
async function runTask(name: string, taskFn: () => Promise<any>) {
    const spinner = ora(name);

    try {
        spinner.start();

        await taskFn();

        spinner.succeed();
    } catch (e) {
        spinner.fail();

        throw (e);
    }
}

export function createBuilder(tasks: TaskDef[]) {
    return async (config: Config) => {
        /* tslint:disable:prefer-const */
        for (let [name, runner] of tasks) {
            await runTask(name, () => runner(config));
        }
    };
}

export function getAllPackages(config: Config) {
    return flatMap(config.packages, ({ name }) => [name]);
}

export function flatMap<K, J>(list: K[], mapFn: (item: K) => J[]): J[] {
    return list.reduce(
        (newList, nextItem) => [...newList, ...mapFn(nextItem)],
        [] as J[]
    );
}

export function baseDir(...dirs: string[]): string {
    return path.resolve(__dirname, '../', ...dirs);
}

export function mapAsync<T>(
    list: T[],
    mapFn: (v: T, i: number) => Promise<any>
) {
    return Promise.all(list.map(mapFn));
}


export function copy(target: string, destination: string) {
    fsExtra.copySync(target, destination);
}
