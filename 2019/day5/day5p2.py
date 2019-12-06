file = open('./input')

input = 5


def output(code):
    print(code)


nums = [int(s) for s in file.readline().split(',')]

cur = 0
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

        n1 = p1 if c else nums[p1]
        n2 = p2 if b else nums[p2]

        nums[target] = n1 + n2
        cur += 4
    elif opcode == 2:
        target = nums[cur + 3]
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]

        n1 = p1 if c else nums[p1]
        n2 = p2 if b else nums[p2]

        nums[target] = n1 * n2
        cur += 4
    elif opcode == 3:
        target = nums[cur + 1]
        nums[target] = input
        cur += 2
    elif opcode == 4:
        p1 = nums[cur + 1]
        output(p1 if c else nums[p1])
        cur += 2
    elif opcode == 5:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        if (p1 if c else nums[p1]):
            cur = p2 if b else nums[p2]
        else:
            cur += 3
    elif opcode == 6:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        if not (p1 if c else nums[p1]):
            cur = p2 if b else nums[p2]
        else:
            cur += 3
    elif opcode == 7:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        target = nums[cur + 3]

        n1 = p1 if c else nums[p1]
        n2 = p2 if b else nums[p2]

        nums[target] = 1 if n1 < n2 else 0
        cur += 4
    elif opcode == 8:
        p1 = nums[cur + 1]
        p2 = nums[cur + 2]
        target = nums[cur + 3]

        n1 = p1 if c else nums[p1]
        n2 = p2 if b else nums[p2]

        nums[target] = 1 if n1 == n2 else 0
        cur += 4
    else:
        break

print('HALT')
