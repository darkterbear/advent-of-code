const lines = require('fs')
	.readFileSync('./input', 'utf8')
	.split('\n')

let unoverlapping = []
let overlapping = []

const checkOverlapping = (a, b) => {
	if (
		a.pos.x <= b.pos.x + b.dim.w - 1 &&
		a.pos.x + a.dim.w - 1 >= b.pos.x &&
		a.pos.y <= b.pos.y + b.dim.h - 1 &&
		a.pos.y + a.dim.h - 1 >= b.pos.y
	)
		return true

	return false
}

lines.forEach(claim => {
	let params = claim.split(' ')
	let id = params[0].substring(1)
	let pos = params[2]
		.substring(0, params[2].length - 1)
		.split(',')
		.map(Number)
	let dim = params[3].split('x').map(Number)

	// check if it overlaps the overlapping
	let isOverlapping = false
	for (let claim of overlapping) {
		if (
			checkOverlapping(claim, {
				id,
				pos: { x: pos[0], y: pos[1] },
				dim: { w: dim[0], h: dim[1] }
			})
		) {
			isOverlapping = true
		}
	}

	// check if it overlaps the unoverlapping
	let spliceUnoverlapping = []
	unoverlapping.forEach((claim, i) => {
		if (
			checkOverlapping(claim, {
				id,
				pos: { x: pos[0], y: pos[1] },
				dim: { w: dim[0], h: dim[1] }
			})
		) {
			isOverlapping = true
			spliceUnoverlapping.push(i)
		}
	})

	for (let i = spliceUnoverlapping.length - 1; i >= 0; i--) {
		overlapping.push(unoverlapping.splice(spliceUnoverlapping[i], 1)[0])
	}

	if (isOverlapping) {
		overlapping.push({
			id,
			pos: { x: pos[0], y: pos[1] },
			dim: { w: dim[0], h: dim[1] }
		})
	} else {
		unoverlapping.push({
			id,
			pos: { x: pos[0], y: pos[1] },
			dim: { w: dim[0], h: dim[1] }
		})
	}
})

console.log(unoverlapping[0])
