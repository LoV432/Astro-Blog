import { API } from '../../config';
export async function post({ request }) {
	const data = await request.json();
	let postID = data.postID.replace(/<[^>]+>/g, ''); // Strip all html tags
	let commentID = data.commentID.replace(/<[^>]+>/g, ''); // Strip all html tags
	if (isNaN(commentID) || isNaN(postID)) {
		// Return early if post/commend id isnt number
		return new Response('{"response": "Reported....Probably!"}', {
			status: 200
		});
	}
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"reason":"OTHER","content":"Reported"}'
	};
	fetch(API + '/api/comments/api::post.post:' + postID + '/comment/' + commentID + '/report-abuse', options)
		.then((response) => response.json())
		.then((response) => console.log(response))
		.catch((err) => console.error(err));
	return new Response('{"response": "Reported....Probably!"}', {
		status: 200
	});
}
