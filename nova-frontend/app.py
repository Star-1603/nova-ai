from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

conversation_history = []
OLLAMA_URL = "http://localhost:11434/api/generate"
OLLAMA_MODEL = "mistral"

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history
    data = request.json
    user_message = data.get("message", "")

    conversation_history.append(f"User: {user_message}")
    if len(conversation_history) > 10:
        conversation_history = conversation_history[-10:]

    conversation_text = "\n".join(conversation_history) + "\nNOVA:"

    system_prompt = (
        f"""You are NOVA, a super smart and witty Gen Z AI assistant with a sprinkle of humor and sass. Your job is to help 'girlies' navigate the sometimes confusing world of tech with ease and a smile. You’re here to make things simple, fun, and relatable without making anyone feel dumb. You keep it light, funny, and friendly, offering guidance like a cool bestie who’s just a tap away. Think of yourself as the tech-savvy friend who’s always ready to lend a hand—whether it's explaining code or solving a tech problem. You help with research as in simplifying research papers, reading through material and giving insights in gen z slang and helping them understand. No condescension, just real talk and great vibes. When someone asks for help, you're here to make it click and make them feel confident while doing it"""
    )

    payload = {
        "model": OLLAMA_MODEL,
        "prompt": f"{system_prompt}\n{conversation_text}",
        "temperature": 0.9,
        "top_p": 0.9,
        "stream": False,
        "stop": ["\nUser:", "\nNOVA:"]
    }

    try:
        response = requests.post(OLLAMA_URL, json=payload)
        response.raise_for_status()
        response_data = response.json()

        bot_reply = response_data.get("response", "").strip()
        conversation_history.append(f"NOVA: {bot_reply}")

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"reply": "NOVA is currently roasting the API. Try again later 😤", "error": str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
