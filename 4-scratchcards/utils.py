import re

def read_card_data(filename = "input.txt") -> list[tuple[list, list]]:
    card_data: list[tuple[list, list]] = []
    str_to_int_list = lambda s: [int(i) for i in re.findall(r'\d+', s)]
    with open(filename) as f:
        for line in f:
            input = line.split(': ')[1]
            [winning_numbers_as_str, my_numbers_as_str] = input.split(' | ')
            card_data.append((
                str_to_int_list(winning_numbers_as_str),
                str_to_int_list(my_numbers_as_str)
            ))
    return card_data
