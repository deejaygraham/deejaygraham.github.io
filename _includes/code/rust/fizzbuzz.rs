#![cfg_attr(feature = "strict", deny(warnings))]

pub fn fizz_buzz(x: i32) -> String {
    let mut word = String::new();
    if x % 3 == 0 || x % 5 == 0 {
        if x % 3 == 0 {
            word.push_str("fizz");
        }
        if x % 5 == 0 {
            word.push_str("buzz");
        }
    } else {
        word.push_str(&x.to_string());
    }
    return word;
}

#[test]
fn one_returns_number_as_string() {
    assert_eq!("1", fizz_buzz(1));
}

#[test]
fn three_returns_fizz() {
    assert_eq!("fizz", fizz_buzz(3));
}

#[test]
fn five_returns_buzz() {
    assert_eq!("buzz", fizz_buzz(5));
}

#[test]
fn fifteen_returns_fizzbuzz() {
    assert_eq!("fizzbuzz", fizz_buzz(15));
}
