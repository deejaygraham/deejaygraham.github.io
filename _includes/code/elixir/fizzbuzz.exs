defmodule FIZZBUZZER do

	def fizzbuzz(value) when rem(value, 15) == 0 do
		"FizzBuzz"
	end
	
	def fizzbuzz(value) when rem(value, 3) == 0 do
		"Fizz"
	end

	def fizzbuzz(value) when rem(value, 5) == 0 do
		"Buzz"
	end
	
	def fizzbuzz(value) do
		value
	end
end
	