def balanced(text):
    stack = []
    pairs = {"{": "}", "[": "]", "(": ")"}

    for paren in text:
        if paren in pairs.keys():
            stack.append(paren)
        else:

            if len(stack) == 0:
                return False

            last_opening_paren = stack.pop()
            expected_closing_paren = pairs[last_opening_paren]

            if paren != expected_closing_paren:
                return False

    return len(stack) == 0
