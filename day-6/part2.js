const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	6,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	const points = d.split('\n').map(l => [...l.split(', ').map(Number), 0])

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

	let counter = 0
	for (let x = e[0] - 200; x <= e[2] + 200; x++) {
		for (let y = e[1] - 200; y <= e[3] + 200; y++) {
			let sum = points.reduce(
				(a, p) => a + Math.abs(p[0] - x) + Math.abs(p[1] - y),
				0
			)
			if (sum < 10000) counter++
		}
	}

	console.log(counter)
})
