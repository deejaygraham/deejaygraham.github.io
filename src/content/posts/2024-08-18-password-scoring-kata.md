---
permalink: 2024/08/18/password-scoring-kata/
layout: post
title: Password Scoring Kata
published: true
tags: [code, deliberate-practice, tdd]
---

A solution with unit tests to the password scoring kata.


## Code


```python

def count_special_chars(password):
  return sum(letter in "<>!&*" for letter in password)

def contains_special_chars(password):
  return count_special_chars(password) > 0

def count_digits(password):
  return sum(letter.isdigit() for letter in password)

def contains_digits(password):
  return count_digits(password) > 0

def contains_mixed_case(password):
  upper_case_letters = sum(letter.isupper() for letter in password)
  lower_case_letters = sum(letter.islower() for letter in password)

  return upper_case_letters > 0 and lower_case_letters > 0

def score_password(password):
  points = len(password)

  if contains_mixed_case(password) == False:
    points -= 5

  if contains_digits(password) == False:
    points -= 5

  if contains_special_chars(password) == False:
    points -= 5

  return points

```


### Unit Tests

```python

import unittest

class TestPasswordScoring(unittest.TestCase):

  def test_alpha_only_is_penalised_for_missing_classes(self):
    self.assertEqual(score_password("swordfish"), -6)

  def test_alpha_numeric_is_penalised_for_missing_specials(self):
    self.assertEqual(score_password("sw0rdfish"), -1)

  def test_all_lower_case_is_penalised(self):
    self.assertEqual(score_password("sw0rdf!sh"), 4)

  def test_all_upper_case_is_penalised(self):
    self.assertEqual(score_password("SW0RDF!5H"), 4)

  def test_complex_is_scored_on_length(self):
    self.assertEqual(score_password("Sw0rdf!sH"), 9)

if __name__ == '__main__':
  unittest.main()

```
