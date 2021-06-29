#!/usr/bin/env bash
if ! [ -f ~/.ssh/nb-id_rsa ]; then
    # shellcheck disable=SC2016
    echo 'Fix missing ~/.ssh/nb-id_rsa!' >&2
    exit 1
fi
git config core.sshCommand \
    "ssh -o ControlMaster=no -o ControlPath=no -o StrictHostKeyChecking=no -o IdentityFile=${HOME}/.ssh/nb-id_rsa"
git config user.email nightbread@inbox.lv
git config user.name nightbread
git config --unset sendemail.smtpuser
git config --unset sendemail.from ''
git config commit.gpgsign false
if command -v diskutil > /dev/null 2>&1 && diskutil info / | grep -qFi case-sensitive; then
    git config core.ignorecase false
else
    git config core.ignorecase true
fi
