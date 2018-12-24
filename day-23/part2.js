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

	const findBounds = bots => {
		let bounds = [
			Number.MIN_SAFE_INTEGER,
			Number.MAX_SAFE_INTEGER,
			Number.MIN_SAFE_INTEGER,
			Number.MAX_SAFE_INTEGER,
			Number.MIN_SAFE_INTEGER,
			Number.MAX_SAFE_INTEGER
		]
		for (bot of bots) {
			bounds[0] = Math.max(bounds[0], bot[0])
			bounds[1] = Math.min(bounds[1], bot[0])
			bounds[2] = Math.max(bounds[2], bot[1])
			bounds[3] = Math.min(bounds[3], bot[1])
			bounds[4] = Math.max(bounds[4], bot[2])
			bounds[5] = Math.min(bounds[5], bot[2])
		}
		// console.log(bounds)
		return bounds
	}

	const scaleByRes = (bots, res) => {
		for (b of bots) {
			b[0] /= res
			b[1] /= res
			b[2] /= res
			b[3] /= res
		}
	}

	const findBestLocation = (bots, res) => {
		let bounds = findBounds(bots)

		for (x = bounds[1]; x <= bounds[0]; x += res) {
			for (y = bounds[3]; y <= bounds[2]; y += res) {
				for (z = bounds[5]; z <= bounds[4]; z += res) {}
			}
		}
	}

	let res = 2 ** 20
	let botsString = JSON.stringify(bots)
	let bounds = findBounds(JSON.parse(botString))

	while (res > 1) {
		let botsCopy = JSON.parse(botsString)

		// find cube that has most overlaps in it
		findBestLocation(botsCopy, res)

		res /= 2
	}
})
