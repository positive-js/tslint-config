#!/usr/bin/env bash

set -e

curl \
-i \
-X POST \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'payload={
  "channel": "test-bot",
  "username": "igorek-bot",
  "text": "#### TSLint Config was published.\n
  | Component  | Tests Run   | Tests Failed                                   |
  |:-----------|:-----------:|:-----------------------------------------------|
  | Server     | 948         | :white_check_mark: 0                           |
  | Web Client | 123         | :warning: 2 [(see details)](http://linktologs) |
  | iOS Client | 78          | :warning: 3 [(see details)](http://linktologs) |
  "
}' https://chat.ptsecurity.com/hooks/${MATTER_UI-BOT-HOOK}

