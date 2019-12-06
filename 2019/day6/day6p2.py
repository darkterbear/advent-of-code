file = open('./input')

input = 1

pairs = []
for line in file:
    objects = line[:-1].split(')')
    pairs.append(objects)

dict = {}
for pair in pairs:
    dict[pair[1]] = pair[0]


def findPath(start):
    if start not in dict:
        return []
    return [start] + findPath(dict[start])


santaPath = findPath('SAN')
myPath = findPath('YOU')


for loc in myPath:
    if loc in santaPath:
        print(myPath.index(loc) + santaPath.index(loc) - 2)
        break
