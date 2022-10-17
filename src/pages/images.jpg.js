import { API } from '../config';
export async function get({ request }) {
  const imageSrc = new URLSearchParams(request.url.split("?")[1]).get("src")
  const response = await fetch(API + imageSrc);
  const buffer = Buffer.from(await response.arrayBuffer());
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpg"
    }
  });
}