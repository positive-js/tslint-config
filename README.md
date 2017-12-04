# @ptsecurity/tslint-config

[![CircleCI](https://circleci.com/gh/positive-js/tslint-config/tree/master.svg?style=shield)](https://circleci.com/gh/positive-js/tslint-config/tree/master)
[![npm](https://img.shields.io/npm/v/@ptsecurity/tslint-config.svg)](https://www.npmjs.com/package/@ptsecurity/tslint-config)
[![David-DM](https://david-dm.org/positive-js/tslint-config/status.svg)](https://david-dm.org/positive-js/tslint-config)

## Install

Install as an [npm][npm] devDependency. [TypeScript][typescript] and [TSLint][tslint]
should also be installed.

```sh
npm install --save-dev typescript tslint @ptsecurity/tslint-config
```

## Usage

Include a `tslint.json` file in your project and add `"@ptsecurity/tslint-config"` to
the `"extends"` field. Custom rules can then be enabled under `"rules"`.

```json
{
  "extends": ["@ptsecurity/tslint-config"],
  "rules": {
    ...
  }
}
```

## Contributing
Please read [community-guidelines here](https://github.com/positive-js/community-guidelines).

[npm]: https://www.npmjs.com/package/@ptsecurity/tslint-config
[typescript]: https://www.typescriptlang.org/
[tslint]: https://palantir.github.io/tslint/
[license]: LICENSE

Test -2
