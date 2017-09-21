import { build } from './builder';

build({
    packages: [{ name: 'tslint-config' }]
}).catch(err => {
    console.log(err.stdout);
    process.exit(1);
}).then(() => {
    console.info('Build Complete');
    process.exit(0);
});
