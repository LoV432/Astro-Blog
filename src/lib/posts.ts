import { getCollection, type CollectionEntry } from 'astro:content';
import { PAGESIZE } from '../config';

export type Post = CollectionEntry<'blog'>;

export async function getPosts() {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getTags(posts: Post[]) {
	return [...new Set(posts.flatMap((post) => post.data.tags))];
}

export function getTotalPages(posts: Post[]) {
	return Math.ceil(posts.length / PAGESIZE);
}

export function paginate(posts: Post[], page: number) {
	return {
		posts: posts.slice((page - 1) * PAGESIZE, page * PAGESIZE),
		totalPages: getTotalPages(posts),
		currentPage: page
	};
}

export function pagePaths(totalPages: number) {
	return Array.from({ length: totalPages }, (_, i) => String(i + 1));
}
