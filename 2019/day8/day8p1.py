file = open('./input')

w = 25
h = 6
ppl = 25 * 6

line = file.readline()

minZero = ppl
minZeroLayer = -1

for start in range(0, len(line), ppl):
    layer = line[start:start+ppl]
    countZero = 0
    for pixel in layer:
        if pixel == '0':
            countZero += 1

    if countZero < minZero:
        minZero = countZero
        minZeroLayer = start

targetLayer = line[minZeroLayer:minZeroLayer+ppl]
countOne, countTwo = 0, 0
for pixel in targetLayer:
    if pixel == '1':
        countOne += 1
    if pixel == '2':
        countTwo += 1

print(countOne * countTwo)
