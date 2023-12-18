from utils import read_card_data

def score_my_winning_numbers(winning_numbers: list, my_numbers: list) -> int:
    winning_numbers.sort()
    my_numbers.sort()
    score, win_ptr, my_ptr = 0, 0, 0
    while win_ptr < len(winning_numbers) and my_ptr < len(my_numbers):
        if my_numbers[my_ptr] == winning_numbers[win_ptr]:
            score = score * 2 if score > 0 else 1
            my_ptr += 1
            win_ptr += 1
        elif my_numbers[my_ptr] < winning_numbers[win_ptr]:
            my_ptr += 1
        else:
            win_ptr += 1
    return score

if __name__ == "__main__":
    card_data = read_card_data("input.txt")
    total_score = 0
    copy_queue: list[int] = []
    for each_card in card_data:
        total_score += score_my_winning_numbers(each_card[0], each_card[1])
    print(total_score)
