#!/usr/bin/env bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" > /dev/null 2>&1 && pwd)"
export GIT_SSH="${DIR}/.nb-git-ssh"
if ! [ -f "$GIT_SSH" ] || ! [ -f ~/.ssh/nb-id_rsa ]; then
    # shellcheck disable=SC2016
    echo 'Fix missing $GIT_SSH or missing ~/.ssh/nb-id_rsa!' >&2
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
