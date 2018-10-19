#!/usr/bin/env bash

set -e

echo "Matter token ${UI_BOT_TOKEN}"

VERSION_CURRENT_PACKAGE=$(npm info @ptsecurity/tslint-config version)

echo "Version of package ${VERSION_CURRENT_PACKAGE}"

curl \
-i \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'payload={
  "channel": "test-bot",
  "username": "Wall-e",
  "text": "#### :white_check_mark: TSLint Config was published. :bell: :tada:\n
  Version | 0.9.0
  --- | ---
  :gear: Build | [#'"$CIRCLE_BUILD_NUM"']('"$CIRCLE_BUILD_URL"')
  :package: Package | [tslint-config](https://www.npmjs.com/package/@ptsecurity/tslint-config)
  :memo: Changelog | [view](https://github.com/positive-js/tslint-config/blob/'"$CIRCLE_TAG"'/CHANGELOG.md)"
}' https://chat.ptsecurity.com/hooks/${UI_BOT_TOKEN}

