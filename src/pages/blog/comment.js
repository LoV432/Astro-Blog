import DOMPurify from 'isomorphic-dompurify';
import { API, CLOUDFLARE_SECRET_KEY } from '../../config';
export async function post({ request, clientAddress }) {
	let commenterIP;
	const avatar = 'https://avatars.dicebear.com/api/identicon/' + Math.random() * 99999999 + '.svg?background=%23ffffff';
	if (request.headers.get('x-real-ip') != null) {
		// this assumes the x-real-ip header can be trusted (like all traffic coming thru cloudflare)
		commenterIP = request.headers.get('x-real-ip');
	} else {
		commenterIP = clientAddress;
	}
	const data = await request.json();
	const sanitizedComment = sanitize(data.comment);
	const sanitizedEmail = sanitize(data.email);
	const sanitizedName = sanitize(data.name);
	if (!(await validateCloudflare(CLOUDFLARE_SECRET_KEY, data.cloudflaretoken))) {
		return new Response('{"response": "failed"}', {
			status: 401
		});
	}
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"author":{"id":"' + commenterIP + '","name":"' + sanitizedName + '","email":"' + sanitizedEmail + '","avatar":"' + avatar + '"},"content":"' + sanitizedComment + '"}'
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

async function validateCloudflare(secretKey, token) {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"secret":"' + secretKey + '","response":"' + token + '"}'
	};
	let response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', options);
	response = await response.json();
	return response.success;
}

function sanitize(value) {
	value = value.replace(/<[^>]+>/g, ''); // Strip all html tags
	value = value.replace(/["]/g, '\\$&').replace(/\n/g, '\\n'); // Escape all "" and spaces
	return DOMPurify.sanitize(value); // Run it thru DOMPurify just to be sure
}
