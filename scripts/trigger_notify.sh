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
  "text": "#### TSLint Config was published.\n
  Build: ['"$CIRCLE_BUILD_NUM"']('"$CIRCLE_BUILD_URL"')
  Package [tslint-config@'"$VERSION_CURRENT_PACKAGE"'](https://www.npmjs.com/package/@ptsecurity/tslint-config)\n
  [View changelog](https://github.com/positive-js/tslint-config/blob/master/CHANGELOG.md)"
}' https://chat.ptsecurity.com/hooks/${UI_BOT_TOKEN}

