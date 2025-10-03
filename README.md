# OCR Intent Classifier (FastAPI + React + ML)

A full-stack machine learning project that uses **FastAPI** for the backend, **React (Vite)** for the frontend, and a trained **ML model** to classify the intent of websites based on text extracted from uploaded images using **Tesseract OCR**.

---

## 🚀 Features
- Upload an image from the UI (React + Tailwind).
- Extract text from the image using **Tesseract OCR**.
- Preprocess the text and classify it with a trained ML model (TF-IDF + Classifier).
- Display prediction results and extracted text in a clean UI.

---

## 🛠️ Tech Stack
- **Frontend**: React (Vite), Tailwind CSS  
- **Backend**: FastAPI, Uvicorn, CORS Middleware  
- **Machine Learning**: scikit-learn, joblib (for model persistence)  
- **OCR**: Tesseract (via pytesseract)  
- **Others**: Pandas, Regex, Pillow  

---

## 📂 Project Structure
├── backend
│ ├── main.py # FastAPI app
│ ├── model.pkl # Trained ML model (classifier)
│ ├── tfidf_vectorizer.pkl # TF-IDF vectorizer
│ └── requirements.txt # Backend dependencies
│
├── frontend
│ ├── src/App.jsx # React app
│ ├── package.json # Frontend dependencies
│ └── vite.config.js
│
└── README.md

---

## ⚙️ Installation & Setup

### 1️⃣ Backend (FastAPI)
```bash
cd backend
# Create virtual environment
python -m venv venv
source venv/bin/activate   # (Linux/Mac)
venv\Scripts\activate      # (Windows)

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
👉 Backend runs at: http://127.0.0.1:8000
```
### 2️⃣ Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
Frontend runs at: http://127.0.0.1:5173
```
### 📦 Backend Requirements
Install the requirements.txt file before running the Project

### 🔧 Tesseract Setup

You need to install Tesseract OCR on your system:
Example path:
C:\Program Files\Tesseract-OCR\tesseract.exe
```bash
sudo apt install tesseract-ocr -y
```
Make sure the path is belwo
```bash
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
```

### 🎯 Usage

- Start backend with FastAPI.
- Start frontend with React.
- Upload an image (screenshot, flyer, etc.).
- Extracted text and classification result will be shown on screen.
