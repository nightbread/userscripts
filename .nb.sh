#!/usr/bin/env bash
export GIT_SSH="$HOME/.local/bin/nb-git-ssh"
if ! [ -f "$GIT_SSH" ]; then
    # shellcheck disable=SC2016
    echo 'Fix missing $GIT_SSH!' >&2
    exit 1
fi
git config user.email nightbread@inbox.lv
git config user.name nightbread
git config sendemail.smtpuser ''
git config sendemail.from ''
git config commit.gpgsign false
if command -v diskutil > /dev/null 2>&1; then
    if diskutil info / | grep -F -i case-sensitive; then
        git config core.ignorecase false
    else
        git config core.ignorecase true
    fi
fi
