const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	10,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	// d = require('fs').readFileSync('./test', 'utf8')

	let particles = d.split('\n').map(line => {
		line = line.substring(10)
		const p = line.split('> velocity=<')
		const pos = p[0].split(',').map(s => Number(s.trim()))
		const vel = p[1]
			.substring(0, p[1].length - 1)
			.split(',')
			.map(s => Number(s.trim()))
		return {
			pos,
			vel
		}
	})

	let last
	let lastBB = Number.MAX_SAFE_INTEGER
	let time = 0
	while (1) {
		// let before =
		particles.forEach(p => {
			p.pos[0] += p.vel[0]
			p.pos[1] += p.vel[1]
		})

		const a = particles.reduce(
			(a, c) => {
				c = [c.pos[0], c.pos[1]]
				a[0] = Math.min(a[0], c[0])
				a[1] = Math.min(a[1], c[1])
				a[2] = Math.max(a[2], c[0])
				a[3] = Math.max(a[3], c[1])

				return a
			},
			[
				Number.MAX_SAFE_INTEGER,
				Number.MAX_SAFE_INTEGER,
				Number.MIN_SAFE_INTEGER,
				Number.MIN_SAFE_INTEGER
			]
		)
		if ((a[2] - a[0]) * (a[3] - a[1]) > lastBB) {
			// print last in stack
			particles = last
			let map = Array.from({ length: a[3] - a[1] + 1 }, () => {
				return Array.from({ length: a[2] - a[0] + 1 }, () => false)
			})

			particles.forEach(p => {
				map[p.pos[1] - a[1]][p.pos[0] - a[0]] = true
			})

			map.forEach(row => {
				let sum = ''
				row.forEach(cell => {
					if (cell) {
						sum += '#'
					} else sum += ' '
				})
				console.log(sum)
			})
			console.log(time)
			return
		} else {
			lastBB = (a[2] - a[0]) * (a[3] - a[1])
			last = JSON.parse(JSON.stringify(particles))
		}
		time++
	}
})
