import { API, CLOUDFLARE_SECRET_KEY } from '../../config';
export async function post({ request }) {
	const data = await request.json();
	let postID = data.postID;
	let commentID = data.commentID;
	if (isNaN(commentID) || isNaN(postID)) {
		// Return early if post/commend id isnt number
		return new Response('{"response": "Reported....Probably!"}', {
			status: 200
		});
	}
	if (!(await validateCloudflare(CLOUDFLARE_SECRET_KEY, data.cloudflaretoken))) {
		return new Response('{"response": "Reported....Probably!"}', {
			status: 200
		});
	}

	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"reason":"OTHER","content":"Reported"}'
	};
	fetch(API + '/api/comments/api::post.post:' + postID + '/comment/' + commentID + '/report-abuse', options);
	return new Response('{"response": "Reported....Probably!"}', {
		status: 200
	});
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
