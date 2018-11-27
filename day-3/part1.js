const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

let locations = []
let loc = [0, 0]

locations.push(loc.slice())

const contains = (arr, l) => {
	for (let xy of arr) {
		if (xy[0] === l[0] && xy[1] === l[1]) return true
	}
	return false
}

for (let i = 0; i < input.length; i++) {
	switch (input.charAt(i)) {
		case '^':
			loc[1]++
			break
		case '>':
			loc[0]++
			break
		case 'v':
			loc[1]--
			break
		case '<':
			loc[0]--
	}

	if (!contains(locations, loc)) locations.push(loc.slice())
}

console.log(locations.length)
