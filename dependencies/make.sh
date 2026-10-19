#!/bin/sh

# SPDX-FileCopyrightText: Robert Ryszard Paciorek <rrp@opcode.eu.org>
# SPDX-License-Identifier: MIT

cd "$(dirname "$0")"

npm install esbuild --save-dev
npm install isomorphic-git @isomorphic-git/lightning-fs buffer
npm run build
