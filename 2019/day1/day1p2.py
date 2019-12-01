file = open('./input')


def findFuel(mass):
    raw = mass // 3 - 2
    if raw <= 0:
        return 0
    return raw + findFuel(raw)


sum = 0
for line in file:
    sum += findFuel(int(line))

print(sum)
