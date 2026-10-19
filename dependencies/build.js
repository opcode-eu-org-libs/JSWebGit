/*
SPDX-FileCopyrightText: Robert Ryszard Paciorek <rrp@opcode.eu.org>
SPDX-License-Identifier: MIT

Created with Gemini AI, 2026
*/

import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

const bufferProxyPath = path.join(process.cwd(), 'temp-buffer-proxy.js');
fs.writeFileSync(bufferProxyPath, `
  import bufferBundle from 'buffer';
  const Buffer = bufferBundle.Buffer;
  export { Buffer };
`);

const libraries = [
  {
    name: 'buffer',
    entry: bufferProxyPath,
    format: 'esm',
    outfile: 'dist/buffer.js',
  },
  {
    name: 'lightning-fs',
    entry: 'node_modules/@isomorphic-git/lightning-fs/src/index.js',
    format: 'iife',
    globalName: 'LightningFS',
    outfile: 'dist/lightning-fs.js'
  },
  {
    name: 'isomorphic-git',
    entry: 'node_modules/isomorphic-git/index.js',
    format: 'iife',
    globalName: 'git',
    outfile: 'dist/isomorphic-git.js'
  }
];

async function runBuild() {
  console.log('--- Build start ---');
  
  for (const lib of libraries) {
    try {
      await esbuild.build({
        entryPoints: [lib.entry],
        bundle: true,
        outfile: lib.outfile,
        format: lib.format,
        globalName: lib.globalName || undefined,
        minify: false,
        sourcemap: false,
        target: ['es2022'],
        platform: 'browser'
      });
      console.log(`✅ Sukces: ${lib.name} -> ${lib.outfile}`);
    } catch (error) {
      console.error(`❌ Fail: ${lib.name}:`, error);
      cleanup();
      process.exit(1);
    }
  }
  cleanup();
  console.log('--- Build done (results in ./dist) ---');
}

function cleanup() {
  if (fs.existsSync(bufferProxyPath)) {
    fs.unlinkSync(bufferProxyPath);
  }
}

runBuild();
