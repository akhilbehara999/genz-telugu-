"""Tests for GenZ Telugu translator engine."""

import pytest
from genztelugu.translator import translate_to_python, translate_to_genztelugu
from genztelugu.errors import translate_error
from genztelugu.keywords import KEYWORDS, REVERSE_KEYWORDS


class TestTranslateToPython:
    def test_cheppu_print(self):
        assert translate_to_python('cheppu("Hello ra mama")') == 'print("Hello ra mama")'

    def test_conditionals(self):
        code = """okavela marks >= 90:
    cheppu("Thopu")
lekapothe_okavela marks >= 50:
    cheppu("Pass")
lekapothe:
    cheppu("Fail")"""
        expected = """if marks >= 90:
    print("Thopu")
elif marks >= 50:
    print("Pass")
else:
    print("Fail")"""
        assert translate_to_python(code) == expected

    def test_loops(self):
        code = """kosam i lo paridhi(10):
    cheppu(i)"""
        expected = """for i in range(10):
    print(i)"""
        assert translate_to_python(code) == expected

    def test_functions(self):
        code = """pani add(a, b):
    tirigi a + b"""
        expected = """def add(a, b):
    return a + b"""
        assert translate_to_python(code) == expected

    def test_keywords_in_strings_untouched(self):
        result = translate_to_python('cheppu("okavela and lekapothe are keywords")')
        assert result == 'print("okavela and lekapothe are keywords")'

    def test_keywords_in_comments_untouched(self):
        result = translate_to_python('cheppu("Hi") # okavela lekapothe')
        assert result == 'print("Hi") # okavela lekapothe'

    def test_while_loop(self):
        code = """antha_varaku nijam:
    cheppu("loop")
    vadhilesi"""
        expected = """while True:
    print("loop")
    break"""
        assert translate_to_python(code) == expected

    def test_operators(self):
        assert translate_to_python("okavela a mariyu b:") == "if a and b:"
        assert translate_to_python("okavela a leda b:") == "if a or b:"
        assert translate_to_python("kadhu nijam") == "not True"


class TestTranslateToGenZTelugu:
    def test_print_to_cheppu(self):
        assert translate_to_genztelugu('print("Hello")') == 'cheppu("Hello")'

    def test_if_else(self):
        code = """if x > 5:
    print("yes")
else:
    print("no")"""
        expected = """okavela x > 5:
    cheppu("yes")
lekapothe:
    cheppu("no")"""
        assert translate_to_genztelugu(code) == expected

    def test_keywords_in_strings_untouched(self):
        result = translate_to_genztelugu('print("if else for")')
        assert result == 'cheppu("if else for")'


class TestErrorTranslation:
    def test_syntax_error(self):
        result = translate_error("SyntaxError: invalid syntax")
        assert "Syntax Error ra mama" in result

    def test_name_error(self):
        result = translate_error("NameError: name 'x' is not defined")
        assert "Name Error ra" in result

    def test_unknown_error(self):
        result = translate_error("SomeWeirdError: something broke")
        assert "Error ra mama" in result


class TestKeywords:
    def test_keyword_count(self):
        assert len(KEYWORDS) >= 20

    def test_reverse_mapping_complete(self):
        for gz, py in KEYWORDS.items():
            assert REVERSE_KEYWORDS[py] == gz
