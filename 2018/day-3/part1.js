const lines = require('fs')
	.readFileSync('./input', 'utf8')
	.split('\n')

let map = {}

lines.forEach(claim => {
	let params = claim.split(' ')
	let pos = params[2]
		.substring(0, params[2].length - 1)
		.split(',')
		.map(Number)
	let dim = params[3].split('x').map(Number)

	for (var x = pos[0]; x < pos[0] + dim[0]; x++) {
		for (var y = pos[1]; y < pos[1] + dim[1]; y++) {
			map[x + ' ' + y] = (map[x + ' ' + y] || 0) + 1
		}
	}
})

console.log(Object.values(map).filter(o => o > 1).length)
