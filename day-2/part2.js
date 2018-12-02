const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	2,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(data => {
	let arr = data.split('\n')
	for (let i = 0; i < arr.length; i++) {
		for (let j = i + 1; j < arr.length; j++) {
			const charsI = [...arr[i]]
			const charsJ = [...arr[j]]

			let diff = charsI.reduce((a, c, i) => a + (c === charsJ[i] ? 0 : 1), 0)

			if (diff === 1) {
				console.log(arr[i])
				console.log(arr[j])
			}
		}
	}
})
