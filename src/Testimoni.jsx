import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimoni = () => {
  // Data dummy testimoni yang relevan dengan RS Budi Asih
  const dataTestimoni = [
    {
      id: 1,
      nama: "Ibu Siti Nurhaliza",
      layanan: "Pasien Poli Anak",
      teks: "Pelayanan dr. Dana sangat sabar dan teliti. Anak saya yang biasanya takut ke rumah sakit jadi lebih tenang. Fasilitas ruang tunggu anaknya juga sangat nyaman.",
      rating: 5
    },
    {
      id: 2,
      nama: "Bpk. Wahyu Hidayat",
      layanan: "Pasien UGD",
      teks: "Penanganan di UGD tengah malam sangat cepat dan tanggap. Perawat dan dokter jaga sangat profesional memberikan tindakan pertama. Terima kasih RS Budi Asih.",
      rating: 5
    },
    {
      id: 3,
      nama: "Ibu Rina Wati",
      layanan: "Rawat Inap VIP Melati",
      teks: "Kamar rawat inap VIP Melati sangat bersih dan tenang, persis seperti di hotel. Makanan dari ahli gizi juga enak. Proses pemulihan pasca operasi caesar berjalan lancar.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Ulasan Pasien</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 mb-4">Apa Kata Mereka?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Komitmen kami adalah memberikan pelayanan kesehatan terbaik dari hati. 
            Berikut adalah pengalaman mereka yang telah mempercayakan kesehatannya kepada kami.
          </p>
        </div>

        {/* Grid Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {dataTestimoni.map((item) => (
            <div key={item.id} className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-xl">
              
              {/* Ikon Kutipan (Quote) di belakang */}
              <div className="absolute top-6 right-8 text-slate-200">
                <Quote size={64} strokeWidth={1} />
              </div>

              {/* Bintang Rating */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Teks Testimoni */}
              <p className="text-slate-700 leading-relaxed mb-8 relative z-10 italic">
                "{item.teks}"
              </p>

              {/* Profil Pengguna */}
              <div className="flex items-center gap-4 relative z-10 border-t border-slate-200 pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-lg">
                  {item.nama.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{item.nama}</h4>
                  <p className="text-slate-500 text-xs">{item.layanan}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimoni;