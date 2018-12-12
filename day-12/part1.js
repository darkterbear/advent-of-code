const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	12,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	let lines = d.split('\n')

	let plants = [...lines[0].substring(15)].map(c => c === '#')

	for (var i = 0; i < 50; i++) {
		plants.splice(0, 0, false)
		plants.push(false)
	}

	let rules = []

	lines.forEach((l, i) => {
		if (i < 2) return

		let params = l.split(' => ')
		rules.push({
			l: [...params[0]].map(c => c === '#'),
			r: params[1] === '#'
		})
	})

	for (let gen = 1; gen <= 20; gen++) {
		let newPlants = []
		plants.forEach((p, i) => {
			let before = []
			for (let j = i - 2; j <= i + 2; j++) {
				if (j < 0 || j >= plants.length) before.push(false)
				else before.push(plants[j])
			}

			for (rule of rules) {
				// check if rule === before
				if (
					rule.l.reduce((a, c, i) => {
						return a && c === before[i]
					}, true)
				) {
					newPlants.push(rule.r)
				}
			}
		})
		plants = newPlants
	}
	console.log(plants.reduce((a, c, i) => a + (c ? i - 50 : 0), 0))
})
