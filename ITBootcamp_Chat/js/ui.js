export class ChatUI {
	constructor (list) {
		this.chat = list;
	}

	set chat(c) {
		this._chat = c;
	}
	get chat() {
		return this._chat;
	}
	formatDate(date){
		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();
		let h = date.getHours();
		let min = date.getMinutes();

		//Dodavanje 0 ispred jednocifrenih vrednosti
		d = String(d).padStart(2,"0");
		m = String(m).padStart(2,"0");
		h = String(h).padStart(2,"0");
		min = String(min).padStart(2, "0");

		let strDate = d + "." + m + "." + y + ". - " + h + ":" + min;
		let strTime = h + ":" + min;

		return [strDate,strTime];
	}
	templateUI(obj) {
		let img = `<div><img src="../images/iconfinder_user-alt_285645%20(1).png" alt=""></div>`;
		let now = new Date();
		let message = obj.message;
		let username = obj.username;
		let date = obj.created_at.toDate();
		let strDate = this.formatDate(date)[0];
		let strTime = this.formatDate(date)[1];
		if(now.getDate() > date.getDate()) {
			let chat = `<div class="msg_hover">
						<span class="username">${username}</span>
						<span class="time">${strDate}</span>
						<div class="message">${message}</div>
						</div>`;
			this.chat.innerHTML += chat;
		} else {
			let chat = `<div class="msg_hover">
						<span class="username">${username} - </span>
						<span class="time">${strTime}</span>
						<div class="message">${message}</div>
						</div>`;
			this.chat.innerHTML += chat;
		}

		window.addEventListener('load', (event) => {
			event.preventDefault();
			console.log('page is fully loaded');
		});
	}
}