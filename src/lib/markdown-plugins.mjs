import hljs from 'highlight.js';

const clipboardIcon =
	'<svg style="pointer-events:none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg>';

const copyButton = `<button class="copybutton absolute top-4 right-4 fill-gray-400 w-3.5 copy-button hidden plausible-event-name=Code+Copied">${clipboardIcon}</button>`;

const escapeAttribute = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export const postContentPlugin = {
	name: 'post-content',
	element: [
		{
			filter: ['pre'],
			visit(pre, ctx) {
				const code = pre.children.find((child) => child.type === 'element' && child.tagName === 'code');
				if (!code || code.type !== 'element') return;
				const classNames = Array.isArray(code.properties?.className) ? code.properties.className : [];
				const languageClass = classNames.find((className) => typeof className === 'string' && className.startsWith('language-'));
				const lang = typeof languageClass === 'string' ? languageClass.slice('language-'.length) : '';
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				const highlighted = hljs.highlight(ctx.textContent(code), { language }).value;
				const codeClass = lang ? ` class="hljs language-${escapeAttribute(lang)}"` : '';
				return { type: 'raw', value: `<pre class="relative"><code${codeClass}>${highlighted}</code>${copyButton}</pre>` };
			}
		},
		{
			filter: ['a'],
			visit(link, ctx) {
				ctx.setProperty(link, 'target', '_blank');
				ctx.setProperty(link, 'rel', 'noopener');
			}
		}
	]
};
