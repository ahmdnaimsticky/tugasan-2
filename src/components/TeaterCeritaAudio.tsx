/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Mic,
  Square,
  Sparkles,
  CheckCircle2,
  Filter,
  FastForward,
  Info,
  Radio
} from 'lucide-react';
import { STORY_SEGMENTS, DialogueSegment, CHARACTER_PROFILES } from '../data/storyData';
import { storyAudio } from '../utils/audioManager';
import { playSound } from '../utils/soundEffects';

interface TeaterCeritaAudioProps {
  onStoryCompleted?: () => void;
}

export const TeaterCeritaAudio: React.FC<TeaterCeritaAudioProps> = ({ onStoryCompleted }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeSegment, setActiveSegment] = useState<DialogueSegment | null>(null);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [characterFilter, setCharacterFilter] = useState<string>('all');
  
  // Voice recording state for student practice (DSKP 1.3 & 1.3.2)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [practiceSegment, setPracticeSegment] = useState<DialogueSegment>(STORY_SEGMENTS[1]);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordTimerRef = useRef<number | null>(null);

  const scriptContainerRef = useRef<HTMLDivElement | null>(null);
  const activeLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const unsubTime = storyAudio.onTimeUpdate((time, segment) => {
      setCurrentTime(time);
      setActiveSegment(segment);
      if (time >= 164 && onStoryCompleted) {
        onStoryCompleted();
      }
    });

    const unsubState = storyAudio.onPlayStateChange((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubTime();
      unsubState();
    };
  }, [onStoryCompleted]);

  // Auto scroll to active dialogue line
  useEffect(() => {
    if (activeSegment && activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeSegment?.id]);

  const toggleMainPlay = () => {
    playSound('click');
    storyAudio.togglePlay();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = Number(e.target.value);
    storyAudio.seek(targetTime);
  };

  const changeSpeed = (speed: number) => {
    playSound('click');
    setPlaybackSpeed(speed);
    storyAudio.setPlaybackRate(speed);
  };

  const playSingleLine = (segment: DialogueSegment) => {
    playSound('click');
    setPracticeSegment(segment);
    storyAudio.playSegment(segment.timeStart, segment.timeEnd);
  };

  // Student Recording Sandbox
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      playSound('hint');

      recordTimerRef.current = window.setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
    } catch {
      alert('Sila benarkan akses mikrofon pelayar untuk merakam sebutan anda.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      playSound('correct');
      if (recordTimerRef.current) {
        clearInterval(recordTimerRef.current);
      }
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const filteredSegments = characterFilter === 'all'
    ? STORY_SEGMENTS
    : STORY_SEGMENTS.filter(s => s.character === characterFilter);

  // Helper for Character Visual Details on Stage
  const getCharacterVisual = (characterName?: string) => {
    switch (characterName) {
      case 'Sang Kancil':
        return {
          avatar: '🦌',
          image: '/src/assets/images/pzd_kancil_avatar_1792913732462.jpg',
          bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
          badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          ringColor: 'ring-emerald-400',
          glowBg: 'bg-emerald-500/15',
          description: 'Hakim Rimba Yang Cerdik & Berakal Panjang'
        };
      case 'Sang Kerbau':
        return {
          avatar: '🐃',
          image: '/src/assets/images/pzd_kerbau_avatar_1792913732279.jpg',
          bgGradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
          badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
          ringColor: 'ring-amber-400',
          glowBg: 'bg-amber-500/15',
          description: 'Sahabat Baik Hati & Rela Berkorban Tenaga'
        };
      case 'Sang Buaya':
        return {
          avatar: '🐊',
          image: '/src/assets/images/pzd_buaya_avatar_1792913732534.jpg',
          bgGradient: 'from-rose-500/20 via-red-500/10 to-transparent',
          badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
          ringColor: 'ring-rose-400',
          glowBg: 'bg-rose-500/15',
          description: 'Haiwan Sungai Yang Tamak & Tidak Mengenang Budi'
        };
      default:
        return {
          avatar: '📖',
          image: '/src/assets/images/pzd_cerita_hero_1792913730391.jpg',
          bgGradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
          badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
          ringColor: 'ring-blue-400',
          glowBg: 'bg-blue-500/15',
          description: 'Pencerita Rimba Yang Menghidupkan Suasana Hutan'
        };
    }
  };

  const currentDisplaySegment = activeSegment || practiceSegment;
  const currentVisual = getCharacterVisual(currentDisplaySegment.character);

  return (
    <div className="space-y-8">
      {/* Hero Showcase with Generated Illustration & Animated Player */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900">
        <img
          src="/src/assets/images/pzd_cerita_hero_1792913730391.jpg"
          alt="Kisah Sang Kancil, Sang Kerbau dan Sang Buaya - Animasi 3D Gaya Pada Zaman Dahulu"
          className="w-full h-64 sm:h-80 md:h-96 object-cover opacity-95"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold mb-2">
            <span className="bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-400/40 text-emerald-300 font-bold">
              🎬 Animasi 3D 'Pada Zaman Dahulu'
            </span>
            <span className="text-emerald-400">·</span>
            <span className="text-emerald-300">DSKP 1.3 &amp; 1.3.2</span>
            <span className="text-emerald-400">·</span>
            <span className="text-emerald-300">Bahasa Melayu Tahun 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Kisah Sang Kancil, Sang Kerbau &amp; Sang Buaya
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Dengar lakon suara drama pentas yang penuh pengajaran. Perhatikan sebutan baku, intonasi watak yang berbeza, serta nilai integriti dan kemasyarakatan dalam karya sastera rakyat ini.
          </p>

          {/* Integrated Quick Player Bar */}
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={toggleMainPlay}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg transition-colors shadow-md whitespace-nowrap shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
              <span>{isPlaying ? 'Jeda Cerita' : 'Mainkan Drama Penuh'}</span>
            </button>

            {/* Scrubber slider */}
            <div className="w-full flex items-center gap-3">
              <span className="text-xs font-mono text-emerald-300 tabular-nums">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max="165"
                step="0.5"
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <span className="text-xs font-mono text-slate-300 tabular-nums">
                02:45
              </span>
            </div>

            {/* Speed Controller */}
            <div className="flex items-center gap-1.5 shrink-0 bg-black/30 p-1 rounded-lg">
              <FastForward className="w-3.5 h-3.5 text-slate-400 ml-1" />
              {[0.75, 1, 1.25].map(speed => (
                <button
                  key={speed}
                  onClick={() => changeSpeed(speed)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    playbackSpeed === speed
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= PENTAS LAKON WATAK RIMBA (FRAMER MOTION ANIMATED SPOTLIGHT) ================= */}
      <motion.div
        layout
        className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm p-6"
      >
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Pentas Lakon Dinamik Watak Cerita (Lakon Suara Langsung)</span>
            </span>
          </div>
          <div className="text-xs font-mono text-slate-500">
            {isPlaying ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Sedang Bernada...
              </span>
            ) : (
              <span className="text-slate-400">Pentas Bersedia</span>
            )}
          </div>
        </div>

        {/* Dynamic Character Stage with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDisplaySegment.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className={`rounded-xl p-5 border border-slate-200 bg-gradient-to-r ${currentVisual.bgGradient} flex flex-col md:flex-row items-center gap-6`}
          >
            {/* Animated Character Avatar with Pulsing Ripple Effect */}
            <div className="relative shrink-0 flex items-center justify-center">
              {isPlaying && (
                <motion.div
                  animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                  className={`absolute inset-0 rounded-full ${currentVisual.glowBg} pointer-events-none`}
                />
              )}
              <motion.div
                whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                transition={{ duration: 0.3 }}
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-white border-2 border-slate-200 shadow-md flex items-center justify-center select-none ${
                  isPlaying ? `ring-4 ${currentVisual.ringColor}/50 shadow-lg` : ''
                }`}
              >
                {currentVisual.image ? (
                  <img
                    src={currentVisual.image}
                    alt={currentDisplaySegment.character}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl sm:text-5xl">{currentVisual.avatar}</span>
                )}
              </motion.div>
            </div>

            {/* Character Speech & Stage Direction */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${currentVisual.badgeColor}`}>
                  {currentDisplaySegment.character}
                </span>
                {currentDisplaySegment.stageDirection && (
                  <span className="text-xs italic text-slate-500 bg-white/80 px-2.5 py-0.5 rounded-full border border-slate-200">
                    ({currentDisplaySegment.stageDirection})
                  </span>
                )}
                <span className="text-[11px] text-slate-400 font-mono">
                  {formatTime(currentDisplaySegment.timeStart)} - {formatTime(currentDisplaySegment.timeEnd)}
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="text-base sm:text-lg font-bold text-slate-900 leading-snug"
              >
                "{currentDisplaySegment.text}"
              </motion.p>

              <div className="text-xs text-emerald-900 flex items-center justify-center md:justify-start gap-1.5 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>Petua Intonasi:</strong> {currentDisplaySegment.intonationTip}
                </span>
              </div>
            </div>

            {/* Single Play Action */}
            <div className="shrink-0">
              <button
                onClick={() => playSingleLine(currentDisplaySegment)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-emerald-800 border border-slate-300 rounded-xl shadow-xs font-bold text-xs transition-colors"
                title="Dengar keratan dialog watak ini"
              >
                <Volume2 className="w-4 h-4 text-emerald-600" />
                <span>Dengar Dialog</span>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Main Interactive Stage Grid */}
      <div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative rounded-3xl p-4 sm:p-6 border border-emerald-300/80 shadow-md bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.82)), url('/src/assets/images/pzd_game_bg_1792913701847.jpg')`,
          filter: 'brightness(1.05)'
        }}
      >
        {/* Left: Synchronized Script & Dialogue Reader (7 Cols) - Gaya 3D Pada Zaman Dahulu */}
        <div className="lg:col-span-7 relative overflow-hidden rounded-3xl p-6 sm:p-7 border-2 border-amber-800/25 shadow-xl bg-gradient-to-b from-white/95 via-amber-50/65 to-white/95 backdrop-blur-md space-y-5">
          {/* Top Decorative Timber Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-600 opacity-80" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-900/10 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-amber-950 flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shadow-xs shrink-0">
                  <Volume2 className="w-4 h-4 text-emerald-700" />
                </span>
                <span>Skrip Lakon Cerita &amp; Audio Pencerita 3D</span>
              </h2>
              <p className="text-xs text-amber-900/75 mt-0.5 font-medium">
                Siri animasi 3D 'Pada Zaman Dahulu'. Klik butang dengar pada setiap baris untuk melatih intonasi dan sebutan baku.
              </p>
            </div>

            {/* Character Filter with Nusantara Folklore Theme */}
            <div className="flex items-center gap-1.5 text-xs bg-amber-900/10 p-1.5 rounded-xl border border-amber-800/20">
              <Filter className="w-3.5 h-3.5 text-amber-800 ml-1 shrink-0" />
              <button
                onClick={() => setCharacterFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  characterFilter === 'all'
                    ? 'bg-amber-800 text-amber-50 shadow-sm'
                    : 'text-amber-900/80 hover:bg-amber-100'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setCharacterFilter('Sang Kerbau')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  characterFilter === 'Sang Kerbau'
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-amber-900/80 hover:bg-amber-100'
                }`}
              >
                Kerbau
              </button>
              <button
                onClick={() => setCharacterFilter('Sang Buaya')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  characterFilter === 'Sang Buaya'
                    ? 'bg-rose-700 text-white shadow-sm'
                    : 'text-amber-900/80 hover:bg-amber-100'
                }`}
              >
                Buaya
              </button>
              <button
                onClick={() => setCharacterFilter('Sang Kancil')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  characterFilter === 'Sang Kancil'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'text-amber-900/80 hover:bg-amber-100'
                }`}
              >
                Kancil
              </button>
            </div>
          </div>

          {/* Dialogue Scroll List with Framer Motion Staggered Appearances */}
          <div
            ref={scriptContainerRef}
            className="space-y-3 max-h-[580px] overflow-y-auto pr-2"
          >
            {filteredSegments.map((segment, index) => {
              const isActive = activeSegment?.id === segment.id;
              const isSelectedForPractice = practiceSegment.id === segment.id;

              const getBadgeColor = (char: string) => {
                switch (char) {
                  case 'Sang Kancil': return 'bg-emerald-100 text-emerald-900 border-emerald-300 shadow-2xs';
                  case 'Sang Kerbau': return 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs';
                  case 'Sang Buaya': return 'bg-rose-100 text-rose-900 border-rose-300 shadow-2xs';
                  default: return 'bg-amber-50 text-amber-900 border-amber-200 shadow-2xs';
                }
              };

              return (
                <motion.div
                  key={segment.id}
                  ref={isActive ? activeLineRef : null}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
                  whileHover={{ scale: 1.01 }}
                  className={`p-4 rounded-2xl border transition-all ${
                    isActive
                      ? 'border-amber-600 bg-amber-50/90 shadow-md ring-2 ring-amber-500/30'
                      : isSelectedForPractice
                      ? 'border-amber-300 bg-amber-50/50'
                      : 'border-amber-900/15 bg-white/95 hover:border-amber-300 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {segment.character === 'Sang Kancil' && (
                        <img
                          src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
                          alt="Kancil"
                          className="w-5 h-5 rounded-full object-cover border border-emerald-400 shrink-0"
                        />
                      )}
                      {segment.character === 'Sang Kerbau' && (
                        <img
                          src="/src/assets/images/pzd_kerbau_avatar_1792913732279.jpg"
                          alt="Kerbau"
                          className="w-5 h-5 rounded-full object-cover border border-amber-400 shrink-0"
                        />
                      )}
                      {segment.character === 'Sang Buaya' && (
                        <img
                          src="/src/assets/images/pzd_buaya_avatar_1792913732534.jpg"
                          alt="Buaya"
                          className="w-5 h-5 rounded-full object-cover border border-rose-400 shrink-0"
                        />
                      )}
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md border ${getBadgeColor(segment.character)}`}>
                        {segment.character}
                      </span>
                      {segment.stageDirection && (
                        <span className="text-[11px] italic text-amber-900/60 font-medium">
                          ({segment.stageDirection})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-900/60 tabular-nums">
                        {formatTime(segment.timeStart)} - {formatTime(segment.timeEnd)}
                      </span>
                      <button
                        onClick={() => playSingleLine(segment)}
                        className="p-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors shadow-2xs"
                        title="Dengar keratan dialog ini"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </div>

                  <p className="text-base text-slate-800 font-medium leading-relaxed">
                    "{segment.text}"
                  </p>

                  {/* Intonation & Vocabulary Guidance */}
                  <div className="mt-3 pt-2.5 border-t border-amber-900/10 flex flex-col gap-1.5 text-xs">
                    <div className="text-amber-950 bg-amber-100/70 border border-amber-200 px-3 py-1.5 rounded-lg flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700 mt-0.5 shrink-0" />
                      <span>
                        <strong className="text-amber-900">Panduan Intonasi:</strong> {segment.intonationTip}
                      </span>
                    </div>

                    {segment.focusVocab && segment.focusVocab.length > 0 && (
                      <div className="text-slate-600 flex flex-wrap gap-2 pt-1">
                        {segment.focusVocab.map((v, i) => (
                          <span key={i} className="bg-amber-50/80 border border-amber-200/80 text-amber-950 px-2 py-0.5 rounded text-[11px]">
                            <strong className="text-amber-900">{v.word}</strong>: {v.meaning}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Studio Rakaman & Latihan Bercerita Murid (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1">
                <span>DSKP 1.3 &amp; 1.3.2</span>
                <span>·</span>
                <span>Kemahiran Bertutur</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Studio Rakaman Intonasi Murid
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Pilih mana-mana dialog daripada skrip, dengar contoh sebutan asal, kemudian rakam suara anda untuk melatih intonasi dan kelancaran bercerita!
              </p>
            </div>

            {/* Current Target Dialogue */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded">
                  Latihan: {practiceSegment.character}
                </span>
                <button
                  onClick={() => playSingleLine(practiceSegment)}
                  className="text-xs text-amber-900 underline font-medium hover:text-amber-950 flex items-center gap-1"
                >
                  <Volume2 className="w-3 h-3" /> Dengar Asal
                </button>
              </div>
              <p className="text-sm font-semibold text-slate-900 italic">
                "{practiceSegment.text}"
              </p>
              <p className="text-xs text-amber-800">
                🎯 {practiceSegment.intonationTip}
              </p>
            </div>

            {/* Recording Controls with Animated Waveforms */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
              {isRecording ? (
                <div className="space-y-3">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.1, 0.6] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      className="absolute w-20 h-20 rounded-full bg-rose-400/40 pointer-events-none"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-16 h-16 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md relative z-10"
                    >
                      <Mic className="w-8 h-8" />
                    </motion.div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-rose-700">Sedang Merakam Suara...</div>
                    <div className="text-xs font-mono text-slate-500">Masa: {recordingDuration} saat</div>
                  </div>
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Hentikan Rakaman</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto"
                  >
                    <Mic className="w-7 h-7" />
                  </motion.div>
                  <div>
                    <div className="text-sm font-bold text-slate-800">Sedia untuk Mencuba?</div>
                    <p className="text-xs text-slate-500 max-w-xs">
                      Sebutkan perkataan dengan jelas dan gunakan gaya intonasi yang bersesuaian dengan watak.
                    </p>
                  </div>
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-lg transition-colors shadow-sm"
                  >
                    <Mic className="w-4 h-4" />
                    <span>Mula Rakam Suara Saya</span>
                  </button>
                </div>
              )}

              {/* Student Recorded Playback */}
              {recordedAudioUrl && !isRecording && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full pt-4 border-t border-slate-200 space-y-2 text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Rakaman Anda Siap!
                    </span>
                    <span className="text-xs text-slate-500">Dengar Semula</span>
                  </div>
                  <audio
                    src={recordedAudioUrl}
                    controls
                    className="w-full h-10 accent-emerald-600"
                  />
                  <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                    💡 <em>Petua Guru:</em> Bandingkan rakaman anda dengan audio asal di sebelah kiri. Adakah intonasi anda sudah mencerminkan watak?
                  </div>
                </motion.div>
              )}
            </div>

            {/* Character Analysis Cards with Framer Motion Interactions */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm sm:text-base font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                <span>Profil Watak &amp; Perwatakan Sastera</span>
                <span className="text-xs font-normal text-emerald-700 normal-case bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Bahasa Mudah Tahun 4</span>
              </h3>
              <div className="space-y-3">
                {CHARACTER_PROFILES.map((char) => (
                  <motion.div
                    key={char.name}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-colors space-y-2 cursor-pointer"
                    onClick={() => {
                      const firstSeg = STORY_SEGMENTS.find(s => s.character === char.name);
                      if (firstSeg) playSingleLine(firstSeg);
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {char.image ? (
                          <img
                            src={char.image}
                            alt={char.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-400/80 shadow-xs shrink-0"
                          />
                        ) : (
                          <span className="text-2xl">{char.avatar}</span>
                        )}
                        <div>
                          <span className="text-base font-bold text-slate-900 block leading-tight">{char.name}</span>
                          <span className="text-[11px] text-emerald-700 font-medium">Watak 3D 'Pada Zaman Dahulu'</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {char.title}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed font-normal">
                      {char.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {char.traits.map((t, idx) => (
                          <span key={idx} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-md text-xs font-medium">
                            {t}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-emerald-700 font-bold flex items-center gap-1 hover:text-emerald-800">
                        <Play className="w-3 h-3 fill-current" /> Dengar Watak
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
