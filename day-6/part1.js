const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	6,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	const points = d.split('\n').map(l => [l.split(', ')[0], l.split(', ')[1], 0])
	// console.log(points)
	let minX = points.reduce((a, c) => Math.min(a, c[0]), 100000)
	let minY = points.reduce((a, c) => Math.min(a, c[1]), 100000)
	let maxX = points.reduce((a, c) => Math.max(a, c[0]), 0)
	let maxY = points.reduce((a, c) => Math.max(a, c[1]), 0)
	// console.log(maxX, maxY)

	points.forEach(p => {
		p[0] -= minX - 1
		p[1] -= minY - 1
	})

	// console.log(points)

	// let score = Array.from({ length: points.length }, () => 0)

	for (let x = 0; x <= maxX - minX + 1; x++) {
		for (let y = 0; y <= maxY - minY + 1; y++) {
			// calc manhattan distance
			let min = 10000
			let minIndex = -1

			for (let i = 0; i < points.length; i++) {
				const p = points[i]

				const md = Math.abs(p[0] - x) + Math.abs(p[1] - y)

				if (md < min) {
					min = md
					minIndex = i
				} else if (md === min) minIndex = -1
			}

			if (minIndex === 4) console.log(x, y, minIndex)
			if (minIndex >= 0) points[minIndex][2]++
		}
	}

	points.sort((a, b) => a[2] - b[2])
	console.log(points)
})
