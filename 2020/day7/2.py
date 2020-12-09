import re

file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

bag_types = {}

for line in lines:
  [parent_color, children] = line.split(' bags contain ')
  bag_types[parent_color] = {}
  if children != 'no other bags.':
    for child in children[:-1].split(', '):
      num_child = int(child[0])
      child_color = ' '.join(child.split(' ')[1:-1])
      bag_types[parent_color][child_color] = num_child

def count_bags_inside(color):
  # print(color)
  count = 1
  for child in bag_types[color]:
    count += bag_types[color][child] * count_bags_inside(child)
  # print(count)
  return count

print(count_bags_inside('shiny gold') - 1)
