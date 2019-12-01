const highestPoints = 7091800
const numPlayers = 464

class Node {
	constructor(n, next, prev) {
		this.n = n

		if (!next) this.next = this
		else this.next = next

		if (!prev) this.prev = this
		else this.prev = prev
	}

	move(n) {
		if (n === 0) return
		let p = this
		if (n > 0) {
			for (let i of Array(n).keys()) {
				p = p.next
			}
		} else {
			for (let i of Array(-n).keys()) {
				p = p.prev
			}
		}
		return p
	}

	insert(n) {
		let prevNext = this.next
		this.next = new Node(n, prevNext, this)
		prevNext.prev = this.next
	}

	splice() {
		let prev = this.prev
		let next = this.next
		prev.next = next
		next.prev = prev
		this.next = null
		this.prev = null
		return next
	}

	print() {
		let seen = []
		let p = this
		while (!seen.includes(p.n)) {
			seen.push(p.n)
			p = p.next
		}
		console.log(seen)
	}
}

let marbles = new Node(0)

let players = Array.from({ length: numPlayers }, () => 0)
let currentPlayer = 0

for (let i = 1; i <= highestPoints; i++) {
	if (i % 23 === 0) {
		currentPlayer++
		if (currentPlayer >= players.length) currentPlayer = 0

		players[currentPlayer] += i

		marbles = marbles.move(-7)
		players[currentPlayer] += marbles.n
		marbles = marbles.splice()
	} else {
		marbles = marbles.move(1)
		marbles.insert(i)
		marbles = marbles.move(1)

		currentPlayer++
		if (currentPlayer >= players.length) currentPlayer = 0
	}
	// marbles.print()
}

console.log(players.reduce((a, c) => Math.max(a, c), 0))
