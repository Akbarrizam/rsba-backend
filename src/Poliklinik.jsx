import React from 'react';
import { Stethoscope, Activity, Baby, Heart, Syringe, Brain, Wind, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

const Poliklinik = () => {
  const dataPoli = [
    { id: 1, nama: "Poli Umum", desc: "Pelayanan kesehatan dasar dan pemeriksaan medis awal.", icon: <Stethoscope size={32} /> },
    { id: 2, nama: "Poli Penyakit Dalam", desc: "Diagnosis dan penanganan masalah organ dalam dewasa.", icon: <Activity size={32} /> },
    { id: 3, nama: "Poli Anak", desc: "Pemeriksaan kesehatan, tumbuh kembang, dan imunisasi.", icon: <Baby size={32} /> },
    { id: 4, nama: "Poli Kandungan (Obgyn)", desc: "Pemeriksaan kehamilan dan kesehatan reproduksi wanita.", icon: <Heart size={32} /> },
    { id: 5, nama: "Poli Bedah", desc: "Konsultasi pra-operasi dan penanganan luka atau trauma.", icon: <Syringe size={32} /> },
    { id: 6, nama: "Poli Saraf", desc: "Penanganan gangguan sistem saraf, otak, dan tulang belakang.", icon: <Brain size={32} /> },
    { id: 7, nama: "Poli Paru", desc: "Pemeriksaan dan pengobatan penyakit pernapasan.", icon: <Wind size={32} /> },
    { id: 8, nama: "Poli Gigi", desc: "Perawatan kesehatan gigi, gusi, dan estetika mulut.", icon: <Smile size={32} /> },
  ];

  return (
    <section id="poli" className="py-20 bg-blue-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Layanan Spesialis</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Poliklinik Rawat Jalan</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            RS Budi Asih menyediakan berbagai layanan poliklinik spesialis yang didukung oleh tenaga medis profesional dan peralatan modern.
          </p>
        </div>

        {/* Grid Poliklinik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dataPoli.map((poli) => (
            <div 
              key={poli.id} 
              className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100 transition-all duration-300 group cursor-default"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                {poli.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-700 transition-colors">
                {poli.nama}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {poli.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Poliklinik;