const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	13,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	let lines = d.split('\n')

	let map = Array.from({ length: lines[0].length }, () => {
		return Array.from({ length: lines.length }, () => null)
	})

	let carts = []

	lines.forEach((l, y) => {
		;[...l].forEach((c, x) => {
			switch (c) {
				case '>':
					map[x][y] === '-'
					carts.push({
						d: 'r',
						x: x,
						y: y,
						n: 'l'
					})
					break
				case '<':
					map[x][y] === '-'
					carts.push({
						d: 'l',
						x: x,
						y: y,
						n: 'l'
					})
					break
				case '^':
					map[x][y] === '|'
					carts.push({
						d: 'u',
						x: x,
						y: y,
						n: 'l'
					})
					break
				case 'v':
					map[x][y] === '-'
					carts.push({
						d: 'd',
						x: x,
						y: y,
						n: 'l'
					})
					break
				default:
					map[x][y] = c
			}
		})
	})

	for (let tick = 0; ; tick++) {
		carts.sort((a, b) => {
			if (a.y !== b.y) {
				return a.y - b.y
			} else {
				a.x - b.x
			}
		})
		// move
		for (let i = 0; i < carts.length; i++) {
			const c = carts[i]

			switch (c.d) {
				case 'u':
					c.y--
					break
				case 'd':
					c.y++
					break
				case 'r':
					c.x++
					break
				case 'l':
					c.x--
					break
			}

			// set new direction
			const newLoc = map[c.x][c.y]
			if (newLoc === '/') {
				switch (c.d) {
					case 'u':
						c.d = 'r'
						break
					case 'd':
						c.d = 'l'
						break
					case 'r':
						c.d = 'u'
						break
					case 'l':
						c.d = 'd'
						break
				}
			} else if (newLoc === '\\') {
				switch (c.d) {
					case 'u':
						c.d = 'l'
						break
					case 'd':
						c.d = 'r'
						break
					case 'r':
						c.d = 'd'
						break
					case 'l':
						c.d = 'u'
						break
				}
			} else if (newLoc === '+') {
				if (c.n === 'l') {
					switch (c.d) {
						case 'u':
							c.d = 'l'
							break
						case 'd':
							c.d = 'r'
							break
						case 'r':
							c.d = 'u'
							break
						case 'l':
							c.d = 'd'
							break
					}
				} else if (c.n === 'r') {
					switch (c.d) {
						case 'u':
							c.d = 'r'
							break
						case 'd':
							c.d = 'l'
							break
						case 'r':
							c.d = 'd'
							break
						case 'l':
							c.d = 'u'
							break
					}
				}
				c.n = (() => {
					switch (c.n) {
						case 'l':
							return 's'
						case 's':
							return 'r'
						case 'r':
							return 'l'
					}
				})()
			}

			for (let j = 0; j < carts.length; j++) {
				if (i === j) continue
				const c2 = carts[j]

				if (c.x === c2.x && c.y === c2.y) {
					// collided
					console.log(c.x, c.y)
					return
				}
			}
		}
	}
})
