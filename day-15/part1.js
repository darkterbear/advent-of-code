const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	15,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	d = require('fs').readFileSync('./test', 'utf8')

	let units = []

	let map = d.split('\n').map((l, y) => {
		let chars = [...l]

		chars.forEach((u, x) => {
			if (u === 'G' || u === 'E') {
				units.push({ type: u, x, y, hp: 200 })
			}
		})

		return chars
	})

	let rounds = 0
	while (true) {
		// round

		// sort units by reading order
		units.sort((a, b) => {
			return a.y === b.y ? a.x - b.x : a.y - b.y
		})

		// each unit takes turns
		for (let i = 0; i < units.length; i++) {
			// unit i's turn

			// identify possible targets
			let targets = []
			for (let j = 0; j < units.length; j++) {
				if (j === i) continue

				if (units[j].type !== units[i].type) targets.push(j)
			}

			// end condition
			if (targets.length < 1) {
				let outcome = rounds * units.reduce((a, c) => a + c.hp, 0)
				console.log(rounds)
				console.log(units.reduce((a, c) => a + c.hp, 0))
				console.log(outcome)
				console.log(units)
				return
			}

			// identify squares in range
			let inRange = []
			for (target of targets) {
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (Math.abs(dy) === Math.abs(dx)) continue

						if (
							map[units[target].y + dy][units[target].x + dx] === '.' ||
							(units[target].y + dy === units[i].y &&
								units[target].x + dx === units[i].x)
						) {
							inRange.push({
								target,
								x: units[target].x + dx,
								y: units[target].y + dy
							})
						}
					}
				}
			}

			// no squares in range, end turn
			if (inRange.length < 1) {
				continue
			}

			const isInRange = () => {
				return inRange.reduce(
					(a, c) => a || (c.x === units[i].x && c.y === units[i].y),
					false
				)
			}

			if (!isInRange()) {
				// not in range, move
				const contains = (search, elem) => {
					return search.reduce(
						(a, c) => a || (elem.x === c.x && elem.y === c.y),
						false
					)
				}

				const findNearest = (search, x, y, u) => {
					let reached = [[{ x, y }]]
					while (reached[reached.length - 1].length > 0) {
						let last = reached[reached.length - 1]
						reached.push([])
						let newReached = reached[reached.length - 1]

						let hasReached = false
						for (let index = 0; index < last.length; index++) {
							let lastReached = last[index]
							for (let dy = -1; dy <= 1; dy++) {
								for (let dx = -1; dx <= 1; dx++) {
									if (Math.abs(dy) === Math.abs(dx)) continue

									let test = {
										x: lastReached.x + dx,
										y: lastReached.y + dy,
										last: index
									}

									if (u[test.y][test.x] !== '.') continue
									if (contains(newReached, test)) continue
									if (reached.reduce((a, c) => a || contains(c, test), false))
										continue

									// test if this is one of the squares that we're looking for
									if (
										contains(
											search.map(s => {
												return { x: s.x, y: s.y }
											}),
											test
										)
									) {
										hasReached = true
										test.reached = true
										newReached.push(test)
										// console.log(reached)
										// newReached.sort((a, b) => {
										// 	return a.y === b.y ? a.x - b.x : a.y - b.y
										// })
										// return reached
										continue
									}

									newReached.push(test)
								}
							}
						}

						// sort reading order
						newReached.sort((a, b) => {
							if (a.y === b.y) {
								return a.x - b.x
							} else return a.y - b.y
						})

						if (hasReached) return reached
					}
				}

				let path = findNearest(inRange, units[i].x, units[i].y, map)

				if (!path) continue

				// make the move towards nearest

				// the nearest reached squares are reading-order, find the first reached square that is in reading order
				let initialIndex = 0
				for (; initialIndex < path[path.length - 1].length; initialIndex++) {
					if (path[path.length - 1][initialIndex].reached) break
				}

				// propogate backwards along the path
				let current = path[path.length - 1][initialIndex]
				for (let index = path.length - 2; index > 0; index--) {
					current = path[index][current.last]
				}

				// move the unit and modify the map
				map[units[i].y][units[i].x] = '.'

				units[i].x = current.x
				units[i].y = current.y

				map[units[i].y][units[i].x] = units[i].type
			}

			if (!isInRange()) {
				// still not not in range, end turn
				continue
			} else {
				// in range

				// find adjacent targets
				let targets = []

				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (Math.abs(dy) === Math.abs(dx)) continue

						if (
							map[units[i].y + dy][units[i].x + dx] ===
							(units[i].type === 'G' ? 'E' : 'G')
						) {
							targets.push(
								units.filter(
									u => u.x === units[i].x + dx && u.y === units[i].y + dy
								)[0]
							)
						}
					}
				}

				// sort targets via hp, then reading order
				targets.sort((a, b) => {
					if (a.hp !== b.hp) {
						return a.hp - b.hp
					} else if (a.y !== b.y) {
						return a.y - b.y
					} else return a.x - b.x
				})

				// attack the first target
				targets[0].hp -= 3
				if (targets[0].hp <= 0) {
					let index = 0
					for (; index < units.length; index++) {
						if (
							targets[0].x === units[index].x &&
							targets[0].y === units[index].y
						) {
							break
						}
					}
					map[targets[0].y][targets[0].x] = '.'
					units.splice(index, 1)

					// if the unit that dies comes before index, compensate for loop
					if (index < i) i--
				}
			}
		}
		// map.forEach(r => {
		// 	console.log(r.reduce((a, c) => a + c, ''))
		// })
		rounds++
	}
})
