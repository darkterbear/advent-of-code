file = open('./input')

nums = [int(s) for s in file.readline().split(',')]
nums[1] = 12
nums[2] = 2

cur = 0
while (nums[cur] != 99):
    if nums[cur] == 1:
        nums[nums[cur + 3]] = nums[nums[cur + 1]] + nums[nums[cur + 2]]
    elif nums[cur] == 2:
        nums[nums[cur + 3]] = nums[nums[cur + 1]] * nums[nums[cur + 2]]
    cur += 4

print(nums[0])
