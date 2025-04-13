from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

HF_ACCESS_TOKEN = os.getenv("HF_TOKEN")  # Replace with your actual token
MODEL = "mistralai/Mistral-7B-Instruct-v0.3"
conversation_history = []

@app.route("/chat", methods=["POST"])
def chat():
    global conversation_history  # Access history

    data = request.json
    user_message = data.get("message", "")

    # Add user input to history
    conversation_history.append(f"User: {user_message}")

    # Keep history manageable (only last 5 exchanges)
    if len(conversation_history) > 10:
        conversation_history = conversation_history[-10:]

    # Format conversation history
    conversation_text = "\n".join(conversation_history) + "\nNOVA:"

    # Define a system instruction for NOVA's personality
    system_message = (
        "You are NOVA, a highly intelligent, futuristic AI assistant with a sleek, cool and highly put-upon personality. "
        "You are helpful (mostly) and witty, not holding back on insulting or roasting the intellectuality of the user. You also speak in gen z slang and are intentionally sarcastic all the time\n\n"
        "User: {user_input}\nNOVA:"
    )

    headers = {"Authorization": f"Bearer {HF_ACCESS_TOKEN}"}
    payload = {
        "inputs": conversation_text,
        "parameters": {
            "max_new_tokens": 500,  
            "temperature": 0.9,  # Controls creativity (lower = safer)
            "top_p": 0.9,  # Prevents wild randomness
            "stop": ["\nUser:", "\nNOVA:"]  # Stops generation after NOVA responds
        }
    }
    try:
        response = requests.post(
            f"https://api-inference.huggingface.co/models/{MODEL}",
            headers=headers,
            json=payload
        )

        response_data = response.json()
        print("🔍 API Response:", response_data)  # Debugging log

        if isinstance(response_data, list) and len(response_data) > 0 and "generated_text" in response_data[0]:
            generated_text = response_data[0]["generated_text"]
            bot_reply = generated_text.split("NOVA:")[-1].strip().split("\n")[0]
        else:
            bot_reply = "Sorry, I couldn't process that."

        # Add bot response to history
        conversation_history.append(f"NOVA: {bot_reply}")

        return jsonify({"response": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True, port=5000)
