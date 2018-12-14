const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	14,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	let input = 556061
	let inputArray = [...input.toString()].map(Number)

	let arr = [3, 7]
	let elf1 = 0
	let elf2 = 1

	while (arr.length < 30000000) {
		let scores = [...(arr[elf1] + arr[elf2]).toString()].map(Number)
		scores.forEach(s => arr.push(s))

		elf1 = (elf1 + arr[elf1] + 1) % arr.length
		elf2 = (elf2 + arr[elf2] + 1) % arr.length
	}
	let i = 0
	for (; i < 30000000 - inputArray.length; i++) {
		if (
			arr
				.slice(i, i + inputArray.length)
				.reduce((a, c, i) => a && c === inputArray[i], true)
		)
			break
	}

	console.log(i)
})
