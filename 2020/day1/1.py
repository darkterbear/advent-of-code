file = open('./input', 'r')

lines = file.readlines()
nums = list(map(lambda x: int(x), lines))

for i in range(len(nums)):
  for j in range(i + 1, len(nums)):
    if nums[i] + nums[j] == 2020:
      print(i, j)
      print(nums[i],nums[j])
      print(nums[i] * nums[j])
      exit()
