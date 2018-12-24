const aocLoader = require('aoc-loader')
const fs = require('fs')

let sortUnits = units => {
	units.sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y))
}

let sortTargets = units => {
	units.sort((a, b) => {
		if (a.hp !== b.hp) {
			return a.hp - b.hp
		} else if (a.y !== b.y) {
			return a.y - b.y
		} else return a.x - b.x
	})
}

let logMap = map => {
	map.forEach(l => {
		console.log(l.reduce((a, c) => a + c, ''))
	})
}

let isInRange = (map, unit) => {
	let enemyType = unit.type === 'G' ? 'E' : 'G'
	return (
		map[unit.y - 1][unit.x] === enemyType ||
		map[unit.y + 1][unit.x] === enemyType ||
		map[unit.y][unit.x - 1] === enemyType ||
		map[unit.y][unit.x + 1] === enemyType
	)
}

let contains = (search, elem) => {
	for (point of search) {
		if (elem.x === point.x && elem.y === point.y) return point
	}
	return false
}

let findNearest = (search, unit, map) => {
	search = search.map(a => {
		return {
			x: a[1],
			y: a[0]
		}
	})
	let reached = [[{ x: unit.x, y: unit.y }]]

	// use bfs, add on layers
	while (reached[reached.length - 1].length > 0) {
		// last layer
		let last = reached[reached.length - 1]

		// init new layer
		let newReached = []
		reached.push(newReached)

		// add on a new layer by traversing 1 step from last layer, return if has reached
		let hasReached = false
		let matchedPoints = []

		// go through each of the points in the last layer
		for (let i = 0; i < last.length; i++) {
			let start = last[i]
			let prevReached = reached.slice(0, reached.length - 1)

			// test new points that are 1 step away from this point in the last layer
			let newPoints = [
				{
					x: start.x - 1,
					y: start.y
				},
				{
					x: start.x + 1,
					y: start.y
				},
				{
					x: start.x,
					y: start.y - 1
				},
				{
					x: start.x,
					y: start.y + 1
				}
			]

			for (newPoint of newPoints) {
				// point must be open space
				if (map[newPoint.y][newPoint.x] !== '.') continue

				// point must not have been previously visited
				let visited = false
				for (previousLayer of prevReached) {
					if (contains(previousLayer, newPoint)) {
						visited = true
						break
					}
				}

				if (visited) continue

				if (!contains(newReached, newPoint)) newReached.push(newPoint)
				if (contains(search, newPoint)) {
					hasReached = true

					if (!contains(matchedPoints, newPoint)) matchedPoints.push(newPoint)
				}
			}
		}

		if (hasReached)
			return {
				matchedPoints,
				steps: reached.length - 1
			}
	}
}

let solve = input => {
	// turn input into a 2d map
	let map = input.split('\n').map(line => [...line])

	// populate the units from the map
	let units = []
	for (y = 0; y < map.length; y++) {
		for (x = 0; x < map[y].length; x++) {
			if (map[y][x] === 'G' || map[y][x] === 'E') {
				units.push({
					type: map[y][x],
					x,
					y,
					hp: 200,
					ap: 3
				})
			}
		}
	}

	let fullRounds = 0
	// rounds
	while (true) {
		// sort by reading order
		sortUnits(units)
		// units take turns
		for (i = 0; i < units.length; i++) {
			let unit = units[i]

			// check if unit is already in range
			if (!isInRange(map, unit)) {
				// move
				let inRange = []
				for (let j = 0; j < units.length; j++) {
					if (i === j) continue
					if (units[j].type === unit.type) continue

					inRange.push([units[j].y - 1, units[j].x])
					inRange.push([units[j].y + 1, units[j].x])
					inRange.push([units[j].y, units[j].x - 1])
					inRange.push([units[j].y, units[j].x + 1])
				}

				if (inRange.length === 0) {
					console.log(fullRounds)
					return (
						fullRounds *
						units.reduce((a, c) => a + c.hp, 0) *
						(units[0].type === 'G' ? 1 : -1)
					)
				}

				inRange = inRange.filter(p => {
					return map[p[0]][p[1]] === '.'
				})

				// find the nearest point that is in range of another unit
				let res = findNearest(inRange, unit, map)
				if (!res) continue

				const { matchedPoints, steps } = res

				// sort by reading order
				sortUnits(matchedPoints)

				// select the first one in reading order
				let target = matchedPoints[0]

				// test all possible steps to see which one is best
				let possibleSteps = [
					{ x: unit.x + 1, y: unit.y },
					{ x: unit.x - 1, y: unit.y },
					{ x: unit.x, y: unit.y + 1 },
					{ x: unit.x, y: unit.y - 1 }
				].filter(s => map[s.y][s.x] === '.')

				if (contains(possibleSteps, target)) {
					possibleSteps = [contains(possibleSteps, target)]
				} else {
					possibleSteps = possibleSteps.filter(s => {
						let nearestInRange = findNearest([[target.y, target.x]], s, map)

						if (!nearestInRange) return false
						return nearestInRange.steps === steps - 1
					})
				}

				// if multiple steps are shortest path, take the one that is first in reading order
				sortUnits(possibleSteps)

				let step = possibleSteps[0]

				// make the move
				map[unit.y][unit.x] = '.'
				unit.x = step.x
				unit.y = step.y
				map[unit.y][unit.x] = unit.type
			}

			// check again
			if (isInRange(map, unit)) {
				// attacc
				let locations = [
					{ x: unit.x - 1, y: unit.y },
					{ x: unit.x + 1, y: unit.y },
					{ x: unit.x, y: unit.y - 1 },
					{ x: unit.x, y: unit.y + 1 }
				]

				let targets = units.filter(u => {
					return u.type !== unit.type && contains(locations, u)
				})

				sortTargets(targets)

				// logMap(map)
				// designate target
				let target = targets[0]
				target.hp -= unit.ap

				if (target.hp <= 0) {
					// target dies
					// find the index of the target in units
					let index = 0
					for (; index < units.length; index++) {
						if (units[index].y === target.y && units[index].x === target.x)
							break
					}

					map[target.y][target.x] = '.'
					units.splice(index, 1)

					if (index < i) i--
				}
			}
		}

		fullRounds++
		// logMap(map)
		// break // only 1 round for testing
	}
}

aocLoader(
	2018,
	15,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	let tests = []
	for (let i = 1; i <= 6; i++) {
		tests.push(fs.readFileSync(`./test${i}`, 'utf8'))
	}

	let testAnswers = [27730, 36334, 39514, 27755, 28944, 18740]

	// console.log(solve(tests[1]))
	for (let i = 0; i < tests.length; i++) {
		console.log(solve(tests[i]), testAnswers[i])
	}

	console.log(solve(d))
})
