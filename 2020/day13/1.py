import re

file = open('./input', 'r')

lines = file.readlines()
start = int(lines[0][:-1])
ids = list(map(lambda id: int(id), filter(lambda id: id != 'x', lines[1][:-1].split(','))))

print(start)
print(ids)

earliest = -1
times_until = list(map(lambda id: id - start % id, ids))
min_time_until = min(times_until)
print(ids[times_until.index(min_time_until)] * min_time_until)
# print(start + min_time_until)
