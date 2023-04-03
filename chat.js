class ITPChat {
	text 	= 'Общайся в Telegram чате';
	link 	= 'https://t.me/+fuPRWiRj6Ho0Zjgy';
	name 	= 'IT-Princess (ITP)';
	lang 	= 'ru';
	host 	= '';
	data 	= {e: '', l: ''};
	uid 	= '';
	style 	= false;
	style_block = 'display:block;margin-bottom:10px;padding:12px 15px;font-size:.9rem;border-radius:10px;overflow:hidden;width:100%;background:linear-gradient(to right, #797EF9, #949BFC);color:#fff;';
	style_link = 'color: #fff;text-decoration:underline;';
	html_block = '<div class="{uid}">{text} {host} &mdash; {link}</div>';
	html_link = '<a href="{link}" target="_blank" rel="external nofollow noopener noreferrer"><b>{name}</b></a>';

	constructor() {
		this.uid 	= this.genID() + 'itp' + this.genID();
		this.host 	= window.location.hostname;
		this.data 	= Object.assign({}, this.data, this.getData());
		if( this.data.l && this.data.l !== this.lang ) {
			this.data.e = false;
		}
	}

	addBlock(cls) {
		let el = cls ? (document.getElementsByClassName(cls)[0] || false) : false;
		if( !el ) return;
		this.addStyle();
		el.insertAdjacentHTML(
			'beforebegin', 
			this.codeBlock()
		);
	}

	addStyle() {
		if( this.style ) return;
		this.style = document.createElement('style');
		this.style.innerHTML = '.' + this.uid + '{' + this.style_block + '}';
		this.style.innerHTML += '.' + this.uid + ' > a {' + this.style_link + '}';
		document.head.append(this.style);
	}

	getData() {
		return document.currentScript.src
			.split('?')[1]
			.split('&')
			.reduce(function(p,e){
				var a = e.split('=');
				p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
				return p;
			}, {});
	}

	genID() {
		let abc = "abcdefghijklmnopqrstuvwxyz";
		return abc[Math.floor(Math.random() * abc.length)] + abc[Math.floor(Math.random() * abc.length)] + abc[Math.floor(Math.random() * abc.length)] + ( (Math.random() + 2).toString(26).substring(10) );
	}

	genTPL(template, data) {
		for (let row of data.entries()) {
			template = template.replace('{'+row[0]+'}', row[1]);
		}
		return template;
	}

	codeBlock() {
		return this.genTPL( 
			this.html_block, 
			new Map([
				['uid', this.uid],
				['text', this.text],
				['host', this.host],
				['link', this.codeLink()]
			])
		);
	}

	codeLink() {
		return this.genTPL( 
			this.html_link, 
			new Map([
				['link', this.link],
				['name', this.name]
			])
		);
	}
}

let itp_chat = new ITPChat();
document.addEventListener("DOMContentLoaded", function() {
	itp_chat.addBlock( itp_chat.data.e );
	itp_chat = null;
});
