// let depth = 510
// let target = [10, 10]
let mod = 20183

let depth = 3198
let target = [12, 757]

let EL = Array.from({ length: target[0] + 1 }, () =>
	Array.from({ length: target[1] + 1 }, () => 0)
)

for (x = 0; x < EL.length; x++) {
	for (y = 0; y < EL[x].length; y++) {
		if (x === 0 && y === 0) {
			EL[x][y] = depth % mod
			continue
		}
		if (x === target[0] && y === target[1]) {
			EL[x][y] = depth % mod
			continue
		}
		if (x === 0) {
			EL[x][y] = ((((y % mod) * (48271 % mod)) % mod) + (depth % mod)) % mod
		} else if (y === 0) {
			EL[x][y] = ((((x % mod) * (16807 % mod)) % mod) + (depth % mod)) % mod
		} else
			EL[x][y] =
				((((EL[x - 1][y] % mod) * (EL[x][y - 1] % mod)) % mod) +
					(depth % mod)) %
				mod
	}
}

EL = EL.map(r => {
	return r.map(el => el % 3)
})

console.log(EL)

let counter = 0
for (col of EL) {
	for (i of col) counter += i
}
console.log(counter)
