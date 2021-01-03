file = open('./input', 'r')

lines = file.readlines()
lines = list(map(lambda line: line[:-1], lines))

def unbalanced(s):
  open = 0
  close = 0
  for c in s:
    if c == '(':
      open += 1
    elif c == ')':
      close += 1
  return open != close

def evaluate(s):
  start = 0
  end = 1
  l = []
  while start <= len(s):
    while end < len(s) and (s[end] != ' ' or unbalanced(s[start:end])):
      end += 1

    if s[start] == '(':
      # print(s[start + 1:end - 1])
      l.append(evaluate(s[start + 1:end - 1]))
    else:
      l.append(s[start:end])

    start = end + 1
    end = start + 1

  while '+' in l:
    i = l.index('+')
    left = int(l[i - 1])
    right = int(l[i + 1])
    l[i - 1:i + 2] = [left + right]

  n = int(l.pop(0))
  while len(l) > 0:
    op = l.pop(0)
    n2 = int(l.pop(0))
    n *= n2
  return n

s = 0
for line in lines:
  r = evaluate(line)
  # print(r)
  s += r
print(s)