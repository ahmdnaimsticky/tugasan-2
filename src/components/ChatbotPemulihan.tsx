/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Maximize2,
  Minimize2,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { playSound } from '../utils/soundEffects';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface ChatbotPemulihanProps {
  isOpen: boolean;
  onClose: () => void;
  initialContext?: string;
}

const QUICK_PROMPTS = [
  '📖 Terangkan maksud simpulan bahasa "Kacang Lupakan Kulit"',
  '🐊 Mengapa Sang Buaya menggigit kaki Sang Kerbau?',
  '🎭 Bagaimana cara membunyikan intonasi Sang Kerbau yang merayu?',
  '⚖️ Berikan petunjuk helah lakonan semula Sang Kancil',
  '🪵 Mengapa Sang Kerbau sudi menolong Sang Buaya pada mulanya?',
  '❓ Uji kefahaman saya dengan satu soalan pemulihan mudah'
];

export const ChatbotPemulihan: React.FC<ChatbotPemulihanProps> = ({
  isOpen,
  onClose,
  initialContext = 'Modul Pemulihan Umum'
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: 'Salam sejahtera wahai sahabat cilik rimba! 🌿 Saya **Cikgu Kancil**, pembimbing pemulihan Bahasa Melayu Tahun 4 kamu. Jika ada perkataan sukar difahami, intonasi watak yang mengelirukan, atau babak cerita yang ingin diulang kaji, tanyakan sahaja kepada Cikgu. Mari kita belajar sama-sama!',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  // Read message aloud using browser Web Speech API
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = text.replace(/[*#_~`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Prefer Malay / Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const malayVoice = voices.find(v => v.lang.startsWith('ms') || v.lang.startsWith('id'));
    if (malayVoice) utterance.voice = malayVoice;

    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    playSound('click');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      // Send conversation history to server-side Gemini remedial route
      const response = await fetch('/api/chat/remedial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newHistory.map(m => ({ role: m.role, text: m.text })),
          stageContext: initialContext
        })
      });

      if (!response.ok) {
        throw new Error(`Server status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: data.reply || data.fallbackReply || 'Cikgu Kancil sedia membantu! Boleh adik terangkan lagi?',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      playSound('correct');
    } catch (err) {
      console.error('Failed to get Cikgu Kancil response:', err);
      const fallbackMsg: ChatMessage = {
        id: `assistant-fallback-${Date.now()}`,
        role: 'assistant',
        text: 'Wahai sahabat kecil, Cikgu Kancil sentiasa bersama kamu. Dalam kisah ini, ingatlah bahawa **budi yang baik harus dibalas dengan kebaikan**. Sang Kerbau ikhlas membantu, namun Sang Buaya bertindak khianat. Apa yang adik ingin fahami lagi? 🌿',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        text: 'Buku catatan baharu telah dibuka! 📜 Ada apa-apa bahagian cerita yang adik belum fahami? Cikgu Kancil sedia membimbing kamu.',
        timestamp: new Date()
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-amber-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`bg-gradient-to-b from-amber-50 via-white to-amber-50/90 rounded-3xl border-3 border-amber-800/40 shadow-2xl flex flex-col overflow-hidden transition-all duration-300 w-full ${
          isExpanded ? 'h-[95vh] max-w-4xl' : 'h-[620px] max-w-2xl'
        }`}
      >
        {/* Header with 3D Cikgu Kancil Avatar & Folk Ornaments */}
        <div className="bg-gradient-to-r from-amber-800 via-amber-700 to-emerald-800 text-white p-4 sm:p-5 flex items-center justify-between border-b-3 border-amber-500/60 shadow-md relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-300 via-amber-400 to-emerald-300" />
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-yellow-300 shadow-md bg-amber-900 shrink-0">
              <img
                src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
                alt="Cikgu Kancil 3D"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg text-amber-50 tracking-tight">
                  Cikgu Kancil AI
                </h3>
                <span className="text-[10px] font-black bg-gradient-to-r from-yellow-400 to-amber-400 text-amber-950 px-2 py-0.5 rounded-full uppercase tracking-wider border border-yellow-300">
                  Pembimbing Pemulihan
                </span>
              </div>
              <p className="text-xs text-amber-200 font-medium flex items-center gap-1.5">
                <span>🌿</span> Konsep 5P: Bimbingan Masteri &amp; Pemulihan Murid Tahun 4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              title="Kosongkan perbualan & mula semula"
              className="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-950/70 text-amber-200 transition-colors border border-amber-600/40 text-xs font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mula Semula</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Kecilkan tetingkap' : 'Besarkan tetingkap'}
              className="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-950/70 text-amber-200 transition-colors border border-amber-600/40"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                if (window.speechSynthesis) window.speechSynthesis.cancel();
                setIsSpeaking(false);
                onClose();
              }}
              className="p-2 rounded-xl bg-amber-950/40 hover:bg-amber-950/70 text-amber-100 transition-colors border border-amber-600/40"
              title="Tutup pembantu pemulihan"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips (Scaffolding Support) */}
        <div className="p-2.5 sm:px-4 bg-amber-100/70 border-b border-amber-300/80 overflow-x-auto flex items-center gap-2 text-xs scrollbar-none">
          <div className="flex items-center gap-1 text-amber-950 font-black shrink-0 text-[11px] uppercase tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
            <span>Cadangan Soalan:</span>
          </div>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white/90 hover:bg-amber-200/90 text-amber-950 font-semibold border border-amber-400/80 shadow-2xs hover:shadow-xs transition-all active:scale-95 text-[11px]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border-2 ${
                    isUser
                      ? 'bg-emerald-600 text-white border-emerald-400'
                      : 'bg-amber-200 text-amber-900 border-amber-400 overflow-hidden'
                  }`}
                >
                  {isUser ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <img
                      src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
                      alt="Cikgu Kancil"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[82%] sm:max-w-[75%] space-y-1.5`}>
                  <div className={`flex items-center gap-2 text-[10px] font-bold ${isUser ? 'justify-end text-emerald-800' : 'text-amber-900'}`}>
                    <span>{isUser ? 'Adik Murid' : 'Cikgu Kancil'}</span>
                    <span className="opacity-60">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm relative ${
                      isUser
                        ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white rounded-tr-xs font-medium'
                        : 'bg-gradient-to-br from-amber-50/95 via-yellow-50/70 to-amber-100/80 border-2 border-amber-400/80 text-amber-950 rounded-tl-xs font-normal'
                    }`}
                  >
                    {/* Render message body preserving linebreaks */}
                    <div className="whitespace-pre-line space-y-2">
                      {msg.text.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx}>
                          {paragraph.split('**').map((part, bIdx) =>
                            bIdx % 2 === 1 ? <strong key={bIdx} className="font-extrabold text-amber-950">{part}</strong> : part
                          )}
                        </p>
                      ))}
                    </div>

                    {/* Speech read-aloud button for assistant messages */}
                    {!isUser && (
                      <div className="pt-2 mt-2 border-t border-amber-300/60 flex items-center justify-between text-[11px]">
                        <button
                          onClick={() => speakText(msg.text)}
                          className="flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-950 px-2.5 py-1 rounded-lg bg-amber-200/60 hover:bg-amber-200 transition-colors"
                          title="Dengar Cikgu Kancil membaca jawapan ini"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                              <span>Hentikan Suara</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                              <span>Dengar Cikgu Kancil Bercakap</span>
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-amber-700 font-medium">Bimbingan Pemulihan 5P</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3 items-start animate-pulse">
              <div className="w-9 h-9 rounded-2xl overflow-hidden border-2 border-amber-400 bg-amber-100 shrink-0">
                <img
                  src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
                  alt="Cikgu Kancil Berfikir"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 bg-amber-100/80 border-2 border-amber-300 rounded-2xl rounded-tl-xs text-xs text-amber-900 flex items-center gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                <span className="font-bold">Cikgu Kancil sedang meneliti hikayat rimba untuk membantu adik...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white/95 border-t-2 border-amber-800/15 backdrop-blur-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2.5"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Tuliskan soalan adik di sini (contoh: Mengapa Sang Buaya mungkir janji?)..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-2xl bg-amber-50/70 border-2 border-amber-300 focus:border-amber-600 focus:bg-white text-xs sm:text-sm text-amber-950 placeholder-amber-800/50 outline-none transition-all shadow-inner font-medium"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-700 hover:to-amber-600 disabled:opacity-40 text-amber-950 font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 border-2 border-amber-400 shrink-0 cursor-pointer active:scale-95"
            >
              <span>Hantar</span>
              <Send className="w-4 h-4 text-amber-950" />
            </button>
          </form>
          <div className="flex items-center justify-between text-[10px] text-amber-800/80 pt-2 px-1">
            <span>💡 Petua: Adik boleh bertanya maksud kosa kata, intonasi watak, atau urutan babak cerita!</span>
            <span className="font-mono font-bold">Model: Gemini 3.8 Flash</span>
          </div>
        </div>
      </div>
    </div>
  );
};
