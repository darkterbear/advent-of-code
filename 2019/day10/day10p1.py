file = open('./input')

matrix = []

for line in file:
    matrix.append([c == '#' for c in line])

asteroids = []
for row in range(len(matrix)):
    for col in range(len(matrix[row])):
        if matrix[row][col]:
            asteroids.append((row, col))


def gcf(a, b):
    if a == 0 or b == 0:
        return max(abs(a), abs(b))

    for i in range(min(abs(a), abs(b)), 0, -1):
        if a % i == 0 and b % i == 0:
            return i


largestDetection = 0
idealAsteroid = None
for asteroid in asteroids:
    # try this asteroid
    detected = 0
    for target in asteroids:
        # print('target', target)
        if asteroid == target:
            continue
        dR = target[0] - asteroid[0]
        dC = target[1] - asteroid[1]

        factor = gcf(dR, dC)
        mdR = dR // factor
        mdC = dC // factor

        tdR = mdR
        tdC = mdC
        blocked = False
        while (abs(tdR) < abs(dR) or dR == 0) and (abs(tdC) < abs(dC) or dC == 0):
            tR = asteroid[0] + tdR
            tC = asteroid[1] + tdC

            if matrix[tR][tC]:
                blocked = True
                break

            tdR += mdR
            tdC += mdC
        if not blocked:
            detected += 1
    if detected > largestDetection:
        largestDetection = detected
        idealAsteroid = asteroid
    # break

print(largestDetection, idealAsteroid)
