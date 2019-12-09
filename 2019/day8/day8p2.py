file = open('./input')

w = 25
h = 6
ppl = 25 * 6

line = file.readline()

layers = []

for start in range(0, len(line), ppl):
    layer = line[start:start+ppl]
    layers.append([int(pixel) for pixel in layer])

img = []
for i in range(ppl):
    for layer in layers:
        if layer[i] != 2:
            img.append(layer[i])
            break

for row in range(h):
    print(img[row * w:(row + 1) * w])
