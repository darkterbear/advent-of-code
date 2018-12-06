const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	6,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	const points = d.split('\n').map(l => [...l.split(', ').map(Number), 0])
	// console.log(points)
	let e = points.reduce(
		(a, c) => {
			return [
				Math.min(a[0], c[0]),
				Math.min(a[1], c[1]),
				Math.max(a[2], c[0]),
				Math.max(a[3], c[1])
			]
		},
		[1000, 1000, 0, 0]
	)

	const now = Date.now()
	for (let x = e[0]; x <= e[2]; x++) {
		for (let y = e[1]; y <= e[3]; y++) {
			// calc manhattan distance
			let min = 1000
			let minIndex = -1

			for (let i = 0; i < points.length; i++) {
				const p = points[i]

				const md = Math.abs(p[0] - x) + Math.abs(p[1] - y)

				if (md < min) {
					min = md
					minIndex = i
				} else if (md === min) minIndex = -1
			}

			if (minIndex >= 0) points[minIndex][2]++
		}
	}

	points.sort((a, b) => a[2] - b[2])
	console.log(points)
})
