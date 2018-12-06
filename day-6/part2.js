const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	6,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	const points = d.split('\n').map(l => [l.split(', ')[0], l.split(', ')[1], 0])

	let minX = points.reduce((a, c) => Math.min(a, c[0]), 100000)
	let minY = points.reduce((a, c) => Math.min(a, c[1]), 100000)
	let maxX = points.reduce((a, c) => Math.max(a, c[0]), 0)
	let maxY = points.reduce((a, c) => Math.max(a, c[1]), 0)

	let counter = 0
	for (let x = minX - 200; x <= maxX + 200; x++) {
		for (let y = minY - 200; y <= maxY + 200; y++) {
			let sum = 0
			for (let i = 0; i < points.length; i++) {
				const p = points[i]

				const md = Math.abs(p[0] - x) + Math.abs(p[1] - y)

				sum += md
			}
			if (sum < 10000) counter++
		}
	}

	// points.sort((a, b) => a[2] - b[2])
	console.log(counter)
})
