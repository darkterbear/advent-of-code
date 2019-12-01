file = open('./input')

# PART 1
sum = 0
for line in file:
    sum += int(line) // 3 - 2

print(sum)
