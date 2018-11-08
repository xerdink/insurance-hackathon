"""
    Copyright (c) 2018, Exfil Inc.

    This app is used for WhatsApp chatbot.
"""

from __future__ import print_function

import nltk
from nltk.stem.lancaster import LancasterStemmer
from states import ChatbotStates

stemmer = LancasterStemmer()

import numpy as np
import tflearn
import random
from random import uniform

import pickle
import json

context = {}

ERROR_THRESHOLD = 0.30


def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [stemmer.stem(word.lower()) for word in sentence_words]
    return sentence_words


def bow(sentence, words, show_details=False):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print("found in bag %s" % w)
    return np.array(bag)


def classify(sentence):
    results = model.predict([bow(sentence, words)])[0]
    results = [[i, r] for i, r in enumerate(results) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append((classes[r[0]], r[1]))
    return return_list


def _extract_ticket_number(a):
    for x in a.split(' '):
        if x.find('TK') != -1 or x.find('PC') != -1:
            return x
    return ''


def response(sentence, userID='123', show_details=False):
    if ' ' not in sentence and ('TK' in sentence or
                                'PC' in sentence):
        return ['I am searching your number ' + \
                _extract_ticket_number(sentence) + \
                '...', ChatbotStates.SEARCHING_FOR_NUMBER]
    results = classify(sentence)
    if results:
        while results:
            for i in intents['intents']:
                if i['tag'] == results[0][0]:
                    if 'context_set' in i:
                        if show_details: print('context:', i['context_set'])
                        context[userID] = i['context_set']

                    if not 'context_filter' in i or \
                            (userID in context and 'context_filter'
                             in i and i['context_filter'] == context[userID]):
                        if show_details: print('tag:', i['tag'])
                        if i['tag'] == 'number':
                            return [(random.choice(i['responses'])
                                     + ' ' + _extract_ticket_number(sentence)
                                     + '...'), ChatbotStates.SEARCHING_FOR_NUMBER]
                        elif i['tag'] == 'transportation':
                            return [(random.choice(i['responses'])
                                     + ' ' + repr(round(uniform(45, 79), 2))
                                     + ' ' + 'minutes.'
                                     ), ChatbotStates.TRANSPORTATION]
                        return random.choice(i['responses'])
            results.pop(0)


data = pickle.load(open("training_data", "rb"))
words = data['words']
classes = data['classes']
train_x = data['train_x']
train_y = data['train_y']

with open('model_intent.json') as json_data:
    intents = json.load(json_data)

net = tflearn.input_data(shape=[None, len(train_x[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(train_y[0]), activation='softmax')
net = tflearn.regression(net)
model = tflearn.DNN(net, tensorboard_dir='tflearn_logs')
model.load('./model.tflearn')
