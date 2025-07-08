from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Reflection(BaseModel):
    text: str

# Define emotion keyword map
emotion_keywords = {
    "happy": "Happy",
    "joy": "Happy",
    "good": "Happy",
    "great": "Happy",
    "sad": "Sad",
    "unhappy": "Sad",
    "depressed": "Sad",
    "angry": "Angry",
    "mad": "Angry",
    "furious": "Angry",
    "excited": "Excited",
    "nervous": "Anxious",
    "worried": "Anxious",
    "anxious": "Anxious",
    "confident": "Confident",
}

emotion_emojis = {
    "Happy": "😄",
    "Sad": "😢",
    "Angry": "😠",
    "Excited": "🤩",
    "Anxious": "😰",
    "Confident": "💪",
    "Neutral": "😐"
}

@app.post("/analyze")
async def analyze_emotion(reflection: Reflection):
    text = reflection.text.lower()

    # Search for keywords and find first match
    detected_emotion = "Neutral"
    confidence = 0.5

    for i, word in enumerate(text.split()):
        word = word.strip(".,!?")
        if word in emotion_keywords:
            detected_emotion = emotion_keywords[word]
            # Closer to beginning = higher confidence
            confidence = round(1.0 - (i / len(text.split())) * 0.5, 2)
            break

    return {
        "emotion": detected_emotion,
        "confidence": confidence,
        "emoji": emotion_emojis.get(detected_emotion, "😐")
    }
