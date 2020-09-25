let navLink = document.getElementsByClassName('nav-list');
for ( let i = 0; i < navLink.length ; i++ ) {
	navLink[i].addEventListener('click', event => {
		event.preventDefault();
		for ( let j = 0; j < navLink.length ; j++ ) {
			navLink[j].classList.remove('active');
		}
		navLink[i].classList.add('active');
	})

}