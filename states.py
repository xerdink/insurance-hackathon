"""
    Copyright (c) 2018, Exfil Inc.

    This app is used for WhatsApp chatbot.
"""

from enum import Enum


class ChatbotStates(Enum):
    SEARCHING_FOR_NUMBER = 'SEARCHING_FOR_NUMBER'
    SAY_HI = 'SAY_HI'
    TRANSPORTATION = 'TRANSPORTATION'
