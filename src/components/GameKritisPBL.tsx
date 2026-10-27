/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gavel,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  ArrowRight,
  RotateCcw,
  Scale,
  Search,
  Sparkles
} from 'lucide-react';
import { PBL_STAGES, PBLInvestigationStage } from '../data/quizData';
import { STORY_SEGMENTS } from '../data/storyData';
import { storyAudio } from '../utils/audioManager';
import { playSound } from '../utils/soundEffects';

interface GameKritisPBLProps {
  onScoreUpdate: (points: number) => void;
}

export const GameKritisPBL: React.FC<GameKritisPBLProps> = ({ onScoreUpdate }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState<number>(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [investigationSolved, setInvestigationSolved] = useState<boolean>(false);
  const [pblPoints, setPblPoints] = useState<number>(0);

  const currentStage: PBLInvestigationStage = PBL_STAGES[currentStageIdx];

  const playAudioForEvidence = (segmentId: number) => {
    playSound('click');
    const seg = STORY_SEGMENTS.find(s => s.id === segmentId);
    if (seg) {
      storyAudio.playSegment(seg.timeStart, seg.timeEnd);
    }
  };

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    playSound('click');
    setSelectedOptionIdx(idx);
  };

  const submitInvestigationDecision = () => {
    if (selectedOptionIdx === null) return;
    setIsSubmitted(true);
    const chosen = currentStage.options[selectedOptionIdx];

    if (chosen.isCorrect) {
      playSound('victory');
      setPblPoints(prev => prev + 50);
      onScoreUpdate(50);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    } else {
      playSound('wrong');
    }
  };

  const nextInvestigationStage = () => {
    playSound('click');
    if (currentStageIdx < PBL_STAGES.length - 1) {
      setCurrentStageIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      setInvestigationSolved(true);
      playSound('badge');
      confetti({ particleCount: 150, spread: 90 });
    }
  };

  const resetInvestigation = () => {
    playSound('click');
    setCurrentStageIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setInvestigationSolved(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden border-3 border-amber-800/40 shadow-xl bg-amber-950">
        <img
          src="/src/assets/images/pzd_cerita_hero_1792913730391.jpg"
          alt="Mahkamah Sang Kancil: Siasatan Di Tebing Sungai - Gaya Animasi 3D Pada Zaman Dahulu"
          className="w-full h-52 sm:h-64 object-cover opacity-90 scale-105 hover:scale-100 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950 via-amber-950/60 to-transparent flex flex-col justify-end p-6 text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold mb-1">
            <span className="bg-amber-500/90 text-amber-950 px-2.5 py-0.5 rounded-full border border-yellow-300 font-black shadow-xs">
              🎬 Animasi 3D 'Pada Zaman Dahulu'
            </span>
            <span className="text-amber-300 font-bold">·</span>
            <span className="text-amber-200 font-bold bg-amber-950/70 px-2 py-0.5 rounded-full border border-amber-600/40">
              PBL &amp; Pemikiran Kritis
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-50 drop-shadow-md">
            Mahkamah Sang Kancil: Siasatan Keadilan &amp; Rekonstruksi Rimba
          </h1>
          <p className="text-xs sm:text-sm text-amber-100 max-w-2xl mt-1 leading-relaxed drop-shadow-xs font-medium">
            Bertindak sebagai Pembantu Hakim Sang Kancil. Teliti bukti fizikal dan saksi audio, uji strategi logik lakonan semula, dan tegakkan integriti kemasyarakatan tanpa kekerasan!
          </p>
        </div>
      </div>

      {/* Investigation Progress Tracker */}
      <div className="bg-gradient-to-r from-amber-50/95 via-amber-100/60 to-emerald-50/90 rounded-3xl p-5 sm:p-6 border-2 border-amber-800/30 shadow-lg relative overflow-hidden backdrop-blur-sm">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-700 via-yellow-500 to-emerald-700" />
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-2">
            <span>📜</span> Fasa Pembelajaran Berasaskan Masalah (PBL)
          </span>
          <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-200 to-yellow-300 px-3 py-1 rounded-full border-2 border-amber-500/80 shadow-xs font-mono">
            Fasa {currentStageIdx + 1} / {PBL_STAGES.length}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {PBL_STAGES.map((stg, idx) => {
            const isCompleted = idx < currentStageIdx || (idx === currentStageIdx && isSubmitted && currentStage.options[selectedOptionIdx || 0]?.isCorrect);
            const isCurrent = idx === currentStageIdx;

            return (
              <div
                key={stg.stageNumber}
                className={`p-3.5 rounded-2xl border-2 text-xs transition-all shadow-xs ${
                  isCurrent
                    ? 'bg-gradient-to-br from-amber-200/90 via-yellow-100 to-amber-100 border-amber-600 font-extrabold text-amber-950 shadow-md ring-2 ring-amber-400/50 scale-[1.02] transform'
                    : isCompleted
                    ? 'bg-emerald-50/90 border-emerald-500/60 font-bold text-emerald-950'
                    : 'bg-white/80 border-amber-900/15 text-amber-900/60 font-medium'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-[11px] font-black px-1.5 py-0.5 rounded bg-amber-900/10 text-amber-900">
                    0{idx + 1}.
                  </span>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </div>
                <div className="line-clamp-2 leading-tight">{stg.phaseName}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Siasatan Area */}
      {!investigationSolved ? (
        <div className="bg-gradient-to-b from-amber-50/95 via-white/95 to-amber-50/90 rounded-3xl p-6 sm:p-8 border-2 border-amber-800/30 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-500" />

          {/* Stage Header */}
          <div className="border-b-2 border-amber-900/15 pb-4 space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs tracking-wide shadow-xs">
              <Scale className="w-4 h-4 text-amber-700" />
              <span>{currentStage.phaseName}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-amber-950 tracking-tight">
              {currentStage.title}
            </h2>
          </div>

          {/* Scenario Overview */}
          <div className="p-5 bg-gradient-to-r from-amber-100/90 via-yellow-50/95 to-amber-100/90 border-2 border-amber-400/80 rounded-2xl space-y-2 shadow-xs relative">
            <span className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-1.5">
              <span>🔍</span> Konteks Kejadian &amp; Dilema Masalah:
            </span>
            <p className="text-sm text-amber-950 leading-relaxed font-semibold italic pl-1">
              "{currentStage.scenario}"
            </p>
          </div>

          {/* Evidence Dossier (Bahan Bukti & Saksi Audio) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-amber-900 uppercase tracking-widest flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-700" />
              Bahan Bukti Siasatan (Evidence Dossier):
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {currentStage.evidenceItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/90 border-2 border-amber-800/20 hover:border-amber-500/70 rounded-2xl text-xs space-y-2 shadow-xs transition-all hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-amber-950 text-sm flex items-center gap-1.5">
                      <span>📌</span> {item.title}
                    </span>
                    {item.audioSegmentId && (
                      <button
                        onClick={() => playAudioForEvidence(item.audioSegmentId!)}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1.5 transition-colors border border-amber-400"
                        title="Dengar rakaman kenyataan"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Dengar Saksi</span>
                      </button>
                    )}
                  </div>
                  <p className="text-amber-900 italic leading-relaxed pl-2 border-l-2 border-amber-400">
                    "{item.description}"
                  </p>
                  <div className="text-[12px] text-emerald-950 font-bold bg-emerald-50/90 p-2.5 rounded-xl border border-emerald-300/60">
                    💡 <em>Kaitan Siasatan:</em> {item.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Question & Problem Solving Decision */}
          <div className="p-6 bg-gradient-to-br from-amber-100/90 via-yellow-100/50 to-amber-50/90 border-2 border-amber-500/80 rounded-2xl shadow-md space-y-4 relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-900 border border-amber-400/60 shrink-0">
                <Gavel className="w-5 h-5 text-amber-800" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-950">
                  {currentStage.criticalChallenge}
                </h3>
                <p className="text-xs text-amber-900/90 mt-1 font-medium">
                  Fikirkan akibat setiap tindakan terhadap keselamatan, keadilan, dan prinsip integriti kemasyarakatan.
                </p>
              </div>
            </div>

            {/* Strategy Options */}
            <div className="space-y-3 pt-1">
              {currentStage.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                const showSuccess = isSubmitted && opt.isCorrect;
                const showError = isSubmitted && isSelected && !opt.isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all flex items-center justify-between cursor-pointer ${
                      showSuccess
                        ? 'bg-gradient-to-r from-emerald-100 to-emerald-50 border-emerald-600 text-emerald-950 shadow-md ring-2 ring-emerald-400/40'
                        : showError
                        ? 'bg-gradient-to-r from-rose-100 to-rose-50 border-rose-500 text-rose-950 shadow-md ring-2 ring-rose-400/40'
                        : isSelected
                        ? 'bg-gradient-to-r from-amber-200/90 to-yellow-100 border-amber-600 text-amber-950 shadow-md ring-2 ring-amber-400/50'
                        : 'bg-white/95 border-amber-900/20 hover:border-amber-500 hover:bg-amber-50/70 text-amber-950 shadow-xs'
                    }`}
                  >
                    <span className="leading-snug pr-2">{opt.text}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                    {showError && <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Analysis Feedback on Submit */}
            {isSubmitted && selectedOptionIdx !== null && (
              <div
                className={`p-4 rounded-2xl border-2 text-xs space-y-1.5 shadow-sm ${
                  currentStage.options[selectedOptionIdx].isCorrect
                    ? 'bg-gradient-to-r from-emerald-50 to-emerald-100/70 border-emerald-400 text-emerald-950 font-medium'
                    : 'bg-gradient-to-r from-rose-50 to-rose-100/70 border-rose-400 text-rose-950 font-medium'
                }`}
              >
                <div className="font-black flex items-center gap-2 text-sm">
                  {currentStage.options[selectedOptionIdx].isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Analisis Kritis Tepat!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>Ulasan Kelemahan Strategi:</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed pl-7">{currentStage.options[selectedOptionIdx].analysisFeedback}</p>
              </div>
            )}
          </div>

          {/* Submission and Progression Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            {!isSubmitted ? (
              <button
                disabled={selectedOptionIdx === null}
                onClick={submitInvestigationDecision}
                className="px-7 py-3 bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-700 hover:to-amber-600 disabled:opacity-40 text-amber-950 font-black text-sm rounded-xl transition-all shadow-md flex items-center gap-2 border-2 border-amber-400 cursor-pointer active:scale-95"
              >
                <Gavel className="w-4 h-4 text-amber-950" />
                <span>Jatuhkan Keputusan Hakim</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {selectedOptionIdx !== null && !currentStage.options[selectedOptionIdx].isCorrect && (
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSelectedOptionIdx(null);
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 rounded-xl transition-colors border border-amber-400 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Cuba Strategi Lain</span>
                  </button>
                )}
                {selectedOptionIdx !== null && currentStage.options[selectedOptionIdx].isCorrect && (
                  <button
                    onClick={nextInvestigationStage}
                    className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 hover:from-emerald-800 hover:to-emerald-700 text-white font-black text-sm rounded-xl transition-all shadow-md border-2 border-emerald-400 cursor-pointer active:scale-95"
                  >
                    <span>
                      {currentStageIdx < PBL_STAGES.length - 1
                        ? 'Teruskan ke Siasatan Seterusnya'
                        : 'Meterai Penghakiman Penuh'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Victory / Solved PBL Court Verdict */
        <div className="bg-gradient-to-b from-amber-50 via-yellow-50/80 to-amber-100/90 rounded-3xl p-8 border-2 border-amber-600/50 shadow-2xl text-center space-y-6 relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-700 via-yellow-400 to-emerald-700" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-yellow-400 text-amber-950 flex items-center justify-center mx-auto shadow-lg text-4xl border-2 border-amber-500">
            ⚖️
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-black text-amber-800 uppercase tracking-widest bg-amber-200/70 px-3 py-1 rounded-full border border-amber-400">
              Siasatan Berjaya · Keadilan Rimba Ditegakkan
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-tight pt-2">
              Meterai Keadilan: Akal Bijak Mengalahkan Niat Khianat
            </h2>
            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed font-medium">
              Tahniah! Anda telah membuktikan kehebatan pemikiran kritis murid Tahun 4! Dengan menggabungkan analisis bukti, kebijaksanaan psikologi, dan rekonstruksi logik tanpa keganasan, Sang Kerbau terselamat dan Sang Buaya menerima pengajaran yang setimpal.
            </p>
          </div>

          {/* Moral Integrity Badge Box */}
          <div className="p-6 bg-white/90 border-2 border-amber-500/60 rounded-2xl max-w-lg mx-auto text-left space-y-3 shadow-md">
            <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Prinsip Integriti &amp; Sivik Kemasyarakatan Yang Dihayati:</span>
            </div>
            <ul className="text-xs text-amber-950 space-y-2 list-disc list-inside font-medium">
              <li><strong className="text-amber-900 font-bold">Budi Pekerti &amp; Amanah:</strong> Jangan sekali-kali mengkhianati pertolongan dan kepercayaan sahabat.</li>
              <li><strong className="text-amber-900 font-bold">Penyelesaian Konflik Berhemah:</strong> Selesaikan pertikaian dengan akal fikiran yang tenang dan adil, bukan dengan kekerasan.</li>
              <li><strong className="text-amber-900 font-bold">Kewaspadaan Bijaksana:</strong> Menolong orang lain adalah amalan mulia, namun sentiasa berwaspada demi keselamatan diri.</li>
            </ul>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <button
              onClick={resetInvestigation}
              className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-amber-950 font-black text-xs rounded-xl transition-all shadow-md border border-amber-400"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulang Siasatan Mahkamah</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
