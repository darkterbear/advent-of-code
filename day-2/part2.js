const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

const lines = input.split('\n')

const getRibbon = string => {
	const dims = string.split('x').map(s => parseInt(s))

	dims.sort((a, b) => a - b)

	return dims[0] * dims[1] * dims[2] + 2 * (dims[0] + dims[1])
}

console.log(lines.reduce((a, c) => a + getRibbon(c), 0))
