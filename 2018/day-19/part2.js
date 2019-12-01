let reg2 = 10551376

let reg0 = 0
for (let reg1 = 1; reg1 <= reg2; reg1++) {
  if (reg2 % reg1 === 0) reg0 += reg1
}

console.log(reg0)
