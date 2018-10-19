#!/usr/bin/env bash

set -e

echo "Matter token"
echo ${UI_BOT_TOKEN}

VERSION_CURRENT_PACKAGE=$(npm info @ptsecurity/tslint-config version)

curl \
-i \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'payload={
  "channel": "Earth",
  "username": "Wall-e",
  "text": "#### TSLint Config was published.\n
  [(tslint-config@${VERSION_CURRENT_PACKAGE})](https://www.npmjs.com/package/@ptsecurity/tslint-config)\n
  [(View changelog)](https://github.com/positive-js/tslint-config/blob/master/CHANGELOG.md)"
}' https://chat.ptsecurity.com/hooks/${UI_BOT_TOKEN}

