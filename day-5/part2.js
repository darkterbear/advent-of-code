const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	5,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(data => {
	// data = require('fs').readFileSync('./test', 'utf8')

	let polymer = data

	// part 2

	const chars = 'abcdefghijklmnopqrstuvwxyz'
	let lowest = polymer.length
	;[...chars].forEach(c => {
		console.log(c)
		let copy = polymer.slice()
		for (let i = 0; i < copy.length; i++) {
			if (copy.charAt(i).toLowerCase() === c) {
				copy = copy.slice(0, i) + copy.slice(i + 1, copy.length)
				i--
			}
		}

		let lastlength
		do {
			lastlength = copy.length
			for (let i = 0; i < copy.length - 1; i++) {
				if (
					copy.charAt(i).toUpperCase() === copy.charAt(i + 1) &&
					copy.charAt(i) === copy.charAt(i + 1).toLowerCase()
				) {
					copy = copy.slice(0, i) + copy.slice(i + 2, copy.length)
					i--
				} else if (
					copy.charAt(i).toLowerCase() === copy.charAt(i + 1) &&
					copy.charAt(i) === copy.charAt(i + 1).toUpperCase()
				) {
					copy = copy.slice(0, i) + copy.slice(i + 2, copy.length)
					i--
				}
			}
		} while (copy.length !== lastlength)

		lowest = copy.length < lowest ? copy.length : lowest
	})

	console.log(lowest)
})
