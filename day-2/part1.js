const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

const lines = input.split('\n')

const getArea = string => {
	const dims = string.split('x').map(s => parseInt(s))

	const areas = [dims[0] * dims[1], dims[1] * dims[2], dims[2] * dims[0]]

	return (
		2 * (areas[0] + areas[1] + areas[2]) +
		areas.reduce((a, c) => Math.min(a, c), areas[0])
	)
}

console.log(lines.reduce((a, c) => a + getArea(c), 0))
