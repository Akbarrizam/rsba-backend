import React, { useState } from 'react';
import { Search, Calendar, Clock, User } from 'lucide-react';

// Data Asli Dokter RS Budi Asih Trenggalek (dengan jadwal simulasi)
const dataDokter = [
  { id: 1, nama: "dr. Agus Dahana, Sp.PD", poli: "Penyakit Dalam", jadwal: "Senin - Kamis", jam: "08.00 - 12.00 WIB" },
  { id: 2, nama: "dr. Bambang Widiatmoko, Sp.OG", poli: "Kebidanan & Kandungan", jadwal: "Selasa, Kamis, Sabtu", jam: "15.00 - 18.00 WIB" },
  { id: 3, nama: "dr. Dana Sumanti, Sp.A", poli: "Anak", jadwal: "Senin, Rabu, Jumat", jam: "09.00 - 13.00 WIB" },
  { id: 4, nama: "dr. Joko Susilo, Sp.P", poli: "Paru", jadwal: "Senin - Jumat", jam: "13.00 - 16.00 WIB" },
  { id: 5, nama: "dr. Fatah Subiantoro, Sp.B", poli: "Bedah", jadwal: "Selasa & Kamis", jam: "10.00 - 14.00 WIB" },
  { id: 6, nama: "dr. Rosari Listiana, Sp.S", poli: "Saraf", jadwal: "Rabu & Jumat", jam: "14.00 - 17.00 WIB" },
];

const JadwalDokter = () => {
  const [filterPoli, setFilterPoli] = useState('Semua');

  // Mengambil daftar unik poli untuk tombol filter
  const daftarPoli = ['Semua', ...new Set(dataDokter.map(d => d.poli))];

  // Memfilter data dokter berdasarkan poli yang dipilih
  const dokterDifilter = filterPoli === 'Semua' 
    ? dataDokter 
    : dataDokter.filter(d => d.poli === filterPoli);

  return (
    <section id="jadwal" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Informasi Pelayanan</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Jadwal Praktik Dokter</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Temukan jadwal praktik dokter spesialis kami dan rencanakan kunjungan Anda untuk mendapatkan pelayanan kesehatan terbaik.
          </p>
        </div>

        {/* Filter / Kategori Poli */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {daftarPoli.map((poli, index) => (
            <button
              key={index}
              onClick={() => setFilterPoli(poli)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                filterPoli === poli
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
              }`}
            >
              {poli}
            </button>
          ))}
        </div>

        {/* Grid Kartu Dokter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dokterDifilter.map((dokter) => (
            <div key={dokter.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <User size={24} />
                </div>
                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full">
                  Poli {dokter.poli}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 mb-4">{dokter.nama}</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-slate-600 text-sm">
                  <Calendar size={16} className="mr-3 text-slate-400" />
                  <span>{dokter.jadwal}</span>
                </div>
                <div className="flex items-center text-slate-600 text-sm">
                  <Clock size={16} className="mr-3 text-slate-400" />
                  <span>{dokter.jam}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-2.5 border-2 border-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                Buat Janji Temu
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default JadwalDokter;