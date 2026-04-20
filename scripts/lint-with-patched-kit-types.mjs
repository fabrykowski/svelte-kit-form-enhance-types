import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const kitTypesPath = resolve('node_modules/@sveltejs/kit/types/index.d.ts');
const original = readFileSync(kitTypesPath, 'utf8');

const enhanceSignaturePattern =
	/(export type RemoteForm<[\s\S]*?\benhance\(\s*callback:\s*\(opts:\s*\{[\s\S]*?\}\)\s*=>\s*)void(\s*\)\s*:\s*\{)/;

const matches = original.match(new RegExp(enhanceSignaturePattern, 'g')) ?? [];

if (matches.length !== 1) {
	throw new Error(
		`Expected exactly one RemoteForm.enhance signature in ${kitTypesPath}, found ${matches.length}`
	);
}

const patched = original.replace(enhanceSignaturePattern, '$1MaybePromise<void>$2');

writeFileSync(kitTypesPath, patched);
console.log(`Patched ${kitTypesPath}`);

try {
	execFileSync('npm', ['run', 'lint'], {
		stdio: 'inherit'
	});
} finally {
	writeFileSync(kitTypesPath, original);
	console.log(`Restored ${kitTypesPath}`);
}
