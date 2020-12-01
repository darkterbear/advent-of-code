file = open('./input', 'r')

lines = file.readlines()
nums = list(map(lambda x: int(x), lines))

for i in range(len(nums)):
  for j in range(i + 1, len(nums)):
    for k in range(j + 1, len(nums)):
      if nums[i] + nums[j] + nums[k] == 2020:
        print(nums[i] * nums[j] * nums[k])
        exit()
