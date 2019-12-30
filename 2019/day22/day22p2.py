num_cards = 119315717514047
target_index = 2020

input = open('./input')
for line in input:
    line = line.replace('\n', '')
    tokens = line.split(' ')

    if tokens[0] == 'cut':
        n = int(tokens[1])
        if n > 0:
            if target_index >= n:
                target_index -= n
            else:
                target_index += num_cards - n
        else:
            if target_index < num_cards + n:
                target_index -= n
            else:
                target_index -= num_cards + n
    elif tokens[1] == 'into':
        target_index = num_cards - target_index - 1
    else:
        increment = int(tokens[3])
        target_index = (target_index * increment) % num_cards


print(target_index)
