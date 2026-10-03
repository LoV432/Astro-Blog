import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

const widths = { thumbnail: 245, small: 500 };

export type CoverSize = keyof typeof widths | 'original';

export default function imageHelper(image: ImageMetadata, size: CoverSize) {
	const width = size === 'original' ? image.width : Math.min(widths[size], image.width);
	return getImage({ src: image, width, format: 'webp' });
}
