import React, { useState } from 'react';
import { Upload, Camera, ShieldCheck, ImageIcon, Loader2 } from 'lucide-react';

const SkinCheck = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const uploadToAI = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await fetch('https://rizmanxx-rsba-backend.hf.space', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Gagal menganalisis:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Skrining Visual Awal</h2>
          <p className="text-slate-600 mt-2">Gunakan AI untuk mendeteksi kondisi kulit secara cepat melalui foto.</p>
        </div>

        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center">
          {!preview ? (
            <label className="cursor-pointer flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Camera size={32} />
              </div>
              <span className="text-slate-700 font-medium">Klik untuk unggah foto kondisi kulit</span>
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          ) : (
            <div className="space-y-6">
              <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-2xl shadow-md" />
              <div className="flex justify-center gap-4">
                <button onClick={() => setPreview(null)} className="px-6 py-2 text-slate-600 font-medium">Hapus</button>
                <button 
                  onClick={uploadToAI}
                  disabled={loading}
                  className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold flex items-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} />}
                  Mulai Analisis AI
                </button>
              </div>
            </div>
          )}
        </div>

        {result && (
          <div className="mt-8 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <h4 className="font-bold text-emerald-800 text-lg mb-2">Hasil Analisis Visual:</h4>
            <div className="flex items-center gap-2 text-emerald-700 mb-4">
              <div className="px-3 py-1 bg-emerald-200 rounded-full text-xs font-bold uppercase">Terdeteksi: {result.analisis}</div>
            </div>
            <p className="text-emerald-900 text-sm italic">"{result.rekomendasi}"</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkinCheck;