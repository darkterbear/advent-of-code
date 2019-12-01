const highestPoints = 7091800
const numPlayers = 464

let marbles = [0, 1]
let currentMarble = 1

let players = Array.from({ length: numPlayers }, () => 0)

let currentPlayer = 0

for (let i = 2; i <= highestPoints; i++) {
	if (i % 23 === 0) {
		currentPlayer++
		if (currentPlayer >= players.length) currentPlayer = 0

		players[currentPlayer] += i

		let takeMarble = currentMarble - 7
		if (takeMarble < 0) takeMarble = marbles.length + takeMarble

		let add = marbles.splice(takeMarble, 1)[0]
		players[currentPlayer] += add

		if (takeMarble >= marbles.length) currentMarble = 0
		else currentMarble = takeMarble
	} else {
		currentMarble += 2
		if (currentMarble > marbles.length) currentMarble -= marbles.length
		marbles.splice(currentMarble, 0, i)

		// console.log(currentPlayer)
		currentPlayer++
		if (currentPlayer >= players.length) currentPlayer = 0
	}
	// console.log(currentPlayer, marbles)
}

console.log(players.reduce((a, c) => Math.max(a, c), 0))
