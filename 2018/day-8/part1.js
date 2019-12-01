const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	8,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	getEnds = children => {
		let level = 0
		let headers = []
		let ends = []
		for (let i = 0; i < children.length; i++) {
			let prevHeader = headers[level - 1]

			if (!prevHeader) {
				level++
				headers.push({ numChildren: children[i] })
			} else if (!prevHeader.numMeta) {
				prevHeader.numMeta = children[i]
			} else {
				if (prevHeader.numChildren > 0) {
					// go to next level
					level++
					headers.push({ numChildren: children[i], numMeta: children[i + 1] })
					i++
					continue
				}

				prevHeader.numMeta--

				if (prevHeader.numMeta <= 0) {
					headers.pop()
					level--

					if (level === 0) {
						ends.push(i)
					} else {
						headers[level - 1].numChildren--
						// level--
					}
				}
			}
		}
		return ends
	}

	const getSumOfMetadata = n => {
		let numMeta = n[1]

		let children = n.slice(2, n.length - numMeta)

		let ends = getEnds(children)

		// let ends = getChildrenEnds(children)
		let rest = ends.reduce((a, c, i) => {
			return (
				a + getSumOfMetadata(children.slice(i > 0 ? ends[i - 1] + 1 : 0, c + 1))
			)
		}, 0)

		return (
			n.slice(n.length - numMeta, n.length).reduce((a, c) => a + c, 0) + rest
		)
	}

	const nums = d.split(' ').map(Number)

	console.log(getSumOfMetadata(nums))
})
