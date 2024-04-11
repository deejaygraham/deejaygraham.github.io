10.times do
  play chord(:E3, :major).choose
  sleep 1
end
  
root = 55
  
play root # C3
sleep 0.5
play root + 1
sleep 0.5
play root + 2
sleep 0.5
play root + 3
sleep 0.5
play root + 4
sleep 0.5
play root + 5
sleep 0.5
play root + 6
sleep 0.5
play root + 7
sleep 0.5
play root + 8
sleep 0.5
play root + 9
sleep 0.5
play root + 10
sleep 0.5
play root + 11
sleep 0.5
play root + 12 # C4
sleep 0.5
  
root = 50
note = root

12.times do
  play note
  sleep 0.5
  note = note + 1
end
  