file = open('./input')

input = 1

pairs = []
for line in file:
    objects = line[:-1].split(')')
    pairs.append(objects)

dict = {}
for pair in pairs:
    if pair[0] in dict:
        dict[pair[0]].append(pair[1])
    else:
        dict[pair[0]] = [pair[1]]


def countOrbits(dict, current, level):
    if current not in dict:
        return level
    return level + sum([countOrbits(dict, child, level + 1) for child in dict[current]])


print(countOrbits(dict, 'COM', 0))
