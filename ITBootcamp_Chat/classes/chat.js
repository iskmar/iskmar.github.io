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
		this.username = updateUsername;
		localStorage.setItem('name', updateUsername);
	}
	updateRoom(updateRoom) {
		this.room = updateRoom;
		if(this.unsub) {
			this.unsub();
		}
	}
	async addChat(msg) {
		// let now = new Date();
		// let dateTimestamp = firebase.firestore.Timestamp.fromDate(now);
		// let strDate = this.formatDate(date);


		let chat = {
			message: msg,
			username: this.username,
			room: this.room,
			created_at: firebase.firestore.Timestamp.fromDate(new Date())
		}
		// await this.chats.doc().set(chat)
		// 	.then(() => {
		// 		console.log('Chat successfully added');
		// 	})
		// 	.catch(err => {
		// 		console.log('Could not add chat', err);
		// 	});
		// Koristiti
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
					let id = doc.id;
					if ( type === 'added' ) {
						// update chat with new message
						let obj = doc.data();
						cb( obj );

					}
				} )
			} )
	}


}
