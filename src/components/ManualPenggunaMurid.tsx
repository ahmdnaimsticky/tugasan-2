/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Headphones,
  Gamepad2,
  Users,
  Scale,
  GraduationCap,
  Sparkles,
  Volume2,
  Mic,
  HelpCircle,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Radio,
  Star,
  Compass,
  MessageCircleQuestion,
  Play
} from 'lucide-react';
import { playSound } from '../utils/soundEffects';

interface ManualPenggunaMuridProps {
  onStartActivity: () => void;
  onOpenChatbot?: () => void;
  onOpenReport?: () => void;
}

export const ManualPenggunaMurid: React.FC<ManualPenggunaMuridProps> = ({
  onStartActivity,
  onOpenChatbot,
  onOpenReport
}) => {
  // Interactive checklist state for pupil readiness
  const [checklist, setChecklist] = useState({
    audioReady: false,
    micReady: false,
    guideUnderstood: false,
    targetScoreReady: false
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    playSound('click');
    setChecklist(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const allChecked = Object.values(next).every(Boolean);
      if (allChecked) {
        playSound('victory');
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      }
      return next;
    });
  };

  const isAllChecked = Object.values(checklist).every(Boolean);

  const handleStart = () => {
    playSound('badge');
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
    onStartActivity();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ================= 1. PENTAS SAMBUTAN MESRA (HERO BANNER) ================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border-3 border-amber-800/30 bg-gradient-to-r from-amber-900 via-yellow-900 to-amber-950 text-white p-6 sm:p-10">
        {/* Latar Belakang Rimba Bertekstur */}
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('/src/assets/images/pzd_cerita_hero_1792913730391.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/70 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3.5 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-black tracking-wide uppercase">
              <Compass className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span>Panduan Rasmi Pengguna Murid Sekolah Rendah</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-amber-50 tracking-tight font-serif leading-tight">
              Selamat Datang ke Alam Rimba Bestari! 🌿
            </h1>

            <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-medium">
              Hai kawan-kawan! Aplikasi interaktif ini direka khas untuk membantu anda menghayati 
              <strong className="text-yellow-300 font-bold"> Kisah Sang Kancil, Sang Kerbau &amp; Sang Buaya</strong>. Mari kita pelajari cara bermain di setiap bahagian dengan mudah dan seronok!
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={handleStart}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-amber-950 font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <span>Terus Mula Belajar (Bahagian 1)</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              {onOpenChatbot && (
                <button
                  onClick={onOpenChatbot}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-100 border border-white/30 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-yellow-300" />
                  <span>Tanya Cikgu Kancil AI</span>
                </button>
              )}
            </div>
          </div>

          {/* Kad Avatar & Profil Maskot Pembimbing */}
          <div className="shrink-0 flex flex-col items-center p-5 rounded-2xl bg-amber-900/60 backdrop-blur-md border-2 border-amber-400/40 shadow-xl max-w-xs text-center space-y-3">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-3 border-yellow-400 shadow-md bg-amber-950">
              <img
                src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
                alt="Cikgu Kancil AI"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white" />
            </div>
            <div>
              <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider block">Pembimbing Anda</span>
              <h3 className="text-base font-black text-white">Cikgu Kancil AI</h3>
              <p className="text-[11px] text-amber-200 mt-1 leading-snug">
                "Jangan takut membuat kesilapan! Cikgu ada di sini untuk membimbing kamu menguasai sebutan, intonasi dan pengajaran cerita."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 2. MISI UTAMA PEMBELAJARAN ANDA ================= */}
      <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-8 border-2 border-amber-800/25 shadow-lg space-y-4">
        <div className="flex items-center gap-2.5 border-b border-amber-900/10 pb-3">
          <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-black">
            🎯
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-amber-950 font-serif">
              4 Misi Utama Anda Dalam Pembelajaran Ini
            </h2>
            <p className="text-xs text-amber-800/80 font-medium">
              Selesaikan setiap misi untuk mengasah kemahiran berbahasa dan nilai peribadi yang mulia.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
            <span className="text-2xl">🎧</span>
            <h3 className="text-sm font-black text-amber-950">1. Dengar &amp; Fahami</h3>
            <p className="text-xs text-amber-900/85 leading-relaxed">
              Dengar drama audio penuh, hayati kelunakan suara watak, dan tangkap intonasi gembira, marah, atau takut.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-2">
            <span className="text-2xl">🎙️</span>
            <h3 className="text-sm font-black text-emerald-950">2. Latih &amp; Rakam Suara</h3>
            <p className="text-xs text-emerald-900/85 leading-relaxed">
              Pilih dialog kegemaran anda, rakam suara mengikut intonasi watak, dan bandingkan dengan contoh asal.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 space-y-2">
            <span className="text-2xl">🧩</span>
            <h3 className="text-sm font-black text-blue-950">3. Susun &amp; Jawab Kuiz</h3>
            <p className="text-xs text-blue-900/85 leading-relaxed">
              Susun kronologi peristiwa dari awal hingga akhir, jawab makna kosa kata, dan fahami nilai integriti.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200/80 space-y-2">
            <span className="text-2xl">⚖️</span>
            <h3 className="text-sm font-black text-purple-950">4. Jadi Hakim Kritis</h3>
            <p className="text-xs text-purple-900/85 leading-relaxed">
              Selesaikan persengketaan buaya dan kerbau di Mahkamah Rimba menggunakan hujah yang adil dan berhikmah.
            </p>
          </div>
        </div>
      </div>

      {/* ================= 3. PETA 5 STESEN & CARA BERMAIN DENGAN TELITI ================= */}
      <div className="space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-800 text-amber-100 flex items-center justify-center font-bold">
            📍
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 font-serif">
              Panduan Teliti 5 Bahagian Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-amber-900/80 font-medium">
              Klik butang navigasi di bahagian atas bila-bila masa untuk berpindah antara bahagian.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Kad Bahagian 1 */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white/95 border-2 border-emerald-400/80 shadow-md space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  BAHAGIAN 1
                </span>
                <Headphones className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Teater Cerita Audio 3D
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Di sini murid mendengar keseluruhan penceritaan watak Sang Kancil, Sang Kerbau dan Sang Buaya.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">1.</span>
                  <span>Tekan butang hijau <strong>"Mainkan Drama Penuh"</strong> untuk memulakan audio latar.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">2.</span>
                  <span>Skrip lakonan akan tersorot secara automatik mengikut suara watak yang sedang bercakap.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-emerald-700">3.</span>
                  <span>Di sebelah kanan, masuk <strong>Studio Rakaman Intonasi</strong>: klik mikrofon, tiru sebutan watak, kemudian dengar semula rakaman anda!</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 p-2 rounded-xl border border-emerald-200 block text-center">
                💡 Tip: Boleh laraskan kelajuan audio kepada 0.75x jika mahu mendengar dengan lebih perlahan.
              </span>
            </div>
          </div>

          {/* Kad Bahagian 2 */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white/95 border-2 border-amber-400/80 shadow-md space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  BAHAGIAN 2
                </span>
                <Gamepad2 className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Game Kendiri (3 Tahap)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aktiviti menguji daya ingatan dan kosa kata sastera secara kendiri mengikut kemampuan sendiri.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-800">Tahap 1:</span>
                  <span>Gunakan butang <strong>▲ (Naik)</strong> dan <strong>▼ (Turun)</strong> untuk menyusun kad peristiwa ikut urutan cerita.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-800">Tahap 2:</span>
                  <span>Pilih jawapan yang betul untuk kosa kata sukar seperti perkataan <em>dihempap</em> dan <em>meronta-ronta</em>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-800">Tahap 3:</span>
                  <span>Soalan analisis nilai integriti dan kemasyarakatan (contoh: mengapa buaya dianggap mungkir janji).</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-50 p-2 rounded-xl border border-amber-200 block text-center">
                💡 Ada Butang Bantuan: Tekan "Petunjuk Guru" jika buntu!
              </span>
            </div>
          </div>

          {/* Kad Bahagian 3 */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white/95 border-2 border-blue-400/80 shadow-md space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-900 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                  BAHAGIAN 3
                </span>
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Game Pasukan (Kolaboratif)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aktiviti berkumpulan di dalam bilik darjah. Duduk bersama 3 atau 4 rakan untuk berkolaborasi.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-800">1.</span>
                  <span>Pilih kumpulan watak anda (Kancil, Kerbau, Buaya, atau Rimba).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-800">2.</span>
                  <span>Selesaikan aktiviti stesen: Susun Kata Kunci, Hubung Kait Watak, Nilai Moral, dan Lakon Semula.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-blue-800">3.</span>
                  <span>Kumpul mata kumpulan dan raikan kejayaan bersama-sama!</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-blue-800 bg-blue-50 p-2 rounded-xl border border-blue-200 block text-center">
                💡 Pupuk Semangat: Belajar mendengar pendapat rakan sebaya.
              </span>
            </div>
          </div>

          {/* Kad Bahagian 4 */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white/95 border-2 border-purple-400/80 shadow-md space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-purple-900 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
                  BAHAGIAN 4
                </span>
                <Scale className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Mahkamah Kritis (PBL)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pembelajaran Berasaskan Masalah (PBL). Bantu Sang Kancil membuat keputusan mahkamah yang adil!
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-800">1.</span>
                  <span>Baca ringkasan pendakwaan kes Sang Kerbau lawan Sang Buaya.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-800">2.</span>
                  <span>Teliti bukti-bukti fizikal (batang pokok tumbang dan kesan gigitan di kaki).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-purple-800">3.</span>
                  <span>Jatuhkan hukuman yang bermoral dan berikan hujah rasional anda sebagai hakim.</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-purple-800 bg-purple-50 p-2 rounded-xl border border-purple-200 block text-center">
                💡 Asah KBAT: Kemahiran Berfikir Aras Tinggi untuk keadilan.
              </span>
            </div>
          </div>

          {/* Kad Bahagian 5 */}
          <div className="rounded-3xl p-5 sm:p-6 bg-white/95 border-2 border-rose-400/80 shadow-md space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-rose-900 bg-rose-100 px-3 py-1 rounded-full border border-rose-300">
                  BAHAGIAN 5
                </span>
                <GraduationCap className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-base font-black text-slate-900">
                Pedagogi 5P &amp; DSKP
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ruang rujukan kurikulum bagi guru dan murid pintar untuk menyemak standard yang telah dicapai.
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-800">•</span>
                  <span>Penerangan 5P: Penggabungjalinan, Penyerapan, Penilaian, Pemulihan &amp; Pengayaan.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-rose-800">•</span>
                  <span>Semakan rubrik Tahap Penguasaan TP 1 hingga TP 6.</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-[11px] font-bold text-rose-800 bg-rose-50 p-2 rounded-xl border border-rose-200 block text-center">
                💡 Untuk Rujukan: Boleh dibaca bersama guru atau ibu bapa.
              </span>
            </div>
          </div>

          {/* Kad Pembimbing Cikgu Kancil AI */}
          <div className="rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-amber-100/90 to-yellow-100/90 border-2 border-amber-500 shadow-md space-y-4 hover:shadow-lg transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-950 bg-amber-200 px-3 py-1 rounded-full border border-amber-400">
                  PEMBIMBING 24/7
                </span>
                <Sparkles className="w-5 h-5 text-amber-700 animate-spin" />
              </div>
              <h3 className="text-base font-black text-amber-950">
                Tanya Cikgu Kancil AI
              </h3>
              <p className="text-xs text-amber-900 leading-relaxed">
                Sentiasa bersedia membantu anda bila-bila masa sahaja anda memerlukan bantuan pemulihan!
              </p>

              <div className="space-y-2 pt-2 border-t border-amber-300/60 text-xs text-amber-950">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-900">•</span>
                  <span>Tekan butang kuning terapung di sudut kanan bawah skrin.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-900">•</span>
                  <span>Tanya apa sahaja soalan: makna perkataan, watak cerita, atau cara menyebut dialog dengan betul.</span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              {onOpenChatbot && (
                <button
                  onClick={onOpenChatbot}
                  className="w-full py-2 bg-amber-800 hover:bg-amber-900 text-amber-50 font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircleQuestion className="w-3.5 h-3.5" />
                  <span>Cuba Chatbot Sekarang</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= 4. GLOSARI IKON & BUTANG PENTING ================= */}
      <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-8 border-2 border-amber-800/25 shadow-lg space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-900 font-bold">
            🕹️
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-amber-950 font-serif">
              Kenali Butang &amp; Ikon Penting Dalam Game
            </h2>
            <p className="text-xs text-amber-900/80 font-medium">
              Panduan pantas agar murid tahu apa yang berlaku apabila menekan butang-butang ini.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Butang Main / Play</h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Memainkan drama audio penuh atau mendengar keratan suara bagi satu baris dialog watak.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700 shrink-0">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Butang Rakam Suara</h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Tekan untuk merakam sebutan anda sendiri dan melatih intonasi watak cerita.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Bantuan Pemulihan</h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Memberikan tip bimbingan guru sekiranya anda sukar menjawab soalan kuiz atau susunan peristiwa.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-amber-200/80 shadow-2xs flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-yellow-100 text-yellow-800 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-slate-900">Pentaksiran PBD</h4>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                Terletak di bahagian atas sebelah kanan untuk melihat markah dan tahap pencapaian terkumpul anda.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 5. SENARAI SEMAK PERSEDIAAN MURID (INTERACTIVE CHECKLIST) ================= */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-100/90 via-yellow-50/80 to-amber-100/90 border-3 border-amber-600/40 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-700/20 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Sebelum Anda Mula: Senarai Semak Murid Bijak</span>
            </div>
            <h3 className="text-xl font-black text-amber-950 font-serif">
              Tandakan 4 Perkara Ini Sebelum Memulakan Pengembaraan:
            </h3>
          </div>
          <span className="text-xs font-black px-3 py-1 rounded-full bg-amber-200 text-amber-950 border border-amber-400">
            {Object.values(checklist).filter(Boolean).length} / 4 Sedia
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            onClick={() => toggleCheck('audioReady')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer ${
              checklist.audioReady
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                : 'bg-white/90 border-amber-900/20 hover:border-amber-500 text-amber-950'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
              checklist.audioReady ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-amber-400 bg-amber-50'
            }`}>
              {checklist.audioReady && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
            </div>
            <div className="text-xs">
              <span className="font-black block">1. Volum Bunyi Berfungsi</span>
              <span className="text-slate-600">Saya sudah memasang pembesar suara atau fon kepala dengan jelas.</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('micReady')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer ${
              checklist.micReady
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                : 'bg-white/90 border-amber-900/20 hover:border-amber-500 text-amber-950'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
              checklist.micReady ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-amber-400 bg-amber-50'
            }`}>
              {checklist.micReady && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
            </div>
            <div className="text-xs">
              <span className="font-black block">2. Mikrofon Sedia untuk Latihan</span>
              <span className="text-slate-600">Saya sedia merakam suara saya di Studio Intonasi (benarkan akses mikrofon).</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('guideUnderstood')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer ${
              checklist.guideUnderstood
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                : 'bg-white/90 border-amber-900/20 hover:border-amber-500 text-amber-950'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
              checklist.guideUnderstood ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-amber-400 bg-amber-50'
            }`}>
              {checklist.guideUnderstood && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
            </div>
            <div className="text-xs">
              <span className="font-black block">3. Tahu Menukar Bahagian</span>
              <span className="text-slate-600">Saya faham cara menekan menu di atas untuk bertukar antara 5 bahagian.</span>
            </div>
          </button>

          <button
            onClick={() => toggleCheck('targetScoreReady')}
            className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 cursor-pointer ${
              checklist.targetScoreReady
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                : 'bg-white/90 border-amber-900/20 hover:border-amber-500 text-amber-950'
            }`}
          >
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
              checklist.targetScoreReady ? 'bg-emerald-600 border-emerald-700 text-white' : 'border-amber-400 bg-amber-50'
            }`}>
              {checklist.targetScoreReady && <CheckCircle2 className="w-4 h-4 stroke-[3]" />}
            </div>
            <div className="text-xs">
              <span className="font-black block">4. Sasaran TP 6 (Cemerlang)</span>
              <span className="text-slate-600">Saya berazam untuk menyelesaikan semua aktiviti hingga mencapai 120 mata!</span>
            </div>
          </button>
        </div>

        {/* Butang Gergasi Mula Belajar */}
        <div className="pt-4 text-center">
          <button
            onClick={handleStart}
            className={`px-8 py-4 rounded-2xl text-base sm:text-lg font-black transition-all shadow-xl flex items-center justify-center gap-3 mx-auto cursor-pointer ${
              isAllChecked
                ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white animate-bounce ring-4 ring-emerald-300'
                : 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 hover:scale-105 active:scale-95'
            }`}
          >
            <span>{isAllChecked ? 'Hebat! Anda Sudah Sedia! Jom Mula Beraksi 🚀' : 'Saya Sudah Faham, Jom Masuk Bahagian 1 🎬'}</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
