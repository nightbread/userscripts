#!/usr/bin/env bash
export GIT_SSH="$HOME/usr/bin/nb-git-ssh"
git config user.email nightbread@inbox.lv
git config user.name nightbread
git config sendemail.smtpuser ''
git config sendemail.from ''
git config commit.gpgsign false
if command -v diskutil >/dev/null 2>&1; then
    if diskutil info / | fgrep -i case-sensitive; then
        git config core.ignorecase false
    else
        git config core.ignorecase true
    fi
fi
