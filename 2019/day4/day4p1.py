smallest = 264360
largest = 746325


def hasDouble(n):
    if n < 10:
        return False
    if n % 10 == (n % 100) // 10:
        return True
    return hasDouble(n // 10)


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
