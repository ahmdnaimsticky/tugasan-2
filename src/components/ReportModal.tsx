/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Award, CheckCircle2, Printer, Star, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalScore: number;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, totalScore }) => {
  if (!isOpen) return null;

  const getTP = () => {
    if (totalScore >= 120) return { tp: 'TP 6 (Cemerlang Terbilang)', badge: '🌟 Bintang Rimba Bestari', desc: 'Murid berjaya menguasai DSKP 1.3 dan 1.3.2 dengan sebutan baku, intonasi mantap, serta penghayatan integriti aras tinggi.' };
    if (totalScore >= 90) return { tp: 'TP 5 (Cemerlang)', badge: '🥇 Lencana Hakim Kancil', desc: 'Murid mampu menceritakan semula bahan dengan intonasi yang baik dan menghayati nilai tolong-menolong serta integriti.' };
    if (totalScore >= 60) return { tp: 'TP 4 (Baik)', badge: '🥈 Lencana Sahabat Kerbau', desc: 'Murid menguasai jalan cerita, kosa kata dan nilai murni dengan memuaskan.' };
    return { tp: 'TP 3 (Memuaskan)', badge: '🥉 Lencana Tunas Rimba', desc: 'Murid memahami asas cerita dan digalakkan menyertai aktiviti pemulihan untuk mencapai tahap masteri.' };
  };

  const tpInfo = getTP();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/70 backdrop-blur-xs">
      <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-3xl max-w-xl w-full border-3 border-amber-800/40 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-emerald-800 text-white p-5 flex items-center justify-between border-b-2 border-amber-600/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-400/20 rounded-xl border border-amber-300/40">
              <Award className="w-6 h-6 text-yellow-300" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight text-amber-50">Kad Pentaksiran Bilik Darjah (PBD)</h2>
              <p className="text-xs text-amber-200 font-medium">Bahasa Melayu Tahun 4 · Konsep 5P &amp; Integriti Rimba</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-amber-950/40 hover:bg-amber-950/70 text-amber-100 transition-colors border border-amber-600/40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Badge & Achievement Summary */}
          <div className="p-5 bg-gradient-to-br from-amber-100/90 via-yellow-50 to-amber-100/90 border-2 border-amber-400 rounded-2xl text-center space-y-2 shadow-sm">
            <div className="text-4xl">🏅</div>
            <div className="text-xs font-black text-amber-900 uppercase tracking-widest">
              Tahap Penguasaan Semasa
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
              {tpInfo.tp}
            </h3>
            <div className="inline-block bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-xs font-black px-4 py-1.5 rounded-full border border-amber-600/60 shadow-xs">
              {tpInfo.badge}
            </div>
            <p className="text-xs text-amber-950/90 max-w-md mx-auto pt-1 leading-relaxed font-medium">
              {tpInfo.desc}
            </p>
          </div>

          {/* Core Elements Checklist */}
          <div className="space-y-2.5 text-xs">
            <div className="font-black text-amber-950 uppercase tracking-widest text-[11px] flex items-center gap-1.5">
              <span>📜</span> Kriteria Penguasaan Kurikulum DSKP &amp; 5P:
            </div>

            <div className="p-3.5 rounded-xl border-2 border-amber-800/15 bg-white/90 flex items-start gap-3 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-amber-950 font-medium">
                <strong className="text-amber-900 font-bold">DSKP 1.3 &amp; 1.3.2 (Bercerita &amp; Intonasi):</strong> Telah mendengar audio drama asli dan berlatih bercerita menggunakan intonasi watak yang berbeza.
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-amber-800/15 bg-white/90 flex items-start gap-3 shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-amber-950 font-medium">
                <strong className="text-amber-900 font-bold">Kemahiran Membaca &amp; Nilai Murni:</strong> Menganalisis skrip teks karya sastera, menyusun kronologi babak, dan menghayati simpulan bahasa "kacang lupakan kulit".
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-amber-800/15 bg-white/90 flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-amber-950 font-medium">
                <strong className="text-amber-900 font-bold">Integriti &amp; Kemasyarakatan:</strong> Menghayati kewajipan menepati janji, menghargai jasa pertolongan, dan bertindak secara adil.
              </div>
            </div>

            <div className="p-3.5 rounded-xl border-2 border-amber-800/15 bg-white/90 flex items-start gap-3 shadow-xs">
              <HeartHandshake className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-amber-950 font-medium">
                <strong className="text-amber-900 font-bold">Penyelesaian Masalah (PBL):</strong> Menyelesaikan konflik buaya dan kerbau melalui rekonstruksi logik dan diplomasi aman Sang Kancil.
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t-2 border-amber-900/15">
            <div className="text-xs font-mono font-black text-amber-900">
              Skor Terkumpul: <span className="text-emerald-700 text-sm font-black">{totalScore} pt</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-black text-amber-950 bg-amber-100 hover:bg-amber-200 rounded-xl transition-colors border border-amber-300"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak Rekod</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 text-xs font-black text-amber-950 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-amber-500 rounded-xl transition-all shadow-md border border-amber-600/40"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
