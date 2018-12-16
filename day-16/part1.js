const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	16,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	d = require('fs').readFileSync('./test', 'utf8')

	let samples = d.split('\n\n')

	// console.log(samples)

	const performInstruction = (inst, a, b, c, reg) => {
		switch (inst) {
			case 'addr':
				return (reg[c] = reg[a] + reg[b])
			case 'addi':
				return (reg[c] = reg[a] + b)
			case 'mulr':
				return (reg[c] = reg[a] * reg[b])
			case 'muli':
				return (reg[c] = reg[a] * b)
			case 'banr':
				return (reg[c] = reg[a] & reg[b])
			case 'bani':
				return (reg[c] = reg[a] & b)
			case 'borr':
				return (reg[c] = reg[a] | reg[b])
			case 'bori':
				return (reg[c] = reg[a] | b)
			case 'setr':
				return (reg[c] = reg[a])
			case 'seti':
				return (reg[c] = a)
			case 'gtir':
				return (reg[c] = a > reg[b] ? 1 : 0)
			case 'gtri':
				return (reg[c] = reg[a] > b ? 1 : 0)
			case 'gtrr':
				return (reg[c] = reg[a] > reg[b] ? 1 : 0)
			case 'eqir':
				return (reg[c] = a === reg[b] ? 1 : 0)
			case 'eqri':
				return (reg[c] = reg[a] === b ? 1 : 0)
			case 'eqrr':
				return (reg[c] = reg[a] === reg[b] ? 1 : 0)
		}
	}

	const insts = [
		'addr',
		'addi',
		'mulr',
		'muli',
		'banr',
		'bani',
		'borr',
		'bori',
		'setr',
		'seti',
		'gtir',
		'gtri',
		'gtrr',
		'eqir',
		'eqri',
		'eqrr'
	]

	let num3 = samples.reduce((a, s) => {
		let lines = s.split('\n')

		if (lines.length < 3) return a

		console.log(lines)
		let initial = JSON.parse(lines[0].substring(8))
		let after = JSON.parse(lines[2].substring(8))
		let instruction = lines[1].split(' ').map(Number)

		let counter = 0
		insts.forEach(i => {
			let test = initial.slice()
			performInstruction(
				i,
				instruction[1],
				instruction[2],
				instruction[3],
				test
			)

			if (test.reduce((a, c, i) => a && c == after[i], true)) counter++
		})
		// console.log(counter)
		if (counter >= 3) return a + 1
		else return a
	}, 0)
	console.log(num3)
})
