use_bpm 52

live_loop :bass do
  [:d2, :a2, :b2, :g2].each do |n|
    8.times do
      #      with_fx :rlpf do
      play n, release: 0.2
      #      end
      sleep 0.25
    end
  end
end

live_loop :kick do
  #  sync :bass
  sample :drum_bass_hard
  with_fx :slicer do
    sample :drum_bass_hard
  end
  sleep 0.5
end

chord(:e3, :major7).each do |n|
  play n
  sleep 0.5
end
live_loop :test do

  sample :bd_haus, rate: 1
  sleep 0.5

end

loop do
  play choose(chord(:e3))
  sleep 2
end

loop do
  with_fx :flanger do
    sample :ambi_haunted_hum, rate: (rrand 1.0, 2.5)
    sleep (rrand 0, 2)
    sample :perc_bell, rate: (rrand 1.0, 2.5)
    sleep rrand(0, 2)
  end
end


live_loop :foo do
  use_synth :prophet
  play :e2, release: 8, cutoff: rrand(70, 130)
  sleep 8
end

live_loop :bar do
  #use_synth :dark_ambience
  #play :c5
  #sample :bass_voxy_hit_c
  #sample :guit_e_fifths
  #sample :bd_haus
  play (ring :d, :r, :r, :a, :f5, :r, :a, :r).tick
  sleep 0.25
end
