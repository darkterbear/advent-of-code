file = open('./input')
program = [int(s) for s in file.readline().split(',')]
nums = [program[:] for _ in range(50)]
cur = [0 for _ in range(50)]
relativeBase = cur[:]
machine = 0

machineAssigned = [False for _ in range(50)]
inputs = [[] for _ in range(50)]
outputBuffers = [[] for _ in range(50)]


def output(machine, value):
    outputBuffers[machine].append(value)
    if len(outputBuffers[machine]) == 3:
        packet = outputBuffers[machine]

        if packet[0] == 255:
            print(packet)
            return
        inputs[packet[0]].extend(packet[1:])
        outputBuffers[machine] = []


def getInput(machine):
    if not machineAssigned[machine]:
        machineAssigned[machine] = True
        return machine
    if len(inputs[machine]) > 0:
        return inputs[machine].pop(0)
    return -1


def getValue(mode, raw, mem, relativeBase):
    if mode == 0:
        # position
        if (raw >= len(mem)):
            mem.extend([0 for _ in range(raw - len(mem) + 1)])
        return mem[raw]
    if mode == 1:
        # value
        return raw
    if mode == 2:
        # relative
        if (raw + relativeBase >= len(mem)):
            mem.extend([0 for _ in range(raw + relativeBase - len(mem) + 1)])
        return mem[raw + relativeBase]


def assign(target, mem, value, relativeBase, mode=0):
    if mode == 2:
        target += relativeBase
    if target >= len(mem):
        mem.extend([0 for _ in range(target - len(mem) + 1)])
    mem[target] = value


while True:
    inst = nums[machine][cur[machine]]
    opcode = inst % 100
    c = (inst // 100) % 10
    b = (inst // 1000) % 10
    a = (inst // 10000) % 10

    if opcode == 1:
        target = nums[machine][cur[machine] + 3]
        p1 = nums[machine][cur[machine] + 1]
        p2 = nums[machine][cur[machine] + 2]

        n1 = getValue(c, p1, nums[machine], relativeBase[machine])
        n2 = getValue(b, p2, nums[machine], relativeBase[machine])

        assign(target, nums[machine], n1 + n2, relativeBase[machine], a)
        cur[machine] += 4
    elif opcode == 2:
        target = nums[machine][cur[machine] + 3]
        p1 = nums[machine][cur[machine] + 1]
        p2 = nums[machine][cur[machine] + 2]

        n1 = getValue(c, p1, nums[machine], relativeBase[machine])
        n2 = getValue(b, p2, nums[machine], relativeBase[machine])

        assign(target, nums[machine], n1 * n2, relativeBase[machine], a)
        cur[machine] += 4
    elif opcode == 3:
        target = nums[machine][cur[machine] + 1]
        assign(target, nums[machine], getInput(
            machine), relativeBase[machine], c)
        cur[machine] += 2
    elif opcode == 4:
        p1 = nums[machine][cur[machine] + 1]
        output(machine, getValue(c, p1, nums[machine], relativeBase[machine]))
        cur[machine] += 2
    elif opcode == 5:
        p1 = nums[machine][cur[machine] + 1]
        p2 = nums[machine][cur[machine] + 2]

        if (getValue(c, p1, nums[machine], relativeBase[machine])):
            cur[machine] = getValue(
                b, p2, nums[machine], relativeBase[machine])
        else:
            cur[machine] += 3
    elif opcode == 6:
        p1 = nums[machine][cur[machine] + 1]
        p2 = nums[machine][cur[machine] + 2]
        if not (getValue(c, p1, nums[machine], relativeBase[machine])):
            cur[machine] = getValue(
                b, p2, nums[machine], relativeBase[machine])
        else:
            cur[machine] += 3
    elif opcode == 7:
        p1 = nums[machine][cur[machine] + 1]
        p2 = nums[machine][cur[machine] + 2]
        target = nums[machine][cur[machine] + 3]

        n1 = getValue(c, p1, nums[machine], relativeBase[machine])
        n2 = getValue(b, p2, nums[machine], relativeBase[machine])

        assign(target, nums[machine], 1 if n1 <
               n2 else 0, relativeBase[machine], a)
        cur[machine] += 4
    elif opcode == 8:
        p1 = nums[machine][cur[machine] + 1]
        p2 = nums[machine][cur[machine] + 2]
        target = nums[machine][cur[machine] + 3]

        n1 = getValue(c, p1, nums[machine], relativeBase[machine])
        n2 = getValue(b, p2, nums[machine], relativeBase[machine])

        assign(target, nums[machine], 1 if n1 ==
               n2 else 0, relativeBase[machine], a)
        cur[machine] += 4
    elif opcode == 9:
        p = nums[machine][cur[machine] + 1]
        n = getValue(c, p, nums[machine], relativeBase[machine])
        relativeBase[machine] += n
        cur[machine] += 2
    machine = (machine + 1) % 50
