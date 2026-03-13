#!/usr/bin/env bash
# Launch Claude Code with secrets loaded from the sibling secrets/ directory.
# Directory structure expected:
#   parent/
#     secrets/assistant.env   ← your secrets (never in git)
#     claudex/                ← this repo
#       claudesafe.sh         ← this script
set -a
source "$(dirname "$0")/../secrets/assistant.env"
set +a
cd "$(dirname "$0")"
claude
