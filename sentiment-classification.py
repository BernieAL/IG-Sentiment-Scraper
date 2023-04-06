


# Resource - https://huggingface.co/docs/transformers/preprocessing

from transformers import AutoModelForSequenceClassification
from transformers import TFAutoModelForSequenceClassification
from transformers import AutoTokenizer, AutoConfig
import numpy as np
from scipy.special import softmax
import os




def classify_comments():
    # read from cleaned_comments and load into array
    curr_dir = os.path.dirname(__file__)
    clean_comments_file_path = os.path.join(curr_dir,'..','cleaned_comments.txt')
    test = open(clean_comments_file_path,"r",encoding="utf-8")
    text = []
    for line in test:
        #strip newline char from curr line and append to text array
        text.append(line.strip())
    # print(text)


    #LOADING IN MODEL AND MODEL CONFIG
    MODEL = f"cardiffnlp/twitter-roberta-base-sentiment-latest"
    tokenizer = AutoTokenizer.from_pretrained(MODEL)
    # print(tokenizer)
    config = AutoConfig.from_pretrained(MODEL)
    # PT
    model = AutoModelForSequenceClassification.from_pretrained(MODEL)
    model.save_pretrained(MODEL)
    tokenizer.save_pretrained(MODEL)

    # #PASSING TEXT TO MODEL
    encoded_input = tokenizer(text,padding=True,return_tensors="pt")

    output = model(**encoded_input)
    # print(output)
    scores = output[0][0].detach().numpy()
    # print(scores)
    scores = softmax(scores)
    # print(scores)

    # output format: [{'neg': 0.0014}, {'nuetral': 0.0265}, {'pos': 0.9721}]
    res = []
    labels = ['neg','nuetral','pos']
    for s in range(scores.shape[0]):
        rounded_score =  np.round(float(scores[s]), 4)
        res.append({labels[s]:rounded_score})

    # print(res)

    return res

# return format [neg,nuetral,pos]
# print(classify_comments())
