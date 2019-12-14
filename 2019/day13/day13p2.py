file = open('./input')

input = 0
gameMap = {}
cycle = 0

bufferX = None
bufferY = None
score = 0

ballX = None
paddleX = None


def printGameMap():
    minX = min(gameMap, key=lambda loc: loc[1])[1]
    minY = min(gameMap, key=lambda loc: loc[0])[0]
    maxX = max(gameMap, key=lambda loc: loc[1])[1]
    maxY = max(gameMap, key=lambda loc: loc[0])[0]

    for row in range(minY, maxY + 1):
        s = ''
        for col in range(minX, maxX + 1):
            if (row, col) in gameMap:
                if gameMap[(row, col)] == 0:
                    s += ' '
                if gameMap[(row, col)] == 1:
                    s += '#'
                if gameMap[(row, col)] == 2:
                    s += '='
                if gameMap[(row, col)] == 3:
                    s += '_'
                if gameMap[(row, col)] == 4:
                    s += 'O'
        print(s)


def output(x):
    global cycle
    global bufferX
    global bufferY
    global paddleX, ballX
    global input
    global score

    if cycle == 0:
        bufferX = x
        cycle += 1
    elif cycle == 1:
        bufferY = x
        cycle += 1
    elif cycle == 2:
        if bufferX == -1 and bufferY == 0:
            score = x
        else:
            gameMap[(bufferY, bufferX)] = x

            if x == 4:
                ballX = bufferX
            if x == 3:
                paddleX = bufferX

            print(ballX, paddleX)
            if (ballX is not None and paddleX is not None):
                if ballX == paddleX:
                    input = 0
                else:
                    input = (ballX - paddleX) / abs(ballX - paddleX)

            # printGameMap()
            # print(score)
        cycle = 0


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

printGameMap()
print(score)
