const msg = 'TypeScript';

function say(msg: string) {
	return 'hello, ' + msg;
}

document.body.textContent = say(msg);
