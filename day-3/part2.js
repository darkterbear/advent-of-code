const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')

let locations = []
let locS = [0, 0]
let locR = [0, 0]

locations.push(locS.slice())

const contains = (arr, l) => {
	for (let xy of arr) {
		if (xy[0] === l[0] && xy[1] === l[1]) return true
	}
	return false
}

for (let i = 0; i < input.length; i++) {
	let loc = i % 2 == 0 ? locS : locR
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
