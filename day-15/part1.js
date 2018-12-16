const aocLoader = require('aoc-loader')

aocLoader(
	2018,
	15,
	'53616c7465645f5ff8b638d2c68c03cc3d780a40205335f819cd49e1e74f43b6b80111b52cbbaf243b1bf68109e5c3f4'
).then(d => {
	d = require('fs').readFileSync('./test1', 'utf8')

	let units = []

	let map = d.split('\n').map((l, y) => {
		let chars = [...l]

		chars.forEach((u, x) => {
			if (u === 'G' || u === 'E') {
				units.push({ type: u, x, y, hp: 200 })
			}
		})

		return chars
	})

	units.sort((a, b) => {
		return a.y === b.y ? a.x - b.x : a.y - b.y
	})

	let rounds = 0
	let str = ''
	let strmaps = ''
	while (true) {
		// round

		// each unit takes turns
		for (let i = 0; i < units.length; i++) {
			// unit i's turn

			// identify possible targets
			let targets = []
			for (let j = 0; j < units.length; j++) {
				if (j === i) continue

				if (units[j].type !== units[i].type) targets.push(j)
			}

			// end condition
			if (targets.length < 1) {
				let outcome = rounds * units.reduce((a, c) => a + c.hp, 0)
				console.log(rounds)
				console.log(units.reduce((a, c) => a + c.hp, 0))
				console.log(outcome)
				console.log(units)

				// require('fs').writeFileSync('out', str, 'utf8')
				require('fs').writeFileSync('outmaps', strmaps, 'utf8')
				return
			}

			// identify squares in range
			let inRange = []
			for (target of targets) {
				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (Math.abs(dy) === Math.abs(dx)) continue

						if (
							map[units[target].y + dy][units[target].x + dx] === '.' ||
							(units[target].y + dy === units[i].y &&
								units[target].x + dx === units[i].x)
						) {
							inRange.push({
								target,
								x: units[target].x + dx,
								y: units[target].y + dy
							})
						}
					}
				}
			}

			// no squares in range, end turn
			if (inRange.length < 1) {
				continue
			}

			const isInRange = () => {
				return inRange.reduce(
					(a, c) => a || (c.x === units[i].x && c.y === units[i].y),
					false
				)
			}

			if (!isInRange()) {
				// not in range, move
				const contains = (search, elem) => {
					for (point of search) {
						if (elem.x === point.x && elem.y === point.y) return point
					}
					return false
				}

				const findNearest = (search, x, y, u) => {
					let reached = [[{ x, y }]]
					while (reached[reached.length - 1].length > 0) {
						let last = reached[reached.length - 1]
						reached.push([])
						let newReached = reached[reached.length - 1]

						let hasReached = false
						for (let index = 0; index < last.length; index++) {
							let lastReached = last[index]
							let prevReached = reached.slice(0, reached.length - 1)
							for (let dy = -1; dy <= 1; dy++) {
								for (let dx = -1; dx <= 1; dx++) {
									if (Math.abs(dy) === Math.abs(dx)) continue

									let test = {
										x: lastReached.x + dx,
										y: lastReached.y + dy,
										last: [index]
									}

									if (u[test.y][test.x] !== '.') continue
									if (
										prevReached.reduce((a, c) => a || contains(c, test), false)
									)
										continue

									// if this layer has already reached it, just add this to its last
									let pointInNewReached = contains(newReached, test)
									if (pointInNewReached) {
										pointInNewReached.last.push(index)
										pointInNewReached.last.sort((a, b) => a - b)
									} else {
										// test if this is one of the squares that we're looking for
										if (
											contains(
												search.map(s => {
													return { x: s.x, y: s.y }
												}),
												test
											)
										) {
											hasReached = true
											test.reached = true
										}

										newReached.push(test)
									}
								}
							}
						}

						// sort reading order
						newReached.sort((a, b) => {
							if (a.y !== b.y) {
								return a.y - b.y
							} else if (a.x !== b.x) return a.x - b.x
							else return a.last - b.last
						})

						if (hasReached) {
							// return newReached.filter(p => p.reached)[0]
							return reached
						}
					}
				}

				let path = findNearest(inRange, units[i].x, units[i].y, map)
				if (!path) continue

				// make the move towards nearest
				// console.log(path)
				// return

				// the nearest reached squares are reading-order, find the first reached square that is in reading order
				let initialIndex = 0
				for (; initialIndex < path[path.length - 1].length; initialIndex++) {
					if (path[path.length - 1][initialIndex].reached) break
				}

				// return
				// propogate backwards along the path
				let current = path[path.length - 1][initialIndex]
				for (let index = path.length - 2; index > 0; index--) {
					current = path[index][current.last[0]]
					// console.log(path[index])
					// console.log(current)
				}
				// return

				// move the unit and modify the map
				map[units[i].y][units[i].x] = '.'

				units[i].x = current.x
				units[i].y = current.y

				map[units[i].y][units[i].x] = units[i].type
			}

			if (!isInRange()) {
				// still not not in range, end turn
				continue
			} else {
				// in range

				// find adjacent targets
				let targets = []

				for (let dy = -1; dy <= 1; dy++) {
					for (let dx = -1; dx <= 1; dx++) {
						if (Math.abs(dy) === Math.abs(dx)) continue

						if (
							map[units[i].y + dy][units[i].x + dx] ===
							(units[i].type === 'G' ? 'E' : 'G')
						) {
							targets.push(
								units.filter(
									u => u.x === units[i].x + dx && u.y === units[i].y + dy
								)[0]
							)
						}
					}
				}

				// sort targets via hp, then reading order
				targets.sort((a, b) => {
					if (a.hp !== b.hp) {
						return a.hp - b.hp
					} else if (a.y !== b.y) {
						return a.y - b.y
					} else return a.x - b.x
				})

				// attack the first target
				targets[0].hp -= 3
				if (targets[0].hp <= 0) {
					let index = 0
					for (; index < units.length; index++) {
						if (
							targets[0].x === units[index].x &&
							targets[0].y === units[index].y
						) {
							break
						}
					}
					map[targets[0].y][targets[0].x] = '.'
					units.splice(index, 1)

					// if the unit that dies comes before index, compensate for loop
					if (index < i) i--
				}
			}
		}
		map.forEach(r => {
			console.log(r.reduce((a, c) => a + c, ''))
			strmaps += r.reduce((a, c) => a + c, '') + '\n'
		})
		strmaps += '\n'
		console.log('\n')
		// sort units by reading order
		units.sort((a, b) => {
			return a.y === b.y ? a.x - b.x : a.y - b.y
		})

		units.forEach(u => {
			str += JSON.stringify(u) + '\n'
		})const fs = require('fs')
    const GOBLIN_POWER = 3
    
    let readInput = () => {
      let res = fs.readFileSync('./test', 'utf8')
    
      let inputs = res.toString().split('\n')
    
      return inputs
    }
    
    let initialize = inputs => {
      let board = Array(inputs.length)
        .fill()
        .map(() => [])
      let elves = new Map()
      let goblins = new Map()
      // {i, j, hitPoints = 200 }
    
      for (let i = 0; i < inputs.length; i++) {
        for (let j = 0; j < inputs[0].length; j++) {
          board[j][i] = inputs[i][j]
          if (inputs[i][j] === 'E') {
            let elf = { x: j, y: i, u: 'E', hitPoints: 200 }
            elves.set(elf.y * 100 + elf.x, elf)
          }
          if (inputs[i][j] === 'G') {
            let goblin = { x: j, y: i, u: 'G', hitPoints: 200 }
            goblins.set(goblin.y * 100 + goblin.x, goblin)
          }
        }
      }
    
      return [board, elves, goblins]
    }
    
    let unitsort = (u1, u2) => {
      if (u1.y !== u2.y) {
        return u1.y - u2.y
      }
      return u1.x - u2.x
    }
    let arraysort = (a, b) => {
      if (a[1] === b[1]) {
        return a[0] - b[0]
      }
      return a[1] - b[1]
    }
    
    let sortUnits = (elves, goblins) => {
      return [...elves.entries(), ...goblins.entries()].sort((a, b) => {
        return a[0] - b[0]
      })
    }
    
    let unique = (e, i, a) => {
      return a.findIndex(el => el[0] === e[0] && el[1] === e[1]) === i
    }
    
    let distance = (src, target, board) => {
      let sx = src.x
      let sy = src.y
      let tx = target[0]
      let ty = target[1]
      if (sx === tx && sy === ty) {
        return [0, []]
      }
    
      let visited = new Set()
    
      let reachable = [[sy * 100 + sx, [sx, sy]]]
      let newReachable = []
    
      let dist = 0
      let searching = true
      let firstSteps = []
    
      while (dist < board.length * board[0].length && searching) {
        for (let [hash, pos] of reachable) {
          let firstStep = [pos[2], pos[3]]
          let [x, y] = pos
          if (x === tx && y === ty) {
            // reached the target
            searching = false
            firstSteps.push(firstStep)
            continue
          }
          if (y - 1 >= 0 && board[x][y - 1] === '.') {
            firstStep = dist === 0 ? [x, y - 1] : firstStep
            newReachable.push([x, y - 1, ...firstStep])
          }
          if (x - 1 >= 0 && board[x - 1][y] === '.') {
            firstStep = dist === 0 ? [x - 1, y] : firstStep
            newReachable.push([x - 1, y, ...firstStep])
          }
          if (x + 1 < board.length && board[x + 1][y] === '.') {
            firstStep = dist === 0 ? [x + 1, y] : firstStep
            newReachable.push([x + 1, y, ...firstStep])
          }
          if (y + 1 < board[0].length && board[x][y + 1] === '.') {
            firstStep = dist === 0 ? [x, y + 1] : firstStep
            newReachable.push([x, y + 1, ...firstStep])
          }
        }
    
        newReachable.sort((a, b) => {
          if (a[1] === b[1]) {
            if (a[0] === b[0]) {
              if (a[3] === b[3]) {
                return a[2] - b[2]
              }
              return a[3] - b[3]
            }
            return a[0] - b[0]
          }
          return a[1] - b[1]
        })
    
        let reachablesMap = new Map()
        for (let square of newReachable) {
          const hash = square[1] * 100 + square[0]
          if (!reachablesMap.has(hash) && !visited.has(hash)) {
            reachablesMap.set(hash, square)
            visited.add(hash)
          }
        }
    
        reachable = [...reachablesMap.entries()].sort((a, b) => {
          return a[0] - b[0]
        })
    
        newReachable = []
        dist++
      }
    
      if (searching) {
        return [Number.MAX_SAFE_INTEGER, []]
      }
      dist--
      firstSteps.sort(arraysort)
      return [dist, firstSteps[0]]
    }
    
    let getDirection = (unit, opponents, board) => {
      let inRange = []
    
      for (let oppenent of [...opponents.values()]) {
        let [ox, oy] = [oppenent.x, oppenent.y]
    
        if (
          oy - 1 >= 0 &&
          (board[ox][oy - 1] === '.' || (ox === unit.x && oy - 1 === unit.y))
        ) {
          inRange.push([ox, oy - 1])
        }
        if (
          ox - 1 >= 0 &&
          (board[ox - 1][oy] === '.' || (ox - 1 === unit.x && oy === unit.y))
        ) {
          inRange.push([ox - 1, oy])
        }
        if (
          ox + 1 < board.length &&
          (board[ox + 1][oy] === '.' || (ox + 1 === unit.x && oy === unit.y))
        ) {
          inRange.push([ox + 1, oy])
        }
        if (
          oy + 1 < board[0].length &&
          (board[ox][oy + 1] === '.' || (ox === unit.x && oy + 1 === unit.y))
        ) {
          inRange.push([ox, oy + 1])
        }
      }
    
      inRange = inRange.filter(unique).sort(arraysort)
    
      let rightStep
      let min = Number.MAX_SAFE_INTEGER
      for (let range of inRange) {
        let [d, firstStep] = distance(unit, range, board)
        if (d < min) {
          min = d
          rightStep = firstStep
        }
      }
    
      return [min, rightStep]
    }
    
    let print = board => {
      console.log()
      let row = ''
      for (let i = 0; i < board[0].length; i++) {
        for (let j = 0; j < board.length; j++) {
          row = row + board[j][i]
        }
        console.log(row)
        row = ''
      }
    }
    
    let findTargets = (unit, opponents, board) => {
      let letter = unit.u
      let x = unit.x
      let y = unit.y
      let targets = []
    
      let targetLetter = 'G'
      if (letter === targetLetter) {
        targetLetter = 'E'
      }
    
      if (y - 1 >= 0 && board[x][y - 1] === targetLetter) {
        targets.push([x, y - 1])
      }
      if (x - 1 >= 0 && board[x - 1][y] === targetLetter) {
        targets.push([x - 1, y])
      }
      if (x + 1 < board.length && board[x + 1][y] === targetLetter) {
        targets.push([x + 1, y])
      }
      if (y + 1 < board[0].length && board[x][y + 1] === targetLetter) {
        targets.push([x, y + 1])
      }
    
      let ops = []
      for (let target of targets) {
        let hash = target[1] * 100 + target[0]
        if (opponents.has(hash)) {
          ops.push(opponents.get(hash))[1]
        }
      }
    
      return ops
    }
    
    let attack = (unit, opponents, board, elfPower) => {
      let targets = findTargets(unit, opponents, board)
      if (targets.length === 0) {
        // nobody to attack
        print(board)
        console.log(opponents)
        console.log(`this should not happen for ${unit.x}, ${unit.y}, ${unit.u}`)
      }
    
      let minHitPoints = Number.MAX_SAFE_INTEGER
      for (let target of targets) {
        if (target.hitPoints < minHitPoints) {
          minHitPoints = target.hitPoints
        }
      }
    
      targets = targets.filter(t => t.hitPoints === minHitPoints).sort(unitsort)
    
      let dead
      let power = targets[0].u === 'G' ? elfPower : GOBLIN_POWER
    
      if (minHitPoints > power) {
        targets[0].hitPoints -= power
      } else {
        dead = targets[0]
        // console.log(`${dead.u} died`);
        dead.dead = true
        opponents.delete(dead.y * 100 + dead.x)
        board[dead.x][dead.y] = '.'
      }
      // console.log(`new size: ${opponents.size}`)
      return opponents
    }
    
    let main = async () => {
      elfPower = 3
      let initialElves
      while (elfPower === 3) {
        let inputs = await readInput()
        let [board, elves, goblins] = initialize(inputs)
        initialElves = elves.size
        let units = sortUnits(elves, goblins)
    
        let count = 0
    
        let ops = true
        // print(board);
        let str = ''
        while (ops && count < 300) {
          for (let [hash, unit] of units) {
            if (unit.dead) {
              continue
            }
            let opponents = elves
            if (unit.u === 'E') {
              opponents = goblins
            }
    
            if (opponents.size === 0) {
              // No more opponents
              ops = false
              break
            }
    
            let [d, firstStep] = getDirection(unit, opponents, board)
            if (firstStep) {
              if (firstStep.length > 0) {
                board[unit.x][unit.y] = '.'
                ;[unit.x, unit.y] = firstStep
                if (unit.u === 'E') {
                  elves.delete(hash)
                  elves.set(100 * unit.y + unit.x, unit)
                } else {
                  goblins.delete(hash)
                  goblins.set(100 * unit.y + unit.x, unit)
                }
                board[unit.x][unit.y] = unit.u
              } else {
              }
              if (d <= 1) {
                let newOpponents = attack(unit, opponents, board, elfPower)
                if (unit.u === 'E') {
                  goblins = newOpponents
                } else {
                  if (opponents.length > newOpponents.length) {
                    // elf died
                    ops = false
                  }
                  elves = newOpponents
                }
              }
            } else {
            }
            first = false
          }
          // print(board);
          units = sortUnits(elves, goblins)
    
          // console.log(units)
          units.forEach(u => {
            u = {
              type: u[1].u,
              x: u[1].x,
              y: u[1].y,
              hp: u[1].hitPoints
            }
            str += JSON.stringify(u) + '\n'
          })
    
          str += '\n'
          count++
        }
    
        fs.writeFileSync('out1', str, 'utf8')
        count--
        let power = 0
        for (let goblin of [...goblins.values()].sort(unitsort)) {
          // console.log(goblin)
          power += goblin.hitPoints
        }
        for (let elf of [...elves.values()]) {
          // console.log(elf);
          power += elf.hitPoints
        }
        console.log(
          `Power ${elfPower}: ${count} * ${power}, product ${power * count}`
        )
        if (goblins.size === 0 && elves.size === initialElves) {
          return
        }
        elfPower++
      }
    }
    
    main()
    
		str += '\n'

		rounds++
	}
})
