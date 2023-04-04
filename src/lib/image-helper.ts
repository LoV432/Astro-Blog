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
		src: image,
		width: width,
		height: height
	};
}
