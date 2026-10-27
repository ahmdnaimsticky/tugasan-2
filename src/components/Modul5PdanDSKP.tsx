/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Award,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Printer,
  HeartHandshake,
  Feather,
  Layers,
  ShieldCheck,
  Brain
} from 'lucide-react';
import { DSKP_INFO } from '../data/storyData';
import { playSound } from '../utils/soundEffects';

interface Modul5PdanDSKPProps {
  totalScore: number;
  onOpenChatbot?: () => void;
}

export const Modul5PdanDSKP: React.FC<Modul5PdanDSKPProps> = ({ totalScore, onOpenChatbot }) => {
  const [activeTab, setActiveTab] = useState<'5p' | 'dskp' | 'pengayaan' | 'rubrik'>('5p');

  // Pengayaan: Alternative Ending Composer
  const [studentEnding, setStudentEnding] = useState<string>('');
  const [endingSaved, setEndingSaved] = useState<boolean>(false);

  // Pengayaan: Pantun 4 Kerat Assembly
  const [pantunCompleted, setPantunCompleted] = useState<boolean>(false);

  const handleSaveEnding = () => {
    if (!studentEnding.trim()) return;
    playSound('correct');
    setEndingSaved(true);
    confetti({ particleCount: 70, spread: 60 });
  };

  const handleCompletePantun = () => {
    playSound('victory');
    setPantunCompleted(true);
    confetti({ particleCount: 90, spread: 70 });
  };

  const getTPLevel = (score: number) => {
    if (score >= 120) return { tp: 'TP 6', desc: 'Sangat Cemerlang: Berupaya menceritakan semula bahan dengan sebutan baku, intonasi ekspresif, serta menganalisis nilai murni dan integriti pada tahap berfikir aras tinggi (KBAT).' };
    if (score >= 90) return { tp: 'TP 5', desc: 'Cemerlang: Menceritakan bahan dengan sebutan dan intonasi yang betul serta menghayati dan menghubungkaitkan nilai murni dalam kehidupan.' };
    if (score >= 60) return { tp: 'TP 4', desc: 'Baik: Menceritakan bahan dengan sebutan dan intonasi yang sesuai serta menyatakan nilai murni dengan tepat.' };
    if (score >= 30) return { tp: 'TP 3', desc: 'Memuaskan: Mampu memahami isi cerita dan membaca teks secara asas dengan bimbingan.' };
    return { tp: 'TP 2', desc: 'Tahap Penguasaan Asas: Sedang menjalani fasa bimbingan pemulihan.' };
  };

  const tpData = getTPLevel(totalScore);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-50/95 via-amber-100/70 to-emerald-50/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-500 to-emerald-700" />
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-amber-900 uppercase tracking-wider mb-1.5">
            <span className="bg-amber-200/80 px-2.5 py-0.5 rounded-full border border-amber-400 text-amber-950 font-bold shadow-xs">
              📜 Pedagogi KSSR Semakan
            </span>
            <span className="text-amber-500">·</span>
            <span className="text-amber-900 font-bold">Bahasa Melayu Tahun 4</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
            Panduan Strategi PdP Konsep 5P, DSKP &amp; Pentaksiran Bilik Darjah (PBD)
          </h1>
          <p className="text-xs sm:text-sm text-amber-950/80 mt-1 max-w-3xl leading-relaxed font-medium">
            Menghuraikan pelaksanaan Konsep 5P, Pendekatan Tematik Integriti, Pembelajaran Masteri, Pembelajaran Berasaskan Masalah (PBL), serta rubrik penilaian standard DSKP.
          </p>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-1.5 bg-amber-950/10 p-1.5 rounded-2xl shrink-0 border border-amber-900/15 backdrop-blur-xs">
          <button
            onClick={() => { playSound('click'); setActiveTab('5p'); }}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === '5p'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-amber-950 shadow-md border-2 border-amber-400'
                : 'text-amber-950 hover:bg-amber-100/60 font-bold'
            }`}
          >
            Konsep 5P
          </button>
          <button
            onClick={() => { playSound('click'); setActiveTab('dskp'); }}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'dskp'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-amber-950 shadow-md border-2 border-amber-400'
                : 'text-amber-950 hover:bg-amber-100/60 font-bold'
            }`}
          >
            Standard DSKP
          </button>
          <button
            onClick={() => { playSound('click'); setActiveTab('pengayaan'); }}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'pengayaan'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-amber-950 shadow-md border-2 border-amber-400'
                : 'text-amber-950 hover:bg-amber-100/60 font-bold'
            }`}
          >
            Pengayaan KBAT
          </button>
          <button
            onClick={() => { playSound('click'); setActiveTab('rubrik'); }}
            className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              activeTab === 'rubrik'
                ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-amber-950 shadow-md border-2 border-amber-400'
                : 'text-amber-950 hover:bg-amber-100/60 font-bold'
            }`}
          >
            Rubrik PBD
          </button>
        </div>
      </div>

      {/* ================= TAB 1: KONSEP 5P ================= */}
      {activeTab === '5p' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DSKP_INFO.konsep5P.map((item, idx) => {
              const icons = [
                <Layers key="1" className="w-5 h-5 text-emerald-700" />,
                <ShieldCheck key="2" className="w-5 h-5 text-blue-700" />,
                <Award key="3" className="w-5 h-5 text-amber-700" />,
                <HelpCircle key="4" className="w-5 h-5 text-rose-700" />,
                <Brain key="5" className="w-5 h-5 text-purple-700" />
              ];

              return (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-white/95 via-amber-50/70 to-yellow-50/80 rounded-3xl p-5 sm:p-6 border-2 border-amber-800/25 shadow-md space-y-2.5 hover:border-amber-500 hover:shadow-xl transition-all hover:-translate-y-0.5 relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600/60 via-yellow-400 to-amber-600/60" />
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl border border-amber-300 shadow-xs">
                      {icons[idx]}
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest bg-amber-200/60 px-2 py-0.5 rounded-full border border-amber-400/50 inline-block font-mono">
                        Prinsip #{idx + 1}
                      </span>
                      <h3 className="text-base font-black text-amber-950 tracking-tight mt-0.5">{item.nama}</h3>
                    </div>
                  </div>
                  <p className="text-xs text-amber-950/85 leading-relaxed pt-1 font-medium">
                    {item.huraian}
                  </p>
                  {idx === 3 && onOpenChatbot && (
                    <div className="pt-2">
                      <button
                        onClick={onOpenChatbot}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 hover:from-rose-700 hover:to-amber-600 text-white font-black text-xs rounded-xl shadow-xs transition-all border border-rose-400 cursor-pointer active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
                        <span>Buka Bimbingan Cikgu Kancil AI</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Strategic Highlight Card: Pembelajaran Masteri & PBL */}
            <div className="bg-gradient-to-br from-emerald-50/95 via-emerald-100/60 to-amber-50/80 rounded-3xl p-5 sm:p-6 border-2 border-emerald-600/40 shadow-md space-y-2.5 hover:border-emerald-500 hover:shadow-xl transition-all hover:-translate-y-0.5 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600" />
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-emerald-200/70 rounded-xl border border-emerald-400 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest bg-emerald-200/60 px-2 py-0.5 rounded-full border border-emerald-400/50 inline-block font-mono">
                    Strategi Utama
                  </span>
                  <h3 className="text-base font-black text-emerald-950 tracking-tight mt-0.5">Masteri &amp; PBL</h3>
                </div>
              </div>
              <p className="text-xs text-emerald-950/90 leading-relaxed pt-1 font-medium">
                <strong>Pembelajaran Masteri:</strong> Murid mencapai tanda aras minima 80% sebelum membuka cabaran lanjutan.<br />
                <strong>PBL:</strong> Menyelesaikan masalah ancaman buaya melalui pertimbangan saintifik logik dan kebijaksanaan kancil.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: STANDARD DSKP ================= */}
      {activeTab === 'dskp' && (
        <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-emerald-600" />
          <div className="space-y-1">
            <span className="text-xs font-black text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
              Dokumen Standard Kurikulum dan Pentaksiran (DSKP) KSSR
            </span>
            <h2 className="text-xl font-black text-amber-950 tracking-tight pt-1">
              Pemetaan Standard Kandungan &amp; Standard Pembelajaran
            </h2>
          </div>

          <div className="w-full">
            <div className="p-6 rounded-2xl border-2 border-emerald-300/80 bg-emerald-50/60 space-y-4 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <span>Kemahiran Mendengar &amp; Bertutur</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Standard Kandungan 1.3:</h4>
                <p className="text-sm sm:text-base font-bold text-amber-950 mt-0.5 leading-snug">
                  {DSKP_INFO.standarKandungan1}
                </p>
              </div>
              <div className="pt-3 border-t border-emerald-200/80">
                <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Standard Pembelajaran 1.3.2:</h4>
                <p className="text-xs sm:text-sm text-amber-900 mt-0.5 leading-relaxed font-medium">
                  {DSKP_INFO.standarPembelajaran1}
                </p>
                <div className="mt-3 text-xs bg-white/95 p-3.5 rounded-xl border border-emerald-300 text-emerald-950 font-medium leading-relaxed shadow-2xs">
                  ✅ <em>Aplikasi Dalam Game:</em> Dengar audio asli penutur, rakam suara persembahan murid dalam Studio Intonasi, dan melakonkan peranan watak bergilir-gilir dalam aktiviti pasukan.
                </div>
              </div>
            </div>
          </div>

          {/* Tematik: Kemasyarakatan & Integriti */}
          <div className="p-5 bg-gradient-to-r from-amber-100/90 via-yellow-50/90 to-amber-100/90 border-2 border-amber-400 rounded-2xl space-y-2 shadow-xs">
            <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
              <HeartHandshake className="w-4 h-4 text-amber-700" />
              <span>Pendekatan Tematik: Kemasyarakatan &amp; Nilai Integriti</span>
            </div>
            <p className="text-xs text-amber-950 leading-relaxed font-medium">
              Fokus sivik berteraskan amalan tolong-menolong sesama jiran dan komuniti, membalas kebaikan dengan budi bahasa yang luhur, berpegang teguh pada janji, serta menolak sekeras-kerasnya sikap khianat (kacang lupakan kulit).
            </p>
          </div>
        </div>
      )}

      {/* ================= TAB 3: PENGAYAAN KBAT ================= */}
      {activeTab === 'pengayaan' && (
        <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-amber-400 to-yellow-500" />
          <div className="space-y-1">
            <span className="text-xs font-black text-purple-800 uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
              Konsep 5P: Pengayaan (Enrichment) · Aras KBAT
            </span>
            <h2 className="text-xl font-black text-amber-950 tracking-tight pt-1">
              Aktiviti Pengayaan Murid Menguasai Masteri
            </h2>
            <p className="text-xs text-amber-900 font-medium">
              Aktiviti berfikir aras tinggi ini dirangka khas untuk mencabar daya imaginasi, kreativiti berbahasa, dan penaakulan moral murid.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity 1: Alternative Ending Composer */}
            <div className="p-5 bg-purple-50/50 border-2 border-purple-300/80 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black text-purple-950">
                <Feather className="w-4 h-4 text-purple-700" />
                <span>Aktiviti 1: Mereka Pengakhiran Alternatif Cerita</span>
              </div>
              <p className="text-xs text-purple-950/90 leading-relaxed font-medium">
                Sekiranya Sang Buaya insaf, menangis dan berjanji dengan sungguh-sungguh untuk tidak mengulangi sikap khianatnya, apakah keputusan yang wajar dibuat oleh Sang Kancil dan Sang Kerbau?
              </p>
              <textarea
                value={studentEnding}
                onChange={(e) => setStudentEnding(e.target.value)}
                placeholder="Tuliskan idea pengakhiran alternatif anda di sini mengikut nilai murni..."
                rows={4}
                className="w-full p-3 text-xs bg-white border-2 border-purple-300/80 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 font-medium text-purple-950"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-purple-800 font-bold">Kreativiti &amp; Nilai Kemaafan</span>
                <button
                  onClick={handleSaveEnding}
                  disabled={!studentEnding.trim()}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-700 to-purple-600 hover:from-purple-800 hover:to-purple-700 disabled:opacity-40 text-white font-black text-xs rounded-xl transition-all shadow-md border border-purple-400"
                >
                  {endingSaved ? 'Disimpan! ✨' : 'Simpan Idea Saya'}
                </button>
              </div>
            </div>

            {/* Activity 2: Pantun 4 Kerat Tradisional */}
            <div className="p-5 bg-amber-50/50 border-2 border-amber-300/80 rounded-2xl space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-black text-amber-950">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Aktiviti 2: Pantun Empat Kerat: Budi &amp; Ketinggian Budi</span>
              </div>
              <p className="text-xs text-amber-950/90 leading-relaxed font-medium">
                Hayati pantun warisan bangsa ini dengan sebutan yang berirama dan intonasi yang merdu:
              </p>
              <div className="bg-gradient-to-br from-amber-100/90 via-yellow-50 to-amber-100/90 p-4 rounded-xl border-2 border-amber-400 text-center space-y-1.5 text-xs font-semibold text-amber-950 italic shadow-xs">
                <p>Pohon mengkudu di tepi jeram,</p>
                <p>Tempat bersarang burung merpati;</p>
                <p className="font-black text-amber-950 text-sm">Hutang emas boleh dibayar,</p>
                <p className="font-black text-amber-950 text-sm">Hutang budi dibawa mati.</p>
              </div>
              <div className="text-[11px] text-amber-950 bg-amber-200/60 p-3 rounded-xl border border-amber-400/60 leading-relaxed font-medium">
                💡 <em>Maksud Pantun:</em> Budi pekerti dan pertolongan ikhlas seseorang tidak dapat dinilai dengan wang ringgit, dan harus sentiasa dikenang seumur hidup.
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCompletePantun}
                  className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-amber-950 font-black text-xs rounded-xl transition-all shadow-md border border-amber-400"
                >
                  {pantunCompleted ? 'Telah Dihayati 🌟' : 'Lafazkan Pantun Ini'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: RUBRIK PBD & KAD LAPORAN ================= */}
      {activeTab === 'rubrik' && (
        <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-500 to-emerald-700" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-amber-900/15 pb-4">
            <div>
              <span className="text-xs font-black text-amber-800 uppercase tracking-widest bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                Pentaksiran Bilik Darjah (PBD) KSSR
              </span>
              <h2 className="text-xl font-black text-amber-950 tracking-tight pt-1">
                Kad Rekod Penguasaan Murid
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-amber-950 font-black text-xs rounded-xl transition-all shadow-md border border-amber-400"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Kad Laporan PBD</span>
            </button>
          </div>

          {/* Student Status Summary Card */}
          <div className="p-6 bg-gradient-to-br from-amber-50/90 to-yellow-50/90 border-2 border-amber-400/80 rounded-2xl space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-amber-900/15 pb-4">
              <div>
                <div className="text-xs text-amber-900 font-bold uppercase tracking-wider">Status Pencapaian Keseluruhan:</div>
                <div className="text-2xl font-black text-amber-950 flex items-center gap-2 mt-0.5">
                  <span>{tpData.tp}</span>
                  <span className="text-sm font-bold text-amber-800">({totalScore} Mata Terkumpul)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-black px-3 py-1 bg-amber-200 text-amber-950 rounded-full border border-amber-400">
                  Tahun 4 · Bahasa Melayu
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-semibold">
              <strong className="text-amber-900">Deskriptor PBD:</strong> {tpData.desc}
            </p>

            {/* Matrix of TP Standards */}
            <div className="pt-2">
              <h4 className="text-xs font-black text-amber-900 uppercase tracking-widest mb-2.5">
                Skala Tahap Penguasaan (TP) DSKP 1.3 &amp; Kurikulum BM:
              </h4>
              <div className="space-y-2 text-xs">
                {[
                  { tp: 'TP 1', label: 'Mengetahui', desc: 'Mendengar dan membaca bahan sastera pada tahap sangat terhad.' },
                  { tp: 'TP 2', label: 'Memahami', desc: 'Menceritakan semula perkara yang didengar dan dibaca secara ringkas.' },
                  { tp: 'TP 3', label: 'Mengaplikasi', desc: 'Menceritakan perkara yang didengar dengan intonasi dan sebutan yang sesuai.' },
                  { tp: 'TP 4', label: 'Menganalisis', desc: 'Menganalisis isi kandungan teks serta menyatakan nilai murni dengan tepat.' },
                  { tp: 'TP 5', label: 'Menilai', desc: 'Menilai tindakan watak berdasarkan prinsip integriti dan kemasyarakatan.' },
                  { tp: 'TP 6', label: 'Menjana Idea (KBAT)', desc: 'Menjana respon kreatif, menyelesaikan masalah secara berhemah, dan menunjukkan contoh teladan telus.' },
                ].map((row) => (
                  <div
                    key={row.tp}
                    className={`p-3 rounded-xl border-2 flex items-center justify-between gap-3 transition-all ${
                      tpData.tp === row.tp
                        ? 'bg-gradient-to-r from-emerald-100 to-amber-100 border-emerald-500 font-black text-emerald-950 shadow-xs'
                        : 'bg-white/90 border-amber-900/15 text-amber-950/80 font-medium'
                    }`}
                  >
                    <span className="font-mono font-bold shrink-0">{row.tp} ({row.label})</span>
                    <span className="text-right text-[11px] font-semibold">{row.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
