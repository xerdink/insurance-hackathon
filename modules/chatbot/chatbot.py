"""
    Copyright (c) 2018, Exfil Inc.

    This app is used for WhatsApp chatbot.
"""

from app.mac import mac, signals
import time
from chatbot import response
from states import ChatbotStates


@signals.command_received.connect
def handle(message):
    print('Chatbot starting..')
    print(message.text.replace("!", ""))

    _message = message.text.replace("!", "")

    answer = response(_message)
    if isinstance(answer, (list,)):
        mac.send_message(answer[0], message.conversation)
        if answer[1] == ChatbotStates.SEARCHING_FOR_NUMBER:
            send_async('It looks like you are going from Istanbul to' +
                       ' Kayseri', message.conversation)
            send_async('Please send your location to us!', message.conversation,
                       1)
            send_async('What are you going to use for your trip to the airport?',
                       message.conversation, 13)
        else:
            send_async('The flight is at 8pm, so you have approximately %62 chance'
                       + ' to miss the flight. I looked nearest flight and '
                       + 'your insurance fee is 70 ₺. Do you accept it?',
                       message.conversation, 2)

    else:
        mac.send_message(answer, message.conversation)


def send_async(message, conversation, time_limit=3):
    starting_time = time.time()
    while (time.time() - starting_time) < time_limit:
        pass

    mac.send_message(message, conversation)
