import type { Example } from '../types';

export const examples: Example[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Your first GenZ Telugu program',
    category: 'Basics',
    code: `# Mee first program ra mama!
cheppu("Hello ra mama! 🔥")
cheppu("GenZ Telugu lo coding start chesam")`,
  },
  {
    id: 'variables',
    title: 'Variables & Types',
    description: 'Learn variables in Telugu style',
    category: 'Basics',
    code: `# Variables ra
name = "Ravi"
age = 20
cheppu("Naa peru", name)
cheppu("Naa age", age)

# Type conversion
cheppu("Name length:", podavu(name))`,
  },
  {
    id: 'if-else',
    title: 'Conditionals',
    description: 'okavela and lekapothe',
    category: 'Control Flow',
    code: `# Conditionals ra mama
marks = 85

okavela marks >= 90:
    cheppu("Dhed dhimak kaadhu, nuvvu thopu! 🏆")
lekapothe_okavela marks >= 50:
    cheppu("Parvaledhu mama, pass ayyav ✅")
lekapothe:
    cheppu("Bokka borla paddav, malli ra 📚")`,
  },
  {
    id: 'for-loop',
    title: 'For Loop',
    description: 'kosam and paridhi',
    category: 'Control Flow',
    code: `# For loop ra
kosam i lo paridhi(1, 6):
    cheppu("Number:", i)

cheppu("---")

# Table of 5
kosam i lo paridhi(1, 11):
    cheppu("5 x", i, "=", 5 * i)`,
  },
  {
    id: 'while-loop',
    title: 'While Loop',
    description: 'antha_varaku loop',
    category: 'Control Flow',
    code: `# While loop ra
count = 1

antha_varaku count <= 5:
    cheppu("Count:", count)
    count = count + 1

cheppu("Loop ayipoyindi! 🎉")`,
  },
  {
    id: 'functions',
    title: 'Functions',
    description: 'pani and tirigi',
    category: 'Functions',
    code: `# Functions ra mama
pani greet(name):
    tirigi "Hello " + name + " ra!"

pani add(a, b):
    tirigi a + b

cheppu(greet("Ravi"))
cheppu("5 + 3 =", add(5, 3))`,
  },
  {
    id: 'calculator',
    title: 'Simple Calculator',
    description: 'Basic calculator program',
    category: 'Projects',
    code: `# Simple Calculator ra
pani calculator(a, b, op):
    okavela op == "+":
        tirigi a + b
    lekapothe_okavela op == "-":
        tirigi a - b
    lekapothe_okavela op == "*":
        tirigi a * b
    lekapothe_okavela op == "/":
        okavela b != 0:
            tirigi a / b
        lekapothe:
            tirigi "Error: Zero tho divide cheyaledu ra!"
    lekapothe:
        tirigi "Error: Operation teliyaledu!"

cheppu("10 + 5 =", calculator(10, 5, "+"))
cheppu("10 - 5 =", calculator(10, 5, "-"))
cheppu("10 * 5 =", calculator(10, 5, "*"))
cheppu("10 / 5 =", calculator(10, 5, "/"))`,
  },
  {
    id: 'guess-game',
    title: 'Guess the Number',
    description: 'Fun guessing game',
    category: 'Projects',
    code: `# Guess the Number Game
import random

secret = random.randint(1, 10)
cheppu("1 nundi 10 varaku number guess cheyi!")

# For demo, we'll show the answer
cheppu("(Secret number:", secret, ")")

pani check_guess(guess, secret):
    okavela guess == secret:
        tirigi "Correct ra mama! 🎉🎉"
    lekapothe_okavela guess < secret:
        tirigi "Inka pedda number cheyi! ⬆️"
    lekapothe:
        tirigi "Inka chinna number cheyi! ⬇️"

# Test with different guesses
kosam guess lo [3, 7, secret]:
    cheppu("Guess:", guess, "→", check_guess(guess, secret))`,
  },
  {
    id: 'list-ops',
    title: 'List Operations',
    description: 'Working with lists',
    category: 'Data Structures',
    code: `# Lists ra mama
fruits = ["Apple", "Banana", "Mango", "Guava"]

cheppu("Total fruits:", podavu(fruits))
cheppu("---")

kosam fruit lo fruits:
    cheppu("🍎", fruit)

cheppu("---")
cheppu("Motham:", motha_sankhya([1, 2, 3, 4, 5]))`,
  },
  {
    id: 'fibonacci',
    title: 'Fibonacci Series',
    description: 'Classic fibonacci in Telugu',
    category: 'Projects',
    code: `# Fibonacci Series ra
pani fibonacci(n):
    okavela n <= 0:
        tirigi []
    okavela n == 1:
        tirigi [0]
    
    series = [0, 1]
    kosam i lo paridhi(2, n):
        next_val = series[i-1] + series[i-2]
        series.append(next_val)
    tirigi series

cheppu("First 10 Fibonacci numbers:")
cheppu(fibonacci(10))`,
  },
];
