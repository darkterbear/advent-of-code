const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	7,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	const p = d.split('\n').map(l => {
		l = l.split(' ')
		return [l[1], l[7]]
	})

	let reqs = {}
	let steps = []

	p.forEach(req => {
		if (!steps.includes(req[0])) steps.push(req[0])
		if (!steps.includes(req[1])) steps.push(req[1])

		if (!reqs[req[1]]) reqs[req[1]] = []

		reqs[req[1]].push(req[0])
	})

	console.log(reqs)

	steps.sort((a, b) => a.localeCompare(b))

	let sum = ''
	while (steps.length > 0) {
		// console.log(steps.length)
		const testStep = steps[0]

		if (!reqs[testStep] || reqs[testStep].length === 0) {
			sum += testStep
			// step completed
			steps.splice(0, 1)
			for (req in reqs) {
				for (let i = 0; i < reqs[req].length; i++) {
					if (reqs[req][i] === testStep) {
						complete = true
						reqs[req].splice(i, 1)
						steps.sort((a, b) => a.localeCompare(b))
						i--
					}
				}
			}
		} else {
			steps.push(steps.splice(0, 1)[0])
		}
	}
	console.log(sum)
})
