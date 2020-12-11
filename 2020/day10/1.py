import re

file = open('./input', 'r')

lines = file.readlines()
nums = [0] + list(map(lambda line: int(line[:-1]), lines))
nums.append(max(nums) + 3)

nums.sort()

ones = 0
threes = 0
for i in range(1, len(nums)):
  diff = nums[i] - nums[i - 1]
  if diff == 1:
    ones += 1
  elif diff == 3:
    threes += 1

print(ones * threes)
