file = open('./input')


def buildPermutations(nums):
    if len(nums) == 1:
        return [nums]

    total = []
    for i in range(len(nums)):
        total.extend([subperm + [nums[i]]
                      for subperm in buildPermutations(nums[:i] + nums[i + 1:])])

    return total


def runProgram(nums, input, output):
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
            nums[target] = input.pop(0)
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


nums = [int(s) for s in file.readline().split(',')]


def run():
    highest = 0
    for permutation in buildPermutations([0, 1, 2, 3, 4]):
        nextInput = 0

        def output(x):
            nonlocal nextInput
            nextInput = x

        def eOutput(x):
            nonlocal highest
            if x > highest:
                highest = x

        for i in range(len(permutation) - 1):
            phase = permutation[i]
            runProgram(nums[:], [phase, nextInput], output)

        phase = permutation[-1]
        runProgram(nums[:], [phase, nextInput], eOutput)
    print(highest)


run()
