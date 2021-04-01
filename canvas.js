const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

let mouse = {
	x: null,
	y: null,
	radius: (canvas.height / 80) * (canvas.height / 80)
};

class Particle {
	constructor(x, y, directionX, directionY, size, color) {
		this.x = x;
		this.y = y;
		this.directionX = directionX;
		this.directionY = directionY;
		this.size = size;
		this.color = color;
	}

	// draw(){
	//     // ctx.textBaseline = 'middle';
	//     // ctx.textAlign = 'center';
	//     // ctx.font=canvas.width/300+'em Tahoma'
	//     // ctx.fillStyle = "white";
	//     // ctx.fillText('Hello!',(canvas.width / 2) , (canvas.height / 4))
	//     // ctx.fillText('Junior Frontend Developer',(canvas.width / 2), (canvas.height / 1.8))
	//     // ctx.font=canvas.width/200+'em Tahoma'
	//     // ctx.fillText('I\'m Urszula Buczak',(canvas.width / 2) , (canvas.height / 2.5) )
	// }

	update() {
		if (this.x > canvas.width || this.x < 0) {
			this.directionX = -this.directionX;
		}
		if (this.y > canvas.height || this.y < 0) {
			this.directionY = -this.directionY;
		}

		let dx = mouse.x - this.x;
		let dy = mouse.y - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < mouse.radius + this.size) {
			if (mouse.x < this.x && this.x < canvas.width - this.size * 5) {
				this.x += 5;
			}
			if (mouse.x > this.x && this.x > this.size * 5) {
				this.x -= 5;
			}
			if (mouse.y < this.y && this.y < canvas.height - this.size * 5) {
				this.y += 5;
			}
			if (mouse.y > this.y && this.y > this.size * 5) {
				this.y -= 5;
			}
		}
		this.x += this.directionX;
		this.y += this.directionY;
		// this.draw();
	}
}

function init() {
	particlesArray = [];
	let numberOfParticles = (canvas.height * canvas.width) / 9000;

	for (let i = 0; i < numberOfParticles; i++) {
		let size = Math.random() * 5 + 1;
		let x = Math.random() * (innerWidth - size * 2 - size * 2) + size * 2;
		let y = Math.random() * (innerHeight - size * 2 - size * 2) + size * 2;
		let directionX = Math.random() * 1.5 - 0.75;
		let directionY = Math.random() * 1.5 - 0.75;
		let color = 'rgba(192,192,192,0.5)';
		particlesArray.push(
			new Particle(x, y, directionX, directionY, size, color)
		);
	}
}

function connect() {
	let opacityValue = 1;
	for (let a = 0; a < particlesArray.length; a++) {
		for (let b = a; b < particlesArray.length; b++) {
			let distance =
				(particlesArray[a].x - particlesArray[b].x) *
					(particlesArray[a].x - particlesArray[b].x) +
				(particlesArray[a].y - particlesArray[b].y) *
					(particlesArray[a].y - particlesArray[b].y);
			if (distance < (canvas.width / 7) * (canvas.height / 7)) {
				opacityValue = 0.5 - distance / 20000;
				ctx.strokeStyle = 'rgba(192,192,192,' + opacityValue + ')';
				ctx.lineWidth = 1;
				ctx.beginPath();
				ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
				ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
				ctx.stroke();
			}
		}
	}
}

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, innerWidth, innerHeight);

	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
	}
	connect();
}

window.addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	mouse.radius = (canvas.height / 80) * (canvas.height / 80);
	init();
});
window.addEventListener('mousemove', function (event) {
	mouse.x = event.x;
	mouse.y = event.y;
});
window.addEventListener('mouseout', function () {
	mouse.x = undefined;
	mouse.x = undefined;
});

init();
animate();

// const config = {
// 	type: 'carousel',
// 	startAt: 0,
// 	perView: 3,
// 	breakpoints: {
// 		1024: {
// 			perView: 2
// 		},
// 		600: {
// 			perView: 1
// 		}
// 	},
// 	// startAt:0,
// 	focusAt: 'center',
// 	gap: 50
// };
// new Glide('.glide', config).mount();

// const nodeArray = [
// 	document.querySelector('.about'),
// 	document.querySelector('.skills'),
// 	document.querySelector('.projects')
// 	// document.querySelector('.projects .project')
// 	// document.querySelector('.weather'),
// 	// document.querySelector('.reservation'),
// 	// document.querySelector('.contact')
// ];
// const projectArray = [...document.querySelectorAll('.project')];
// console.log(projectArray);
// ScrollReveal().reveal(nodeArray, {
// 	delay: 200,
// 	// origin: 'right',
// 	duration: 500,
// 	// distance: '60px',
// 	// origin: 'right',
// 	// viewOffset: {
// 	// 	top: 60
// 	// },
// 	// rotate: { x: 10, y: 50, z: 0 },
// 	reset: true
// });
// ScrollReveal().reveal(projectArray, {
// 	delay: 200,
// 	duration: 1000,
// 	// origin: projectArray.length ? 'right' : 'left',
// 	distance: '100px',
// 	reset: true
// });
// for (let i = 0; i < projectArray.length; i++) {
// 	if (i % 2 === 0)
// 		ScrollReveal().reveal(projectArray[i], {
// 			origin: 'left'
// 		});
// 	else
// 		ScrollReveal().reveal(projectArray[i], {
// 			origin: 'right'
// 		});
// }
// window.addEventListener('scroll',)
