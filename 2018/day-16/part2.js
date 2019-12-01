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

	samples = samples.reduce((a, s) => {
		let lines = s.split('\n')

		if (lines.length < 3) return a

		let initial = JSON.parse(lines[0].substring(8))
		let after = JSON.parse(lines[2].substring(8))
		let instruction = lines[1].split(' ').map(Number)

		a.push([initial, after, instruction])

		return a
	}, [])

	let possibleNames = []
	let opcodeToInst = {}

	for (let i = 0; i < 16; i++) {
		let sampleSpace = samples.filter(s => s[2][0] === i)
		// console.log(sampleSpace)
		let possibles = []
		for (let j = 0; j < insts.length; j++) {
			let test = insts[j]
			let fulfilled = true
			for (s of sampleSpace) {
				// console.log(s)
				let testReg = s[0].slice()
				performInstruction(test, s[2][1], s[2][2], s[2][3], testReg)

				if (!testReg.reduce((a, c, i) => a && c === s[1][i], true)) {
					fulfilled = false
					break
				}
			}
			if (fulfilled) {
				// this instruction name is the correct one, break
				possibles.push(test)
			}
		}
		possibleNames.push({ opcode: i, possibles })
	}

	// console.log(possibleNames)

	for (let c = 0; c < 16; c++) {
		possibleNames.sort((a, b) => a.possibles.length - b.possibles.length)

		// console.log(possibleNames[0].opcode)
		opcodeToInst[possibleNames[0].opcode] = possibleNames[0].possibles[0]
		let instTaken = possibleNames[0].possibles[0]

		possibleNames.splice(0, 1)

		possibleNames.forEach(p => {
			p.possibles = p.possibles.filter(n => n !== instTaken)
		})
	}

	let p = require('fs').readFileSync('./program', 'utf8')

	let programInstructions = p.split('\n').map(l => l.split(' ').map(Number))

	let programReg = [0, 0, 0, 0]
	console.log(programInstructions)
	programInstructions.forEach(pI => {
		// console.log(pI)
		performInstruction(opcodeToInst[pI[0]], pI[1], pI[2], pI[3], programReg)
	})
	console.log(programReg)
})
