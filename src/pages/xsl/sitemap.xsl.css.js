import { API } from '../../config';
export async function get() {
    const response = await fetch(API + '/sitemap/xsl/sitemap.xsl.css');
    const buffer = Buffer.from(await response.arrayBuffer());
    return new Response(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'text/css; charset=utf-8',
            'Cache-Control': 'max-age=15552000'
        }
    });
}
