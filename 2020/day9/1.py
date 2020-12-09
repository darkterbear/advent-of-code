import re

file = open('./input', 'r')

lines = file.readlines()
nums = list(map(lambda line: int(line[:-1]), lines))

def is_two_sum(n, nums):
  for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
      if nums[i] + nums[j] == n:
        return True
  return False

for i in range(25, len(nums)):
  if not is_two_sum(nums[i], nums[i - 25:i]):
    print(nums[i])
    exit()
