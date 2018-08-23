#!/usr/bin/env bash

set -e

echo "Matter token"
echo ${UI_BOT_TOKEN}

curl \
-i \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'payload={
  "channel": "town-square",
  "username": "igorek-bot",
  "text": "#### TSLint Config was published.\n"
}' https://chat.ptsecurity.com/hooks/${UI_BOT_TOKEN}

