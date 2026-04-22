import React, { useState, useEffect } from 'react';
import { Bed, Activity, Clock } from 'lucide-react';

const DashboardKamar = () => {
  // 1. Data Awal Kapasitas Rumah Sakit
  const [dataKamar, setDataKamar] = useState([
    { id: 1, nama: 'UGD (Darurat)', total: 15, terisi: 12, warna: 'text-red-500', stroke: 'stroke-red-500', bg: 'bg-red-50' },
    { id: 2, nama: 'VIP Melati', total: 20, terisi: 15, warna: 'text-purple-600', stroke: 'stroke-purple-600', bg: 'bg-purple-50' },
    { id: 3, nama: 'Kelas 1 Mawar', total: 40, terisi: 32, warna: 'text-blue-600', stroke: 'stroke-blue-600', bg: 'bg-blue-50' },
    { id: 4, nama: 'Kelas 2 Anggrek', total: 60, terisi: 45, warna: 'text-emerald-500', stroke: 'stroke-emerald-500', bg: 'bg-emerald-50' },
  ]);

  const [waktuUpdate, setWaktuUpdate] = useState(new Date().toLocaleTimeString('id-ID'));

  // 2. Efek Simulasi Real-Time (Setiap 4 detik data berubah otomatis)
  useEffect(() => {
    const interval = setInterval(() => {
      setDataKamar(prevData => 
        prevData.map(kamar => {
          // Simulasi pasien masuk/keluar secara acak (-1, 0, atau +1)
          const perubahan = Math.floor(Math.random() * 3) - 1; 
          let newTerisi = kamar.terisi + perubahan;
          
          // Batas logika (tidak boleh kurang dari 0 atau lebih dari total)
          if (newTerisi < 0) newTerisi = 0;
          if (newTerisi > kamar.total) newTerisi = kamar.total;
          
          return { ...kamar, terisi: newTerisi };
        })
      );
      setWaktuUpdate(new Date().toLocaleTimeString('id-ID'));
    }, 4000); // 4000 ms = 4 detik

    return () => clearInterval(interval); // Bersihkan memori jika pindah halaman
  }, []);

  return (
    <section className="py-20 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.7)]"></div>
              <span className="text-red-400 font-bold tracking-wider uppercase text-sm">Live System</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white">Monitor Ketersediaan Kamar</h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg text-slate-300 text-sm border border-slate-700">
            <Clock size={16} className="text-blue-400" />
            <span>Update Terakhir: <strong>{waktuUpdate} WIB</strong></span>
          </div>
        </div>

        {/* Grid Donut Chart */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {dataKamar.map((kamar) => {
            // Kalkulasi persentase untuk SVG Donut Chart
            const radius = 40;
            const keliling = 2 * Math.PI * radius; // Rumus keliling lingkaran
            const persentase = (kamar.terisi / kamar.total) * 100;
            const strokeDashoffset = keliling - (persentase / 100) * keliling;
            const tersedia = kamar.total - kamar.terisi;

            return (
              <div key={kamar.id} className="bg-slate-800 rounded-3xl p-6 border border-slate-700 relative overflow-hidden group">
                
                <h3 className="text-lg font-bold text-white mb-6 text-center">{kamar.nama}</h3>
                
                {/* SVG Donut Chart Murni */}
                <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Lingkaran Dasar (Background) */}
                    <circle cx="50" cy="50" r={radius} fill="transparent" stroke="#334155" strokeWidth="8" />
                    {/* Lingkaran Progress (Data Real-time) */}
                    <circle 
                      cx="50" 
                      cy="50" 
                      r={radius} 
                      fill="transparent" 
                      className={`${kamar.stroke} transition-all duration-1000 ease-out`} 
                      strokeWidth="8"
                      strokeDasharray={keliling}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* Teks di tengah Donut Chart */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${kamar.warna} transition-colors`}>{tersedia}</span>
                    <span className="text-slate-400 text-xs font-bold uppercase">Kosong</span>
                  </div>
                </div>

                {/* Detail Angka */}
                <div className="flex justify-between items-center px-4 py-3 bg-slate-900 rounded-xl border border-slate-700">
                  <div className="flex items-center gap-2">
                    <Bed size={16} className="text-slate-400" />
                    <span className="text-slate-300 text-sm">Terisi: <strong className="text-white">{kamar.terisi}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity size={16} className="text-slate-400" />
                    <span className="text-slate-300 text-sm">Total: <strong className="text-white">{kamar.total}</strong></span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default DashboardKamar;