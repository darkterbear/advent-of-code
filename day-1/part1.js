const input = require('fs').readFileSync('./input', 'utf8')
const instructions = input.split('\n')

console.log(instructions.reduce((a, b) => a + parseInt(b), 0))
