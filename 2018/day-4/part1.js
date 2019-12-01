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
			guards[currentGuard] =
				(guards[currentGuard] || 0) + a.time.minute - lastSleep
		}
	}

	let max = 0
	let maxGuardId = 0

	for (i in guards) {
		if (guards[i] > max) {
			max = guards[i]
			maxGuardId = Number(i)
		}
	}

	let sleepFreq = Array.from({ length: 60 }, () => 0)

	for (let i = 0; i < actions.length; i++) {
		const a = actions[i]
		if (a.action.startsWith('begin')) {
			currentGuard = Number(a.action.split(' ')[1])
			// console.log(currentGuard)
			continue
		}

		if (currentGuard !== maxGuardId) continue

		if (a.action === 'sleep') {
			lastSleep = a.time.minute
			continue
		}

		if (a.action === 'wake') {
			for (let j = lastSleep; j < a.time.minute; j++) {
				sleepFreq[j]++
			}
		}
	}
	console.log(sleepFreq.map((f, i) => i + ': ' + f))
	console.log(
		maxGuardId * sleepFreq.reduce((a, c, i) => (c > sleepFreq[a] ? i : a), 0)
	)
})
