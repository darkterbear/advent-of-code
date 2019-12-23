file = open('./input')

input = [65, 44, 67, 44, 67, 44, 66, 44, 66, 44, 65, 44, 65, 44, 67, 44, 67, 44, 66, 10, 76, 44, 49, 50, 44, 82, 44, 52, 44, 82, 44, 52, 10,
         82, 44, 49, 50, 44, 82, 44, 52, 44, 76, 44, 54, 44, 76, 44, 56, 44, 76, 44, 56, 10, 82, 44, 49, 50, 44, 82, 44, 52, 44, 76, 44, 49, 50, 10, 10, 10, 10]
m = [[]]


def output(code):
    lastLine = m[-1]
    if code >= 128:
        print(code)
    elif code == 10:
        m.append([])
    else:
        lastLine.append(chr(code))


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
nums[0] = 2

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
        assign(target, nums, input.pop(0), c)
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

m.pop()
m.pop()
# print(m)
for line in m:
    s = ''
    for c in line:
        s += c
    print(s)
