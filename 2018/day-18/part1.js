// let d = require('fs').readFileSync('./test', 'utf8')
let d = require('fs').readFileSync('./input', 'utf8')

let map = d.split('\n').map(l => {
	return l.split('').map(c => {
		switch (c) {
			case '.':
				return 0
			case '|':
				return 1
			case '#':
				return 2
		}
	})
})

let width = map[0].length
let height = map.length

// console.log(map)

const calcChanges = (x, y, map) => {
	let numTrees = 0
	let numLumber = 0
	for (let dy = -1; dy <= 1; dy++) {
		for (let dx = -1; dx <= 1; dx++) {
			if (dy === 0 && dx === 0) continue

			let tY = y + dy
			let tX = x + dx

			if (tY < 0 || tX < 0 || tY >= height || tX >= width) continue

			if (map[tY][tX] === 1) numTrees++
			if (map[tY][tX] === 2) numLumber++
		}
	}

	if (map[y][x] === 0 && numTrees >= 3) {
		return 1
	}

	if (map[y][x] === 1 && numLumber >= 3) {
		return 2
	}

	if (map[y][x] === 2) {
		if (numLumber >= 1 && numTrees >= 1) {
		} else {
			return 0
		}
	}
}

let seen

for (let i = 0; i < 1000000; i++) {
	let newMap = []

	for (let y = 0; y < map.length; y++) {
		newMap.push([])
		for (let x = 0; x < map[y].length; x++) {
			let c = calcChanges(x, y, map, newMap)
			// console.log(c)
			if (c !== undefined) newMap[y].push(c)
			else newMap[y].push(map[y][x])
		}
	}
	map = newMap

	let tree = 0
	let lumber = 0
	for (r of map) {
		for (c of r) {
			if (c === 1) tree++
			if (c === 2) lumber++
		}
	}

	console.log(tree * lumber)
}
