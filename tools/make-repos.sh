#!/bin/sh

# SPDX-FileCopyrightText: Robert Ryszard Paciorek <rrp@opcode.eu.org>
# SPDX-License-Identifier: MIT

if [ "$1" = "useCurrent" ]; then
	useCurrent=true
else
	useCurrent=false
fi
sed -e "s#const useServerSideCurrent = [a-z]*;#const useServerSideCurrent = $useCurrent#" -i git.html

while read NAME URL; do
	if [ "$NAME" = "" -o "$NAME" = "#" ]; then continue; fi
	git clone --bare "$URL" "$NAME" && (
		cd "$NAME"
		git --bare update-server-info
		if [ $(find . -type f -print0 | du --files0-from=- | sort -n | tail -n1 | cut -f1) -gt 2300 ]; then
			git repack -f -d -a --max-pack-size=22M
		fi
		if $useCurrent; then
			mkdir -p current
			git config core.bare false
			git config core.worktree current
			git checkout -f
			git config core.bare true
		fi
		ln -s ../git.html index.html
	)
done
