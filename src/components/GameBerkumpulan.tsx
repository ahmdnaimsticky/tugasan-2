/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Users,
  Trophy,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Volume2,
  ShieldCheck,
  RefreshCw,
  Award
} from 'lucide-react';
import {
  GROUP_STATIONS,
  GROUP_STATION_2_PUZZLES,
  GROUP_STATION_3_TASKS,
  GROUP_STATION_4_SPEED_QUIZ,
  GroupStation
} from '../data/quizData';
import { STORY_SEGMENTS } from '../data/storyData';
import { storyAudio } from '../utils/audioManager';
import { playSound } from '../utils/soundEffects';

interface Team {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  color: string;
  score: number;
}

const INITIAL_TEAMS: Team[] = [
  { id: 't1', name: 'Kumpulan Kancil Cerdik', symbol: '🦌', image: '/src/assets/images/pzd_kancil_avatar_1792913732462.jpg', color: 'emerald', score: 0 },
  { id: 't2', name: 'Kumpulan Kerbau Gagah', symbol: '🐃', image: '/src/assets/images/pzd_kerbau_avatar_1792913732279.jpg', color: 'amber', score: 0 },
  { id: 't3', name: 'Kumpulan Buaya Insaf', symbol: '🐊', image: '/src/assets/images/pzd_buaya_avatar_1792913732534.jpg', color: 'rose', score: 0 },
  { id: 't4', name: 'Kumpulan Rimba Bestari', symbol: '🌴', image: '/src/assets/images/pzd_cerita_hero_1792913730391.jpg', color: 'purple', score: 0 },
];

