export async function get() {

    const options = {
        method: 'GET'
    };
    let response = await fetch('https://static.cloudflareinsights.com/beacon.min.js', options);
    const buffer = Buffer.from(await response.arrayBuffer());
    return new Response(buffer, {
        status: 200,
        headers: {
            'Content-Type': 'text/javascript;charset=UTF-8',
            'Cache-Control': 'max-age=86400'
        }
    });
}
