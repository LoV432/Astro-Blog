import { API } from '../../config';
export async function get({ params }) {
	const imageSrc = params.image; // ['imagename.png]
	const response = await fetch(API + '/uploads/' + imageSrc);
	if (response.headers.get('Content-Type').split('/')[0] == 'image') {
		const buffer = Buffer.from(await response.arrayBuffer());
		let imageType = imageSrc.split('.'); // ['imagename', 'png']
		imageType = imageType[imageType.length - 1]; // 'png'
		return new Response(buffer, {
			status: 200,
			headers: {
				'Content-Type': 'image/' + imageType,
				'Cache-Control': 'max-age=15552000'
			}
		});
	} else {
		return new Response(null, {
			status: 403
		});
	}
}
