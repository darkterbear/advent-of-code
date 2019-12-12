s = [[-10, -10, -13], [5, 5, -9], [3, 8, -16], [1, 3, -3]]
v = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]

for step in range(1000):
    # use gravity to update v
    for i in range(3):
        for j in range(i + 1, 4):
            for dimension in range(3):
                diff = s[i][dimension] - s[j][dimension]
                if diff == 0:
                    continue
                diff //= abs(diff)
                v[i][dimension] -= diff
                v[j][dimension] += diff

    # use v to update s
    for i in range(4):
        for dimension in range(3):
            s[i][dimension] += v[i][dimension]
    # print(s, v)

E = sum([sum([abs(x) for x in s[i]]) * sum([abs(x) for x in v[i]])
         for i in range(len(s))])
print(E)
