"""GenZ Telugu — Write Python using Telugu-inspired Gen-Z syntax."""

__version__ = "1.0.0"
__author__ = "GenZ Telugu Contributors"

from genztelugu.keywords import KEYWORDS, REVERSE_KEYWORDS
from genztelugu.translator import translate_to_python, translate_to_genztelugu

__all__ = [
    "KEYWORDS",
    "REVERSE_KEYWORDS",
    "translate_to_python",
    "translate_to_genztelugu",
]
