import DOMPurify from 'isomorphic-dompurify';
import { API } from '../../config';
export async function post({ request, clientAddress }) {
	let commenterIP;
	if (request.headers.get('x-real-ip') != null) {
		// this assumes the x-real-ip header can be trusted (like all traffic coming thru cloudflare)
		commenterIP = request.headers.get('x-real-ip');
	} else {
		commenterIP = clientAddress;
	}
	const data = await request.json();
	let comment = data.comment.replace(/<[^>]+>/g, ''); // Strip all html tags
	comment = comment.replace(/["]/g, '\\$&').replace(/\n/g, '\\n'); // Escape all "" and spaces
	const sanitizedComment = DOMPurify.sanitize(comment); // Run it thru DOMPurify just to be sure
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"author":{"id":"' + commenterIP + '","name":"' + data.name + '","email":"' + data.email + '"},"content":"' + sanitizedComment + '"}'
	};
	let response = await fetch(API + '/api/comments/api::post.post:' + data.post_id, options);
	let status = response.status;
	if (status != 200) {
		console.log('Failed Request!');
		console.log(options);
		console.log('END');
		return new Response('{"response": "failed"}', {
			status: 400
		});
	} else {
		return new Response('{"response": "Posted....Probably!"}', {
			status: 200
		});
	}
}
