if random.randint(0, flea[2]) == 1:
      display.set_pixel(flea[0], flea[1], 0)
      flea[0] += 1
      flea[0] = min(flea[0], 4)
      display.set_pixel(flea[0], flea[1], 9)
