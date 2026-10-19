<!--
SPDX-FileCopyrightText: Robert Ryszard Paciorek <rrp@opcode.eu.org>
SPDX-License-Identifier: MIT
-->
<h2>JSWebGit</h2>

<p>JSWebGit is simple web interface for git repositories.</p>
<ul>
	<li>It runs entirely in the web browser (client side).</li>
	<li>It requires no server-side support (it works with a "dumb HTTP" setup that does not understand the Git protocol).</li>
	<li>Can be run on standard (with workdir) and on bare repos.</li>
	<li>All that is needed is to run <code>git --bare update-server-info</code> / <code>git update-server-info</code> on the repository and make it available via HTTP. See <a href="make-repos.sh">make-repos.sh</a> for example.</li>
	<li>Optionally, it can use the "current version" available on the server side (on non-bare and pseud-bare repos) for providing files for download.</li>
	<li>It was designed for public, read-only access – it does not support write operations or authorization.</li>
</ul>

<p>JSWebGit is available under MIT license on <a href="https://github.com/opcode-eu-org-libs/JSWebGit">https://github.com/opcode-eu-org-libs/JSWebGit</a>. You can download pre-build package used for demo <a href="https://opcode-eu-org-libs.github.io/JSWebGit/JSWebGit.tgz">HERE</a>.</p>

<h2>JSWebGit Demo</h2>

<p>See <a href="https://opcode-eu-org-libs.github.io/JSWebGit/JSWebGit">DEMO</a>.</p>
