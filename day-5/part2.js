const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')
const strings = input.split('\n')

const nice = s => {
	const chars = [...s]

	let cond1 = false
	let cond2 = false
	let pairs = []

	for (let i = 0; i < s.length - 1; i++) {
		pairs.push([chars[i] + chars[i + 1], i])
	}

	pairs.sort((a, b) => a[0].localeCompare(b[0]))

	console.log(pairs)

	for (let i = 0; i < pairs.length - 1; i++) {
		if (
			pairs[i][0] === pairs[i + 1][0] &&
			Math.abs(pairs[i][1] - pairs[i + 1][1]) > 1
		) {
			cond1 = true
			break
		}
	}

	if (!cond1) return false

	for (let i = 0; i < s.length - 2; i++) {
		if (!cond2 && chars[i] === chars[i + 2]) {
			return true
		}
	}
}

//console.log(nice('qjhvhtzxzqqjkmpb'))
console.log(strings.filter(s => nice(s)).length)
