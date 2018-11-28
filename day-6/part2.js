const input = require('fs').readFileSync('./input', 'utf8')
const instructions = input.split('\n')

const matrix = Array.from({ length: 1000 }, () => {
	return Array.from({ length: 1000 }, () => 0)
})

instructions.forEach(i => {
	const tokens = i.split(' ')

	if (tokens[0] === 'toggle') {
		const start = tokens[1].split(',').map(s => parseInt(s))
		const end = tokens[3].split(',').map(s => parseInt(s))

		for (let x = start[0]; x <= end[0]; x++) {
			for (let y = start[1]; y <= end[1]; y++) {
				matrix[x][y] += 2
			}
		}
	} else {
		const start = tokens[2].split(',').map(s => parseInt(s))
		const end = tokens[4].split(',').map(s => parseInt(s))
		if (tokens[1] === 'on') {
			for (let x = start[0]; x <= end[0]; x++) {
				for (let y = start[1]; y <= end[1]; y++) {
					matrix[x][y]++
				}
			}
		} else {
			for (let x = start[0]; x <= end[0]; x++) {
				for (let y = start[1]; y <= end[1]; y++) {
					matrix[x][y]--

					if (matrix[x][y] < 0) matrix[x][y] = 0
				}
			}
		}
	}
})

console.log(
	matrix.reduce(
		(accumulator, row) => accumulator + row.reduce((a, c) => a + c, 0),
		0
	)
)
