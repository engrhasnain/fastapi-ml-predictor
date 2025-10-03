from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import pytesseract
import joblib
import pandas as pd
import re
import io

# Initialize FastAPI
app = FastAPI()

# Allow React frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] if you want strict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load saved model & vectorizer
classifier = joblib.load("svm_model.pkl")
tfidf_vectorizer = joblib.load("tfidf_vectorizer.pkl")

# Path to tesseract executable (Windows only)
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"


def preprocess_text(text: str) -> str:
    text = text.replace('\n', ' ')
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s\|\'\-]', '', text)
    return text.lower()


@app.post("/predict/")
async def predict_image(file: UploadFile = File(...)):
    # Read uploaded image
    image_data = await file.read()
    image = Image.open(io.BytesIO(image_data))

    # OCR: Extract text
    text = pytesseract.image_to_string(image)

    # Preprocess text
    cleaned_text = preprocess_text(text)

    # Vectorize
    text_series = pd.Series([cleaned_text])
    text_tfidf = tfidf_vectorizer.transform(text_series)

    # Prediction
    prediction = classifier.predict(text_tfidf)[0]

    return {"prediction": prediction, "extracted_text": cleaned_text}
