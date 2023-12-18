from utils import read_card_data

def score_my_winning_numbers(winning_numbers: list, my_numbers: list) -> int:
    winning_numbers.sort()
    my_numbers.sort()
    score, win_ptr, my_ptr = 0, 0, 0
    while win_ptr < len(winning_numbers) and my_ptr < len(my_numbers):
        if my_numbers[my_ptr] == winning_numbers[win_ptr]:
            score += 1
            my_ptr += 1
            win_ptr += 1
        elif my_numbers[my_ptr] < winning_numbers[win_ptr]:
            my_ptr += 1
        else:
            win_ptr += 1
    return score

if __name__ == "__main__":
    total_score = 0
    card_data = read_card_data("input.txt")
    instances: list[int] = [0] * len(card_data)
    score_for_card: dict[int, int] = {}
    for idx, each_card in enumerate(card_data):
        card_num = idx + 1
        num_copy_scratchcards = score_my_winning_numbers(each_card[0], each_card[1])            # score for scratchcard
        score_for_card[card_num] = num_copy_scratchcards
        for i in range(card_num, card_num + num_copy_scratchcards):                             # instantiate copies of this scratchcard
            instances[i] += 1
        total_score += 1                                                                        # mark this scratchcard as processed

        while instances[idx] > 0:                                                               # are there any unprocessed copies of this scratchcard
            num_copy_scratchcards = score_for_card[card_num]                                    # score for (copy) scratchcard
            for i in range(card_num, card_num + num_copy_scratchcards):                         # instantiate copies of this (copy) scratchcard
                instances[i] += 1
            instances[idx] -= 1                                                                 # mark this (copy) scratchcard as processed
            total_score += 1

    print(total_score)
