let arr = Array.from({ length: 2 ** 24 }, () => false)

let div = 65536
let i = 10362650
let last = 0

let j = 0
while (true) {
	i = ((10362650 + (div & 255)) * 65899) & 16777215
	while (div > 255) {
		div = Math.floor(div / 256)
		i += div & 255
		if (div > 255) {
			i = (i * 65899) & 16777215
		}
	}

	i = (i * 65899) & 16777215

	if (arr[i]) {
		console.log(last)
		return
	}
	last = i
	arr[i] = true
	// console.log(i)
	div = i | 65536
	j++
}
