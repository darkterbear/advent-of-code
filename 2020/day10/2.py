import re

file = open('./input', 'r')

lines = file.readlines()
nums = [0] + list(map(lambda line: int(line[:-1]), lines))
nums.append(max(nums) + 3)

nums.sort()

mem = {}
def num_ways(start):
  if start in mem:
    return mem[start]
  if start == max(nums):
    return 1
  if start > max(nums):
    return 0
  
  count = 0
  if start + 1 in nums:
    count += num_ways(start + 1)
  if start + 2 in nums:
    count += num_ways(start + 2)
  if start + 3 in nums:
    count += num_ways(start + 3)
  
  mem[start] = count
  return count

print(num_ways(0))
print(mem)
