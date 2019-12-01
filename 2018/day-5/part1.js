const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	5,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(p => {
	// p = require('fs').readFileSync('./test', 'utf8')

	for (let i = 0; i < p.length - 1; i++) {
		if (
			(p[i].toUpperCase() === p[i + 1] && p[i] === p[i + 1].toLowerCase()) ||
			(p[i].toLowerCase() === p[i + 1] && p[i] === p[i + 1].toUpperCase())
		) {
			p = p.slice(0, i) + p.slice(i + 2, p.length)
			i -= i === 0 ? 1 : 2
		}
	}

	console.log(p.length)
})
