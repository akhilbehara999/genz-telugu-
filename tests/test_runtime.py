"""Tests for GenZ Telugu runtime execution."""

import pytest
from genztelugu.runtime import run_code
from genztelugu.translator import translate_to_python


class TestRunCode:
    def test_run_simple_print(self):
        output, success = run_code('print("Hello")')
        assert success is True
        assert "Hello" in output

    def test_run_math(self):
        output, success = run_code("print(2 + 3)")
        assert success is True
        assert "5" in output

    def test_run_loop(self):
        code = """for i in range(3):
    print(i)"""
        output, success = run_code(code)
        assert success is True
        assert "0" in output
        assert "1" in output
        assert "2" in output

    def test_run_function(self):
        code = """def add(a, b):
    return a + b
print(add(10, 20))"""
        output, success = run_code(code)
        assert success is True
        assert "30" in output

    def test_run_syntax_error(self):
        output, success = run_code("print('unclosed string")
        assert success is False

    def test_run_name_error(self):
        output, success = run_code("print(undefined_variable_xyz)")
        assert success is False

    def test_run_with_unicode(self):
        output, success = run_code('print("Hello ra mama! 🔥")')
        assert success is True
        assert "Hello ra mama!" in output

    def test_run_translated_genztelugu(self):
        genz_code = 'cheppu("Test passed")'
        python_code = translate_to_python(genz_code)
        output, success = run_code(python_code)
        assert success is True
        assert "Test passed" in output

    def test_run_conditionals(self):
        code = """if True:
    print("yes")
else:
    print("no")"""
        output, success = run_code(code)
        assert success is True
        assert "yes" in output

    def test_run_timeout(self):
        code = """import time
while True:
    pass"""
        output, success = run_code(code)
        assert success is False
        assert "30 seconds" in output
