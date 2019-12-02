file = open('./input')

nums = [int(s) for s in file.readline().split(',')]
nums[1] = 12
nums[2] = 2


def findInput():
    for noun in range(0, 100):
        for verb in range(0, 100):
            copy = nums[:]
            copy[1] = noun
            copy[2] = verb
            if run(copy) == 19690720:
                print(100 * noun + verb)
                return


def run(mem):
    cur = 0
    while (mem[cur] != 99):
        if mem[cur] == 1:
            mem[mem[cur + 3]] = mem[mem[cur + 1]] + mem[mem[cur + 2]]
        elif mem[cur] == 2:
            mem[mem[cur + 3]] = mem[mem[cur + 1]] * mem[mem[cur + 2]]
        cur += 4

    return mem[0]


findInput()
