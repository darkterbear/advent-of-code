from math import floor


def run(input, output, program, returnOnFirstOutput):
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
                mem.extend(
                    [0 for _ in range(raw + relativeBase - len(mem) + 1)])
            return mem[raw + relativeBase]

    def assign(target, mem, value, mode=0):
        if mode == 2:
            target += relativeBase
        if target >= len(mem):
            mem.extend([0 for _ in range(target - len(mem) + 1)])
        mem[target] = value

    cur = 0
    relativeBase = 0
    while (program[cur] % 100 != 99):
        inst = program[cur]
        opcode = inst % 100
        c = (inst // 100) % 10
        b = (inst // 1000) % 10
        a = (inst // 10000) % 10

        if opcode == 1:
            target = program[cur + 3]
            p1 = program[cur + 1]
            p2 = program[cur + 2]

            n1 = getValue(c, p1, program)
            n2 = getValue(b, p2, program)

            assign(target, program, n1 + n2, a)
            cur += 4
        elif opcode == 2:
            target = program[cur + 3]
            p1 = program[cur + 1]
            p2 = program[cur + 2]

            n1 = getValue(c, p1, program)
            n2 = getValue(b, p2, program)

            assign(target, program, n1 * n2, a)
            cur += 4
        elif opcode == 3:
            target = program[cur + 1]
            assign(target, program, input.pop(0), c)
            cur += 2
        elif opcode == 4:
            p1 = program[cur + 1]
            value = getValue(c, p1, program)

            if returnOnFirstOutput:
                return value
            output(value)

            cur += 2
        elif opcode == 5:
            p1 = program[cur + 1]
            p2 = program[cur + 2]

            if (getValue(c, p1, program)):
                cur = getValue(b, p2, program)
            else:
                cur += 3
        elif opcode == 6:
            p1 = program[cur + 1]
            p2 = program[cur + 2]
            if not (getValue(c, p1, program)):
                cur = getValue(b, p2, program)
            else:
                cur += 3
        elif opcode == 7:
            p1 = program[cur + 1]
            p2 = program[cur + 2]
            target = program[cur + 3]

            n1 = getValue(c, p1, program)
            n2 = getValue(b, p2, program)

            assign(target, program, 1 if n1 < n2 else 0, a)
            cur += 4
        elif opcode == 8:
            p1 = program[cur + 1]
            p2 = program[cur + 2]
            target = program[cur + 3]

            n1 = getValue(c, p1, program)
            n2 = getValue(b, p2, program)

            assign(target, program, 1 if n1 == n2 else 0, a)
            cur += 4
        elif opcode == 9:
            p = program[cur + 1]
            n = getValue(c, p, program)
            relativeBase += n
            cur += 2
        else:
            break

    # print('HALT')


file = open('./input')
nums = [int(s) for s in file.readline().split(',')]


def go():
    y = 1550
    while True:
        x = floor(0.7 * y)
        while not run([x, y], print, nums[:], True):
            print(x, y)
            x += 1
        print(x, y)
        if run([x + 99, y - 99], print, nums[:], True):
            print('success', x, y)
            return
        y += 1


go()
