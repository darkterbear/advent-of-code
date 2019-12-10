from math import atan2, pi
file = open('./input')

matrix = []

for line in file:
    matrix.append([c == '#' for c in line])

asteroids = []
for row in range(len(matrix)):
    for col in range(len(matrix[row])):
        if matrix[row][col] and not (row == 28 and col == 29):
            asteroids.append((row, col))


def gcf(a, b):
    if a == 0 or b == 0:
        return max(abs(a), abs(b))

    for i in range(min(abs(a), abs(b)), 0, -1):
        if a % i == 0 and b % i == 0:
            return i


asteroid = (28, 29)
layer = {}
angle = {}
for target in asteroids:
    dR = target[0] - asteroid[0]
    dC = target[1] - asteroid[1]

    factor = gcf(dR, dC)
    mdR = dR // factor
    mdC = dC // factor

    tdR = mdR
    tdC = mdC
    l = 0
    while (abs(tdR) < abs(dR) or dR == 0) and (abs(tdC) < abs(dC) or dC == 0):
        tR = asteroid[0] + tdR
        tC = asteroid[1] + tdC

        if matrix[tR][tC]:
            l += 1

        tdR += mdR
        tdC += mdC

    a = atan2(dC, -dR)
    if a < 0:
        a += 2 * pi
    layer[target] = l
    angle[target] = a

asteroids.sort(key=lambda a: layer[a] * 1000 + angle[a])

print(asteroids[199])
