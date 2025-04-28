# NOVA - Gen Z AI Helper Bot

NOVA is a smart and witty AI assistant designed to help ‘girlies’ navigate the sometimes confusing world of technology. With a focus on making tech simpler and fun, NOVA is here to break down complex concepts and make problem-solving easy. Built with a cool Gen Z personality, NOVA is ready to assist whenever things get too technical!

This project is a full-stack app that uses:
- **Frontend**: Built with Vite and Next.js for a fast, modern user experience.
- **Backend**: A Flask API that handles chat interactions and communicates with the Ollama API for generating responses.
- **Ollama Integration**: Runs locally on your computer, allowing NOVA to deliver smart and witty responses via the Mistral model.

---

## Tech Stack

- **Frontend**: Vite, Next.js (React)
- **Backend**: Flask (Python)
- **Ollama**: Used for AI-powered responses (running locally via Docker)
- **CORS**: Enabled in Flask for cross-origin requests
- **State Management**: React Context for chat management
- **LocalStorage**: For storing and retrieving user messages

---

## Screenshots

![Screenshot 2025-04-28 232340](https://github.com/user-attachments/assets/1111b0e6-aba2-4de4-b3e5-3dfad220dbb8)

![Screenshot 2025-04-28 232359](https://github.com/user-attachments/assets/64a5464c-5977-4e61-b57d-1818364fcdae)

![Screenshot 2025-04-28 232510](https://github.com/user-attachments/assets/80740023-12bf-47f0-993e-e12b7b932ce0)

![Screenshot 2025-04-28 231802](https://github.com/user-attachments/assets/6cb2f5ff-4ecf-4c51-a6e6-3c2f74ee80b8)

![Screenshot 2025-04-28 231812](https://github.com/user-attachments/assets/f2d3a9c1-ebb2-45e0-8e87-700564dfaa4f)


## Installation and Setup

### Prerequisites

- Python (3.x)
- Node.js and npm/yarn
- Docker (for running Ollama locally)

### Backend Setup (Flask)

1. Clone the repository:
   ```bash
   git clone https://github.com/Star-1603/nova-ai
   cd nova

2. Create and activate a virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. Run Ollama Locally:

Install and configure Ollama by following the official ![https://ollama.com/](url)s

Ensure the Ollama server is running locally on port 11434.

4. Run the Flask Backend
   ```bash
   python app.py

## Frontend Setup (Vite/Next.js)

1. Navigate to the frontend directory:
   ```bash
    cd nova-frontend

2. Install dependencies:
   ```bash
    npm install
    # or
    yarn install
3. Start the development server:
   ```bash
    npm run dev
    # or
    yarn dev

The frontend will be available at http://localhost:3000.

## Connecting Frontend and Backend
The frontend will communicate with the backend at http://localhost:5000/chat to send user messages and receive responses from NOVA. Make sure your backend (Flask) and Ollama (local server) are running.

## Ollama Integration
NOVA uses the Ollama API to generate responses based on the user’s input. Ollama runs locally on your machine, providing access to models such as Mistral. This ensures that responses are generated quickly and efficiently without relying on an external service.

1. Install Ollama: Follow the Ollama Installation Guide to install and run Ollama on your computer.

2. Run Ollama Locally:

3. Launch the Ollama server and make sure it is listening on port 11434.

### Backend Communication:

The Flask backend sends requests to the Ollama local server using the /api/generate endpoint to get responses based on the system prompt and conversation history.

The response from Ollama is then sent back to the frontend for display.

Note: Since Ollama runs locally on your machine, ensure the app's backend and Ollama are both running while you're using the app.

## License
This project is licensed under the MIT License. Feel free to use but give credits if possible 😊✨

With that, NOVA out.



   
