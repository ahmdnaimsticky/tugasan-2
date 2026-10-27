/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { TeaterCeritaAudio } from './components/TeaterCeritaAudio';
import { GameKendiri } from './components/GameKendiri';
import { GameBerkumpulan } from './components/GameBerkumpulan';
import { GameKritisPBL } from './components/GameKritisPBL';
import { Modul5PdanDSKP } from './components/Modul5PdanDSKP';
import { ReportModal } from './components/ReportModal';
import { ChatbotPemulihan } from './components/ChatbotPemulihan';
import { ManualPenggunaMurid } from './components/ManualPenggunaMurid';
import { Sparkles, Bot, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'manual' | 'teater' | 'kendiri' | 'pasukan' | 'kritis' | 'konsep5p'>('manual');
  const [totalScore, setTotalScore] = useState<number>(0);
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [chatbotContext, setChatbotContext] = useState<string>('Modul Pemulihan Umum');

  const handleScoreUpdate = (points: number) => {
    setTotalScore(prev => prev + points);
  };

  const handleOpenRemedialChat = (context?: string) => {
    setChatbotContext(context || `Bahagian ${activeTab.toUpperCase()}`);
    setIsChatbotOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      {/* Latar Belakang Rimba Animasi 3D 'Pada Zaman Dahulu' (Kecerahan Tinggi & Visual Menarik) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/images/pzd_game_bg_1792913701847.jpg')`,
          filter: 'brightness(1.12) saturate(1.18) contrast(1.02)'
        }}
      />
      {/* Lapisan Pelindung Lut Sinar Lembut untuk Memastikan Teks & Kad Mudah Dibaca Murid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-white/70 via-emerald-50/50 to-white/75 backdrop-blur-[0.5px]" />

      {/* Top Bar adhering strictly to Top Bar Contract */}
      <div className="relative z-10">
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenReport={() => setIsReportOpen(true)}
          onOpenChatbot={() => handleOpenRemedialChat()}
          totalScore={totalScore}
        />
      </div>

      {/* Main Educational Viewport Container (1440px baseline) */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full space-y-8"
          >
            {activeTab === 'manual' && (
              <ManualPenggunaMurid
                onStartActivity={() => {
                  setActiveTab('teater');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenChatbot={() => handleOpenRemedialChat('Panduan Murid')}
                onOpenReport={() => setIsReportOpen(true)}
              />
            )}

            {activeTab === 'teater' && (
              <TeaterCeritaAudio onStoryCompleted={() => handleScoreUpdate(30)} />
            )}

            {activeTab === 'kendiri' && (
              <GameKendiri onScoreUpdate={handleScoreUpdate} />
            )}

            {activeTab === 'pasukan' && (
              <GameBerkumpulan />
            )}

            {activeTab === 'kritis' && (
              <GameKritisPBL onScoreUpdate={handleScoreUpdate} />
            )}

            {activeTab === 'konsep5p' && (
              <Modul5PdanDSKP totalScore={totalScore} onOpenChatbot={() => handleOpenRemedialChat('Konsep 5P: Prinsip Pemulihan')} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Remedial AI Assistant Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => handleOpenRemedialChat()}
          className="group flex items-center gap-3 p-2.5 sm:px-4 sm:py-3 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-amber-950 font-black text-xs sm:text-sm border-2 border-amber-600 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Buka Pembimbing Pemulihan Cikgu Kancil AI"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-white shadow-md bg-amber-900 shrink-0">
            <img
              src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
              alt="Cikgu Kancil AI"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="flex items-center gap-1.5 leading-tight">
              <span>Tanya Cikgu Kancil</span>
              <Sparkles className="w-3.5 h-3.5 text-amber-900" />
            </div>
            <span className="text-[10px] font-bold text-amber-900/80 block">Bantuan Pemulihan AI</span>
          </div>
        </button>
      </div>

      {/* Remedial Chatbot Modal */}
      <ChatbotPemulihan
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        initialContext={chatbotContext}
      />

      {/* PBD Digital Assessment Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        totalScore={totalScore}
      />

      {/* Clean Pedagogical Footer */}
      <footer className="relative z-10 border-t border-emerald-200/70 bg-white/90 backdrop-blur-md py-6 mt-12 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-emerald-950">Aktiviti Interaktif Bahasa Melayu</span>
            <span>·</span>
            <span>KSSR Semakan · Bahasa Melayu Sekolah Rendah</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-600">
            <span>DSKP 1.3 &amp; 1.3.2</span>
            <span>·</span>
            <span>Konsep 5P, PBL &amp; Masteri</span>
          </div>

          <div className="text-emerald-800 font-medium">
            <span>Kisah Sang Kancil, Sang Kerbau &amp; Sang Buaya</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
