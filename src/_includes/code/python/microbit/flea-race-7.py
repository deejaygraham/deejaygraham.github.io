# race !
for x in range(1, 10):
    for flea in all_fleas:
      # 50 % chance
      if random.randint(0, 1) == 1:
          display.set_pixel(flea[0], flea[1], 0)
          flea[0] += 1
          flea[0] = min(flea[0], 4)
          display.set_pixel(flea[0], flea[1], 9)

    sleep(500) 
