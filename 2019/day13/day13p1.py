file = open('./input')

input = 0
gameMap = {}
cycle = 0

bufferX = None
bufferY = None

count = 0


def output(x):
    global count
    global cycle
    global bufferX
    global bufferY

    if cycle == 0:
        bufferX = x
        cycle += 1
    elif cycle == 1:
        bufferY = x
        cycle += 1
    elif cycle == 2:
        gameMap[(bufferY, bufferX)] = x
        cycle = 0
        if x == 2:
            count += 1


def getValue(mode, raw, mem):
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


def assign(target, mem, value, mode=0):
    if mode == 2:
        target += relativeBase
    if target >= len(mem):
        mem.extend([0 for _ in range(target - len(mem) + 1)])
    mem[target] = value


nums = [int(s) for s in file.readline().split(',')]

cur = 0
relativeBase = 0
while (nums[cur] % 100 != 99):
    inst = nums[cur]
    opcode = inst % 100
    c = (inst // 100) % 10
    b = (inst // 1000) % 10
    a = (inst // 10000) % 10

    if opcode == 1:
        target = nums[cur + 3]
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]

        n1 = getValue(c, p1, nums)
        n2 = getValue(b, p2, nums)

        assign(target, nums, n1 + n2, a)
        cur += 4
    elif opcode == 2:
        target = nums[cur + 3]
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]

        n1 = getValue(c, p1, nums)
        n2 = getValue(b, p2, nums)

        assign(target, nums, n1 * n2, a)
        cur += 4
    elif opcode == 3:
        target = nums[cur + 1]
        assign(target, nums, input, c)
        cur += 2
    elif opcode == 4:
        p1 = nums[cur + 1]
        output(getValue(c, p1, nums))
        cur += 2
    elif opcode == 5:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]

        if (getValue(c, p1, nums)):
            cur = getValue(b, p2, nums)
        else:
            cur += 3
    elif opcode == 6:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        if not (getValue(c, p1, nums)):
            cur = getValue(b, p2, nums)
        else:
            cur += 3
    elif opcode == 7:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        target = nums[cur + 3]

        n1 = getValue(c, p1, nums)
        n2 = getValue(b, p2, nums)

        assign(target, nums, 1 if n1 < n2 else 0, a)
        cur += 4
    elif opcode == 8:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        target = nums[cur + 3]

        n1 = getValue(c, p1, nums)
        n2 = getValue(b, p2, nums)

        assign(target, nums, 1 if n1 == n2 else 0, a)
        cur += 4
    elif opcode == 9:
        p = nums[cur + 1]
        n = getValue(c, p, nums)
        relativeBase += n
        cur += 2
    else:
        break

print(count)
