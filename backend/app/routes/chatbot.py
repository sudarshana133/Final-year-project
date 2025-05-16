from flask import Blueprint, jsonify, request
from app.services.llm_handler import chat_with_llm

chatbot_bp = Blueprint("chatbot",__name__)

@chatbot_bp.route("/chat",methods=["POST"])
def get_llm_res():
    data = request.get_json()
    prompt = data.get("prompt","").strip()

    if not prompt:
        return jsonify({"error":"Prompt is required"}) , 400
    
    try:
        response = chat_with_llm(prompt)
        print(response)
        return jsonify({"answer":response}), 200
    except Exception as e:
        return jsonify({"error":str(e)}), 500