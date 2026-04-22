import React, { useState } from 'react';
import { User, Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const KalenderInteraktif = () => {
  // 1. STATE: Antrean Pasien (Ruang Tunggu)
  const [pasienMenunggu, setPasienMenunggu] = useState([
    { id: 'pasien-1', nama: 'Wahyu (Anda)', tipe: 'Umum', color: 'bg-blue-500' }
  ]);

  // 2. STATE: Jadwal Dokter (Slot Kalender)
  const [jadwal, setJadwal] = useState([
    { id: 'slot-1', jam: '09:00 - 09:30', dokter: 'Dr. Andi (Penyakit Dalam)', terisiOleh: null },
    { id: 'slot-2', jam: '09:30 - 10:00', dokter: 'Dr. Andi (Penyakit Dalam)', terisiOleh: { id: 'p-lain', nama: 'Pasien Lain' } }, // Slot sudah penuh
    { id: 'slot-3', jam: '10:00 - 10:30', dokter: 'Dr. Andi (Penyakit Dalam)', terisiOleh: null },
    { id: 'slot-4', jam: '09:00 - 09:30', dokter: 'Dr. Sarah (Saraf)', terisiOleh: null },
  ]);

  const [pesan, setPesan] = useState(null);

  // --- LOGIKA DRAG AND DROP (HTML5 API) --- //

  // A. Saat pasien mulai diseret
  const handleDragStart = (e, pasien) => {
    // Simpan ID pasien ke dalam memori drag browser
    e.dataTransfer.setData('pasienId', pasien.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  // B. Saat pasien berada di atas slot (Wajib ada agar bisa dilepas/drop)
  const handleDragOver = (e) => {
    e.preventDefault(); // Mengizinkan elemen untuk dilepas di sini
    e.dataTransfer.dropEffect = 'move';
  };

  // C. Saat pasien dilepas (Drop) di dalam slot
  const handleDrop = (e, slotId) => {
    e.preventDefault();
    const draggedPasienId = e.dataTransfer.getData('pasienId');
    const draggedPasien = pasienMenunggu.find(p => p.id === draggedPasienId);

    if (!draggedPasien) return;

    // Cek apakah slot masih kosong
    const targetSlot = jadwal.find(j => j.id === slotId);
    if (targetSlot.terisiOleh !== null) {
      setPesan({ tipe: 'error', teks: 'Slot ini sudah dibooking pasien lain!' });
      setTimeout(() => setPesan(null), 3000);
      return;
    }

    // Pindahkan pasien dari 'Ruang Tunggu' ke 'Jadwal'
    setJadwal(prevJadwal => prevJadwal.map(slot => {
      if (slot.id === slotId) {
        return { ...slot, terisiOleh: draggedPasien };
      }
      return slot;
    }));

    // Hapus pasien dari antrean tunggu
    setPasienMenunggu(prev => prev.filter(p => p.id !== draggedPasienId));
    setPesan({ tipe: 'sukses', teks: `Berhasil booking di jam ${targetSlot.jam}` });
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Smart Booking Reservasi</h2>
          <p className="text-slate-600">Seret (Drag) kartu profil Anda ke slot jadwal dokter yang masih kosong.</p>
        </div>

        {/* Notifikasi Pop-up */}
        {pesan && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 font-bold text-white transition-all ${pesan.tipe === 'sukses' ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {pesan.tipe === 'sukses' ? <CheckCircle2 /> : <AlertCircle />}
            {pesan.teks}
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* KOLOM KIRI: Ruang Tunggu (Draggable Item) */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-24">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <User className="text-blue-500" /> Profil Anda
              </h3>
              
              {pasienMenunggu.length === 0 ? (
                <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400">
                  <CheckCircle2 className="mx-auto mb-2 text-emerald-400" size={32} />
                  <p>Jadwal sudah terkonfirmasi.</p>
                </div>
              ) : (
                pasienMenunggu.map(pasien => (
                  <div
                    key={pasien.id}
                    draggable // Ini yang membuat elemen HTML bisa diseret
                    onDragStart={(e) => handleDragStart(e, pasien)}
                    className={`${pasien.color} text-white p-4 rounded-2xl cursor-grab active:cursor-grabbing shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all flex items-center gap-4`}
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">{pasien.nama}</h4>
                      <span className="text-blue-100 text-sm">Geser ke jadwal 👉</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* KOLOM KANAN: Kalender (Drop Zone) */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calendar className="text-blue-500" /> Slot Tersedia (Hari Ini)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jadwal.map(slot => (
                  <div
                    key={slot.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, slot.id)}
                    className={`border-2 rounded-2xl p-5 transition-all duration-300 relative overflow-hidden
                      ${slot.terisiOleh 
                        ? slot.terisiOleh.id === 'pasien-1' // Jika diisi oleh kita
                          ? 'border-emerald-500 bg-emerald-50' 
                          : 'border-slate-200 bg-slate-50 opacity-60' // Diisi orang lain
                        : 'border-dashed border-blue-200 bg-blue-50/30 hover:bg-blue-50 hover:border-blue-400' // Kosong
                      }
                    `}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                        <Clock size={16} /> {slot.jam}
                      </div>
                      {slot.terisiOleh && slot.terisiOleh.id === 'pasien-1' && (
                        <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-md font-bold animate-pulse">Booking Anda</span>
                      )}
                    </div>
                    <p className="text-slate-800 font-medium mb-3">{slot.dokter}</p>

                    {/* Status Area */}
                    {slot.terisiOleh ? (
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-500 bg-white px-3 py-2 rounded-lg border border-slate-200">
                        <User size={16} /> 
                        {slot.terisiOleh.nama}
                      </div>
                    ) : (
                      <div className="text-blue-400 text-sm font-medium border-t border-blue-200/50 pt-2 border-dashed">
                        Kosong - Drop di sini
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KalenderInteraktif;