import { API_PUBLIC } from '../config';
export default function imageHelper(imageObject: any, size: string) {
	let image: string;
	let width: number;
	let height: number;
	if (Object.hasOwn(imageObject.formats, size)) {
		image = imageObject.formats[size].url;
		(width = imageObject.formats[size].width), (height = imageObject.formats[size].height);
	} else {
		image = imageObject.url;
		(width = imageObject.width), (height = imageObject.height);
	}
	return {
		src: API_PUBLIC + image,
		width: width,
		height: height
	};
}
