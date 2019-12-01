const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	4,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(data => {
	// data = require('fs').readFileSync('./test', 'utf8')

	const actions = data.split('\n').map(s => {
		const [rawDate, rawTime, ...status] = s.split(' ')

		const dateParams = rawDate.substring(1).split('-')
		const date = {
			month: Number(dateParams[1]),
			day: Number(dateParams[2])
		}
		const timeParams = rawTime.substring(0, 5).split(':')
		const time = {
			hour: Number(timeParams[0]),
			minute: Number(timeParams[1])
		}

		let action
		if (status[0] === 'wakes') {
			action = 'wake'
		} else if (status[0] === 'falls') {
			action = 'sleep'
		} else {
			action = 'begin ' + status[1].substring(1)
		}
		return {
			date,
			time,
			action
		}
	})

	actions.sort((a, b) => {
		if (a.date.month !== b.date.month) return a.date.month - b.date.month
		if (a.date.day !== b.date.day) return a.date.day - b.date.day
		if (a.time.hour !== b.time.hour) return a.time.hour - b.time.hour
		if (a.time.minute !== b.time.minute) return a.time.minute - b.time.minute
	})

	let guards = {}
	let currentGuard
	let lastSleep
	for (let i = 0; i < actions.length; i++) {
		const a = actions[i]
		if (a.action.startsWith('begin')) {
			currentGuard = Number(a.action.split(' ')[1])
			continue
		}

		if (a.action === 'sleep') {
			lastSleep = a.time.minute
			continue
		}

		if (a.action === 'wake') {
			if (!guards[currentGuard]) {
				guards[currentGuard] = Array.from({ length: 60 }, () => 0)
			}

			for (let j = lastSleep; j < a.time.minute; j++) {
				guards[currentGuard][j]++
			}
		}
	}
	let maxMinute = Object.keys(guards).reduce(
		(prev, guardId) => {
			let sF = guards[guardId]
			let maxSleepMin = sF.reduce((a, c, i) => (c > sF[a] ? i : a), 0)
			if (maxSleepMin > prev[1]) {
				return [guardId, maxSleepMin]
			}
			return prev
		},
		[0, 0]
	)
	console.log(Number(maxMinute[0]) * maxMinute[1])
})
