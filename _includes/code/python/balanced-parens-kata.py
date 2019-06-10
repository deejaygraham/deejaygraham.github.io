def balanced(text):
    stack = []
    pairs = { '{' :  '}',  '[' : ']', '(' : ')' }

    for paren in text:
        if paren in pairs.keys():
            stack.append(paren)
        else:
            last = stack.pop()
            expected = pairs[last]
            
            if paren != expected:
                return False
    
    return len(stack) == 0
    