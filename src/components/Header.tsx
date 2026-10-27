/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Award, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: 'manual' | 'teater' | 'kendiri' | 'pasukan' | 'kritis' | 'konsep5p';
  setActiveTab: (tab: 'manual' | 'teater' | 'kendiri' | 'pasukan' | 'kritis' | 'konsep5p') => void;
  onOpenReport: () => void;
  onOpenChatbot?: () => void;
  totalScore: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenReport,
  totalScore,
}) => {
  const navRef = useRef<HTMLElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Semak status sliding kiri/kanan navigasi
  const checkScroll = useCallback(() => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkScroll]);

  // Meluncurkan (sliding) navigasi ke kiri atau ke kanan dengan lancar
  const slide = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 280);
    }
  };

  // Auto-slide tab yang aktif ke tengah paparan pandangan
  useEffect(() => {
    if (navRef.current) {
      const activeEl = navRef.current.querySelector<HTMLElement>('[data-active="true"]');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      setTimeout(checkScroll, 320);
    }
  }, [activeTab, checkScroll]);

  return (
    <header className="sticky top-0 z-40 bg-[#fbf6ea]/95 backdrop-blur-md border-b-2 border-amber-900/30 shadow-md">
      {/* Hiasan Ukiran Tradisional Emas / Jalur Songket Atas */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-800 via-yellow-500 to-amber-800" />

      {/* Bekas Pengepala Utama (Flex container) */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2.5 sm:gap-4 px-3 sm:px-6 py-2.5 sm:py-3 relative">
        {/* Zone 1: Tajuk Aplikasi & Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('manual')}
            className="text-left group flex items-center gap-2 sm:gap-2.5 whitespace-nowrap shrink-0 focus:outline-none cursor-pointer"
            title="Kembali ke Panduan Murid"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden border-2 border-amber-700/80 shadow-md shrink-0 bg-amber-900 p-0.5">
              <img
                src="/src/assets/images/pzd_kancil_avatar_1792913732462.jpg"
                alt="Sang Kancil"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 text-[9px] bg-amber-700 text-amber-100 font-bold px-1 rounded-sm border border-amber-900 shadow-xs">
                PZD
              </span>
            </div>
            <div className="leading-tight">
              <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-amber-950 group-hover:text-amber-800 transition-colors font-serif block">
                Aktiviti Interaktif BM
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Bar dengan ciri Sliding Pintar & Interaktif */}
        <div className="relative flex-1 min-w-0 max-w-2xl mx-1 sm:mx-2 flex items-center">
          {/* Butang Luncur Kiri (Slide Left) */}
          {canScrollLeft && (
            <button
              onClick={() => slide('left')}
              className="absolute left-0 z-10 p-1.5 rounded-full bg-amber-900/90 hover:bg-amber-950 text-amber-100 shadow-lg border border-amber-500/60 transition-transform active:scale-90 cursor-pointer hidden sm:flex items-center justify-center -translate-x-1"
              title="Luncur ke kiri"
              aria-label="Luncur ke kiri"
            >
              <ChevronLeft className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          )}

          {/* Bekas Sliding Navigation */}
          <nav
            ref={navRef}
            onScroll={checkScroll}
            className="w-full flex items-center gap-1.5 overflow-x-auto scroll-smooth scrollbar-none py-1 px-1 rounded-xl bg-amber-950/5 border border-amber-900/20 shadow-inner"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <button
              onClick={() => setActiveTab('manual')}
              data-active={activeTab === 'manual'}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm font-bold ${
                activeTab === 'manual'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 shadow-md border border-amber-600 scale-[1.02]'
                  : 'text-amber-950/80 hover:text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Panduan Murid</span>
            </button>

            <button
              onClick={() => setActiveTab('teater')}
              data-active={activeTab === 'teater'}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-lg cursor-pointer text-xs sm:text-sm font-bold ${
                activeTab === 'teater'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 shadow-md border border-amber-600 scale-[1.02]'
                  : 'text-amber-950/80 hover:text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Teater Audio
            </button>

            <button
              onClick={() => setActiveTab('kendiri')}
              data-active={activeTab === 'kendiri'}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-lg cursor-pointer text-xs sm:text-sm font-bold ${
                activeTab === 'kendiri'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 shadow-md border border-amber-600 scale-[1.02]'
                  : 'text-amber-950/80 hover:text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Game Kendiri
            </button>

            <button
              onClick={() => setActiveTab('pasukan')}
              data-active={activeTab === 'pasukan'}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-lg cursor-pointer text-xs sm:text-sm font-bold ${
                activeTab === 'pasukan'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 shadow-md border border-amber-600 scale-[1.02]'
                  : 'text-amber-950/80 hover:text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Game Pasukan
            </button>

            <button
              onClick={() => setActiveTab('kritis')}
              data-active={activeTab === 'kritis'}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-lg cursor-pointer text-xs sm:text-sm font-bold ${
                activeTab === 'kritis'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 shadow-md border border-amber-600 scale-[1.02]'
                  : 'text-amber-950/80 hover:text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Mahkamah Kritis
            </button>

            <button
              onClick={() => setActiveTab('konsep5p')}
              data-active={activeTab === 'konsep5p'}
              className={`whitespace-nowrap shrink-0 transition-all px-3 py-1.5 rounded-lg cursor-pointer text-xs sm:text-sm font-bold ${
                activeTab === 'konsep5p'
                  ? 'bg-gradient-to-r from-amber-800 to-amber-900 text-amber-50 shadow-md border border-amber-600 scale-[1.02]'
                  : 'text-amber-950/80 hover:text-amber-950 hover:bg-amber-200/60'
              }`}
            >
              Pedagogi 5P
            </button>
          </nav>

          {/* Butang Luncur Kanan (Slide Right) */}
          {canScrollRight && (
            <button
              onClick={() => slide('right')}
              className="absolute right-0 z-10 p-1.5 rounded-full bg-amber-900/90 hover:bg-amber-950 text-amber-100 shadow-lg border border-amber-500/60 transition-transform active:scale-90 cursor-pointer hidden sm:flex items-center justify-center translate-x-1"
              title="Luncur ke kanan"
              aria-label="Luncur ke kanan"
            >
              <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          )}
        </div>

        {/* Zone 3: Bahagian Pentaksiran PBD (Kekal Terpapar, Tidak Hilang & Sangat Mudah Ditekan) */}
        <div className="flex items-center gap-2 shrink-0 z-20">
          <button
            onClick={onOpenReport}
            className="flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 active:scale-95 text-amber-950 font-black border-2 border-amber-700 shadow-md hover:shadow-lg transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[42px] touch-manipulation ring-2 ring-amber-400/30"
            title="Buka Lembaran Pentaksiran Bilik Darjah (PBD) Murid"
            aria-label="Buka Pentaksiran PBD"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-amber-950/15 flex items-center justify-center shrink-0">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-950" />
            </div>
            <span className="font-extrabold text-xs sm:text-sm font-serif">
              Pentaksiran PBD
            </span>
            <span className="bg-amber-950 text-yellow-300 text-[11px] sm:text-xs font-black px-2 py-0.5 rounded-full shadow-inner border border-yellow-500/40">
              {totalScore} pt
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
