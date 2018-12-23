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

	bots.sort((a, b) => b[3] - a[3])
	console.log(bots)
	let lead = bots[0]
	let numInRange = 1

	for (let i = 1; i < bots.length; i++) {
		let c = bots[i]
		let mD =
			Math.abs(c[0] - lead[0]) +
			Math.abs(c[1] - lead[1]) +
			Math.abs(c[2] - lead[2])

		if (mD <= lead[3]) numInRange++
	}

	console.log(numInRange)
})
