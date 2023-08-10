import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'frontend/dist');
const docs = resolve(root, 'docs');
if (!existsSync(dist)) throw new Error('frontend/dist not found. Run frontend build first.');
rmSync(docs, { recursive: true, force: true });
mkdirSync(docs, { recursive: true });
cpSync(dist, docs, { recursive: true });
writeFileSync(resolve(root, 'index.html'), '<!doctype html><meta http-equiv="refresh" content="0; url=./docs/" />');
console.log('GitHub Pages artifacts prepared in /docs and root index redirect created.');
