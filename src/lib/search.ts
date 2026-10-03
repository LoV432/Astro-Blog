import { getPosts } from './posts';

export async function searchPosts(url: URL) {
	const tag = url.searchParams.get('tag');
	const search = url.searchParams.get('search')?.toLowerCase();
	return (await getPosts()).filter((post) => (!tag || post.data.tags.includes(tag)) && (!search || post.data.heading.toLowerCase().includes(search)));
}
