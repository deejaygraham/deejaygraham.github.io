import unittest 
import balance_kata

class Test_BalanceParensKata(unittest.TestCase):
    
    def test_single_curly_braces_balance(self):
        self.assertTrue(balanced('{}')

    def test_single_round_braces_balance(self):
        self.assertTrue(balanced('()')

    def test_single_square_braces_balance(self):
        self.assertTrue(balanced('[]')

    def test_multi_nested_braces_balance(self):
        self.assertTrue(balanced('[({})]')

    def test_multi_unmatched_braces_donot_balance(self):
        self.assertTrue(balanced('{{)(}}')

    def test_interleaved_braces_donot_balance(self):
        self.assertTrue(balanced('({)}')

    def test_multi_serial_braces_balance(self):
        self.assertTrue(balanced('{}()')

    def test_multi_serial_nested_braces_balance(self):
        self.assertTrue(balanced('{()}[[{}]]')


if __name__ == '__main__':
    unittest.main()