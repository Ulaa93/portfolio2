const btnRead = document.querySelector('.read-portfolio');
const menu = document.querySelector('.menu');
const btnMenu = document.querySelector('.menu-btn');
const aboutSect = document.querySelector('.about');
const nodeArray = [
	document.querySelector('.about'),
	document.querySelector('.skills'),
	document.querySelector('.projects')
];
const projectArray = [...document.querySelectorAll('.project')];
const config = {
	type: 'carousel',
	startAt: 0,
	perView: 3,
	breakpoints: {
		1024: {
			perView: 2
		},
		600: {
			perView: 1
		}
	},
	focusAt: 'center',
	gap: 50
};

new Glide('.glide', config).mount();

ScrollReveal().reveal(nodeArray, {
	delay: 200,
	duration: 500,
	reset: true
});
ScrollReveal().reveal(projectArray, {
	delay: 200,
	duration: 1000,
	distance: '100px',
	reset: true
});

for (let i = 0; i < projectArray.length; i++) {
	if (i % 2 === 0)
		ScrollReveal().reveal(projectArray[i], {
			origin: 'left'
		});
	else
		ScrollReveal().reveal(projectArray[i], {
			origin: 'right'
		});
}

function toggleMenu() {
	menu.classList.toggle('active');
	btnMenu.classList.toggle('fa-bars');
	btnMenu.classList.toggle('fa-times');
}

btnMenu.addEventListener('click', toggleMenu);

menu.addEventListener('click', toggleMenu);

btnRead.addEventListener('click', () => {
	aboutSect.scrollIntoView({ behavior: 'smooth' });
});
