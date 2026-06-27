from flask import Flask, request
from flask_cors import CORS
from functools import reduce

import random

app = Flask(__name__)
CORS(app, origins=["http://localhost:*", "http://127.0.0.1:*"])

dice = []

@app.route("/")
def home():
    return {"message": "Welcome home! Try /roll, POST/DELETE /dice with a die {'die': new die number/die to delete}, or /clear-dice to remove all dice."}

@app.route("/roll")
def roll():
    return {"result": f"Your total roll is {get_dice_result(dice)} out of a possible: {get_dice_max(dice)}"}

@app.get("/dice")
def get_dice():
    return {"dice": dice}, 200

@app.route("/dice", methods=["DELETE", "POST"])
def modify_dice():
    data = request.json

    if not data.get("die") or type(data.get("die")) != int:
        return {"error": "Must include a die to include/delete."}
    
    if request.method == "DELETE":
        if data.get("die") in dice:
            dice.remove(data.get("die"))
            return {"message": f"{data.get("die")} removed succesfully."}, 202
        else:
            return {"message": "Die not found."}, 304
        
    if request.method == "POST":
        dice.append(data.get("die"))
        return data, 201
    
@app.route("/clear-dice")
def clear_dice():
    dice.clear()
    return {"message": "Dice cleared!"}
    
def get_dice_result(dice):
    return reduce(lambda x, y: x + get_rand_number(y), dice, 0)

def get_dice_max(dice):
    return reduce(lambda x, y: x + y, dice, 0)

def get_rand_number(limit):
    if (limit < 0):
        return 0
    return random.randint(1, limit)
