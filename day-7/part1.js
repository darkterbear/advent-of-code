const input = require('fs').readFileSync('./input', 'utf8')
const instructions = input.split('\n').map(s => {
  const tokens = s.split(' ')

  let op = {
    target: tokens[tokens.length - 1]
  }

  if (tokens.includes('AND')) {
    return {
      operation: 'AND',
      input: [tokens[0], tokens[2]]
    }
  } else if (tokens.includes('NOT')) {
    return {
      operation: 'NOT',
      input: tokens[1]
    }
  } else if (tokens.includes('OR')) {
    return {
      operation: 'OR',
      input: [tokens[0], tokens[2]]
    }
  } else if (tokens.includes('LSHIFT')) {
    return {
      operation: 'LSHIFT',
      input: [tokens[0], tokens[2]]
    }
  } else if (tokens.includes('RSHIFT')) {
    return {
      operation: 'RSHIFT',
      input: [tokens[0], tokens[2]]
    }
  } else {
    return {
      operation: 'SET',
      input: tokens[0]
    }
  }
})

let wires = {}

// sort the instructions such that the literal inputs are first
instructions.sort((a, b) => {
  let r = 0
  if (!isNaN(a.input)) {
    r += 3
  } else if (a.input.length || a.input.length === 0) {
    if (!isNaN(a.input[0])) r++
    if (!isNaN(a.input[1])) r++
  }
  if (!isNaN(b.input)) {
    r -= 3
  } else if (b.input.length || b.input.length === 0) {
    if (!isNaN(b.input[0])) r--
    if (!isNaN(b.input[1])) r--
  }
  return -r
})

while (instructions.length > 0) {
  var i = instructions[0]

  if (Array.isArray(i.input)) {
    if (isNaN(i.input[0]) && wires[i.input[0]] === undefined) {
      instructions.push(instructions.splice(0, 1)[0])
      return
    } else if (isNaN(i.input[0])) {
      i.input[0] = wires[i.input[0]]
    }
    if (isNaN(i.input[1]) && wires[i.input[1]] === undefined) {
      instructions.push(instructions.splice(0, 1)[0])
      return
    } else if (isNaN(i.input[1])) {
      i.input[1] = wires[i.input[1]]
    }

    wires[i.target] = calculateDouble(i.input, i.operation)
    instructions.splice(0, 1)
  } else {
    if (!isNaN(i.input)) {
      wires[i.target] = calculateSingle(i.input, i.operation)
    } else {
      
      // single variable input
    }
  }
}
