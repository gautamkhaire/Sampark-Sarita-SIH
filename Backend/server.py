from requests import Response
from flask_sock import Sock
from bson.json_util import dumps,loads
from flask import Flask,request, json,jsonify
from flask_pymongo import PyMongo
from uuid import UUID
from bson.objectid import ObjectId
import redis
import google.generativeai as genai
import spacy
import ast
from flask_cors import CORS
import json
import pandas as pd
from io import StringIO
from pymongo import MongoClient
import numpy as np
import uuid
genai.configure(api_key="AIzaSyD4pZsu2BGqOIB-ZO3Jtnz7T1nw9PEm3qM")
generation_config = {
  "temperature": 0.9,
  "top_p": 1,
  "top_k": 1,
  "max_output_tokens": 2048,
}

safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
  }
]

model = genai.GenerativeModel(model_name="gemini-pro",
                              generation_config=generation_config,
                              safety_settings=safety_settings)

def keyword_extraction(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    relevant_words = [token.text for token in doc if token.pos_ in ['NOUN', 'PROPN', 'VERB', 'ADJ']]
    s= {x for x in relevant_words}
    if len(s)==0:
        s.add(text[0])
    return  s
def checksimilarity(set1, set2):
    inter, unio = 0, 0
    inter = len(set1.intersection(set2))
    unio = len(set1.union(set2))
    if unio == 0:
        return 0
    else: 
        return inter/unio

app = Flask(__name__)
CORS(app, origins='*', allow_headers='*')
sock = Sock(app)
app.config['MONGO_URI'] = 'mongodb+srv://shetesaurabh872:saurabh5353@cluster0.xu1axex.mongodb.net/decision_tree_framework?retryWrites=true&w=majority'
mongo = PyMongo(app)
r = redis.Redis(
  host='redis-14966.c264.ap-south-1-1.ec2.cloud.redislabs.com',
  port=14966,
  password='MF5nuzX1ldHEMABcAPXCWMBDhtKdbIEx')

def simi(query1):
    try:
        similarity_above_threshold = []
        qkeky=keyword_extraction(query1)
        cursor = 0
        maxs=0
        ans=None
        while True:
            cursor, keys = r.scan(cursor=cursor, count=15)  
            print(cursor,keys)
            for key in keys:
                keystring = key.decode('utf-8')
                kel=set(keystring.split(":"))
                similarity = checksimilarity(kel,qkeky)
                print(similarity)
                if similarity > 0.9:
                    if similarity>maxs:
                        maxs=similarity
                        ans=keystring
            if cursor == 0:
                break
        if ans==None:
            return None
        print(r.get(ans))
        return (r.get(ans).decode('utf-8'))
    except Exception as e:
        print(e)
        return None
def root_nodes(text_data):
        keywords=keyword_extraction(text_data['text'])
        similar_ans=simi(text_data['text'])
        if similar_ans!=None:
            return dumps(similar_ans)
        data=[]
        pipeline = [
        {
            "$addFields": {
                "commonWordsCount": {
                    "$size": {
                        "$setIntersection": ["$keywords",list(keywords)]
                    }
                }
            }
        },
        {
            "$match": {
                "commonWordsCount": {"$gt": 0}
            }
        },
        {
            "$sort": {
                "commonWordsCount": -1  
            }
        }
    ]
        result = mongo.db.root_nodes.aggregate(pipeline)
        formatted_data = [
            {**doc, '_id': str(doc['_id'])} for doc in result
        ]
        data.extend(formatted_data)
        if not data:
            return dumps({"message": "No records found"})
        else: 
            print(data)
            return dumps(data)

def test_root_nodes(text_data):
        keywords=keyword_extraction(text_data['text'])
        similar_ans=simi(text_data['text'])
        if similar_ans!=None:
            return dumps(similar_ans)
        data=[]
        pipeline = [
        {
            "$addFields": {
                "commonWordsCount": {
                    "$size": {
                        "$setIntersection": ["$keywords",list(keywords)]
                    }
                }
            }
        },
        {
            "$match": {
                "commonWordsCount": {"$gt": 0}
            }
        },
        {
            "$sort": {
                "commonWordsCount": -1  
            }
        }
    ]
        result = mongo.db.test_root_nodes.aggregate(pipeline)
        formatted_data = [
            {**doc, '_id': str(doc['_id'])} for doc in result
        ]
        data.extend(formatted_data)
        if not data:
            return dumps({"message": "No records found"})
        else: 
            print(data)
            return dumps(data)

@sock.route('/get-data')
def child_nodes(ws):
    while True:
        try: 
            message=ws.receive()
            print(message)
            json_data = loads(message)
            if(json_data["flag"]==True):
                result=root_nodes(json_data)
                ws.send((result))
            # elif json_data['id']=='None':
            #     data=prompt(json_data['text'])
            #     ws.send(dumps(data))
            else:
                object_id = ObjectId(json_data["id"])
                data = mongo.db.child_nodes.find_one({"_id":object_id})
                if data is None:
                    ws.send(dumps({"message": "No records found"}))
                else:
                    ws.send(dumps(data))
        except Exception as e:
            print(e)
            ws.send(dumps({"message": "Error occured"}))

@sock.route('/get-test-data')
def test_child_nodes(ws):
    while True:
        try: 
            message=ws.receive()
            print(message)
            json_data = loads(message)
            if(json_data["flag"]==True):
                result=test_root_nodes(json_data)
                ws.send((result))
            # elif json_data['id']=='None':
            #     data=prompt(json_data['text'])
            #     ws.send(dumps(data))
            else:
                object_id = ObjectId(json_data["id"])
                data = mongo.db.test_child_nodes.find_one({"_id":object_id})
                if data is None:
                    ws.send(dumps({"message": "No records found"}))
                else:
                    ws.send(dumps(data))
        except Exception as e:
            print(e)
            ws.send(dumps({"message": "Error occured"}))


@app.route('/prompt',methods=['POST'])
def  prompt():
    try:
        strin='give single small compact solution answer in string format, with only answer text nothing else for the following question from a customer care perspective:'+request.json['text']
        prompt_parts = [str(strin)]   
        respo = model.generate_content(prompt_parts)
        quekey=keyword_extraction(request.json['text'])
        quekeyl=[x for x in quekey]
        quekeyj=':'.join(quekeyl)
        r.set(quekeyj,respo.text)
        return respo.text
    except Exception as e:
        print('eeeeeeeeeeeeeeeeeeeee',e)
        return dumps({"message": "Error occured"})
@app.route('/ticket',methods=['POST'])
def ticket():
    try:
        data=request.json
        print(data)
        mongo.db.tickets.insert_one(data)
        return jsonify({"message":"success"})
    except Exception as e:
        print(e)
        return jsonify({"message":"error"})
@app.route('/get-tickets',methods=['GET'])
def get_tickets():
    try:
        data=mongo.db.tickets.find({})
        if data is None:
            return jsonify({"message":"No tickets found"})
        else:  
            df = pd.DataFrame(list(data))
            csv_data = StringIO()
            df.to_csv(csv_data, index=False)
            return Response(csv_data.getvalue(),
                    mimetype="text/csv",
                    headers={"Content-Disposition": "attachment;filename=output.csv"})

    except Exception as e:
        print(e)
        return jsonify({"message":"error"})
    
@app.route('/upload_test',methods=['POST'])
def upload_test():
    uploaded_file = request.files['file']
    CONNECTION_STRING = 'mongodb+srv://shetesaurabh872:saurabh5353@cluster0.xu1axex.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(CONNECTION_STRING)
    database = client['decision_tree_framework']
    collection_name_root = database["test_root_nodes"]
    collection_name_child = database["test_child_nodes"]
    df = pd.read_excel(uploaded_file)
    replace_dict = {np.nan: 0}

    df['children'] = df['children'].replace(replace_dict)

    df['children'] = df['children'].astype(int)
    nan_mask = df['answer'].isna()

# Replace NaN values with an empty list using boolean indexing
    df.loc[nan_mask, 'answer'] = df.loc[nan_mask, 'answer'].apply(lambda x: [] if pd.isna(x) else x)
    df.index = df.index + 1
    df['id']=[None for i in range(len(df))]
    ind = 2 + df.at[1, 'children']
    df['uuid']=[uuid.uuid1() for i in range(len(df))]
    root=df.iloc[0]
    keywords=keywordextr(str(root['textualDescription'])+str(root['question']))
    collection_name_root.insert_one({"key":root['key'],"textualDescription":root['textualDescription'],'answer':root['answer'],'question':root['question'],'uuid':str(root['uuid']),'keywords':keywords})
    f=collection_name_root.find_one({'uuid':str(root['uuid'])})
    df.at[1, 'id'] = str(f['_id'])
    for i in range(2,len(df)+1):
        node=df.iloc[i-1]
        collection_name_child.insert_one({"key":node['key'],"textualDescription":node['textualDescription'],'answer':node['answer'],'question':node['question'],'uuid':str(node['uuid'])})
        f=collection_name_child.find_one({'uuid':str(node['uuid'])})
        df.at[i, 'id'] = str(f['_id'])
    curp=1
    buf=2
    while curp!=len(df)+1:
        for i in range(0,df.at[curp,'children']):
            df.at[curp,'answer'].append({"optionText":df.at[buf+i,'key'],"id":df.at[buf+i,'id']})
        buf+=df.at[curp,'children']
        curp+=1
    collection_name_root.update_one({'uuid':str(df.at[1,'uuid'])},{'$set':{'answer':df.at[1,'answer']}})
    for i in range(2,len(df)+1):
        collection_name_child.update_one({'uuid':str(df.at[i,'uuid'])},{'$set':{'answer':df.at[i,'answer']}})
    return jsonify({"message":"success"})


@app.route('/upload',methods=['POST'])
def upload():
    uploaded_file = request.files['file']
    CONNECTION_STRING = 'mongodb+srv://shetesaurabh872:saurabh5353@cluster0.xu1axex.mongodb.net/?retryWrites=true&w=majority'
    client = MongoClient(CONNECTION_STRING)
    database = client['decision_tree_framework']
    collection_name_root = database["root_nodes"]
    collection_name_child = database["child_nodes"]
    df = pd.read_excel(uploaded_file)
    replace_dict = {np.nan: 0}

    df['children'] = df['children'].replace(replace_dict)

    df['children'] = df['children'].astype(int)
    nan_mask = df['answer'].isna()

# Replace NaN values with an empty list using boolean indexing
    df.loc[nan_mask, 'answer'] = df.loc[nan_mask, 'answer'].apply(lambda x: [] if pd.isna(x) else x)
    df.index = df.index + 1
    df['id']=[None for i in range(len(df))]
    ind = 2 + df.at[1, 'children']
    df['uuid']=[uuid.uuid1() for i in range(len(df))]
    root=df.iloc[0]
    keywords=keywordextr(str(root['textualDescription'])+str(root['question']))
    collection_name_root.insert_one({"key":root['key'],"textualDescription":root['textualDescription'],'answer':root['answer'],'question':root['question'],'uuid':str(root['uuid']),'keywords':keywords})
    f=collection_name_root.find_one({'uuid':str(root['uuid'])})
    df.at[1, 'id'] = str(f['_id'])
    for i in range(2,len(df)+1):
        node=df.iloc[i-1]
        collection_name_child.insert_one({"key":node['key'],"textualDescription":node['textualDescription'],'answer':node['answer'],'question':node['question'],'uuid':str(node['uuid'])})
        f=collection_name_child.find_one({'uuid':str(node['uuid'])})
        df.at[i, 'id'] = str(f['_id'])
    curp=1
    buf=2
    while curp!=len(df)+1:
        for i in range(0,df.at[curp,'children']):
            df.at[curp,'answer'].append({"optionText":df.at[buf+i,'key'],"id":df.at[buf+i,'id']})
        buf+=df.at[curp,'children']
        curp+=1
    collection_name_root.update_one({'uuid':str(df.at[1,'uuid'])},{'$set':{'answer':df.at[1,'answer']}})
    for i in range(2,len(df)+1):
        collection_name_child.update_one({'uuid':str(df.at[i,'uuid'])},{'$set':{'answer':df.at[i,'answer']}})
    return jsonify({"message":"success"})




def keywordextr(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    relevant_words = [token.text for token in doc if token.pos_ in ['NOUN', 'PROPN', 'VERB', 'ADJ']]
    return relevant_words

if __name__ == "__main__":
  sock.run(app, debug=True)