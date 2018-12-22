let depth = 510
let target = [10, 10]
let mod = 20183

// let depth = 3198
// let target = [12, 757]

let EL = Array.from({ length: target[0] + 1 }, () =>
	Array.from({ length: target[1] + 1 }, () => 0)
)

for (x = 0; x < GI.length; x++) {
	for (y = 0; y < GI[x].length; y++) {
		if (x === 0 && y === 0) {
			EL[x][y] = depth % mod
			continue
		}
		if (x === 0) {
			EL[x][y] = (((y % mod) * (48721 % mod)) % mod) + (depth % mod)
		} else if (y === 0) {
			EL[x][y] = (((x % mod) * (16807 % mod)) % mod) + (depth % mod)
		} else GI[x][y] = ((GI[x - 1][y] % mod) * (GI[x][y - 1] % mod)) % mod
	}
}
console.log(GI)
