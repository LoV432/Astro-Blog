import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const API = process.argv[2]?.replace(/\/$/, '');
if (!API) {
	console.error('Usage: node scripts/strapi-export.mjs <strapi-url>');
	process.exit(1);
}

const outDir = path.resolve('src/content/blog');
const absolute = (url) => (/^https?:\/\//.test(url) ? url : API + url);

async function download(url, dir) {
	const res = await fetch(absolute(url));
	if (!res.ok) throw new Error(`${res.status} ${url}`);
	const name = path.basename(new URL(absolute(url)).pathname);
	await writeFile(path.join(dir, name), Buffer.from(await res.arrayBuffer()));
	return `./${name}`;
}

async function fetchPosts() {
	const posts = [];
	for (let page = 1; ; page++) {
		const query = 'fields[0]=heading&fields[1]=slug&fields[2]=description&fields[3]=content&fields[4]=publishedAt&fields[5]=updatedAt&populate[cover][fields][0]=url&populate[tags][fields][0]=tag&pagination[pageSize]=100';
		const res = await fetch(`${API}/api/posts?${query}&pagination[page]=${page}`).then((r) => r.json());
		posts.push(...res.data);
		if (page >= res.meta.pagination.pageCount) return posts;
	}
}

const apiHost = new URL(API).host.replace(/[.]/g, '\\.');
const uploadPattern = new RegExp(`(?:https?://${apiHost})?/uploads/[^\\s)"'<>]+`, 'g');

for (const post of await fetchPosts()) {
	const dir = path.join(outDir, post.slug);
	await mkdir(dir, { recursive: true });

	let content = post.content ?? '';
	for (const url of new Set(content.match(uploadPattern) ?? [])) {
		content = content.replaceAll(url, await download(url, dir));
	}

	const frontmatter = [
		`heading: ${JSON.stringify(post.heading)}`,
		`description: ${JSON.stringify(post.description ?? '')}`,
		`cover: ${JSON.stringify(await download(post.cover.url, dir))}`,
		`tags: ${JSON.stringify((post.tags ?? []).map((t) => t.tag))}`,
		`publishedAt: ${post.publishedAt}`,
		`updatedAt: ${post.updatedAt}`
	].join('\n');

	await writeFile(path.join(dir, 'index.md'), `---\n${frontmatter}\n---\n\n${content}\n`);
	console.log(`exported ${post.slug}`);
}
