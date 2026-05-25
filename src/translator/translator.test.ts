import { describe, it, expect } from 'vitest';
import { translateToPython, translateToGenZTelugu } from './translator';

describe('GenZ Telugu Translator Engine', () => {
  it('translates print statement (cheppu)', () => {
    const input = 'cheppu("Hello ra mama")';
    const expected = 'print("Hello ra mama")';
    expect(translateToPython(input)).toBe(expected);
  });

  it('translates conditionals (okavela, lekapothe_okavela, lekapothe)', () => {
    const input = `
okavela marks >= 90:
    cheppu("Dhed dhimak kaadhu, nuvvu thopu!")
lekapothe_okavela marks >= 50:
    cheppu("Parvaledhu mama, pass ayyav")
lekapothe:
    cheppu("Bokka borla paddav, malli ra")
`;
    const expected = `
if marks >= 90:
    print("Dhed dhimak kaadhu, nuvvu thopu!")
elif marks >= 50:
    print("Parvaledhu mama, pass ayyav")
else:
    print("Bokka borla paddav, malli ra")
`;
    expect(translateToPython(input)).toBe(expected);
  });

  it('avoids translating keywords inside string literals', () => {
    const input = 'cheppu("okavela is my fav, but lekapothe is also good")';
    const expected = 'print("okavela is my fav, but lekapothe is also good")';
    expect(translateToPython(input)).toBe(expected);
  });

  it('avoids translating keywords inside comments', () => {
    const input = 'cheppu("Hello") # okavela and lekapothe';
    const expected = 'print("Hello") # okavela and lekapothe';
    expect(translateToPython(input)).toBe(expected);
  });

  it('translates loops (kosam, lo, paridhi, antha_varaku)', () => {
    const input = `
kosam i lo paridhi(10):
    cheppu(i)

antha_varaku nijam:
    cheppu("Infinte ra")
    vadhilesi
`;
    const expected = `
for i in range(10):
    print(i)

while True:
    print("Infinte ra")
    break
`;
    expect(translateToPython(input)).toBe(expected);
  });

  it('supports reverse translation from Python to GenZ Telugu', () => {
    const py = 'print("Hello if else") # comment with for';
    const expectedGz = 'cheppu("Hello if else") # comment with for';
    expect(translateToGenZTelugu(py)).toBe(expectedGz);

    const pyFull = `
def add(a, b):
    return a + b

if add(5, 5) == 10:
    print("Yes")
else:
    print("No")
`;
    const expectedGzFull = `
pani add(a, b):
    tirigi a + b

okavela add(5, 5) == 10:
    cheppu("Yes")
lekapothe:
    cheppu("No")
`;
    expect(translateToGenZTelugu(pyFull)).toBe(expectedGzFull);
  });
});
