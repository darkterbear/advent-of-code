import re

file = open('./input', 'r')

lines = file.readlines()
nums = list(map(lambda line: int(line[:-1]), lines))
s = 90433990

for i in range(len(nums)):
  for j in range(i + 1, len(nums)):
    if sum(nums[i:j]) == s:
      print(min(nums[i:j]) + max(nums[i:j]))
      exit()
    elif sum(nums[i:j]) > s:
      break
