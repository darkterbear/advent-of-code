const fs = require('fs')
let d = fs.readFileSync('./input', 'utf8')

d = d.substring(1, d.length - 1)

let maxDistance = 0
let start = {
	distance: 0
}

let current = [start]

const traverse = p => {
	let chars = [...p]

	for (c of chars) {
		if (c === '(') {
			current.splice(0, 0, current[0])
		} else if (c === ')') {
			current.splice(0, 1)
		} else if (c === '|') {
			if (current.length > 0) {
				current[0] = current[1]
			} else current[0] = start
		} else {
			if (!current[0][c]) {
				let newNode = {
					distance: current[0].distance + 1
				}
				let opposite = (c => {
					switch (c) {
						case 'N':
							return 'S'
						case 'E':
							return 'W'
						case 'S':
							return 'N'
						case 'W':
							return 'E'
					}
				})(c)
				newNode[opposite] = current[0]
				current[0][c] = newNode
				current[0] = newNode
			}
		}
		if (current[0].distance > maxDistance) maxDistance = current[0].distance
	}
}

traverse(d)
console.log(maxDistance)
