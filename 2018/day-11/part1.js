const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	11,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	const SN = 2568

	const getPower = (x, y) => {
		let raw = ((x + 10) * y + SN) * (x + 10)
		let hd = ((raw - (raw % 100)) / 100) % 10
		return hd - 5
	}

	let max = [Number.MIN_SAFE_INTEGER, -1, -1]
	for (let x = 1; x <= 298; x++) {
		for (let y = 1; y <= 298; y++) {
			let totalPower = 0
			for (let i = x; i <= x + 2; i++) {
				for (let j = y; j <= y + 2; j++) {
					totalPower += getPower(i, j)
				}
			}
			if (totalPower > max[0]) {
				max[0] = totalPower
				max[1] = x
				max[2] = y
			}
		}
	}
	console.log(max)
})
