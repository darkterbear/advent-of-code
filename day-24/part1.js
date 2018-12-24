// let groups = [
// 	{
// 		team: 'immune',
// 		numUnits: 17,
// 		hp: 5390,
// 		immune: [],
// 		weak: ['radiation', 'bludgeoning'],
// 		attack: { dmg: 4507, type: 'fire', init: 2 }
// 	},
// 	{
// 		team: 'immune',
// 		numUnits: 989,
// 		hp: 1274,
// 		immune: ['fire'],
// 		weak: ['slashing', 'bludgeoning'],
// 		attack: { dmg: 25, type: 'slashing', init: 3 }
// 	},
// 	{
// 		team: 'infection',
// 		numUnits: 801,
// 		hp: 4706,
// 		immune: [],
// 		weak: ['radiation'],
// 		attack: { dmg: 116, type: 'bludgeoning', init: 1 }
// 	},
// 	{
// 		team: 'infection',
// 		numUnits: 4485,
// 		hp: 2961,
// 		immune: ['radiation'],
// 		weak: ['fire', 'cold'],
// 		attack: { dmg: 12, type: 'slashing', init: 4 }
// 	}
// ]

let immune = require('fs').readFileSync('immune', 'utf8')
let infection = require('fs').readFileSync('infection', 'utf8')

let getGroup = l => {
	let params = l.split(/(hit points)|(with an attack that does)/g)
	// console.log(params)

	let group = {}

	let basics = params[0].match(/[0-9]+/g)
	group.numUnits = Number(basics[0])
	group.hp = Number(basics[1])

	let specials = params[3]
	if (specials.length > 2) {
		specials = specials.substring(2, specials.length - 2)
		specials = specials.split('; ')

		for (spec of specials) {
			if (spec.startsWith('weak')) {
				let elements = spec.substring(8).split(', ')
				group.weak = elements
			} else {
				let elements = spec.substring(10).split(', ')
				group.immune = elements
			}
		}
	}

	let attack = params[6].split(' ')
	let attackType = attack[2]
	let attackDmg = Number(attack[1])
	let attackInit = Number(attack[6])

	group.attack = {
		type: attackType,
		dmg: attackDmg,
		init: attackInit
	}

	if (!group.weak) group.weak = []
	if (!group.immune) group.immune = []

	return group
}

let groups = []
groups = groups.concat(
	infection.split('\n').map(l => {
		let group = getGroup(l)
		group.team = 'infection'
		return group
	})
)

groups = groups.concat(
	immune.split('\n').map(l => {
		let group = getGroup(l)
		group.team = 'immune'
		return group
	})
)

let ended = () => {
	let numImmune = groups.filter(g => g.team === 'immune').length
	let numInfection = groups.filter(g => g.team === 'infection').length

	return numImmune === 0 || numInfection === 0
}

let effPower = g => {
	return g.attack.dmg * g.numUnits
}

let calcDmg = (attacker, defender) => {
	if (defender.immune.includes(attacker.attack.type)) return 0
	if (defender.weak.includes(attacker.attack.type))
		return effPower(attacker) * 2
	return effPower(attacker)
}

while (!ended()) {
	// target selection

	// sort by effective power, then by init
	groups.sort((a, b) => {
		let bEP = b.numUnits * b.attack.dmg
		let aEP = a.numUnits * a.attack.dmg

		if (bEP !== aEP) return bEP - aEP
		else return b.attack.init - a.attack.init
	})

	for (g of groups) {
		// group g chooses target

		let targets = groups
			.filter(t => t.team !== g.team)
			.sort((t1, t2) => {
				let dmg1 = calcDmg(g, t1)
				let dmg2 = calcDmg(g, t2)

				if (dmg1 !== dmg2) return dmg2 - dmg1

				let effPower1 = effPower(t1)
				let effPower2 = effPower(t2)

				if (effPower1 !== effPower2) return effPower2 - effPower1

				return t2.attack.init - t1.attack.init
			})
			.filter(t => !t.targetted)

		if (targets.length === 0) continue
		let target = targets[0]
		if (calcDmg(g, target) === 0) continue
		g.target = target

		target.targetted = true
	}

	// attack
	groups.sort((a, b) => b.attack.init - a.attack.init)

	for (i = 0; i < groups.length; i++) {
		let g = groups[i]
		if (!g.target) continue
		let target = g.target
		let totalDmg = calcDmg(g, target)

		let numKilled = Math.floor(totalDmg / target.hp)

		target.numUnits -= numKilled

		if (target.numUnits <= 0) {
			// the target just died, delete from groups
			let index = 0
			while (groups[index].numUnits !== target.numUnits) index++
			groups.splice(index, 1)
			if (index < i) i--
		}
	}

	// clear targetting data
	for (g of groups) {
		g.targetted = false
		g.target = null
	}
}

console.log(groups.reduce((a, c) => a + c.numUnits, 0))
