d = require('fs').readFileSync('./input', 'utf8')

let lines = d.split('\n')
let instructions = lines.slice(1)
let ip = Number(lines[0].substring(4))

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

let reg = [0, 0, 0, 0, 0, 0]

while (reg[ip] >= 0 && reg[ip] < instructions.length) {
	let instr = instructions[reg[ip]].split(' ')

	performInstruction(
		instr[0],
		Number(instr[1]),
		Number(instr[2]),
		Number(instr[3]),
		reg
	)

	reg[ip]++
	// console.log(reg)
}

console.log(reg[0])
