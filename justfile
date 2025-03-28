# just docs: https://github.com/casey/just
###########################################################################
set shell                           := ["bash", "-c"]
set dotenv-load                     := true
set export                          := true
NOTION_TOKEN                        := env_var_or_default("NOTION_TOKEN", "")
GITHUB_TOKEN                        := env_var_or_default("GITHUB_TOKEN", "")
NPM_TOKEN                           := env_var_or_default("NPM_TOKEN", "")
###########################################################################
# Formatting
###########################################################################
bold                               := '\033[1m'
normal                             := '\033[0m'
green                              := "\\e[32m"
yellow                             := "\\e[33m"

###########################################################################
# Begin commands
###########################################################################
_help:
    #!/usr/bin/env bash
    echo ""
    just --list --unsorted --list-heading $'📚 Commands for @metapage/docu-notion:\n'

# Run the dev server (docs and blog are NOT generated from notion)
build:
  npm run build
    
