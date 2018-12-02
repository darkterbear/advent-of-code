const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	2,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(data => {
	const arr = data.split('\n').reduce(
		(a, c) => {
			const chars = [...c]
			let seen = {}
			for (let char of chars) {
				seen[char] = seen[char] ? seen[char] + 1 : 1
			}

			if (Object.keys(seen).some(k => seen[k] === 2)) a[0]++
			if (Object.keys(seen).some(k => seen[k] === 3)) a[1]++
			return a
		},
		[0, 0]
	)

	console.log(arr[0] * arr[1])
})
