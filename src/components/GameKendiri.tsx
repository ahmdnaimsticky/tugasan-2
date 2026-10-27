/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  ArrowRight,
  RotateCcw,
  Star,
  Award,
  Layers,
  BookOpen
} from 'lucide-react';
import {
  STORY_SEQUENCE_LEVEL,
  VOCAB_QUESTIONS,
  MORAL_QUESTIONS,
  QuizQuestion,
  StorySequenceItem
} from '../data/quizData';
import { STORY_SEGMENTS } from '../data/storyData';
import { storyAudio } from '../utils/audioManager';
import { playSound } from '../utils/soundEffects';

interface GameKendiriProps {
  onScoreUpdate: (points: number) => void;
}

export const GameKendiri: React.FC<GameKendiriProps> = ({ onScoreUpdate }) => {
  const [activeStage, setActiveStage] = useState<1 | 2 | 3>(1);

  // Stage 1 State: Story Sequencing
  const [sequenceItems, setSequenceItems] = useState<StorySequenceItem[]>(() => {
    // start shuffled
    return [...STORY_SEQUENCE_LEVEL].sort(() => Math.random() - 0.5);
  });
  const [sequenceSubmitted, setSequenceSubmitted] = useState<boolean>(false);
  const [sequenceCorrect, setSequenceCorrect] = useState<boolean>(false);
  const [sequenceHintVisible, setSequenceHintVisible] = useState<boolean>(false);

  // Stage 2 State: Vocabulary Quiz
  const [vocabIndex, setVocabIndex] = useState<number>(0);
  const [vocabSelectedOption, setVocabSelectedOption] = useState<number | null>(null);
  const [vocabSubmitted, setVocabSubmitted] = useState<boolean>(false);
  const [vocabScore, setVocabScore] = useState<number>(0);
  const [showVocabHint, setShowVocabHint] = useState<boolean>(false);

  // Stage 3 State: Moral & Integrity Analysis
  const [moralIndex, setMoralIndex] = useState<number>(0);
  const [moralSelectedOption, setMoralSelectedOption] = useState<number | null>(null);
  const [moralSubmitted, setMoralSubmitted] = useState<boolean>(false);
  const [moralScore, setMoralScore] = useState<number>(0);
  const [showMoralHint, setShowMoralHint] = useState<boolean>(false);

  // Overall Stage Completion & Badges
  const [stage1Passed, setStage1Passed] = useState<boolean>(false);
  const [stage2Passed, setStage2Passed] = useState<boolean>(false);
  const [stage3Passed, setStage3Passed] = useState<boolean>(false);

  // Helpers for Audio Verification
  const playAudioForSegment = (segmentId: number) => {
    playSound('click');
    const seg = STORY_SEGMENTS.find(s => s.id === segmentId);
    if (seg) {
      storyAudio.playSegment(seg.timeStart, seg.timeEnd);
    }
  };

  // --- STAGE 1: SEQUENCING HANDLERS ---
  const moveItem = (index: number, direction: 'up' | 'down') => {
    playSound('click');
    const newItems = [...sequenceItems];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setSequenceItems(newItems);
  };

  const checkSequence = () => {
    const isAllCorrect = sequenceItems.every((item, idx) => item.order === idx + 1);
    setSequenceSubmitted(true);
    setSequenceCorrect(isAllCorrect);

    if (isAllCorrect) {
      playSound('victory');
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      setStage1Passed(true);
      onScoreUpdate(50);
    } else {
      playSound('wrong');
    }
  };

  const resetSequence = () => {
    playSound('click');
    setSequenceItems([...STORY_SEQUENCE_LEVEL].sort(() => Math.random() - 0.5));
    setSequenceSubmitted(false);
    setSequenceCorrect(false);
    setSequenceHintVisible(false);
  };

  // --- STAGE 2: VOCABULARY HANDLERS ---
  const currentVocabQ = VOCAB_QUESTIONS[vocabIndex];

  const handleSelectVocab = (optIndex: number) => {
    if (vocabSubmitted) return;
    playSound('click');
    setVocabSelectedOption(optIndex);
  };

  const submitVocabAnswer = () => {
    if (vocabSelectedOption === null) return;
    setVocabSubmitted(true);
    const isCorrect = vocabSelectedOption === currentVocabQ.correctAnswer;
    if (isCorrect) {
      playSound('correct');
      setVocabScore(prev => prev + 1);
      onScoreUpdate(25);
    } else {
      playSound('wrong');
    }
  };

  const nextVocabQuestion = () => {
    playSound('click');
    if (vocabIndex < VOCAB_QUESTIONS.length - 1) {
      setVocabIndex(prev => prev + 1);
      setVocabSelectedOption(null);
      setVocabSubmitted(false);
      setShowVocabHint(false);
    } else {
      // Completed Stage 2
      const totalPct = ((vocabScore + (vocabSelectedOption === currentVocabQ.correctAnswer ? 0 : 0)) / VOCAB_QUESTIONS.length) * 100;
      if (totalPct >= 75) {
        setStage2Passed(true);
        playSound('victory');
        confetti({ particleCount: 80, spread: 70 });
      }
    }
  };

  // --- STAGE 3: MORAL HANDLERS ---
  const currentMoralQ = MORAL_QUESTIONS[moralIndex];

  const handleSelectMoral = (optIndex: number) => {
    if (moralSubmitted) return;
    playSound('click');
    setMoralSelectedOption(optIndex);
  };

  const submitMoralAnswer = () => {
    if (moralSelectedOption === null) return;
    setMoralSubmitted(true);
    const isCorrect = moralSelectedOption === currentMoralQ.correctAnswer;
    if (isCorrect) {
      playSound('correct');
      setMoralScore(prev => prev + 1);
      onScoreUpdate(30);
    } else {
      playSound('wrong');
    }
  };

  const nextMoralQuestion = () => {
    playSound('click');
    if (moralIndex < MORAL_QUESTIONS.length - 1) {
      setMoralIndex(prev => prev + 1);
      setMoralSelectedOption(null);
      setMoralSubmitted(false);
      setShowMoralHint(false);
    } else {
      // Completed Stage 3
      setStage3Passed(true);
      playSound('victory');
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info Banner with 3D Character Avatars - Gaya 'Pada Zaman Dahulu' */}
      <div className="bg-gradient-to-r from-amber-50/95 via-emerald-50/80 to-amber-50/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden backdrop-blur-md">
        {/* Top Decorative Timber Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 opacity-80" />

        <div className="flex items-start gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-wider mb-1.5">
              <span className="bg-amber-100 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300 text-[10px] font-extrabold shadow-2xs">
                🎬 Animasi 3D 'Pada Zaman Dahulu'
              </span>
              <span className="text-amber-800">·</span>
              <span className="text-amber-900 font-bold">Aktiviti Masteri Cerita Rakyat</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-amber-950 tracking-tight">
              Jejak Langkah Sang Kerbau &amp; Sang Kancil
            </h1>
            <p className="text-xs sm:text-sm text-amber-900/80 mt-1 max-w-2xl font-medium leading-relaxed text-justify">
              Selesaikan tiga tahap penguasaan secara kendiri. Gunakan audio rujukan dan petunjuk pemulihan sekiranya anda memerlukan bimbingan.
            </p>
          </div>
        </div>

        {/* Stage Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-amber-900/10 p-1.5 rounded-2xl border border-amber-800/15 shrink-0">
          <button
            onClick={() => { playSound('click'); setActiveStage(1); }}
            className={`px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 ${
              activeStage === 1
                ? 'bg-amber-800 text-amber-50 shadow-md scale-[1.02]'
                : 'text-amber-900/80 hover:bg-amber-100/80 hover:text-amber-950'
            }`}
          >
            <span>Tahap 1: Susun Babak</span>
            {stage1Passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => { playSound('click'); setActiveStage(2); }}
            className={`px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 ${
              activeStage === 2
                ? 'bg-amber-800 text-amber-50 shadow-md scale-[1.02]'
                : 'text-amber-900/80 hover:bg-amber-100/80 hover:text-amber-950'
            }`}
          >
            <span>Tahap 2: Kosa Kata</span>
            {stage2Passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
          <button
            onClick={() => { playSound('click'); setActiveStage(3); }}
            className={`px-3.5 py-2 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5 ${
              activeStage === 3
                ? 'bg-amber-800 text-amber-50 shadow-md scale-[1.02]'
                : 'text-amber-900/80 hover:bg-amber-100/80 hover:text-amber-950'
            }`}
          >
            <span>Tahap 3: Nilai &amp; Integriti</span>
            {stage3Passed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      </div>

      {/* ================= TAHAP 1: SUSUN BABAK KRONOLOGI ================= */}
      {activeStage === 1 && (
        <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
          {/* Top Decorative Timber Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 opacity-80" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                Analisis Urutan Peristiwa
              </span>
              <h2 className="text-xl font-extrabold text-amber-950 flex items-center gap-2">
                <span>Tahap 1: Susun Peristiwa Mengikut Kronologi Cerita</span>
              </h2>
              <p className="text-xs text-amber-900/75 mt-0.5 font-medium">
                Gunakan butang anak panah ke atas (▲) atau ke bawah (▼) untuk menyusun kad peristiwa dari permulaan hingga pengakhiran cerita.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSequenceHintVisible(!sequenceHintVisible)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors shadow-2xs"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Bantuan Pemulihan</span>
              </button>
              <button
                onClick={resetSequence}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-xl transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Susun Semula</span>
              </button>
            </div>
          </div>

          {/* Remedial Hint Banner (Pemulihan) */}
          {sequenceHintVisible && (
            <div className="p-4 bg-amber-100/90 border-2 border-amber-300/80 rounded-2xl text-xs text-amber-950 space-y-1 shadow-xs">
              <div className="font-extrabold flex items-center gap-1.5 text-amber-900">
                <Sparkles className="w-4 h-4 text-amber-600" /> Petunjuk Guru ( fasa pemulihan):
              </div>
              <p className="leading-relaxed">
                Ingat urutan 3 fasa cerita: <strong>Fasa 1:</strong> Buaya ditimpa pokok &amp; kerbau menolong. <strong>Fasa 2:</strong> Buaya membalas dengan menggigit kaki kerbau. <strong>Fasa 3:</strong> Kancil meminta lakonan semula &amp; buaya terhimpit semula.
              </p>
            </div>
          )}

          {/* Sequence Drag/Move Cards */}
          <div className="space-y-3">
            {sequenceItems.map((item, idx) => {
              const isCorrectPosition = sequenceSubmitted && item.order === idx + 1;
              const isWrongPosition = sequenceSubmitted && item.order !== idx + 1;

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${
                    isCorrectPosition
                      ? 'bg-emerald-50/95 border-emerald-500 shadow-md ring-2 ring-emerald-400/30'
                      : isWrongPosition
                      ? 'bg-rose-50/95 border-rose-400 shadow-md ring-2 ring-rose-400/30'
                      : 'bg-white/95 border-amber-800/20 hover:border-amber-400 hover:shadow-md hover:bg-amber-50/30'
                  }`}
                >
                  <div className="flex items-start gap-3.5 w-full">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 text-amber-50 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-amber-500/40">
                      {idx + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-bold text-amber-950 leading-relaxed">
                        {item.text}
                      </p>
                      {sequenceHintVisible && (
                        <p className="text-[11px] text-amber-800 italic font-medium">
                          💡 {item.hint}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => playAudioForSegment(item.audioSegmentId)}
                      className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors shadow-2xs"
                      title="Dengar audio peristiwa ini"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-800" />
                    </button>
                    <button
                      onClick={() => moveItem(idx, 'up')}
                      disabled={idx === 0 || sequenceSubmitted}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 disabled:opacity-30 rounded-xl text-xs font-extrabold text-amber-900 transition-colors shadow-2xs"
                      title="Alih ke atas"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveItem(idx, 'down')}
                      disabled={idx === sequenceItems.length - 1 || sequenceSubmitted}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 disabled:opacity-30 rounded-xl text-xs font-extrabold text-amber-900 transition-colors shadow-2xs"
                      title="Alih ke bawah"
                    >
                      ▼
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Submission Feedback & Next Button */}
          <div className="pt-4 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {sequenceSubmitted ? (
              <div className="flex items-center gap-2">
                {sequenceCorrect ? (
                  <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-950 bg-emerald-100 px-4 py-2 rounded-xl border border-emerald-300 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                    <span>Tahniah! Urutan kronologi anda 100% tepat. (+50 Markah)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-extrabold text-rose-950 bg-rose-100 px-4 py-2 rounded-xl border border-rose-300 shadow-xs">
                    <XCircle className="w-5 h-5 text-rose-700" />
                    <span>Masih ada urutan yang belum tepat. Buka bantuan pemulihan dan cuba lagi!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-xs font-medium text-amber-900/70">
                Susun keenam-enam babak di atas dengan betul sebelum menekan butang semak.
              </div>
            )}

            <div className="flex items-center gap-3">
              {!sequenceSubmitted ? (
                <button
                  onClick={checkSequence}
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 border border-emerald-500"
                >
                  <span>Semak Susunan Saya</span>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    playSound('click');
                    setActiveStage(2);
                  }}
                  className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 border border-amber-600"
                >
                  <span>Teruskan ke Tahap 2: Kosa Kata</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAHAP 2: KOSA KATA & PEMAHAMAN ================= */}
      {activeStage === 2 && (
        <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
          {/* Top Decorative Timber Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 opacity-80" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                Kosa Kata Kontekstual &amp; Nilai Sastera
              </span>
              <h2 className="text-xl font-extrabold text-amber-950 flex items-center gap-2">
                <span>Tahap 2: Cabaran Kosa Kata &amp; Makna Frasa Sastera</span>
              </h2>
              <p className="text-xs text-amber-900/75 mt-0.5 font-medium">
                Soalan {vocabIndex + 1} daripada {VOCAB_QUESTIONS.length} · Skor Semasa: {vocabScore} / {VOCAB_QUESTIONS.length}
              </p>
            </div>

            <button
              onClick={() => setShowVocabHint(!showVocabHint)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Petunjuk Pemulihan</span>
            </button>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-white/90 border-2 border-amber-800/15 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-950 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300 shadow-2xs">
                Aras KBAT: {currentVocabQ.kbatLevel}
              </span>
              {currentVocabQ.audioSegmentId && (
                <button
                  onClick={() => playAudioForSegment(currentVocabQ.audioSegmentId!)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors shadow-2xs"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>Dengar Dialog Cerita</span>
                </button>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-amber-950 leading-snug">
              {currentVocabQ.question}
            </h3>

            {showVocabHint && (
              <div className="p-3.5 bg-amber-100/90 border-2 border-amber-300/80 rounded-xl text-xs text-amber-950 shadow-2xs">
                💡 <strong>Bimbingan Pemulihan:</strong> {currentVocabQ.hint}
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentVocabQ.options.map((opt, idx) => {
                const isSelected = vocabSelectedOption === idx;
                const isCorrect = idx === currentVocabQ.correctAnswer;
                const showSuccess = vocabSubmitted && isCorrect;
                const showError = vocabSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={vocabSubmitted}
                    onClick={() => handleSelectVocab(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between shadow-2xs ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/30'
                        : showError
                        ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/30'
                        : isSelected
                        ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-400/30'
                        : 'bg-white border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/40 text-amber-950'
                    }`}
                  >
                    <span>{opt}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                    {showError && <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation on submit */}
            {vocabSubmitted && (
              <div className="p-4 bg-emerald-100/90 border-2 border-emerald-300 rounded-xl text-xs text-emerald-950 space-y-1 shadow-2xs">
                <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Penerangan Masteri:
                </div>
                <p className="leading-relaxed">{currentVocabQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
            {!vocabSubmitted ? (
              <button
                disabled={vocabSelectedOption === null}
                onClick={submitVocabAnswer}
                className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 border border-emerald-500"
              >
                <span>Hantar Jawapan</span>
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </button>
            ) : (
              <button
                onClick={nextVocabQuestion}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-extrabold text-sm rounded-xl transition-all shadow-md border border-amber-600"
              >
                <span>{vocabIndex < VOCAB_QUESTIONS.length - 1 ? 'Soalan Seterusnya' : 'Teruskan ke Tahap 3'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ================= TAHAP 3: NILAI MURNI & INTEGRITI ================= */}
      {activeStage === 3 && (
        <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
          {/* Top Decorative Timber Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 opacity-80" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-900/10 pb-4">
            <div>
              <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                Penghayatan Nilai Murni &amp; Integriti
              </span>
              <h2 className="text-xl font-extrabold text-amber-950 flex items-center gap-2">
                <span>Tahap 3: Analisis Nilai Murni, Watak &amp; Integriti Kemasyarakatan</span>
              </h2>
              <p className="text-xs text-amber-900/75 mt-0.5 font-medium">
                Soalan {moralIndex + 1} daripada {MORAL_QUESTIONS.length} · Skor Semasa: {moralScore} / {MORAL_QUESTIONS.length}
              </p>
            </div>

            <button
              onClick={() => setShowMoralHint(!showMoralHint)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-amber-950 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl transition-colors shadow-2xs"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
              <span>Petunjuk Pemulihan</span>
            </button>
          </div>

          {/* Question Card */}
          <div className="p-6 bg-white/90 border-2 border-amber-800/15 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-950 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300 shadow-2xs">
                Aras Pemikiran: {currentMoralQ.kbatLevel}
              </span>
              {currentMoralQ.audioSegmentId && (
                <button
                  onClick={() => playAudioForSegment(currentMoralQ.audioSegmentId!)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl border border-emerald-300 transition-colors shadow-2xs"
                >
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                  <span>Dengar Dialog Teks</span>
                </button>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-amber-950 leading-snug">
              {currentMoralQ.question}
            </h3>

            {showMoralHint && (
              <div className="p-3.5 bg-amber-100/90 border-2 border-amber-300/80 rounded-xl text-xs text-amber-950 shadow-2xs">
                💡 <strong>Bimbingan Pemulihan:</strong> {currentMoralQ.hint}
              </div>
            )}

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentMoralQ.options.map((opt, idx) => {
                const isSelected = moralSelectedOption === idx;
                const isCorrect = idx === currentMoralQ.correctAnswer;
                const showSuccess = moralSubmitted && isCorrect;
                const showError = moralSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={idx}
                    disabled={moralSubmitted}
                    onClick={() => handleSelectMoral(idx)}
                    className={`w-full text-left p-4 rounded-xl border-2 text-sm font-bold transition-all flex items-center justify-between shadow-2xs ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/30'
                        : showError
                        ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/30'
                        : isSelected
                        ? 'bg-amber-100/80 border-amber-500 text-amber-950 shadow-xs ring-2 ring-amber-400/30'
                        : 'bg-white border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/40 text-amber-950'
                    }`}
                  >
                    <span>{opt}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                    {showError && <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation on submit */}
            {moralSubmitted && (
              <div className="p-4 bg-emerald-100/90 border-2 border-emerald-300 rounded-xl text-xs text-emerald-950 space-y-1 shadow-2xs">
                <div className="font-extrabold flex items-center gap-1.5 text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Refleksi Nilai Integriti:
                </div>
                <p className="leading-relaxed">{currentMoralQ.explanation}</p>
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-amber-900/10">
            {!moralSubmitted ? (
              <button
                disabled={moralSelectedOption === null}
                onClick={submitMoralAnswer}
                className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 border border-emerald-500"
              >
                <span>Hantar Jawapan</span>
                <Sparkles className="w-4 h-4 text-emerald-200" />
              </button>
            ) : (
              <button
                onClick={nextMoralQuestion}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-extrabold text-sm rounded-xl transition-all shadow-md border border-amber-600"
              >
                <span>{moralIndex < MORAL_QUESTIONS.length - 1 ? 'Soalan Seterusnya' : 'Selesai Analisis Masteri'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
