const ascii = ['૮⸝⸝> ̫ <⸝⸝ ა', '(,,>﹏<,,)', '(>᎑<๑)/♡', '(つ≧﹏≦)', '૮₍˶ •. • ⑅₎ა ♡', '૮( ๑ᵔ ᵕ ᵔ๑ )ა', '≧﹏≦', '(✿˵•́ᴗ•̀˵)', '(ꈍ◡ꈍ🌸)', '(•◡•🌸)♡'];

export default async function comment(nameElement: HTMLInputElement, emailElement: HTMLInputElement, commentElement: HTMLInputElement, fieldsRequired: HTMLInputElement, sendButton: HTMLButtonElement, isReply: boolean = false, threadID: string = ''): Promise<void> {
	const id = document.querySelector('body').dataset.post_id;
	const name = nameElement.value.replace(/\\/g, '\\\\').replace(/["]/g, '\\$&').replace(/\n/g, '\\n'); // Escape all "" and line breaks and \
	const email = emailElement.value.replace(/\\/g, '\\\\').replace(/["]/g, '\\$&').replace(/\n/g, '\\n'); // Escape all "" and line breaks and \
	const comment = commentElement.value.replace(/\\/g, '\\\\').replace(/["]/g, '\\$&').replace(/\n/g, '\\n'); // Escape all "" and line breaks and \

	// Return early if any of the fields are empty
	if (fieldsEmpty(name, email, comment)) {
		fieldsRequired.style.opacity = '100';
		sendButton.innerText = ascii[Math.floor(Math.random() * ascii.length)];
		return;
	}
	fieldsRequired.style.opacity = '0'; // Remove the empty field error message in case its showing
	sendButton.innerText = '';
	sendButton.classList.add('loading');

	const cloudflareToken = await cloudflareChallenge(); // Start Cloudflare Challenge
	// Dont go any forward in case it failed
	if (cloudflareToken == 'undefined') {
		sendButton.classList.remove('loading');
		bot(sendButton);
		setTimeout(() => {
			sendButton.innerText = 'SEND';
			sendButton.disabled = false;
		}, 10000);
		return;
	}

	let status: number;
	if (isReply) {
		status = await sendReply(id, name, email, comment, threadID, cloudflareToken);
	} else {
		status = await sendComment(id, name, email, comment, cloudflareToken);
	}

	sendButton.classList.remove('loading');
	switch (status) {
		case 200:
			success(nameElement, emailElement, commentElement, sendButton);
			break;

		case 401:
			bot(sendButton);
			break;

		default:
			failed(sendButton);
			break;
	}
	setTimeout(() => {
		sendButton.innerText = 'SEND';
		sendButton.disabled = false;
	}, 10000);
}

export async function cloudflareChallenge(): Promise<string> {
	const sitekey = document.querySelector<HTMLElement>('#cf-turnstile').dataset.cloudflare_public_key;
	return new Promise((resolve) => {
		//@ts-ignore
		turnstile.render('#cf-turnstile', {
			sitekey: sitekey,
			retry: 'never',
			'refresh-expired': 'never',
			callback: function (token: string) {
				resolve(token);
			},
			'timeout-callback': function () {
				resolve('undefined');
			},
			'expired-callback': function () {
				resolve('undefined');
			},
			'error-callback': function () {
				resolve('undefined');
			}
		});
	});
}

async function sendComment(id: string, name: string, email: string, comment: string, cloudflareToken: string): Promise<number> {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"post_id":"' + id + '","name":"' + name + '","email":"' + email + '","comment":"' + comment + '","cloudflaretoken":"' + cloudflareToken + '"}'
	};
	try {
		const response = await window.fetch('/blog/comment', options);
		const status = response.status;
		return status;
	} catch {
		return 400;
	}
}

async function sendReply(id: string, name: string, email: string, comment: string, threadID: string, cloudflareToken: string): Promise<number> {
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: '{"post_id":"' + id + '","name":"' + name + '","email":"' + email + '","comment":"' + comment + '","threadOf":"' + threadID + '","cloudflaretoken":"' + cloudflareToken + '"}'
	};
	try {
		const response = await window.fetch('/blog/comment', options);
		const status = response.status;
		return status;
	} catch {
		return 400;
	}
}

function success(nameElement: HTMLInputElement, emailElement: HTMLInputElement, commentElement: HTMLInputElement, sendButton: HTMLButtonElement): void {
	[nameElement.value, emailElement.value, commentElement.value] = ['', '', '']; // Clear all text fields
	sendButton.classList.remove('disabled:text-rose-800', 'disabled:hover:text-rose-800');
	sendButton.classList.add('disabled:text-green-800', 'disabled:hover:text-green-800');
	sendButton.innerText = 'Posted!';
	sendButton.disabled = true;
	sendButton.dispatchEvent(new Event('updateComments'));
}

function failed(sendButton: HTMLButtonElement): void {
	sendButton.classList.remove('disabled:text-green-800', 'disabled:hover:text-green-800');
	sendButton.classList.add('shake-little', 'shake-constant', 'disabled:text-rose-800', 'disabled:hover:text-rose-800');
	sendButton.innerText = 'Failed!';
	sendButton.disabled = true;
	setTimeout(() => {
		sendButton.classList.remove('shake-little', 'shake-constant');
	}, 400);
}

function bot(sendButton: HTMLButtonElement): void {
	sendButton.classList.add('shake-little', 'shake-constant');
	sendButton.innerHTML =
		'<svg class="w-8 fill-rose-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M320 0c17.7 0 32 14.3 32 32V96H480c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H160c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256c0-22.1-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40s40-17.9 40-40zm152 40c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z"/></svg>';
	sendButton.disabled = true;
	setTimeout(() => {
		sendButton.classList.remove('shake-little', 'shake-constant');
	}, 400);
}

function fieldsEmpty(name: string, email: string, comment: string): boolean {
	if (name === '' || email === '' || comment === '') {
		return true;
	}
	return false;
}
