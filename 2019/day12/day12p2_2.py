# s = [[-10, -10, -13], [5, 5, -9], [3, 8, -16], [1, 3, -3]]
s1 = [-10, 5, 8, 3]
v1 = [0, 0, 0, 0]
v = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

prevStates = set(())
while True:
    # use gravity to update v
    for i in range(3):
        for j in range(i + 1, 4):
            diff = s1[i] - s1[j]
            if diff == 0:
                continue
            diff //= abs(diff)
            v1[i] -= diff
            v1[j] += diff

    for i in range(4):
        s1[i] += v1[i]

    state = [s1[0], v1[0], s1[1], v1[1], s1[2], v1[2], s1[3], v1[3]]
    if tuple(state) in prevStates:
        # print(state)
        print(len(prevStates))
        break

    prevStates.add(tuple(state))
