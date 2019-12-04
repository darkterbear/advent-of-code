smallest = 264360
largest = 746325


def hasDouble(n):
    s = str(n)
    i = 0
    while i < len(s):
        if i >= 5:
            return False
        if i == 4:
            return s[i] == s[i + 1]
        if s[i] == s[i + 1] and s[i] != s[i + 2]:
            return True
        next = i
        while s[next] == s[i]:
            next += 1
            if next >= len(s):
                return False
        i = next


def strictlyIncreasing(n):
    if n < 10:
        return True
    if n % 10 >= (n % 100) // 10:
        return strictlyIncreasing(n // 10)
    return False


def valid(n):
    return hasDouble(n) and strictlyIncreasing(n)


count = 0
for i in range(smallest, largest + 1):
    if valid(i):
        count += 1

print(count)

# print(valid(112233))
