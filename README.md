# Emotion Reflection Tool 😄😢😠

A simple web app that allows users to reflect on their feelings by submitting a short piece of text. The system analyzes the text and returns an emotion, confidence score, and emoji representing the emotion.

---

# 🚀 Setup Instructions

1) git clone https://github.com/Vansh98789/Emotion-detector.git
2) cd my-emotoion-detector-backend
3) pip install fastapi uvicorn
4) uvicorn main:app --reload
5) Open new terminal 
6) cd my-emotoion-detector-frontend
7) npm install
8) npm run dev

---

<h1>🧠 Backend Logic</h1>
The backend uses a keyword-based emotion detection system. Here’s how it works:

When a POST request is made to /analyze with a reflection text like:
"I feel nervous about my first job interview"

The backend:
Converts text to lowercase and splits it into words.
Searches for keywords (e.g., "nervous", "happy", "mad") in a predefined dictionary.
Assigns the first matched emotion.
Confidence score is calculated based on how early the word appears in the sentence.
An appropriate emoji is also returned.
