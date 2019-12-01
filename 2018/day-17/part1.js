const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	17,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	d = d.split('\n')

	let minX = 1000000
	let maxX = 0

	let minY = 1000000
	let maxY = 0

	d.forEach(l => {
		let parts = l.split(', ')
		let leftParts = parts[0].split('=')
		leftParts[1] = Number(leftParts[1])
		let rightParts = parts[1].split('=')
		let rightMoreParts = rightParts[1].split('..')
		rightParts[1] = Number(rightMoreParts[0])
		rightParts[2] = Number(rightMoreParts[1])

		if (leftParts[0] === 'x') {
			if (leftParts[1] > maxX) maxX = leftParts[1]
			if (leftParts[1] < minX) minX = leftParts[1]
			if (rightParts[1] < minY) minY = rightParts[1]
			if (rightParts[1] > maxY) maxY = rightParts[1]
			if (rightParts[2] < minY) minY = rightParts[2]
			if (rightParts[2] > maxY) maxY = rightParts[2]
		} else {
			if (leftParts[1] > maxY) maxY = leftParts[1]
			if (leftParts[1] < minY) minY = leftParts[1]
			if (rightParts[1] < minX) minX = rightParts[1]
			if (rightParts[1] > maxX) maxX = rightParts[1]
			if (rightParts[2] < minX) minX = rightParts[2]
			if (rightParts[2] > maxX) maxX = rightParts[2]
		}
	})

	minX--
	maxX++

	let map = Array.from({ length: maxY - minY + 1 }, () => {
		return Array.from({ length: maxX - minX + 1 }, () => '.')
	})

	d.forEach(l => {
		let parts = l.split(', ')
		let leftParts = parts[0].split('=')
		leftParts[1] = Number(leftParts[1])
		let rightParts = parts[1].split('=')
		let rightMoreParts = rightParts[1].split('..')
		rightParts[1] = Number(rightMoreParts[0])
		rightParts[2] = Number(rightMoreParts[1])

		if (leftParts[0] === 'x') {
			for (let y = rightParts[1]; y <= rightParts[2]; y++) {
				map[y - minY][leftParts[1] - minX + 1] = '#'
			}
		} else {
			for (let x = rightParts[1]; x <= rightParts[2]; x++) {
				map[leftParts[1] - minY][x - minX + 1] = '#'
			}
		}
	})

	// map.forEach(r => {
	// 	console.log(r.reduce((a, c) => a + c, ''))
	// })

	map[0][500 - minX + 1] = '+'

	let str = ''
	map.forEach(r => {
		// console.log(r.reduce((a, c) => a + c, ''))
		str += r.reduce((a, c) => a + c, '') + '\n'
	})
	// console.log()
	// require('fs').writeFileSync()
	require('fs').writeFileSync('./outbefore', str, 'utf8')

	let hasChanged = true

	while (hasChanged) {
		// map.forEach(r => {
		// 	console.log(r.reduce((a, c) => a + c, ''))
		// })
		// console.log()
		hasChanged = false

		// all + and | should grow downwards and sideways if room, and turn into ~ if no room down and isn't | below
		for (let y = 0; y < map.length - 1; y++) {
			for (let x = 0; x < map[y].length; x++) {
				if (map[y][x] === '+' || map[y][x] === '|') {
					// check if flow down or sideways
					if (map[y + 1][x] === '.') {
						// console.log('flow down')
						hasChanged = true
						map[y + 1][x] = '|'
					} else if (map[y + 1][x] === '|') {
						// flowing below, cant do much
					} else {
						// below is solid, flow sideways

						if (x + 1 < map[y].length && map[y][x + 1] === '.') {
							// console.log('flow sideways')
							hasChanged = true
							map[y][x + 1] = '|'
						}
						if (x - 1 >= 0 && map[y][x - 1] === '.') {
							// console.log('flow sideways')
							hasChanged = true
							map[y][x - 1] = '|'
						}

						// while we're at it, check if we can turn into a still
						if (map[y][x] === '+') continue

						let canBeStill = true
						let leftbound = x
						let rightbound = x

						while (leftbound >= 0 && map[y][leftbound] !== '#' && canBeStill) {
							leftbound--
							if (map[y][leftbound] === '.') {
								canBeStill = false
							}
							if (map[y][leftbound] === '#') {
								break
							}
							if (
								map[y + 1][leftbound] === '|' ||
								map[y + 1][leftbound] === '.' ||
								leftbound === 0
							) {
								canBeStill = false
							}
						}

						// console.log(canBeStill)

						while (
							rightbound < map[y].length &&
							map[y][rightbound] !== '#' &&
							canBeStill
						) {
							rightbound++
							if (map[y][rightbound] === '.') {
								canBeStill = false
							}
							if (map[y][rightbound] === '#') {
								break
							}
							if (
								map[y + 1][rightbound] === '|' ||
								map[y + 1][rightbound] === '.' ||
								rightbound === map[y].length - 1
							) {
								canBeStill = false
							}
						}

						if (canBeStill) {
							// console.log('change to still')
							hasChanged = true
							for (let xC = leftbound + 1; xC < rightbound; xC++) {
								if (map[y][xC] === '|') map[y][xC] = '~'
							}
						}
					}
				}
			}
		}
	}

	str = ''
	map.forEach(r => {
		// console.log(r.reduce((a, c) => a + c, ''))
		str += r.reduce((a, c) => a + c, '') + '\n'
	})
	// console.log()
	// require('fs').writeFileSync()
	require('fs').writeFileSync('./out', str, 'utf8')

	let sum = map.reduce((a, r) => {
		return (
			a +
			r.reduce((a, c) => a + (c === '~' || c === '|' || c === '+' ? 1 : 0), 0)
		)
	}, 0)
	console.log(sum)
})
