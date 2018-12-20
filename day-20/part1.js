let d = require('fs').readFileSync('./input', 'utf8')

d = d.substring(1, d.length - 1)

// console.log(d)

const findLongest = p => {
	if (!p.includes('(') && !p.includes('|')) return p.length

	if (p.includes('(')) {
		// contains () and |

		let mainLength = 0
		let lengths = []

		let start = -1
		for (let i = 0; i < p.length; i++) {
			if (p.charAt(i) === '|' && start === -1) {
				lengths.push(mainLength)
				mainLength = 0
			} else if (p.charAt(i) === '(') {
				if (start !== -1) {
					lengths.push(
						mainLength + findLongest(p.substring(start + 1, p.length - 1))
					)
					break
				} else start = i
			} else if (p.charAt(i) === ')') {
				lengths.push(mainLength + findLongest(p.substring(start + 1, i)))
				start = -1
			} else {
				if (start === -1) mainLength++
			}
		}
		lengths.push(mainLength)

		return lengths.sort((a, b) => b - a)[0]
	} else {
		// only contains |
		let max = 0
		p.split('|').forEach(s => {
			if (s.length === 0) return
			if (s.length > max) max = s.length
		})

		if (p.charAt(p.length - 1) === '|') return max / 2
		else return max
	}
}

console.log(findLongest(d))
