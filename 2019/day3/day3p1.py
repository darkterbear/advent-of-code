file = open('./input')

wire1 = file.readline().split(',')
wire2 = file.readline().split(',')

segments1 = [(0, 0)]
segments2 = [(0, 0)]


def getNewLoc(loc, move):
    amt = int(move[1:])
    if (move[0] == 'U'):
        return (loc[0], loc[1] + amt)
    if (move[0] == 'D'):
        return (loc[0], loc[1] - amt)
    if (move[0] == 'L'):
        return (loc[0] - amt, loc[1])
    if (move[0] == 'R'):
        return (loc[0] + amt, loc[1])


loc = (0, 0)
for move in wire1:
    newLoc = getNewLoc(segments1[-1], move)
    segments1.append(newLoc)
    loc = newLoc

loc = (0, 0)
for move in wire2:
    newLoc = getNewLoc(segments2[-1], move)
    segments2.append(newLoc)
    loc = newLoc


def findIntersectDist(i1, i2, j1, j2):
    if i1[0] == i2[0]:
        # i has constant x, vertical
        if j1[0] == j2[0] and i1[0] == j1[0]:
            # j has constant x, vertical
            iMinY = min(i1[1], i2[1])
            iMaxY = max(i1[1], i2[1])

            jMinY = min(j1[1], j2[1])
            jMaxY = max(j1[1], j2[1])

            if iMinY < jMaxY and jMinY < iMaxY:
                upperBound = min(iMaxY, jMaxY)
                lowerBound = max(iMinY, jMinY)
                if upperBound == 0 or lowerBound == 0:
                    return abs(i1[0])
                if lowerBound > 0:
                    return abs(i1[0]) + abs(lowerBound)
                if upperBound < 0:
                    return abs(i1[0]) + abs(upperBound)
                return abs(i1[0])
            return -1
        else:
            # j has constant y, horizontal
            iMaxY = max(i1[1], i2[1])
            iMinY = min(i1[1], i2[1])

            jMaxX = max(j1[0], j2[0])
            jMinX = min(j1[0], j2[0])
            if j1[1] <= iMaxY and iMinY <= j1[1] and i1[0] <= jMaxX and jMinX <= i1[0]:
                return abs(i1[0]) + abs(j1[1])
            else:
                return -1
    else:
        # i has constant y, horizontal
        if j1[1] == j2[1] and i1[1] == j1[1]:
            # j has constant y, horizontal
            iMinX = min(i1[0], i2[0])
            iMaxX = max(i1[0], i2[0])

            jMinX = min(j1[0], j2[0])
            jMaxX = max(j1[0], j2[0])

            if iMinX < jMaxX and jMinX < iMaxX:
                upperBound = min(iMaxX, jMaxX)
                lowerBound = max(iMinX, jMinX)
                if upperBound == 0 or lowerBound == 0:
                    return abs(i1[1])
                if lowerBound > 0:
                    return abs(i1[1]) + abs(lowerBound)
                if upperBound < 0:
                    return abs(i1[1]) + abs(upperBound)
                return abs(i1[1])
            return -1
        else:
            # j has constant x, vertical
            iMaxX = max(i1[0], i2[0])
            iMinX = min(i1[0], i2[0])

            jMaxY = max(j1[1], j2[1])
            jMinY = min(j1[1], j2[1])
            if j1[0] <= iMaxX and iMinX <= j1[0] and i1[1] <= jMaxY and jMinY <= i1[1]:
                return abs(i1[1]) + abs(j1[0])
            else:
                return -1


closestIntersect = -1
for i in range(1, len(segments1)):
    for j in range(1, len(segments2)):
        dist = findIntersectDist(
            segments1[i - 1], segments1[i], segments2[j - 1], segments2[j])

        if dist > 0:
            if closestIntersect == -1:
                closestIntersect = dist
            else:
                closestIntersect = min(closestIntersect, dist)

print(closestIntersect)
