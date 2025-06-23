# initially closed
doors = [False] * 100

# loop over all doors.
for i in range(100):
    for j in range(i, 100, i + 1):
        # toggle the door
        doors[j] = not doors[j]

# print all states
for door in doors:
    print("open" if door else "closed")

count_open = sum(door for door in doors)
print(str(count_open) + " open")

count_closed = sum(not door for door in doors)
print(str(count_closed) + " closed")
