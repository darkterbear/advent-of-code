import re

nums = [1,17,0,10,18,11,6]
# nums = [0,3,6]

indices = {}
for i in range(len(nums)):
  indices[nums[i]] = [i, -1]

timestep = len(nums)
last = nums[-1]

for i in range(timestep, 30000000):
  next_num = 0 if indices[last][1] == -1 else indices[last][0] - indices[last][1]
  if next_num in indices:
    indices[next_num][1] = indices[next_num][0]
    indices[next_num][0] = i
  else:
    indices[next_num] = [i, -1]
  last = next_num

print(last)