export const GameBerkumpulan: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>(INITIAL_TEAMS);
  const [activeStationId, setActiveStationId] = useState<number>(1);
  const [activeTeamTurn, setActiveTeamTurn] = useState<number>(0);

  // Stesen 1: Peer Intonation Peer-Review
  const [roleplayStep, setRoleplayStep] = useState<number>(0);
  const [peerRatings, setPeerRatings] = useState<Record<string, number>>({});

  // Stesen 2: Proverb Matching
  const [puzzleIndex, setPuzzleIndex] = useState<number>(0);
  const [selectedProverb, setSelectedProverb] = useState<string | null>(null);
  const [proverbSubmitted, setProverbSubmitted] = useState<boolean>(false);

  // Stesen 3: Sentence Scramble Order
  const [sentenceTaskIndex, setSentenceTaskIndex] = useState<number>(0);
  const [currentWords, setCurrentWords] = useState<string[]>(() => {
    return [...GROUP_STATION_3_TASKS[0].scrambled];
  });
  const [sentenceChecked, setSentenceChecked] = useState<boolean>(false);

  // Stesen 4: Speed Quiz
  const [speedQIndex, setSpeedQIndex] = useState<number>(0);
  const [speedSelectedOpt, setSpeedSelectedOpt] = useState<number | null>(null);
  const [speedSubmitted, setSpeedSubmitted] = useState<boolean>(false);

  const addScoreToActiveTeam = (pts: number) => {
    setTeams(prev => prev.map((t, idx) => {
      if (idx === activeTeamTurn) {
        return { ...t, score: t.score + pts };
      }
      return t;
    }));
  };

  const nextTeamTurn = () => {
    setActiveTeamTurn(prev => (prev + 1) % teams.length);
  };

  // --- STESEN 1 HANDLERS ---
  const handleRatePeer = (charName: string, stars: number) => {
    playSound('click');
    setPeerRatings(prev => ({ ...prev, [charName]: stars }));
  };

  const completeRoleplay = () => {
    playSound('victory');
    addScoreToActiveTeam(40);
    confetti({ particleCount: 50, spread: 50 });
    nextTeamTurn();
  };

  // --- STESEN 2 HANDLERS ---
  const currentPuzzle = GROUP_STATION_2_PUZZLES[puzzleIndex];

  const handleSelectProverb = (p: string) => {
    if (proverbSubmitted) return;
    playSound('click');
    setSelectedProverb(p);
  };

  const submitProverb = () => {
    if (!selectedProverb) return;
    setProverbSubmitted(true);
    const isCorrect = selectedProverb === currentPuzzle.correctProverb;
    if (isCorrect) {
      playSound('correct');
      addScoreToActiveTeam(30);
    } else {
      playSound('wrong');
    }
  };

  const nextProverb = () => {
    playSound('click');
    if (puzzleIndex < GROUP_STATION_2_PUZZLES.length - 1) {
      setPuzzleIndex(prev => prev + 1);
      setSelectedProverb(null);
      setProverbSubmitted(false);
      nextTeamTurn();
    } else {
      playSound('victory');
      confetti({ particleCount: 60, spread: 60 });
    }
  };

  // --- STESEN 3 HANDLERS ---
  const moveWord = (index: number, direction: 'left' | 'right') => {
    playSound('click');
    const newWords = [...currentWords];
    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newWords.length) return;
    const temp = newWords[index];
    newWords[index] = newWords[targetIdx];
    newWords[targetIdx] = temp;
    setCurrentWords(newWords);
  };

  const checkSentence = () => {
    const task = GROUP_STATION_3_TASKS[sentenceTaskIndex];
    const isCorrect = currentWords.join(' ') === task.correctOrder.join(' ');
    setSentenceChecked(true);
    if (isCorrect) {
      playSound('correct');
      addScoreToActiveTeam(35);
      confetti({ particleCount: 70, spread: 70 });
    } else {
      playSound('wrong');
    }
  };

  const nextSentenceTask = () => {
    playSound('click');
    if (sentenceTaskIndex < GROUP_STATION_3_TASKS.length - 1) {
      const nextIdx = sentenceTaskIndex + 1;
      setSentenceTaskIndex(nextIdx);
      setCurrentWords([...GROUP_STATION_3_TASKS[nextIdx].scrambled]);
      setSentenceChecked(false);
      nextTeamTurn();
    }
  };

  // --- STESEN 4 HANDLERS ---
  const currentSpeedQ = GROUP_STATION_4_SPEED_QUIZ[speedQIndex];

  const submitSpeedAnswer = () => {
    if (speedSelectedOpt === null) return;
    setSpeedSubmitted(true);
    const isCorrect = speedSelectedOpt === currentSpeedQ.correct;
    if (isCorrect) {
      playSound('correct');
      addScoreToActiveTeam(25);
    } else {
      playSound('wrong');
    }
  };

  const nextSpeedQ = () => {
    playSound('click');
    if (speedQIndex < GROUP_STATION_4_SPEED_QUIZ.length - 1) {
      setSpeedQIndex(prev => prev + 1);
      setSpeedSelectedOpt(null);
      setSpeedSubmitted(false);
      nextTeamTurn();
    } else {
      playSound('victory');
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  const currentActiveTeam = teams[activeTeamTurn];

  return (
    <div className="space-y-6">
      {/* Banner - Gaya Animasi 3D 'Pada Zaman Dahulu' */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-amber-800/25 shadow-xl bg-slate-900">
        <img
          src="/src/assets/images/pzd_cerita_hero_1792913730391.jpg"
          alt="Pembelajaran Berkumpulan Pasukan Rimba - Animasi 3D Pada Zaman Dahulu"
          className="w-full h-48 sm:h-56 object-cover opacity-90"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent flex flex-col justify-end p-6 sm:p-7 text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs font-extrabold mb-1.5">
            <span className="bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-400/40 text-amber-300 font-extrabold text-[10px] shadow-2xs">
              🎬 Animasi 3D 'Pada Zaman Dahulu'
            </span>
            <span className="text-amber-400">·</span>
            <span className="text-amber-200 font-bold">Pembelajaran Berkumpulan Rimba</span>
            <span className="text-amber-400">·</span>
            <span className="text-amber-200 font-bold">Muhibah &amp; Kemasyarakatan</span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Lumba Kerjasama Rimba: Cabaran Pasukan Bestari
          </h1>
          <p className="text-xs sm:text-sm text-slate-100 max-w-2xl mt-1 font-medium leading-relaxed">
            Kembangkan kemahiran mendengar, bertutur, dan berbincang bersama rakan sekumpulan. Selesaikan 4 stesen interaktif mengikut giliran pasukan.
          </p>
        </div>
      </div>

      {/* Live Team Scoreboard - Papan Markah Kayu Pasukan */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {teams.map((team, idx) => {
          const isTurn = idx === activeTeamTurn;
          return (
            <div
              key={team.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                isTurn
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100/90 border-amber-600 shadow-lg ring-2 ring-amber-500/30'
                  : 'bg-white/95 border-amber-800/15 hover:border-amber-400 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {team.image ? (
                  <img
                    src={team.image}
                    alt={team.name}
                    className="w-10 h-10 rounded-xl object-cover border-2 border-amber-400/80 shadow-xs shrink-0"
                  />
                ) : (
                  <span className="text-2xl">{team.symbol}</span>
                )}
                {isTurn && (
                  <span className="text-[10px] font-extrabold uppercase bg-amber-800 text-amber-50 px-2.5 py-0.5 rounded-full shadow-2xs animate-pulse">
                    Giliran Pasukan
                  </span>
                )}
              </div>
              <h3 className="text-xs font-extrabold text-amber-950 truncate">{team.name}</h3>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-amber-900 font-mono tabular-nums">
                  {team.score}
                </span>
                <span className="text-[11px] text-amber-900/70 font-bold">Mata Pasukan</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Station Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-amber-900/10 p-1.5 rounded-2xl border border-amber-800/15">
        {GROUP_STATIONS.map((st) => (
          <button
            key={st.id}
            onClick={() => {
              playSound('click');
              setActiveStationId(st.id);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeStationId === st.id
                ? 'bg-amber-800 text-amber-50 shadow-md scale-[1.02]'
                : 'text-amber-900/80 hover:bg-amber-100/80 hover:text-amber-950 font-bold'
            }`}
          >
            <span>{st.badge}</span>
            <span>{st.name}: {st.title.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Station Card - Gaya Pentas Sastera 3D */}
      <div className="bg-gradient-to-b from-white/95 via-amber-50/60 to-white/95 rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
        {/* Top Decorative Timber Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 opacity-80" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-900/10 pb-4">
          <div>
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
              {GROUP_STATIONS[activeStationId - 1].objective}
            </div>
            <h2 className="text-xl font-extrabold text-amber-950 flex items-center gap-2">
              <span>{GROUP_STATIONS[activeStationId - 1].title}</span>
            </h2>
            <p className="text-xs text-amber-900/75 mt-1 font-medium">
              {GROUP_STATIONS[activeStationId - 1].instruction}
            </p>
          </div>

          <div className="bg-amber-100 border-2 border-amber-300 text-amber-950 px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 shrink-0 shadow-2xs">
            <span className="text-amber-800">Giliran:</span>
            <span>{currentActiveTeam.symbol} {currentActiveTeam.name}</span>
          </div>
        </div>

        {/* ================= STESEN 1: LAKON SUARA BERGILIR ================= */}
        {activeStationId === 1 && (
          <div className="space-y-5">
            <p className="text-xs text-amber-900/80 font-medium leading-relaxed">
              Agihkan 4 watak berikut kepada 4 orang ahli dalam <strong>{currentActiveTeam.name}</strong>. Dengar contoh audio asli, kemudian lakonkan secara langsung di hadapan kelas!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  role: 'Pencerita',
                  line: STORY_SEGMENTS[0],
                  avatar: '📖',
                  image: '/src/assets/images/pzd_cerita_hero_1792913730391.jpg',
                  color: 'slate'
                },
                {
                  role: 'Sang Buaya',
                  line: STORY_SEGMENTS[1],
                  avatar: '🐊',
                  image: '/src/assets/images/pzd_buaya_avatar_1792913732534.jpg',
                  color: 'rose'
                },
                {
                  role: 'Sang Kerbau',
                  line: STORY_SEGMENTS[2],
                  avatar: '🐃',
                  image: '/src/assets/images/pzd_kerbau_avatar_1792913732279.jpg',
                  color: 'amber'
                },
                {
                  role: 'Sang Kancil',
                  line: STORY_SEGMENTS[9],
                  avatar: '🦌',
                  image: '/src/assets/images/pzd_kancil_avatar_1792913732462.jpg',
                  color: 'emerald'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl border-2 border-amber-800/15 bg-white/95 space-y-3 shadow-xs hover:border-amber-400 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-950 flex items-center gap-2">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.role}
                          className="w-6 h-6 rounded-full object-cover border border-amber-400 shrink-0"
                        />
                      ) : (
                        <span className="text-base">{item.avatar}</span>
                      )}
                      <span>Watak: {item.role}</span>
                    </span>
                    <button
                      onClick={() => {
                        playSound('click');
                        storyAudio.playSegment(item.line.timeStart, item.line.timeEnd);
                      }}
                      className="p-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors shadow-2xs"
                      title="Dengar intonasi asal"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-amber-950 italic font-semibold bg-amber-50/80 p-3 rounded-xl border border-amber-200/80 leading-relaxed">
                    "{item.line.text}"
                  </p>

                  <div className="text-[11px] text-emerald-950 bg-emerald-100/80 p-2.5 rounded-xl border border-emerald-300 font-medium">
                    🎯 <em>Intonasi:</em> {item.line.intonationTip}
                  </div>

                  {/* Peer Rating Stars */}
                  <div className="flex items-center justify-between pt-1 border-t border-amber-900/10">
                    <span className="text-[11px] text-amber-900/70 font-bold">Penilaian Rakan Sebaya:</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3].map(star => {
                        const currentVal = peerRatings[item.role] || 0;
                        return (
                          <button
                            key={star}
                            onClick={() => handleRatePeer(item.role, star)}
                            className={`text-base transition-transform hover:scale-110 ${
                              currentVal >= star ? 'text-amber-500 fill-current' : 'text-slate-300'
                            }`}
                          >
                            ★
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={completeRoleplay}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95 border border-emerald-500"
              >
                <Award className="w-4 h-4 text-emerald-200" />
                <span>Selesai Persembahan Pasukan (+40 Mata)</span>
              </button>
            </div>
          </div>
        )}

        {/* ================= STESEN 2: PERIBAHASA & SIMPULAN BAHASA ================= */}
        {activeStationId === 2 && (
          <div className="space-y-5">
            <div className="p-5 bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl space-y-2.5 shadow-2xs">
              <span className="text-xs font-extrabold text-amber-950 bg-amber-200/90 px-3 py-1 rounded-lg border border-amber-300">
                Situasi {puzzleIndex + 1} daripada {GROUP_STATION_2_PUZZLES.length}
              </span>
              <p className="text-base font-bold text-amber-950 leading-relaxed">
                "{currentPuzzle.situation}"
              </p>
            </div>

            <h3 className="text-xs font-extrabold text-amber-900/80 uppercase tracking-wider">
              Bincang Bersama Pasukan: Apakah Simpulan Bahasa / Peribahasa Yang Paling Tepat?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentPuzzle.options.map((opt, i) => {
                const isSelected = selectedProverb === opt;
                const isCorrect = opt === currentPuzzle.correctProverb;
                const showSuccess = proverbSubmitted && isCorrect;
                const showError = proverbSubmitted && isSelected && !isCorrect;

                return (
                  <button
                    key={i}
                    disabled={proverbSubmitted}
                    onClick={() => handleSelectProverb(opt)}
                    className={`p-4 rounded-xl border-2 text-sm font-bold text-left transition-all flex items-center justify-between shadow-2xs ${
                      showSuccess
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/30'
                        : showError
                        ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/30'
                        : isSelected
                        ? 'bg-amber-100/90 border-amber-500 text-amber-950 ring-2 ring-amber-400/30'
                        : 'bg-white border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/40 text-amber-950'
                    }`}
                  >
                    <span>{opt}</span>
                    {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>

            {proverbSubmitted && (
              <div className="p-4 bg-emerald-100/90 border-2 border-emerald-300 rounded-xl text-xs text-emerald-950 space-y-1 shadow-2xs">
                <strong className="text-emerald-900">Huraian Makna:</strong> {currentPuzzle.meaning}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-amber-900/10">
              {!proverbSubmitted ? (
                <button
                  disabled={!selectedProverb}
                  onClick={submitProverb}
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 border border-emerald-500"
                >
                  <span>Sahkan Pilihan Pasukan</span>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                </button>
              ) : (
                <button
                  onClick={nextProverb}
                  className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-extrabold text-sm rounded-xl transition-all shadow-md border border-amber-600"
                >
                  <span>Situasi Seterusnya &amp; Gilirkan Pasukan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= STESEN 3: SUSUN IKRAR INTEGRITI ================= */}
        {activeStationId === 3 && (
          <div className="space-y-5">
            <p className="text-xs text-amber-900/80 font-medium">
              Gerakkan kad perkataan ke kiri (◀) atau ke kanan (▶) untuk membina satu ayat ikrar integriti kemasyarakatan yang tepat.
            </p>

            <div className="p-6 bg-white/95 border-2 border-amber-800/15 rounded-2xl space-y-4 shadow-sm">
              <div className="flex flex-wrap gap-3 justify-center">
                {currentWords.map((word, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-amber-50/90 border-2 border-amber-300 rounded-xl shadow-xs flex flex-col items-center gap-2"
                  >
                    <span className="text-sm font-extrabold text-amber-950">{word}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => moveWord(idx, 'left')}
                        disabled={idx === 0 || sentenceChecked}
                        className="px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 disabled:opacity-30 rounded-lg font-bold text-amber-900 border border-amber-300 shadow-2xs"
                        title="Alih ke kiri"
                      >
                        ◀
                      </button>
                      <button
                        onClick={() => moveWord(idx, 'right')}
                        disabled={idx === currentWords.length - 1 || sentenceChecked}
                        className="px-2 py-1 text-xs bg-amber-100 hover:bg-amber-200 disabled:opacity-30 rounded-lg font-bold text-amber-900 border border-amber-300 shadow-2xs"
                        title="Alih ke kanan"
                      >
                        ▶
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {sentenceChecked && (
                <div className="p-4 bg-emerald-100/90 border-2 border-emerald-300 rounded-xl text-xs text-emerald-950 text-center font-bold shadow-2xs">
                  {GROUP_STATION_3_TASKS[sentenceTaskIndex].meaning}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-amber-900/10">
              {!sentenceChecked ? (
                <button
                  onClick={checkSentence}
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 border border-emerald-500"
                >
                  <span>Semak Susunan Ikrar Pasukan</span>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                </button>
              ) : (
                <button
                  onClick={nextSentenceTask}
                  className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-extrabold text-sm rounded-xl transition-all shadow-md border border-amber-600"
                >
                  <span>Ikrar Seterusnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= STESEN 4: KUIZ PANTAS PASUKAN ================= */}
        {activeStationId === 4 && (
          <div className="space-y-5">
            <div className="p-6 bg-white/95 border-2 border-amber-800/15 rounded-2xl space-y-3.5 shadow-sm">
              <span className="text-xs font-extrabold text-amber-950 bg-amber-100 px-3 py-1 rounded-lg border border-amber-300 shadow-2xs">
                Cabaran Pantas #{speedQIndex + 1}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-amber-950 leading-relaxed">
                {currentSpeedQ.q}
              </h3>

              <div className="space-y-2.5 pt-2">
                {currentSpeedQ.options.map((opt, i) => {
                  const isSelected = speedSelectedOpt === i;
                  const isCorrect = i === currentSpeedQ.correct;
                  const showSuccess = speedSubmitted && isCorrect;
                  const showError = speedSubmitted && isSelected && !isCorrect;

                  return (
                    <button
                      key={i}
                      disabled={speedSubmitted}
                      onClick={() => {
                        playSound('click');
                        setSpeedSelectedOpt(i);
                      }}
                      className={`w-full p-4 rounded-xl border-2 text-xs sm:text-sm font-bold text-left transition-all flex items-center justify-between shadow-2xs ${
                        showSuccess
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400/30'
                          : showError
                          ? 'bg-rose-50 border-rose-500 text-rose-950 ring-2 ring-rose-400/30'
                          : isSelected
                          ? 'bg-amber-100/90 border-amber-500 text-amber-950 ring-2 ring-amber-400/30'
                          : 'bg-white border-amber-900/15 hover:border-amber-400 hover:bg-amber-50/40 text-amber-950'
                      }`}
                    >
                      <span>{opt}</span>
                      {showSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-amber-900/10">
              {!speedSubmitted ? (
                <button
                  disabled={speedSelectedOpt === null}
                  onClick={submitSpeedAnswer}
                  className="px-7 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-40 text-white font-extrabold text-sm rounded-xl transition-all shadow-md flex items-center gap-2 border border-emerald-500"
                >
                  <span>Hantar Jawapan Pasukan (+25 Mata)</span>
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                </button>
              ) : (
                <button
                  onClick={nextSpeedQ}
                  className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-amber-50 font-extrabold text-sm rounded-xl transition-all shadow-md border border-amber-600"
                >
                  <span>Cabaran Seterusnya &amp; Gilirkan Pasukan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
