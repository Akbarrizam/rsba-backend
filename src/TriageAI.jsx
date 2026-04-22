import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, ArrowRight, Loader2, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TriageAI = () => {
  const [keluhan, setKeluhan] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasil, setHasil] = useState(null);

  const handleAnalisis = (e) => {
    e.preventDefault();
    if (!keluhan.trim()) return;

    setIsAnalyzing(true);
    setHasil(null);

    // Simulasi proses algoritma klasifikasi (KNN / Naive Bayes) di Backend
    setTimeout(() => {
      setIsAnalyzing(false);
      
      // Logika simulasi sederhana berdasarkan kata kunci
      const teks = keluhan.toLowerCase();
      if (teks.includes('hamil') || teks.includes('kandungan') || teks.includes('haid')) {
        setHasil({ poli: 'Poli Kebidanan & Kandungan', akurasi: '92%', icon: '👶' });
      } else if (teks.includes('anak') || teks.includes('bayi') || teks.includes('balita')) {
        setHasil({ poli: 'Poli Anak', akurasi: '89%', icon: '🧸' });
      } else if (teks.includes('batuk') || teks.includes('sesak') || teks.includes('napas')) {
        setHasil({ poli: 'Poli Paru', akurasi: '85%', icon: '🫁' });
      } else if (teks.includes('pusing') || teks.includes('saraf') || teks.includes('kesemutan')) {
        setHasil({ poli: 'Poli Saraf', akurasi: '88%', icon: '🧠' });
      } else {
        setHasil({ poli: 'Poli Umum', akurasi: '75%', icon: '🩺' });
      }
    }, 2000); // Simulasi delay proses 2 detik
  };

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-600/20 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm mb-6">
            <Sparkles size={16} />
            <span>AI Triage Assistant (Beta)</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Bingung Harus ke Poli Mana?
          </h2>
          <p className="text-slate-400">
            Ceritakan keluhan Anda. Sistem cerdas kami akan menganalisis gejala dan merekomendasikan poliklinik yang tepat.
          </p>
        </div>

        {/* Form Input */}
        <div className="bg-slate-800 border border-slate-700 p-2 rounded-3xl shadow-2xl mb-8">
          <form onSubmit={handleAnalisis} className="relative">
            <div className="absolute top-4 left-4 text-slate-400">
              <Bot size={24} />
            </div>
            <textarea
              rows="3"
              className="w-full bg-transparent text-white placeholder-slate-500 pl-12 pr-4 py-4 focus:outline-none resize-none"
              placeholder="Contoh: Saya sudah batuk berdahak selama 3 hari, disertai sesak napas saat malam hari..."
              value={keluhan}
              onChange={(e) => setKeluhan(e.target.value)}
            ></textarea>
            <div className="flex justify-end p-2 border-t border-slate-700/50">
              <button
                type="submit"
                disabled={isAnalyzing || !keluhan.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Menganalisis...
                  </>
                ) : (
                  <>
                    Analisis Gejala
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Hasil Analisis */}
        <AnimatePresence>
          {hasil && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-blue-900 to-slate-800 border border-blue-500/30 rounded-3xl p-8 relative overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-blue-500/20 border border-blue-400/30 rounded-2xl flex items-center justify-center text-4xl shadow-inner">
                  {hasil.icon}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-blue-300 font-semibold mb-1">Rekomendasi Sistem:</p>
                  <h3 className="text-2xl font-bold text-white mb-2">{hasil.poli}</h3>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-slate-300">
                    <Stethoscope size={16} className="text-emerald-400" />
                    Tingkat Kecocokan Gejala: <span className="text-emerald-400 font-bold">{hasil.akurasi}</span>
                  </div>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <a href="#jadwal" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors inline-block">
                    Lihat Jadwal
                  </a>
                </div>
              </div>
              
              {/* Disclaimer */}
              <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-start gap-2 text-xs text-slate-500">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <p>Hasil ini adalah rekomendasi awal berbasis sistem dan tidak menggantikan diagnosis medis resmi. Jika kondisi darurat, segera hubungi UGD.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default TriageAI;