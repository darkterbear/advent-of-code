file = open('./input')

canvas = {}
position = (0, 0)
direction = 0
input = 0

paint = True


def output(x):
    global input
    global position
    global direction
    global paint

    if paint:
        canvas[position] = x
    else:
        if x == 0:
            direction -= 1
        if x == 1:
            direction += 1

        if direction < 0:
            direction = 3
        elif direction > 3:
            direction = 0

        if direction == 0:  # up
            position = (position[0] - 1, position[1])
        if direction == 1:  # right
            position = (position[0], position[1] + 1)
        if direction == 2:  # down
            position = (position[0] + 1, position[1])
        if direction == 3:  # left
            position = (position[0], position[1] - 1)
        input = canvas[position] if position in canvas else 0

    paint = not paint


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

print(len(canvas))
