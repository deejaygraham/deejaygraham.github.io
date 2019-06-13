def balanced(text):

    if len(text) % 2 != 0: return False
    
    stack = []
    
    for c in text:
        if c == '{' or c == '(' or c == '[':
            stack.append(c)
        elif c == '}' or c == ')' or c == ']':
            last = stack.pop()
            if c == '}' and last != '{':
                return False
            elif c == ')' and last != '(':
                return False
            elif c == ']' and last != '[':
                return False
    
    balances = len(stack) == 0
    
    return balances
    