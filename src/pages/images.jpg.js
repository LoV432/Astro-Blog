import { API } from '../config';
export async function get({ request }) {
	const imageSrc = new URLSearchParams(request.url.split('?')[1]).get('src').split('/')[2];
	const response = await fetch(API + '/uploads/' + imageSrc);
	if (response.headers.get('Content-Type').split('/')[0] == 'image') {
		const buffer = Buffer.from(await response.arrayBuffer());
		return new Response(buffer, {
			status: 200,
			headers: {
				'Content-Type': 'image/jpg',
				'Cache-Control': 'max-age=15552000'
			}
		});
	} else {
		return new Response(null, {
			status: 403
		});
	}
}
