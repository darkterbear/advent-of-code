const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	23,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	let bots = d.split('\n').map(b => {
		return b.match(/[0-9-]+/g).map(Number)
	})

	let extremes = [
		Number.MIN_SAFE_INTEGER,
		Number.MAX_SAFE_INTEGER,
		Number.MIN_SAFE_INTEGER,
		Number.MAX_SAFE_INTEGER,
		Number.MIN_SAFE_INTEGER,
		Number.MAX_SAFE_INTEGER
	]

	for (bot of bots) {
		extremes[0] = Math.max(extremes[0], bot[0])
		extremes[1] = Math.min(extremes[1], bot[0])
		extremes[2] = Math.max(extremes[2], bot[1])
		extremes[3] = Math.min(extremes[3], bot[1])
		extremes[4] = Math.max(extremes[4], bot[2])
		extremes[5] = Math.min(extremes[5], bot[2])
	}

	console.log(extremes)
})
