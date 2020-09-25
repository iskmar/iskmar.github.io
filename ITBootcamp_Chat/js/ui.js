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

		d = String(d).padStart(2,"0");
		m = String(m).padStart(2,"0");
		h = String(h).padStart(2,"0");
		min = String(min).padStart(2, "0");

		let strDate = d + "." + m + "." + y + ". - " + h + ":" + min;
		let strTime = h + ":" + min;

		return [strDate,strTime];
	}
	templateUI(obj) {
		// let img = `<div><img src="../images/iconfinder_user-alt_285645%20(1).png" alt=""></div>`;
		let now = new Date();
		let objData = obj.data();
		let objId = obj.id;
		let message = objData.message;
		let username = objData.username;
		let date = objData.created_at.toDate();
		// console.log(objData.created_at);
		function toDateTime(sec) {
			var t = new Date(1970, 0, 1); // Epoch
			t.setSeconds(sec);
			return t;
		}
		console.log(toDateTime(objData.created_at));
		let strDate = this.formatDate( date )[ 0 ];
		let strTime = this.formatDate( date )[ 1 ];
		let localName = localStorage.getItem( 'name' );
		let div = document.createElement('div');
		let span = document.createElement('span');
		let span1 = document.createElement('span')
		let p = document.createElement('button');
		let div1 = document.createElement('div');

		div.setAttribute('data-id', objId);
		div.classList.add('msg_hover');
		span.setAttribute('display', 'inline-block');
		span1.setAttribute('display','inline-block');
		p.classList.add('btnDelete');
		p.setAttribute('data-id', objId);
		p.style.marginLeft = '10px';
		p.style.width = '20px';
		p.style.borderRadius = '5px';
		p.style.backgroundColor = '#4a154b';
		p.style.color = 'white';

		if ( now.getDate() > date.getDate() ) {
			if ( username === localName ) {
				div.classList.add('user_msg')
				span1.innerHTML = `${strDate}`;
				p.classList.add('delete');

			}
		} else {
			if ( username === localName ) {
				div.classList.add('user_msg');
			}

		}
		p.innerHTML = 'X';
		span1.innerHTML = `${strTime}`;
		span.innerHTML = `${username} - `;
		div1.innerHTML = `${message}`;
		div.appendChild(span);
		div.appendChild(span1);
		div.appendChild(p);
		div.appendChild(div1)
		this.chat.appendChild(div);
	}

	msgDelete(obj) {
		this.chat.addEventListener('click', event => {
			let id = event.target.parentElement.getAttribute('data-id');
			console.log(id);
			if(localStorage.getItem('name') === obj.username){
				if(event.target.tagName === "BUTTON") {
					let id = event.target.parentElement.getAttribute('data-id');
					let answer = confirm('Da li zelite da obrisete poruku?');
					if(answer) {
						db.collection( 'chats' ).doc( id )
							.delete()
							.then( () => {
							} );
					}
				}
			} else {
				if(event.target.tagName === "BUTTON") {
					let id = event.target.parentElement.getAttribute('data-id');
					let answer = confirm('Da li zelite da obrisete poruku?');
					if(answer) {
						id.remove();
					}

				}
			}

		});

	}
}