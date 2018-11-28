const fs = require('fs')

const input = fs.readFileSync('./input', 'utf8')
const strings = input.split('\n')

console.log(strings[0])

const vowel = c => {
	const vowels = ['a', 'e', 'i', 'o', 'u']
	if (vowels.includes(c)) return true
	return false
}

const nice = s => {
	if (
		s.includes('ab') ||
		s.includes('cd') ||
		s.includes('pq') ||
		s.includes('xy')
	)
		return false
	const chars = [...s]
	if (chars.filter(c => vowel(c)).length < 3) return false
	for (let i = 0; i < chars.length - 1; i++) {
		if (chars[i] === chars[i + 1]) return true
	}
	return false
}

console.log(strings.filter(s => nice(s)).length)
