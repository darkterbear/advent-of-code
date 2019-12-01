const fs = require('fs')

let d = fs.readFileSync('input', 'utf8')

let constellations = d.split('\n').map(l => [l.split(',').map(Number)])

let md = (p1, p2) => {
	return (
		Math.abs(p1[0] - p2[0]) +
		Math.abs(p1[1] - p2[1]) +
		Math.abs(p1[2] - p2[2]) +
		Math.abs(p1[3] - p2[3])
	)
}

let areCloseEnough = (const1, const2) => {
	for (let point1 of const1) {
		for (let point2 of const2) {
			if (md(point1, point2) <= 3) {
				return true
			}
		}
	}
	return false
}

let last = -1
while (true) {
	// go through each constellation
	for (let i = 0; i < constellations.length; i++) {
		for (let j = i + 1; j < constellations.length; j++) {
			// see if we can join constellations i and j together
			if (areCloseEnough(constellations[i], constellations[j])) {
				constellations[i] = constellations[i].concat(
					constellations.splice(j, 1)[0]
				)
				j--
			}
		}
	}
	if (constellations.length === last) break
	last = constellations.length
}

console.log(constellations.length)
// console.log(constellations)
