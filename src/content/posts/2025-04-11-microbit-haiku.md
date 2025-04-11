---
layout: post
title: Microbit Haiku Generator
tags: [microbit, python]
---

Continuing the theme of "random" text generation, a good candidate is the pseudo-haiku. There are many different ways of generating a haiku but many of them 
not necessarily the most authentic or in the spirit of the art form. Here I am taking the least effortful approach. I used MS Copilot to generate lists of 
common five and seven syllable phrases to act as a source text from which to generate the haiku sticking to the 5-7-5 syllable formula.


## Code

### haiku.py

```python
from microbit import *
import random
import speech

five_syllable_phrases = [
    "Absolutely wonderful day",
    "Avoid the abomination here",
    "Quick acceleration on bikes",
    "Alphabetical order is fun",
    "Celebrate your anniversary",
    "Show appreciation for friends",
    "Visit the big auditorium",
    "Explore ancient Babylonian stories",
    "Lunch is in the cafeteria",
    "Learn about our civilization",
    "Practice clear communication skills",
    "Teamwork shows great cooperation",
    "Change the configuration of toys",
    "Curiosity helps us learn",
    "Find the denominator in math",
    "Things can deteriorate over time",
    "The task was disagreeable today",
    "He was disobedient in class",
    "A depository holds important things",
    "A house may deteriorate slowly",
    "The building looks dilapidated now",
    "Disability can mean different things",
    "Follow disciplinary rules at school",
    "Watch for disintegration of ice",
    "Satisfaction brings us happiness",
    "Check the documentation for details",
    "He was egotistical and proud",
    "Egomania can cause problems",
    "Electricity powers our devices",
    "Elementary school is exciting",
    "The examination starts at noon",
    "We are experimenting with colors",
    "Generational changes can be big",
    "Use your imagination to create",
    "Act immediately in an emergency",
    "The investigation revealed new facts",
    "Pennsylvania has many attractions",
    "Her personality is very kind",
    "There’s a possibility of rain",
    "Enjoy the potato salad recipe",
    "I pledge allegiance with pride",
    "The refrigerator keeps food cold",
    "Representation matters in our community",
    "Get a good recommendation today",
    "Saltwater taffy is so sweet",
    "South America is diverse and beautiful",
    "Subterranean caves are fascinating",
    "Sedimentary rocks tell a story",
    "A subsidiary company helps grow",
    "The superintendent leads the school",
    "Binary code runs the world",
    "Digital realms expand wide",
    "Silicon chips process data",
    "Virtual space connects us",
    "Cyber networks grow quickly",
    "Data streams flow smoothly",
    "Algorithms solve problems",
    "Machines learn and adapt",
    "Quantum bits compute fast",
    "Cloud storage holds data",
    "Micro:bit blinks with delight",
    "Coding fun for everyone",
    "LEDs light up the night",
    "Tiny computer in hand",
    "Sensors detect movement",
    "Radio signals connect us all",
    "Buttons pressed for action",
    "Projects galore to explore",
    "Learning tool for young minds",
    "Creative code comes alive",
    "Gentle breeze whispers softly",
    "Silent night brings peace",
    "Autumn leaves fall gently",
    "Morning dew sparkles bright",
    "Whispering trees tell tales",
    "Snowflakes falling quietly",
    "Crimson sunset paints skies",
    "Distant mountains stand tall",
    "Cherry blossoms bloom pink",
    "Summer rain cools earth",
    "Under the moonlit sky",
    "A river flows gently",
    "Stars twinkle in the night",
    "The sun rises slowly",
    "Birds sing in the dawn",
    "Waves crash upon the shore",
    "A cool breeze in the air",
    "Flowers bloom in springtime",
    "The forest whispers softly",
    "Clouds drift across the sky",
    "Heartfelt whispers of love",
    "Gentle touch warms hearts",
    "Endless embrace comforts",
    "Loving gaze connects souls",
    "Sweet caress soothes pain",
    "Passionate kiss ignites",
    "Warm affection nurtures",
    "True devotion endures",
    "Tender moments cherished",
    "Soulful bond strengthens"
]

seven_syllable_phrases = [
    "The sun is shining so bright",
    "I can't believe you did that",
    "She is always on my mind",
    "We should definitely talk",
    "I will be with you soon",
    "How did that happen to us",
    "Let me show you something",
    "You are the best of all",
    "I can't stop thinking of you",
    "What a wonderful surprise",
    "I need your advice now",
    "You can do it, I know",
    "I am so proud of you",
    "I am excited to see",
    "I am grateful for you",
    "I am hopeful for us",
    "I am relieved to hear",
    "I am honored to be",
    "I am blessed to have you",
    "I am overwhelmed with joy",
    "I am ecstatic today",
    "I am disgusted by this",
    "I am elated to know",
    "I am impatient to start",
    "I am humbled by you",
    "I am fortunate to have",
    "I am optimistic today",
    "I am peaceful right now",
    "I am relieved to know",
    "I am scared of the dark",
    "I am tired of waiting",
    "I am thirsty for more",
    "I am not sure about this",
    "I am honored to meet",
    "I am ecstatic to see",
    "I am disgusted by that",
    "I am hungry for food",
    "I am overwhelmed with work",
    "I am elated to hear",
    "I am impatient to go",
    "I am humbled by this",
    "I am fortunate to be",
    "I am optimistic now",
    "I am peaceful inside",
    "I am relieved to hear",
    "I am scared of heights",
    "I am tired of this",
    "I am thirsty for knowledge",
    "I am not sure yet",
    "I am honored to know",
    "I am ecstatic to learn",
    "I am disgusted by lies",
    "I am hungry for success",
    "I am overwhelmed with joy",
    "I am elated to see",
    "I am impatient to leave",
    "I am humbled by you",
    "I am fortunate to find",
    "I am optimistic today",
    "I am peaceful at last",
    "I am relieved to hear",
    "I am scared of spiders",
    "I am tired of waiting",
    "I am thirsty for truth",
    "I am not sure yet",
    "I am honored to help",
    "I am ecstatic to win",
    "I am disgusted by hate",
    "I am hungry for love",
    "I am overwhelmed with fear",
    "I am elated to know",
    "I am impatient to start",
    "I am humbled by life",
    "I am fortunate to see",
    "I am optimistic now",
    "I am peaceful and calm",
    "I am relieved to hear",
    "I am scared of failure",
    "I am tired of lies",
    "I am thirsty for justice",
    "I am not sure yet",
    "I am honored to serve",
    "I am ecstatic to play",
    "I am disgusted by greed",
    "I am hungry for change",
    "I am overwhelmed with hope",
    "I am elated to hear",
    "I am impatient to go",
    "I am humbled by love",
    "I am fortunate to live",
    "I am optimistic now",
    "I am peaceful and free",
    "I am relieved to know",
    "I am scared of rejection",
    "I am tired of pain",
    "I am thirsty for peace",
    "I am not sure yet",
    "I am honored to lead",
    "I am ecstatic to dance",
    "I am disgusted by war",
    "I am hungry for joy"
]

class Haiku():
    
    def __init__(self, five_syllable_words, seven_syllable_words):
        self.line1 = random.choice(five_syllable_words)
        self.line2 = random.choice(seven_syllable_words)
        self.line3 = random.choice([word for word in five_syllable_words if word != self.line1])
    
    def __str__(self):
        return self.line1 + ". " + self.line2 + ". " + self.line3 + ". "
        
while True:
    haiku = Haiku(five_syllable_phrases, seven_syllable_phrases)
    text = str(haiku)
    display.scroll(text, wait=False)
    speech.say(text, speed=100)
    sleep(random.randint(5000, 30000))

```

The default speech settings are very much like an old fashioned speak-n-spell toy so the attributes need to be tweaked to get a slower and more reasonable 
version to be understandable.
