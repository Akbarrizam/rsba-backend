import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  // State untuk melacak FAQ mana yang sedang terbuka
  const [openIndex, setOpenIndex] = useState(null);

  // Data FAQ relevan untuk Rumah Sakit
  const dataFAQ = [
    {
      tanya: "Apakah UGD RS Budi Asih buka 24 jam?",
      jawab: "Ya, Unit Gawat Darurat (UGD), Laboratorium, dan Farmasi/Apotek kami beroperasi penuh 24 jam setiap hari, termasuk hari libur nasional untuk melayani kondisi darurat."
    },
    {
      tanya: "Apakah RS Budi Asih menerima pasien BPJS Kesehatan?",
      jawab: "Tentu. Kami melayani pasien BPJS Kesehatan. Pastikan Anda membawa kelengkapan berkas seperti KTP, Kartu BPJS, dan Surat Rujukan dari Faskes Tingkat 1 (Klinik/Puskesmas), kecuali dalam kondisi gawat darurat medis."
    },
    {
      tanya: "Bagaimana cara mendaftar poliklinik secara online?",
      jawab: "Pendaftaran online dapat dilakukan maksimal H-1 sebelum jadwal dokter melalui layanan WhatsApp resmi kami atau dengan menekan tombol 'Konsultasi Online' di halaman utama website ini."
    },
    {
      tanya: "Jam berapa jadwal besuk pasien rawat inap?",
      jawab: "Untuk kenyamanan dan waktu istirahat pasien, jam besuk dibagi menjadi 2 sesi. Sesi Pagi: Pukul 10.00 - 12.00 WIB. Sesi Sore: Pukul 16.00 - 19.00 WIB. Anak di bawah 12 tahun tidak disarankan masuk area rawat inap."
    },
    {
      tanya: "Apakah melayani pembayaran menggunakan asuransi swasta?",
      jawab: "Ya, kami telah bekerja sama dengan berbagai penyedia asuransi kesehatan swasta dan perusahaan ternama. Silakan hubungi bagian pendaftaran untuk memastikan apakah asuransi Anda telah bermitra dengan kami."
    }
  ];

  const toggleFAQ = (index) => {
    // Jika diklik FAQ yang sama, maka tutup. Jika beda, buka yang baru.
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pusat Bantuan & FAQ</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan yang paling sering diajukan seputar layanan dan fasilitas di RS Budi Asih Trenggalek.
          </p>
        </div>

        {/* Daftar Accordion FAQ */}
        <div className="space-y-4">
          {dataFAQ.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:border-blue-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className={`font-bold pr-8 ${openIndex === index ? 'text-blue-700' : 'text-slate-800'}`}>
                  {faq.tanya}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                  openIndex === index ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-50 text-slate-400'
                }`}>
                  <ChevronDown size={20} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 pt-2 text-slate-600 leading-relaxed border-t border-slate-50 mx-6">
                      {faq.jawab}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;