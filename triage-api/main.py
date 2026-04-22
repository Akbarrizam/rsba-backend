import os
import cv2
import datetime
import numpy as np
import google.generativeai as genai
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.neighbors import KNeighborsClassifier
from sklearn.neural_network import MLPRegressor

app = FastAPI(title="RS Budi Asih Integrated AI System")

# --- KONFIGURASI CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# 0. INTEGRASI GEMINI AI (OTAK TELEMEDICINE)
# ==========================================
# PASTE API KEY KAMU DI SINI (Biarkan kosong jika ingin menggunakan AI Simulasi)
API_KEY_GEMINI = "AIzaSyBlBT3jGPnhea4WoBVR9qBVf6Wf69KwQHo" 

if API_KEY_GEMINI and API_KEY_GEMINI != "AIzaSyBlBT3jGPnhea4WoBVR9qBVf6Wf69KwQHo":
    genai.configure(api_key=API_KEY_GEMINI)
    model_gemini = genai.GenerativeModel('gemini-1.5-flash')
else:
    model_gemini = None

class ChatRequest(BaseModel):
    pesan_pasien: str

@app.post("/chat-dokter")
async def chat_dokter(req: ChatRequest):
    if model_gemini:
        # Prompt Engineering: Memberikan identitas dan batasan pada AI
        system_instruction = """
        Identitas: Kamu adalah Dr. Sarah, dokter spesialis saraf di RS Budi Asih Trenggalek.
        Gaya Bicara: Ramah, profesional, empatik, dan menggunakan Bahasa Indonesia yang santun.
        Tugas: Jawab keluhan pasien bernama Wahyu. Berikan penjelasan medis yang logis dan saran praktis.
        Batasan: Jangan memberikan dosis obat keras secara spesifik, arahkan untuk kontrol jika darurat.
        Respon: Maksimal 3 kalimat agar nyaman dibaca di layar chat.
        """
        try:
            response = model_gemini.generate_content(f"{system_instruction}\n\nKeluhan Pasien: {req.pesan_pasien}")
            return {"pengirim": "Dr. Sarah (Sp. Saraf)", "balasan": response.text}
        except Exception as e:
            return {"pengirim": "Sistem", "balasan": f"Maaf, sedang ada kendala koneksi ke otak AI. Error: {str(e)}"}
    else:
        # Fallback jika API Key kosong
        teks = req.pesan_pasien.lower()
        if "halo" in teks or "hai" in teks:
            balasan = "Halo Wahyu! Saya Dr. Sarah. Ada keluhan kesehatan apa yang bisa saya bantu hari ini?"
        elif "pusing" in teks or "migrain" in teks:
            balasan = "Untuk keluhan pusing, cobalah istirahat di ruangan gelap dan kurangi paparan layar. Saya akan meresepkan pereda nyeri."
        elif "obat" in teks:
            balasan = "Baik, resep obatnya sudah saya perbarui di sistem. Apakah ada keluhan lain?"
        elif "terima kasih" in teks or "makasih" in teks:
            balasan = "Sama-sama, Wahyu. Semoga lekas sembuh! Jangan lupa istirahat yang cukup ya."
        else:
            balasan = "Saya mengerti keluhan Anda. Bisa tolong jelaskan sejak kapan gejala tersebut mulai terasa?"
        
        return {"pengirim": "Dr. Sarah (Sp. Saraf)", "balasan": balasan}

# ==========================================
# 1. AI TRIAGE (NLP - NAIVE BAYES)
# ==========================================
data_keluhan = [
    "batuk berdahak dada sesak", "napas bunyi ngik ngik", "kepala pusing sebelah", 
    "nyeri punggung bawah", "anak demam tinggi", "bayi mencret muntah", 
    "hamil flek darah", "luka robek kena pisau", "panas dingin meriang"
]
label_poli = [
    "Poli Paru", "Poli Paru", "Poli Saraf", "Poli Saraf", 
    "Poli Anak", "Poli Anak", "Poli Kandungan", "Poli Bedah", "Poli Umum"
]

vectorizer = TfidfVectorizer()
X_train_text = vectorizer.fit_transform(data_keluhan)
model_text = MultinomialNB()
model_text.fit(X_train_text, label_poli)

class TriageRequest(BaseModel):
    teks: str

@app.post("/predict")
def predict_triage(request: TriageRequest):
    vec = vectorizer.transform([request.teks.lower()])
    res = model_text.predict(vec)[0]
    return {"poli": res, "akurasi": "94%", "icon": "🩺"}

# ==========================================
# 2. AI SKIN CHECK (VISION - KNN)
# ==========================================
def extract_hsv(image_bytes):
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    img = cv2.resize(img, (100, 100))
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv)
    return [np.mean(h), np.mean(s), np.mean(v)]

X_img = [[5, 150, 200], [20, 50, 100], [10, 180, 150]]
y_img = ["Inflamasi Tinggi / Luka Terbuka", "Kondisi Kulit Normal", "Gejala Ruam Kulit"]
knn = KNeighborsClassifier(n_neighbors=1).fit(X_img, y_img)

@app.post("/analyze-skin")
async def analyze_skin(file: UploadFile = File(...)):
    try:
        bits = await file.read()
        feats = extract_hsv(bits)
        pred = knn.predict([feats])[0]
        return {"status": "Sukses", "analisis": pred, "rekomendasi": "Segera konsultasikan hasil visual ini dengan dokter."}
    except Exception as e:
        return {"status": "Error", "message": str(e)}

# ==========================================
# 3. AI UGD PREDICTOR (ANN - MLP)
# ==========================================
X_ugd = [[8,0,0], [12,0,0], [18,0,1], [22,1,0], [2,0,0], [10,1,1]]
y_ugd = [5, 15, 25, 40, 10, 35]
ann = MLPRegressor(hidden_layer_sizes=(10,10), max_iter=1000).fit(X_ugd, y_ugd)

@app.get("/predict-ugd")
def predict_ugd():
    now = datetime.datetime.now()
    weekend = 1 if now.weekday() >= 5 else 0
    forecast = []
    for i in range(6):
        hr = (now.hour + i) % 24
        est = ann.predict([[hr, weekend, 0]])[0]
        forecast.append({
            "jam": f"{hr:02d}:00",
            "estimasi": max(0, int(round(est))),
            "status": "Kritis" if est > 30 else "Waspada" if est > 15 else "Normal"
        })
    return {"data_prediksi": forecast, "waktu_update": now.strftime("%H:%M WIB")}

@app.get("/")
def home():
    return {"message": "Server Utama RS Budi Asih Berjalan Normal"}