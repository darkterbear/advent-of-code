const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	5,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(data => {
	// data = require('fs').readFileSync('./test', 'utf8')

	let polymer = data
	let lastlength
	do {
		lastlength = polymer.length
		for (let i = 0; i < polymer.length - 1; i++) {
			if (
				polymer.charAt(i).toUpperCase() === polymer.charAt(i + 1) &&
				polymer.charAt(i) === polymer.charAt(i + 1).toLowerCase()
			) {
				polymer = polymer.slice(0, i) + polymer.slice(i + 2, polymer.length)
				i--
			} else if (
				polymer.charAt(i).toLowerCase() === polymer.charAt(i + 1) &&
				polymer.charAt(i) === polymer.charAt(i + 1).toUpperCase()
			) {
				polymer = polymer.slice(0, i) + polymer.slice(i + 2, polymer.length)
				i--
			}
		}
	} while (polymer.length !== lastlength)
})
