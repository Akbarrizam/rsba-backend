import React from 'react';
import { Calendar, User, ArrowRight, Activity } from 'lucide-react';

const ArtikelKesehatan = () => {
  // Data dummy artikel kesehatan
  const dataArtikel = [
    {
      id: 1,
      kategori: "Kesehatan Umum",
      judul: "Waspada Gejala Demam Berdarah (DBD) di Musim Hujan",
      ringkasan: "Kenali fase kritis demam berdarah dan langkah pencegahan 3M Plus untuk melindungi keluarga Anda dari gigitan nyamuk Aedes aegypti.",
      tanggal: "15 April 2026",
      penulis: "dr. Agus Dahana, Sp.PD"
    },
    {
      id: 2,
      kategori: "Gizi & Nutrisi",
      judul: "Panduan Pola Makan Sehat untuk Menjaga Gula Darah",
      ringkasan: "Mengatur asupan karbohidrat dan memilih makanan kaya serat sangat penting bagi penderita diabetes maupun untuk pencegahan sejak dini.",
      tanggal: "12 April 2026",
      penulis: "Ahli Gizi RSBA"
    },
    {
      id: 3,
      kategori: "Tumbuh Kembang",
      judul: "Pentingnya Imunisasi Dasar Lengkap Bagi Anak",
      ringkasan: "Jadwal imunisasi dasar yang wajib diberikan pada tahun pertama kehidupan anak untuk membangun sistem kekebalan tubuh yang optimal.",
      tanggal: "08 April 2026",
      penulis: "dr. Dana Sumanti, Sp.A"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Pusat Edukasi</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Berita & Artikel Kesehatan</h2>
            <p className="text-slate-600">
              Dapatkan informasi medis terpercaya dan tips kesehatan terkini yang ditulis langsung oleh tenaga ahli medis kami.
            </p>
          </div>
          <button className="flex-shrink-0 text-blue-700 font-bold flex items-center gap-2 hover:text-blue-800 transition-colors group">
            Lihat Semua Artikel 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dataArtikel.map((artikel) => (
            <div key={artikel.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer flex flex-col">
              
              {/* Gambar Thumbnail (Placeholder) */}
              <div className="w-full h-48 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors z-10"></div>
                {/* Efek zoom saat di-hover */}
                <div className="w-full h-full flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform duration-500">
                   <Activity size={64} strokeWidth={1} />
                </div>
                {/* Tag Kategori */}
                <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                  {artikel.kategori}
                </div>
              </div>

              {/* Konten Artikel */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{artikel.tanggal}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{artikel.penulis}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors line-clamp-2">
                  {artikel.judul}
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                  {artikel.ringkasan}
                </p>

                <div className="flex items-center text-blue-600 font-bold text-sm mt-auto">
                  Baca Selengkapnya
                  <ArrowRight size={16} className="ml-2" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ArtikelKesehatan;