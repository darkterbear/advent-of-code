const aocLoader = require('aoc-loader')

const st = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const variableTime = step => {
	return [...st].indexOf(step) + 1
}

aocLoader(
	2018,
	7,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	d = require('fs').readFileSync('./test', 'utf8')

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

	let newReqs = JSON.parse(JSON.stringify(reqs))

	steps.sort((a, b) => a.localeCompare(b))

	let order = []
	while (steps.length > 0) {
		// console.log(steps.length)
		const testStep = steps[0]

		if (!reqs[testStep] || reqs[testStep].length === 0) {
			order.push(testStep)
			// step completed
			steps.splice(0, 1)
			for (req in reqs) {
				for (let i = 0; i < reqs[req].length; i++) {
					if (reqs[req][i] === testStep) {
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
	// console.log(order)

	// part 2
	let numWorkers = 5
	let baseTime = 60
	let time = 0
	let workers = Array.from({ length: numWorkers }, () => null)

	while (order.length > 0 || workers.filter(w => w).length > 0) {
		// console.log(order)
		console.log(workers)
		// finish workers if they are done
		workers.forEach((w, i) => {
			if (w) {
				w.timeLeft--

				if (w.timeLeft <= 0) {
					// task finish
					for (req in newReqs) {
						for (let i = 0; i < newReqs[req].length; i++) {
							if (newReqs[req][i] === w.step) {
								newReqs[req].splice(i, 1)
								i--
							}
						}
					}
					workers[i] = null
				}
			}
		})

		// assign new tasks
		let assign = []

		for (let i = 0; i < order.length; i++) {
			if (!newReqs[order[i]] || newReqs[order[i]].length === 0) assign.push(i)
		}

		// console.log(assign)

		// console.log('assign up to ', till)

		assign = assign.slice(0, numWorkers)
		let assigned = []
		for (i of assign) {
			const step = order[i]
			for (let j = 0; j < workers.length; j++) {
				if (!workers[j]) {
					assigned.push(i)
					workers[j] = {
						step,
						timeLeft: baseTime + variableTime(step)
					}
					break
				}
			}
		}
		console.log(assigned.map(a => order[a]))
		for (i of assigned.reverse()) {
			order.splice(i, 1)
		}

		time++
	}
	console.log(time - 1)
})
