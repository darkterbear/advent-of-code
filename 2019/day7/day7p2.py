file = open('./input')


def buildPermutations(nums):
    if len(nums) == 1:
        return [nums]

    total = []
    for i in range(len(nums)):
        total.extend([subperm + [nums[i]]
                      for subperm in buildPermutations(nums[:i] + nums[i + 1:])])

    return total


def runProgram(nums, phases):
    curs = [0, 0, 0, 0, 0]
    proc = 0
    procInput = [0]
    takenPhase = [False, False, False, False, False]

    finalOutput = None
    while any([cur >= 0 for cur in curs]):
        # while (nums[proc][curs[proc]] % 100 != 99):
        inst = nums[proc][curs[proc]]
        opcode = inst % 100
        c = (inst // 100) % 10
        b = (inst // 1000) % 10
        a = (inst // 10000) % 10

        if opcode == 1:
            target = nums[proc][curs[proc] + 3]
            p1 = nums[proc][curs[proc] + 1]
            p2 = nums[proc][curs[proc] + 2]

            n1 = p1 if c else nums[proc][p1]
            n2 = p2 if b else nums[proc][p2]

            nums[proc][target] = n1 + n2
            curs[proc] += 4
        elif opcode == 2:
            target = nums[proc][curs[proc] + 3]
            p1 = nums[proc][curs[proc] + 1]
            p2 = nums[proc][curs[proc] + 2]

            n1 = p1 if c else nums[proc][p1]
            n2 = p2 if b else nums[proc][p2]

            nums[proc][target] = n1 * n2
            curs[proc] += 4
        elif opcode == 3:
            target = nums[proc][curs[proc] + 1]
            if (not takenPhase[proc]):
                nums[proc][target] = phases[proc]
                takenPhase[proc] = True
            else:
                nums[proc][target] = procInput.pop(0)
            curs[proc] += 2
        elif opcode == 4:
            p1 = nums[proc][curs[proc] + 1]
            out = p1 if c else nums[proc][p1]
            curs[proc] += 2

            nextProc = proc + 1 if proc < 4 else 0
            proc = nextProc
            procInput = [out]
            if proc == 0:
                finalOutput = out
        elif opcode == 5:
            p1 = nums[proc][curs[proc] + 1]
            p2 = nums[proc][curs[proc] + 2]
            if (p1 if c else nums[proc][p1]):
                curs[proc] = p2 if b else nums[proc][p2]
            else:
                curs[proc] += 3
        elif opcode == 6:
            p1 = nums[proc][curs[proc] + 1]
            p2 = nums[proc][curs[proc] + 2]
            if not (p1 if c else nums[proc][p1]):
                curs[proc] = p2 if b else nums[proc][p2]
            else:
                curs[proc] += 3
        elif opcode == 7:
            p1 = nums[proc][curs[proc] + 1]
            p2 = nums[proc][curs[proc] + 2]
            target = nums[proc][curs[proc] + 3]

            n1 = p1 if c else nums[proc][p1]
            n2 = p2 if b else nums[proc][p2]

            nums[proc][target] = 1 if n1 < n2 else 0
            curs[proc] += 4
        elif opcode == 8:
            p1 = nums[proc][curs[proc] + 1]
            p2 = nums[proc][curs[proc] + 2]
            target = nums[proc][curs[proc] + 3]

            n1 = p1 if c else nums[proc][p1]
            n2 = p2 if b else nums[proc][p2]

            nums[proc][target] = 1 if n1 == n2 else 0
            curs[proc] += 4
        elif opcode == 99:
            curs[proc] = -1
            nextProc = proc + 1 if proc < 4 else 0
            proc = nextProc
    return finalOutput


inputNums = [int(s) for s in file.readline().split(',')]

highest = 0
for permutation in buildPermutations([5, 6, 7, 8, 9]):
    nums = [inputNums[:] for _ in range(5)]
    res = runProgram(nums, permutation)
    if res > highest:
        highest = res

print(highest)
# print(runProgram(nums, [9, 8, 7, 6, 5]))
