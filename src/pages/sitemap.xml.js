import { API } from '../config';
export async function get() {
    const response = await fetch(API + '/sitemap/index.xml');
    const buffer = Buffer.from(await response.arrayBuffer());
    return new Response(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
        }
    });
}
