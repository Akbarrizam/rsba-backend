import React from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Stethoscope, 
  Bed, 
  Activity, 
  ChevronRight, 
  HeartPulse, 
  Microscope,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import JadwalDokter from './JadwalDokter.jsx';
import Poliklinik from './Poliklinik.jsx';
import AlurPendaftaran from './AlurPendaftaran.jsx';
import Testimoni from './Testimoni.jsx';
import FAQ from './FAQ.jsx';
import ArtikelKesehatan from './ArtikelKesehatan.jsx';
import TriageAI from './TriageAI.jsx';
import SkinCheck from './SkinCheck.jsx';
import DashboardKamar from './DashboardKamar.jsx';
import HealthQuest from './HealthQuest.jsx';
import KalenderInteraktif from './KalenderInteraktif.jsx';
import AsistenSuara from './AsistenSuara.jsx';
import PrediksiUGD from './PrediksiUGD.jsx';
import TelemedicineRoom from './TelemedicineRoom.jsx';

const RSBudiAsihWeb = () => {
  // Animasi Variabel
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
             <img 
                src="RSBA 1.jpg" 
                alt="Logo RS Budi Asih" 
                className="h-12 w-auto object-contain" 
              />
              <div>
                <h1 className="text-blue-800 font-bold text-xl leading-none">RS BUDI ASIH</h1>
                <p className="text-slate-500 text-[10px] tracking-widest uppercase">Trenggalek</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
              <a href="#beranda" className="hover:text-blue-700 transition">Beranda</a>
              <a href="#fasilitas" className="hover:text-blue-700 transition">Fasilitas</a>
              <a href="#poli" className="hover:text-blue-700 transition">Poliklinik</a>
              <button className="bg-red-600 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-red-700 transition shadow-lg shadow-red-200">
                <Phone size={16} /> Gawat Darurat
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="beranda" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            className="flex-1 text-center lg:text-left"
            {...fadeInUp}
          >
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 underline decoration-blue-200">
              Pelayanan Kesehatan Terpercaya
            </span>
            <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              Mengutamakan <span className="text-blue-700">Kesembuhan</span> dan Kenyamanan Anda.
            </h2>
            <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto lg:mx-0">
              Rumah Sakit Budi Asih hadir dengan fasilitas modern dan tenaga medis profesional 
              untuk memberikan pelayanan terbaik bagi warga Trenggalek dan sekitarnya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#jadwal" 
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 inline-block text-center"
                  >
                Lihat Jadwal Dokter
              </a>
              <button className="border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">
                Konsultasi Online
              </button>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Placeholder untuk Gambar Gedung RS */}
            <div className="w-full aspect-[4/3] bg-slate-100 rounded-[2rem] overflow-hidden shadow-2xl relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>
               <img 
                 src="RSBA.webp" 
                 alt="Gedung RS Budi Asih" 
                 className="w-full h-full object-cover"
               />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-50 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <ShieldCheck size={28} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 font-medium">Terakreditasi</p>
                  <p className="text-lg font-bold text-slate-800">Paripurna</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- KEUNGGULAN --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="text-blue-600" />, title: "Layanan 24 Jam", desc: "UGD dan Farmasi siap melayani Anda setiap saat tanpa henti." },
              { icon: <Stethoscope className="text-blue-600" />, title: "Dokter Spesialis", desc: "Didukung oleh jajaran dokter spesialis yang ahli di bidangnya." },
              { icon: <HeartPulse className="text-blue-600" />, title: "Peralatan Modern", desc: "Teknologi medis terkini untuk diagnosa yang lebih akurat." },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition"
                whileHover={{ y: -5 }}
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TriageAI />
      <SkinCheck />

      {/* --- GAMIFIKASI KESEHATAN --- */}
      <HealthQuest />

      {/* --- FASILITAS UNGGULAN --- */}
      <section id="fasilitas" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Fasilitas & Layanan Medis</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Kami menyediakan berbagai kelas perawatan dan fasilitas penunjang medis yang lengkap untuk kenyamanan Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "VVIP & VIP Melati", icon: <Bed />, tag: "Rawat Inap" },
              { name: "Unit Gawat Darurat", icon: <Activity />, tag: "24 Jam" },
              { name: "Laboratorium Klinis", icon: <Microscope />, tag: "Penunjang" },
              { name: "Ruang Bersalin (VK)", icon: <HeartPulse />, tag: "Kebidanan" },
              { name: "High Care Unit (HCU)", icon: <Activity />, tag: "Intensif" },
              { name: "Fisioterapi", icon: <Activity />, tag: "Rehabilitasi" },
              { name: "Radiologi & USG", icon: <Microscope />, tag: "Diagnostik" },
              { name: "Apotek / Farmasi", icon: <Clock />, tag: "24 Jam" },
            ].map((fac, i) => (
              <div key={i} className="group p-6 rounded-2xl border border-slate-100 hover:bg-blue-700 hover:text-white transition-all duration-300 cursor-pointer">
                <div className="text-blue-600 group-hover:text-blue-100 mb-4 transition-colors">
                  {fac.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-200">{fac.tag}</span>
                <h4 className="text-lg font-bold mt-1">{fac.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Poliklinik />
      <DashboardKamar />
      <PrediksiUGD />
      <KalenderInteraktif />
      <JadwalDokter />
      <AlurPendaftaran /> 
      <Testimoni />
      <FAQ />
      <ArtikelKesehatan />

      {/* --- FOOTER --- */}
      <footer className="bg-slate-900 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img 
                  src="RSBA 1.jpg" 
                  alt="Logo RS Budi Asih" 
                  className="h-12 w-auto object-contain bg-white rounded p-1" 
                />
                <h3 className="text-xl font-bold">RS Budi Asih</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Menjadi rumah sakit pilihan utama masyarakat Trenggalek dengan mengedepankan profesionalisme dan kasih sayang.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6">Layanan Populer</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-white cursor-pointer transition">Poli Anak</li>
                <li className="hover:text-white cursor-pointer transition">Poli Kebidanan & Kandungan</li>
                <li className="hover:text-white cursor-pointer transition">Poli Penyakit Dalam</li>
                <li className="hover:text-white cursor-pointer transition">Check Up Kesehatan</li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Kontak Kami</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-500 shrink-0" />
                  <span>Jl. Mayjend Sungkono No. 79, Trenggalek, Jawa Timur</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-blue-500 shrink-0" />
                  <span>(0355) 791XXX / 0812-XXXX-XXXX</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Lokasi</h4>
              <div className="w-full h-40 bg-slate-800 rounded-xl overflow-hidden grayscale contrast-125 opacity-50 hover:opacity-100 hover:grayscale-0 transition duration-500">
                {/* Embed Google Maps di sini */}
                <iframe 
                  src="https://maps.google.com/maps?q=RS%20Budi%20Asih%20Trenggalek&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  className="w-full h-full border-0" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} RS Budi Asih Trenggalek. All rights reserved.</p>
          </div>
        </div>
      </footer>
          <AsistenSuara />
          <TelemedicineRoom />
    </div>
  );
};

export default RSBudiAsihWeb;