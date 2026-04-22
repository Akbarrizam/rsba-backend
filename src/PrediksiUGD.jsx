import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, TrendingUp, RefreshCw } from 'lucide-react';

const PrediksiUGD = () => {
  const [dataPrediksi, setDataPrediksi] = useState([]);
  const [waktuUpdate, setWaktuUpdate] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchPrediksi = async () => {
    setLoading(true);
    try {
      // Mengambil data dari otak ANN Python kita
      const response = await fetch('https://rizmanxx-rsba-backend.hf.space');
      const data = await response.json();
      setDataPrediksi(data.data_prediksi);
      setWaktuUpdate(data.waktu_update);
    } catch (error) {
      console.error("Gagal mengambil data AI:", error);
      // Fallback data jika server Python mati agar UI tetap bisa didemokan
      setDataPrediksi([
        { jam: "16:00", estimasi: 12, status: "Normal" },
        { jam: "17:00", estimasi: 18, status: "Waspada" },
        { jam: "18:00", estimasi: 25, status: "Waspada" },
        { jam: "19:00", estimasi: 38, status: "Kritis" },
        { jam: "20:00", estimasi: 42, status: "Kritis" },
        { jam: "21:00", estimasi: 28, status: "Waspada" },
      ]);
      setWaktuUpdate("Mode Offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrediksi();
  }, []);

  // Fungsi pembantu untuk warna grafik
  const getStatusWarna = (status) => {
    if (status === 'Kritis') return 'from-red-500 to-rose-600 shadow-red-500/50';
    if (status === 'Waspada') return 'from-orange-400 to-amber-500 shadow-orange-500/50';
    return 'from-emerald-400 to-teal-500 shadow-emerald-500/50';
  };

  // Mencari nilai tertinggi untuk skala tinggi batang grafik
  const maxEstimasi = Math.max(...dataPrediksi.map(d => d.estimasi), 50); 

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800 relative overflow-hidden">
      {/* Efek Latar Belakang */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={14} className="animate-pulse" /> AI Forecast
              </span>
            </div>
            <h2 className="text-3xl font-black text-white mb-2">Prediktor Kepadatan UGD</h2>
            <p className="text-slate-400">Prakiraan lonjakan pasien 6 jam ke depan berbasis Artificial Neural Network.</p>
          </div>
          
          <button 
            onClick={fetchPrediksi}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700"
          >
            {loading ? <RefreshCw size={16} className="animate-spin" /> : <RefreshCw size={16} />}
            Update Data
          </button>
        </div>

        {/* Area Dashboard Grafik */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
          
          <div className="flex justify-between items-center mb-12 border-b border-slate-700 pb-4">
            <h3 className="text-white font-bold text-lg">Proyeksi Kedatangan Pasien</h3>
            <span className="text-slate-400 text-sm">Update: {waktuUpdate}</span>
          </div>

          {/* Render Grafik Batang Kustom */}
          <div className="flex items-end justify-between gap-2 md:gap-6 h-64 mt-8">
            {dataPrediksi?.map((item, index) => {
              // Hitung persentase tinggi batang (Maksimal 100%)
              const tinggiPersen = (data.estimasi / maxEstimasi) * 100;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  
                  {/* Tooltip Hover (Estimasi Angka) */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity mb-2 bg-slate-900 text-white text-xs py-1 px-3 rounded-lg border border-slate-700 font-bold">
                    {data.estimasi} Pasien
                  </div>

                  {/* Batang Grafik */}
                  <div className="w-full relative flex justify-center h-full items-end">
                    <div 
                      className={`w-full max-w-[48px] rounded-t-lg bg-gradient-to-t shadow-lg transition-all duration-1000 ease-out ${getStatusWarna(data.status)} group-hover:brightness-125`}
                      style={{ height: `${tinggiPersen}%`, minHeight: '10%' }} // Animasi tinggi dari Tailwind
                    >
                      {/* Tanda peringatan jika kritis */}
                      {data.status === 'Kritis' && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <AlertTriangle size={16} className="text-white animate-bounce drop-shadow-md" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Label Bawah (Jam) */}
                  <div className="mt-4 text-center">
                    <p className="text-white font-bold">{data.jam}</p>
                    <p className={`text-[10px] md:text-xs font-bold uppercase mt-1 ${data.status === 'Kritis' ? 'text-red-400' : data.status === 'Waspada' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {data.status}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Legenda Grafik */}
          <div className="mt-12 pt-6 border-t border-slate-700 flex flex-wrap gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
              <span className="text-slate-300">Normal (&lt;15 Pasien)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
              <span className="text-slate-300">Waspada (15-30 Pasien)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
              <span className="text-slate-300 font-bold text-white">Kritis (&gt;30 Pasien)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PrediksiUGD;