import termios
import tty
import sys
import time
file = open('./input')

stdin = 1
# 1: N
# 2: S
# 3: W
# 4: E

pos = (0, 0)
m = {
    (0, 0): '.'
}
path = [(0, 0)]


class _Getch:
    def __call__(self):
        fd = sys.stdin.fileno()
        old_settings = termios.tcgetattr(fd)
        try:
            tty.setraw(sys.stdin.fileno())
            ch = sys.stdin.read(3)
        finally:
            termios.tcsetattr(fd, termios.TCSADRAIN, old_settings)
        return ch


def arrowKey():
    inkey = _Getch()
    while(1):
        k = inkey()
        if k != '':
            break
    if k == '\x1b[A':
        return 1
    elif k == '\x1b[B':
        return 2
    elif k == '\x1b[C':
        return 4
    elif k == '\x1b[D':
        return 3


# given the current known map, current position,
# and path from origin, determine where to go next


def traverse(m, pos, path):
    upTarget = targetLoc(pos, 1)
    downTarget = targetLoc(pos, 2)
    leftTarget = targetLoc(pos, 3)
    rightTarget = targetLoc(pos, 4)

    for direction in range(1, 5):
        if targetLoc(pos, direction) not in m:
            return direction

    # all 4 surroundings explored, return return to where we came from
    prev = path[1]
    if prev[0] - pos[0] == 1:
        return 2
    if pos[0] - prev[0] == 1:
        return 1
    if prev[1] - pos[1] == 1:
        return 4
    if pos[1] - prev[1] == 1:
        return 3


def targetLoc(currentPos, direction):
    if direction == 1:
        return (currentPos[0] - 1, currentPos[1])
    elif direction == 2:
        return (currentPos[0] + 1, currentPos[1])
    elif direction == 3:
        return (currentPos[0], currentPos[1] - 1)
    elif direction == 4:
        return (currentPos[0], currentPos[1] + 1)


def printMap():
    minY = min(m, key=lambda loc: loc[0])[0]
    minX = min(m, key=lambda loc: loc[1])[1]
    maxY = max(m, key=lambda loc: loc[0])[0]
    maxX = max(m, key=lambda loc: loc[1])[1]

    for i in range(minY, maxY + 1):
        s = ''
        for j in range(minX, maxX + 1):
            if pos == (i, j):
                s += 'X'
                continue
            if (i, j) in m:
                s += m[(i, j)]
            else:
                s += ' '
        print(s)


def output(x):
    global stdin
    global pos

    target = targetLoc(pos, stdin)

    if x == 0:
        # hit a wall
        m[target] = '#'
    elif x == 1:
        # moved
        m[target] = '.'
        pos = target

        if len(path) > 1 and target == path[1]:
            path.pop(0)
        else:
            path.insert(0, target)
    elif x == 2:
        # found oxygen tank
        m[target] = 'O'
        pos = target

        if len(path) > 1 and target == path[1]:
            path.pop(0)
        else:
            path.insert(0, target)

    printMap()
    print()
    # stdin = int(arrowKey())
    stdin = traverse(m, pos, path)
    print(stdin)
    time.sleep(0.01)


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
        assign(target, nums, stdin, c)
        cur += 2
    elif opcode == 4:
        p1 = nums[cur + 1]
        output(getValue(c, p1, nums))
        print('next')
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
