import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, MessageSquare, FileText, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

const TelemedicineRoom = () => {
  const [isCallActive, setIsCallActive] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [pesanInput, setPesanInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatLog, setChatLog] = useState([
    { pengirim: 'Sistem', pesan: 'Konsultasi aman dan terenkripsi. Dokter sudah terhubung.', waktu: new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'}), isSystem: true }
  ]);
  const [catatan, setCatatan] = useState('Menunggu observasi dokter...');
  
  // Ref baru yang diarahkan ke container obrolan, bukan ke halaman
  const chatContainerRef = useRef(null);

  // Logika auto-scroll yang sudah diperbaiki (Hanya scroll isi kotak chat)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatLog, isTyping]);

  const kirimChat = async (e) => {
    if (e.key === 'Enter' && pesanInput.trim() !== '') {
      const userMsg = pesanInput;
      const time = new Date().toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'});
      
      setChatLog(prev => [...prev, { pengirim: 'Anda', pesan: userMsg, waktu: time, isDokter: false }]);
      setPesanInput('');
      setIsTyping(true);

      try {
        const res = await fetch('http://127.0.0.1:8000/chat-dokter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pesan_pasien: userMsg })
        });
        const data = await res.json();
        
        setIsTyping(false);
        setChatLog(prev => [...prev, { pengirim: data.pengirim, pesan: data.balasan, waktu: time, isDokter: true }]);
        
        if (data.balasan.toLowerCase().includes('resep') || data.balasan.toLowerCase().includes('istirahat') || data.balasan.toLowerCase().includes('obat')) {
          setCatatan(`Update ${time}: Pasien melaporkan keluhan. Dokter memberikan instruksi penanganan. (Rekam Medis Tersimpan)`);
        }
      } catch (err) {
        setIsTyping(false);
        setChatLog(prev => [...prev, { pengirim: 'Sistem', pesan: 'Koneksi ke AI terputus. Pastikan server Python menyala.', isSystem: true }]);
      }
    }
  };

  // Tampilan saat panggilan diakhiri
  if (!isCallActive) {
    return (
      <div className="py-20 bg-slate-950 text-center text-white min-h-screen flex flex-col justify-center">
        <CheckCircle2 size={80} className="text-emerald-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-2">Konsultasi Selesai</h2>
        <p className="text-slate-400 mb-8">Terima kasih telah menggunakan layanan Telemedicine RS Budi Asih.</p>
        <div className="max-w-xl mx-auto p-8 bg-slate-900 rounded-3xl border border-slate-800 text-left w-full shadow-2xl">
            <h4 className="font-bold text-blue-400 mb-4 flex items-center gap-2"><FileText size={20}/> Ringkasan Medis:</h4>
            <p className="text-sm text-slate-300 font-mono leading-relaxed">{catatan}</p>
        </div>
      </div>
    );
  }

  // Tampilan Utama Telemedicine
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-8 h-[650px]">
        
        {/* KIRI: Video Feed */}
        <div className="flex-1 bg-slate-900 rounded-3xl relative border border-slate-800 overflow-hidden flex flex-col shadow-2xl">
          <div className="absolute top-4 left-4 flex gap-3 z-10">
            <div className="bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-600 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-white text-xs font-bold">REC: LIVE</span>
            </div>
            <div className="bg-emerald-500/20 px-3 py-1.5 rounded-full border border-emerald-500/30 flex items-center gap-2">
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-emerald-400 text-xs font-bold">Terenkripsi</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-slate-800 to-slate-900">
            <div className="w-36 h-36 bg-blue-500/10 rounded-full flex items-center justify-center border-4 border-slate-700 shadow-xl mb-4">
              <Activity size={56} className="text-blue-500 animate-pulse" />
            </div>
            <h3 className="text-white font-bold text-2xl">Dr. Sarah (Sp. Saraf)</h3>
            <p className="text-slate-400">AI Virtual Assistant</p>
          </div>

          <div className="absolute bottom-24 right-6 w-40 h-56 bg-slate-800 rounded-2xl border-2 border-slate-600 flex items-center justify-center shadow-2xl overflow-hidden">
            <span className="text-slate-400 font-bold">{isVideoOff ? <VideoOff size={32} /> : "Anda"}</span>
            {isMuted && !isVideoOff && <div className="absolute bottom-2 right-2 bg-red-500 p-1.5 rounded-full text-white"><MicOff size={14} /></div>}
          </div>

          <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-center gap-6">
            <button onClick={() => setIsMuted(!isMuted)} className={`p-4 rounded-full transition-all ${isMuted ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-slate-700 text-white hover:bg-slate-600'}`}><Mic size={24} /></button>
            <button onClick={() => setIsVideoOff(!isVideoOff)} className={`p-4 rounded-full transition-all ${isVideoOff ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-slate-700 text-white hover:bg-slate-600'}`}><Video size={24} /></button>
            <button onClick={() => setIsCallActive(false)} className="px-8 py-4 bg-red-600 rounded-full text-white font-bold hover:bg-red-700 shadow-lg shadow-red-600/30 flex items-center gap-2"><PhoneOff size={20} /> End Call</button>
          </div>
        </div>

        {/* KANAN: Panel Medis */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          
          {/* Kotak Obrolan */}
          <div className="flex-1 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 font-bold text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-400" /> Obrolan Medis
            </div>
            
            {/* REF DIPASANG DI SINI UNTUK AUTO-SCROLL */}
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatLog.map((c, i) => (
                <div key={i} className={`flex flex-col ${c.isSystem ? 'items-center' : c.isDokter ? 'items-start' : 'items-end'}`}>
                  <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-md ${c.isSystem ? 'text-[10px] text-slate-400 bg-slate-800 uppercase px-4' : c.isDokter ? 'bg-slate-800 text-slate-200 rounded-tl-sm' : 'bg-blue-600 text-white rounded-tr-sm'}`}>
                    {!c.isSystem && <div className="flex justify-between items-end gap-3 mb-1"><span className="font-bold text-xs opacity-70">{c.pengirim}</span><span className="text-[10px] opacity-50">{c.waktu}</span></div>}
                    {c.pesan}
                  </div>
                </div>
              ))}
              {isTyping && <div className="text-sm text-slate-500 animate-pulse bg-slate-800 p-3 rounded-2xl rounded-tl-sm inline-block">Dr. Sarah sedang mengetik...</div>}
            </div>
            
            <div className="p-4 bg-slate-900 border-t border-slate-800">
              <input 
                type="text" 
                value={pesanInput}
                onChange={(e) => setPesanInput(e.target.value)}
                onKeyDown={kirimChat}
                className="w-full bg-slate-800 border border-slate-700 rounded-full px-5 py-3 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="Ketik keluhan Anda lalu Enter..."
              />
            </div>
          </div>

          {/* Catatan Dokter */}
          <div className="bg-slate-900 p-5 rounded-3xl border border-slate-800 h-48 flex flex-col shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-emerald-400 font-bold text-sm flex items-center gap-2"><FileText size={16} /> RESEP & CATATAN LIVE</h4>
              <span className="flex h-2 w-2 relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>
            </div>
            <div className="bg-slate-800/50 flex-1 rounded-xl p-4 border border-slate-800 overflow-y-auto">
              <p className="text-slate-300 text-sm font-mono leading-relaxed">{catatan}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TelemedicineRoom;