from math import ceil

file = open('./input')

ingredients = {}
for line in file:
    line = line[:-1]
    [parts, output] = line.split(' => ')
    parts = parts.split(', ')

    partsDict = {}
    for part in parts:
        [partAmount, partType] = part.split(' ')
        partAmount = int(partAmount)
        partsDict[partType] = partAmount

    [outputAmount, outputType] = output.split(' ')
    outputAmount = int(outputAmount)

    ingredients[outputType] = {
        'outputAmount': outputAmount,
        'ingredients': partsDict
    }


# we have to toposort the ingredient dependencies
# since we know FUEL is a source node, we can start there
order = []


def insertIntoOrder(node, children):
    if node in order:
        return

    if any([child in order for child in children]):
        # make sure the node is before its children in the order
        minIndex = min([order.index(child)
                        for child in children if child in order])
        order.insert(minIndex, node)
    else:
        order.append(node)


def traverse(node):
    if node in order:
        return
    parts = [] if node == 'ORE' else [part for part in ingredients[node]['ingredients']]

    for part in parts:
        traverse(part)

    insertIntoOrder(node, parts)


traverse('FUEL')


def oreNeeded(fuel):
    reqs = {'FUEL': fuel}
    for node in order:
        if node == 'ORE':
            break
        numNeeded = reqs[node]
        del reqs[node]

        numPerRecipe = ingredients[node]['outputAmount']
        parts = ingredients[node]['ingredients']
        for part in parts:
            increase = ceil(numNeeded / numPerRecipe) * parts[part]
            if part in reqs:
                reqs[part] += increase
            else:
                reqs[part] = increase

    return reqs['ORE']


print(oreNeeded(7863863))
print(1000000000000)
