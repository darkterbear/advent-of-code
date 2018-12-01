const input = require('fs').readFileSync('./input', 'utf8')
const deltas = input.split('\n')

let freq = 0
let seen = {}

while (true) {
	for (i of deltas) {
		freq += parseInt(i)

		if (seen[freq]) {
			console.log(freq)
			return
		}

		seen[freq] = true
	}
}
