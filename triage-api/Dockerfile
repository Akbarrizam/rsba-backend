# Menggunakan Python versi 3.9 yang stabil
FROM python:3.9

# Menyiapkan folder kerja di dalam server
WORKDIR /code

# Memindahkan file requirements dan menginstallnya
COPY ./requirements.txt /code/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Memindahkan seluruh kode main.py
COPY . .

# Menjalankan server di port 7860 (Port wajib Hugging Face)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]