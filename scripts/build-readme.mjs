import { readFile, writeFile } from 'node:fs/promises';

const pkg = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const template = await readFile(new URL('../README.template.md', import.meta.url), 'utf8');

const output = template.replace(/\{\{VERSION\}\}/g, pkg.version);

await writeFile(new URL('../README.md', import.meta.url), output, 'utf8');
