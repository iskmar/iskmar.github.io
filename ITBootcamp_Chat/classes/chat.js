export class Chatroom {
	constructor (room,username) {
		this.room = room;
		this.username = username;
		this.chats = db.collection('chats');
		this.unsub;
	}

	set room(r) {
		this._room = r;
	}
	set username (u) {
		this._username = u;
	}

	get room() {
		return this._room;
	}
	get username() {
		return this._username;
	}
	updateUsername(updateUsername) {
		if(updateUsername.length >= 2 && updateUsername.length <= 10) {
			this.username = updateUsername;
			localStorage.setItem('name', updateUsername.toLowerCase());
		} else {
			alert('Ime mora biti najmanje 2 karaktera a najvise 10!');
		}
	}
	updateRoom(updateRoom) {
		this.room = updateRoom;
		if(this.unsub) {
			this.unsub();
		}
	}
	async addChat(msg) {
		let chat = {
			message: msg,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(new Date())
		}
		let response = await this.chats.add(chat);
		return response;

	}
	async getChats ( cb ) {
			this.unsub = this.chats
				.where( 'room', '==', this.room )
				.orderBy( 'created_at', 'asc' )
				.onSnapshot( snapshot => {
					snapshot.docChanges().forEach( change => {
						let type = change.type;
						let doc = change.doc;
						if ( type === 'added' ) {
							// let obj = doc;
							cb( doc );

						}
					} )
				} )
	}

	async getFilterChats ( cb ) {
		let startDate = document.getElementById('start_date');
		let endDate = document.getElementById('end_date');
		this.unsub = this.chats
			.where( 'room', '==', this.room )
			.where('created_at', '>=', startDate.value)
			.where('created_at', '<=', endDate.value)
			.orderBy( 'created_at', 'asc' )
			.onSnapshot( snapshot => {
				snapshot.docChanges().forEach( change => {
					let type = change.type;
					let doc = change.doc;
					if ( type === 'added' ) {
						// let obj = doc;
						cb( doc );
						console.log(startDate.value);

					}
				} )
			} )
	}


}
