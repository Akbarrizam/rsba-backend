import React, { useState, useEffect } from 'react';
import { Trophy, Droplets, Footprints, HeartPulse, Star, Gift } from 'lucide-react';

const HealthQuest = () => {
  // 1. Inisialisasi State (Cek apakah ada data tersimpan di Local Storage)
  const [userData, setUserData] = useState(() => {
    const savedData = localStorage.getItem('rsba_quest_data');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return {
      level: 1,
      xp: 0,
      quests: [
        { id: 1, title: 'Minum Air Putih', icon: 'water', current: 0, target: 8, unit: 'Gelas', xpReward: 20, done: false },
        { id: 2, title: 'Jalan Kaki', icon: 'walk', current: 0, target: 5000, unit: 'Langkah', xpReward: 50, done: false },
        { id: 3, title: 'Cek Tekanan Darah', icon: 'heart', current: 0, target: 1, unit: 'Kali', xpReward: 30, done: false },
      ]
    };
  });

  // 2. Efek untuk selalu menyimpan data ke Local Storage setiap ada perubahan
  useEffect(() => {
    localStorage.setItem('rsba_quest_data', JSON.stringify(userData));
  }, [userData]);

  // Kalkulasi Level Up (Setiap 100 XP = Naik 1 Level)
  const xpMaksimal = userData.level * 100;
  const persentaseXP = (userData.xp / xpMaksimal) * 100;

  // 3. Fungsi untuk menambah progress misi
  const handleProgress = (id, amount) => {
    setUserData(prev => {
      const newQuests = prev.quests.map(quest => {
        if (quest.id === id && !quest.done) {
          const newCurrent = Math.min(quest.current + amount, quest.target);
          const isDone = newCurrent >= quest.target;
          return { ...quest, current: newCurrent, done: isDone };
        }
        return quest;
      });

      // Cek apakah quest yang diklik baru saja selesai untuk menambah XP
      const questTerkait = newQuests.find(q => q.id === id);
      const questSebelumnya = prev.quests.find(q => q.id === id);
      
      let newXp = prev.xp;
      let newLevel = prev.level;

      if (questTerkait.done && !questSebelumnya.done) {
        newXp += questTerkait.xpReward;
        // Logika Level Up
        if (newXp >= prev.level * 100) {
          newXp = newXp - (prev.level * 100);
          newLevel += 1;
        }
      }

      return { level: newLevel, xp: newXp, quests: newQuests };
    });
  };

  // Fungsi pembantu untuk Icon
  const getIcon = (type) => {
    switch(type) {
      case 'water': return <Droplets className="text-blue-500" size={24} />;
      case 'walk': return <Footprints className="text-emerald-500" size={24} />;
      case 'heart': return <HeartPulse className="text-rose-500" size={24} />;
      default: return <Star className="text-yellow-500" size={24} />;
    }
  };

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Header Profil Gamifikasi */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 text-yellow-500/10">
            <Trophy size={150} />
          </div>
          
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-lg border-4 border-white z-10 flex-shrink-0">
            <div className="text-center">
              <span className="text-xs uppercase font-bold tracking-wider opacity-80">Level</span>
              <h2 className="text-3xl font-black leading-none">{userData.level}</h2>
            </div>
          </div>
          
          <div className="flex-1 w-full z-10">
            <div className="flex justify-between items-end mb-2">
              <div>
                <h3 className="text-xl font-bold text-slate-800">Pasien Sehat RSBA</h3>
                <p className="text-slate-500 text-sm">Selesaikan misi harian untuk mendapatkan *reward*!</p>
              </div>
              <span className="font-bold text-orange-500">{userData.xp} / {xpMaksimal} XP</span>
            </div>
            {/* XP Bar */}
            <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 ease-out"
                style={{ width: `${persentaseXP}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Daftar Quest (Misi) */}
        <h3 className="text-lg font-bold text-slate-800 mb-4 px-2">Misi Harian Anda</h3>
        <div className="space-y-4 mb-8">
          {userData.quests.map((quest) => (
            <div key={quest.id} className={`bg-white rounded-2xl p-4 md:p-6 border ${quest.done ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-100'} shadow-sm flex items-center gap-4 transition-all`}>
              <div className={`p-3 rounded-xl ${quest.done ? 'bg-emerald-100' : 'bg-slate-50'}`}>
                {getIcon(quest.icon)}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`font-bold ${quest.done ? 'text-emerald-800' : 'text-slate-800'}`}>{quest.title}</h4>
                  <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-1 rounded-md">+{quest.xpReward} XP</span>
                </div>
                
                {/* Quest Progress Bar */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${quest.done ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${(quest.current / quest.target) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 w-16 text-right">
                    {quest.current} / {quest.target}
                  </span>
                </div>
              </div>

              {/* Tombol Aksi */}
              {!quest.done ? (
                <button 
                  onClick={() => handleProgress(quest.id, quest.id === 2 ? 1000 : 1)} // Kalau jalan kaki tambah 1000, lainnya tambah 1
                  className="w-10 h-10 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg font-bold text-xl flex items-center justify-center transition-colors flex-shrink-0"
                >
                  +
                </button>
              ) : (
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy size={20} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Reward Info */}
        <div className="bg-blue-600 rounded-2xl p-6 text-white flex items-center gap-4 shadow-lg shadow-blue-600/20">
          <Gift size={32} className="text-blue-300 flex-shrink-0" />
          <div>
            <h4 className="font-bold mb-1">Hadiah Level Up!</h4>
            <p className="text-blue-100 text-sm leading-relaxed">Capai <strong>Level 5</strong> untuk mendapatkan *Voucher* Diskon 10% Konsultasi Spesialis di RS Budi Asih.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HealthQuest;