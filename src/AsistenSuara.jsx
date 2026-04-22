import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Bot, Activity } from 'lucide-react';

const AsistenSuara = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('Tekan mic & ucapkan sesuatu...');
  const [isSupported, setIsSupported] = useState(true);
  
  // Referensi untuk SpeechRecognition API
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Mengecek apakah browser mendukung Web Speech API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    // Inisialisasi pengaturan suara
    const recognition = new SpeechRecognition();
    recognition.continuous = false; // Berhenti otomatis setelah 1 kalimat
    recognition.lang = 'id-ID';     // Menggunakan bahasa Indonesia
    recognition.interimResults = false;

    // Saat mesin mulai mendengar
    recognition.onstart = () => {
      setIsListening(true);
      setFeedback('Mendengarkan...');
      setTranscript('');
    };

    // Saat mesin berhasil menangkap suara menjadi teks
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const teksSuara = event.results[current][0].transcript.toLowerCase();
      setTranscript(`" ${teksSuara} "`);
      processCommand(teksSuara); // Lempar teks ke fungsi logika navigasi
    };

    // Saat mesin berhenti/error
    recognition.onerror = (event) => {
      console.error(event.error);
      setFeedback('Gagal mendengar, silakan coba lagi.');
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  // --- LOGIKA AI NAVIGASI ---
  const processCommand = (text) => {
    // Daftar kata kunci dan aksinya
    if (text.includes('jadwal') || text.includes('dokter')) {
      setFeedback('Meluncur ke Jadwal Dokter!');
      // Scroll ke elemen dengan id="jadwal" (yang ada di JadwalDokter.jsx)
      document.getElementById('jadwal')?.scrollIntoView({ behavior: 'smooth' });
      
    } else if (text.includes('poli') || text.includes('spesialis')) {
      setFeedback('Membuka daftar Poliklinik!');
      document.getElementById('poli')?.scrollIntoView({ behavior: 'smooth' });
      
    } else if (text.includes('kamar') || text.includes('ruang') || text.includes('inap')) {
      setFeedback('Melihat ketersediaan kamar!');
      // Otomatis scroll sedikit ke atas jadwal (area Dashboard Kamar)
      window.scrollBy({ top: -500, behavior: 'smooth' });

    } else if (text.includes('atas') || text.includes('beranda') || text.includes('awal')) {
      setFeedback('Kembali ke beranda...');
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
      setFeedback('Maaf, perintah tidak dikenali. Coba: "Lihat Jadwal".');
    }
    
    // Hilangkan teks transcript setelah 5 detik
    setTimeout(() => {
      setTranscript('');
      setFeedback('Asisten suara siap sedia.');
    }, 5000);
  };

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  // Jika browser tidak mendukung (seperti Firefox lama/Safari tertentu)
  if (!isSupported) return null; 

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Balon Chat (Hanya muncul jika ada interaksi) */}
      {(transcript || isListening) && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl rounded-br-sm shadow-2xl border border-slate-700 max-w-xs animate-fade-in pointer-events-auto">
          <div className="flex items-center gap-2 mb-2 border-b border-slate-700 pb-2">
            <Bot size={16} className="text-blue-400" />
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">AI Voice Navigator</span>
          </div>
          
          {transcript && (
            <p className="text-emerald-400 font-medium text-sm italic mb-2">
              {transcript}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-sm text-slate-300">
            {isListening ? <Activity size={16} className="text-red-400 animate-pulse" /> : null}
            <p>{feedback}</p>
          </div>
        </div>
      )}

      {/* Tombol Utama Melayang */}
      <button
        onClick={toggleListen}
        className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-900/20 transition-all pointer-events-auto ${
          isListening 
            ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
            : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
        }`}
      >
        {isListening ? <MicOff size={28} /> : <Mic size={28} />}
      </button>

    </div>
  );
};

export default AsistenSuara;