
let checkName = () => {
	let name = localStorage.getItem('name');
	if(!name) {
		return 'guest';
	} else {
		return name;
	}
}
let getRoomId = (buttons) => {
	for ( let i = 0; i < buttons.length; i++ ) {
		buttons[ i ].addEventListener( 'click', event => {
			event.preventDefault();
			return buttons[i].id;
		} )
	}
}
let getMessages = (obj,obj1) => {
	obj.getChats((data) => {
		obj1.templateUI(data);
	})
}
let deleteMessages = (obj,obj1) => {
	obj.getChats(data => {
		obj1.msgDelete(data);
	})
}
let getFilterMessages = (obj,obj1) => {
	obj.getFilterChats(data => {
		obj1.templateUI(data);
	})
}
let loadChat = () => {
	document.getElementById('general').click();
}
export { getMessages, getRoomId , checkName, loadChat,deleteMessages, getFilterMessages};