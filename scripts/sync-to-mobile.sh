#!/usr/bin/env bash
# Run via `yarn local-sync` (which builds first) to copy the freshly built
# package into a local consumer app's node_modules, so local rn-kit changes
# show up there without a manual copy/paste or a full `yarn link` (which risks
# duplicate React/native-module instances since rn-kit carries its own
# react/react-native/native deps).
#
# Target defaults to the sibling `HERCA_HR/mobile` checkout documented in
# this repo's README; override with MOBILE_APP_PATH if your layout differs.
set -euo pipefail

RN_KIT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MOBILE_APP_PATH="${MOBILE_APP_PATH:-$RN_KIT_DIR/../../HERCA_HR/mobile}"
TARGET="$MOBILE_APP_PATH/node_modules/@herca/rn-kit"

if [ ! -d "$MOBILE_APP_PATH/node_modules" ]; then
  echo "[sync-to-mobile] $MOBILE_APP_PATH/node_modules not found, skipping sync"
  exit 0
fi

mkdir -p "$TARGET"

rsync -a --delete \
  --exclude 'node_modules' \
  --exclude 'example' \
  --exclude '.git' \
  --exclude '__tests__' \
  --exclude '__fixtures__' \
  --exclude '__mocks__' \
  --include 'lib/***' \
  --include 'src/***' \
  --include 'android/***' \
  --include 'ios/***' \
  --include 'cpp/***' \
  --include '*.podspec' \
  --include 'react-native.config.js' \
  --include 'package.json' \
  --include 'LICENSE' \
  --include 'README.md' \
  --exclude '*' \
  "$RN_KIT_DIR/" "$TARGET/"

echo "[sync-to-mobile] synced rn-kit build -> $TARGET"
