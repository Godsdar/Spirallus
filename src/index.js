import './style.scss';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const width = (canvas.width = document.body.clientWidth);
const height = (canvas.height = document.body.clientHeight);

class Vector {
	constructor(x, y) {
		this.x = x ?? 0;
		this.y = y ?? 0;
	}

	add(vec2) {
		this.x += vec2.x;
		this.y += vec2.y;
		return this;
	}

	sub(vec2) {
		this.x -= vec2.x;
		this.y -= vec2.y;
		return this;
	}

	mul(num) {
		this.x *= num;
		this.y *= num;
		return this;
	}

	div(num) {
		this.x /= num;
		this.y /= num;
		return this;
	}

	copy() {
		return new Vector(this.x, this.y);
	}

	toDecart(angle, radius) {
			return new Vector(
				radius * Math.cos(angle),
				radius * Math.sin(angle),
			);
		}

	toCoords() {
		const zeroX = width / 2;
		const zeroY = height / 2;

		return new Vector(zeroX - this.x, -(this.y - zeroY));
	}
}

class Eye {
	constructor (ctx, pos, size, color, path) {
		this.colors = ['red', 'orange', 'yellow', 'lightgreen', 'green', 'aqua', 'royalblue', 'blue', 'purple'];
		this.ctx = ctx;
		this.pos = pos;
		this.size = size;
		this.color = color;
		this.colorIndex = 0;
		this.path = path;
		this.index = 0;
		this. inc = true;
	}

	update () {
		if (this.colorIndex === this.colors.length) {
			this.colorIndex = 0;
		}
		if (this.index < this.path.length && this.inc) {
			this.color = this.colors[this.colorIndex];
			this.pos = this.path[this.index++];
		}
		else if (this.index === this.path.length) {
			this.inc = false;
			this.index--;
			this.pos = this.path[this.index];
			this.colorIndex++;
		}
		else if (this.index > 0 && !this.inc) {
			this.color = this.colors[this.colorIndex];
			this.pos = this.path[this.index--];
		}
		else if (!this.index) {
			this.inc = true;
			this.index++;
			this.pos = this.path[this.index];
			this.colorIndex++;
		}
	}

	draw () {
		this.ctx.fillStyle = this.color;
		this.ctx.beginPath();
		this.ctx.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI);
		this.ctx.fill();
	}
}

const createPattern = function (fn, step) {
	const pattern = [];
	let coords = new Vector(0, 0);

	for (let angle = 0; angle < 300; angle += step) {
		coords = coords.toDecart(angle, fn(angle)).toCoords();
		console.log(coords.x, coords.y);
		pattern.push(coords);
	}

	return pattern;
};

const createEyes = function (path, n) {
	const eyes = [];

	for (let i = 0; i < n; i++) {
		eyes.push(new Eye(ctx, new Vector(0, 0), 10, 'red', path));
	}

	return eyes;
};

const path = createPattern((angle) => angle, 1.6);
const eyes = createEyes(path, 30);

const move = function () {
	for (let eye of eyes) {
		eye.update();
	}

	for (let eye of eyes) {
		eye.draw();
	}

	requestAnimationFrame(move);
};

requestAnimationFrame(move);
