import React, { useState } from 'react';
import { FileText, Users, Stethoscope, CreditCard, Pill, CheckCircle } from 'lucide-react';

const AlurPendaftaran = () => {
  // State untuk melacak tab mana yang sedang aktif ('bpjs' atau 'umum')
  const [activeTab, setActiveTab] = useState('bpjs');

  // Data Alur Pasien BPJS
  const alurBPJS = [
    { id: 1, title: "Siapkan Berkas", desc: "Bawa KTP asli, Kartu BPJS, dan Surat Rujukan dari Faskes Tingkat 1.", icon: <FileText size={24} /> },
    { id: 2, title: "Ambil Antrean", desc: "Ambil nomor antrean pendaftaran khusus loket BPJS setiba di rumah sakit.", icon: <Users size={24} /> },
    { id: 3, title: "Verifikasi & SEP", desc: "Serahkan berkas ke petugas untuk diverifikasi dan mencetak Surat Elegibilitas Peserta (SEP).", icon: <CheckCircle size={24} /> },
    { id: 4, title: "Menuju Poliklinik", desc: "Tunggu panggilan di ruang tunggu poliklinik tujuan untuk pemeriksaan dokter.", icon: <Stethoscope size={24} /> },
    { id: 5, title: "Ambil Obat", desc: "Serahkan resep ke bagian Farmasi khusus BPJS dan ambil obat tanpa biaya tambahan.", icon: <Pill size={24} /> },
  ];

  // Data Alur Pasien Umum
  const alurUmum = [
    { id: 1, title: "Ambil Antrean", desc: "Ambil nomor antrean pendaftaran di mesin otomatis loket Umum.", icon: <Users size={24} /> },
    { id: 2, title: "Pendaftaran", desc: "Tunjukkan KTP. Jika pasien baru, isi formulir rekam medis singkat.", icon: <FileText size={24} /> },
    { id: 3, title: "Menuju Poliklinik", desc: "Tunggu panggilan di depan ruang dokter spesialis untuk konsultasi.", icon: <Stethoscope size={24} /> },
    { id: 4, title: "Kasir Pembayaran", desc: "Selesaikan administrasi biaya pemeriksaan dan obat di loket Kasir.", icon: <CreditCard size={24} /> },
    { id: 5, title: "Ambil Obat", desc: "Tunjukkan bukti lunas ke bagian Farmasi untuk mengambil obat Anda.", icon: <Pill size={24} /> },
  ];

  // Menentukan data mana yang ditampilkan berdasarkan tab yang aktif
  const currentAlur = activeTab === 'bpjs' ? alurBPJS : alurUmum;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Panduan Alur Pendaftaran</h2>
          <p className="text-slate-600">Pelajari langkah-langkah pendaftaran agar kunjungan Anda lebih cepat dan nyaman.</p>
        </div>

        {/* Tab Switcher (Tombol BPJS / Umum) */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1 rounded-xl inline-flex shadow-sm border border-slate-200">
            <button
              onClick={() => setActiveTab('bpjs')}
              className={`px-8 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === 'bpjs' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Pasien BPJS Kesehatan
            </button>
            <button
              onClick={() => setActiveTab('umum')}
              className={`px-8 py-3 rounded-lg font-bold text-sm transition-all duration-300 ${
                activeTab === 'umum' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Pasien Umum / Asuransi
            </button>
          </div>
        </div>

        {/* Timeline Alur */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
          <div className="space-y-8 relative">
            
            {/* Garis vertikal penghubung timeline */}
            <div className="absolute left-6 top-10 bottom-10 w-0.5 bg-slate-100 hidden md:block"></div>

            {currentAlur.map((step, index) => (
              <div key={step.id} className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                
                {/* Ikon & Nomor */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                    activeTab === 'bpjs' ? 'bg-green-500' : 'bg-blue-600'
                  }`}>
                    {step.icon}
                  </div>
                  {/* Badge Nomor Urut */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white text-xs flex items-center justify-center rounded-full font-bold border-2 border-white">
                    {step.id}
                  </div>
                </div>

                {/* Konten Teks */}
                <div className="bg-slate-50 flex-1 p-5 rounded-2xl border border-slate-100 w-full">
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AlurPendaftaran;