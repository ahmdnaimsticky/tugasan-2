/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AUTHENTIC_AUDIO_PATH, STORY_SEGMENTS, DialogueSegment } from '../data/storyData';

type TimeUpdateCallback = (currentTime: number, currentSegment: DialogueSegment | null) => void;
type PlayStateCallback = (isPlaying: boolean) => void;

class StoryAudioManager {
  private audio: HTMLAudioElement | null = null;
  private timeUpdateListeners: Set<TimeUpdateCallback> = new Set();
  private playStateListeners: Set<PlayStateCallback> = new Set();
  private segmentEndCheckInterval: number | null = null;
  private targetEndTime: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.audio) return;
    this.audio = new Audio(AUTHENTIC_AUDIO_PATH);
    this.audio.preload = 'auto';

    this.audio.addEventListener('timeupdate', () => {
      if (!this.audio) return;
      const cur = this.audio.currentTime;

      // Check if we reached specific segment end
      if (this.targetEndTime !== null && cur >= this.targetEndTime) {
        this.pause();
        this.targetEndTime = null;
      }

      const activeSegment = STORY_SEGMENTS.find(s => cur >= s.timeStart && cur < s.timeEnd) || null;
      this.timeUpdateListeners.forEach(cb => cb(cur, activeSegment));
    });

    this.audio.addEventListener('play', () => {
      this.playStateListeners.forEach(cb => cb(true));
    });

    this.audio.addEventListener('pause', () => {
      this.playStateListeners.forEach(cb => cb(false));
    });

    this.audio.addEventListener('ended', () => {
      this.targetEndTime = null;
      this.playStateListeners.forEach(cb => cb(false));
    });
  }

  public play() {
    this.initAudio();
    this.targetEndTime = null;
    this.audio?.play().catch(() => {
      // autoplay block handler
    });
  }

  public pause() {
    this.audio?.pause();
    this.targetEndTime = null;
  }

  public togglePlay() {
    if (this.isPlaying()) {
      this.pause();
    } else {
      this.play();
    }
  }

  public isPlaying(): boolean {
    return !!(this.audio && !this.audio.paused && !this.audio.ended);
  }

  public getCurrentTime(): number {
    return this.audio?.currentTime || 0;
  }

  public getDuration(): number {
    return this.audio?.duration || 165;
  }

  public seek(seconds: number) {
    this.initAudio();
    if (this.audio) {
      this.audio.currentTime = Math.max(0, Math.min(seconds, this.getDuration()));
    }
  }

  public playSegment(start: number, end: number) {
    this.initAudio();
    if (!this.audio) return;
    this.targetEndTime = end;
    this.audio.currentTime = start;
    this.audio.play().catch(() => {});
  }

  public setPlaybackRate(rate: number) {
    this.initAudio();
    if (this.audio) {
      this.audio.playbackRate = rate;
    }
  }

  public getPlaybackRate(): number {
    return this.audio?.playbackRate || 1;
  }

  public onTimeUpdate(cb: TimeUpdateCallback) {
    this.timeUpdateListeners.add(cb);
    return () => this.timeUpdateListeners.delete(cb);
  }

  public onPlayStateChange(cb: PlayStateCallback) {
    this.playStateListeners.add(cb);
    return () => this.playStateListeners.delete(cb);
  }
}

export const storyAudio = new StoryAudioManager();
