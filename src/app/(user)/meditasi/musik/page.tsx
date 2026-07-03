"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Play, Pause, Volume2, Music } from "lucide-react";

const tracks = [
  {
    id: "piano",
    name: "Piano Akustik",
    description: "Melodi piano lembut untuk ketenangan",
    emoji: "🎹",
    color: "bg-lavender-soft",
    // Menggunakan frekuensi Web Audio API untuk generate nada
    frequencies: [261.63, 293.66, 329.63, 349.23, 392.0, 440.0, 493.88],
  },
  {
    id: "rain",
    name: "Hujan & Alam",
    description: "Suara alam dan hujan menenangkan",
    emoji: "🌧️",
    color: "bg-green-soft/20",
    frequencies: [80, 120, 200, 300],
  },
  {
    id: "ocean",
    name: "Ombak Laut",
    description: "Deburan ombak untuk relaksasi dalam",
    emoji: "🌊",
    color: "bg-blue-100",
    frequencies: [60, 90, 150],
  },
];

const DURATIONS = [3, 5, 10]; // menit

export default function TerapiMusikPage() {
  const [selectedTrack, setSelectedTrack] = useState(tracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60); // dalam detik
  const [volume, setVolume] = useState(0.5);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Bersihkan saat unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopAudio();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const stopAudio = () => {
    nodesRef.current.forEach((node) => {
      try { (node as OscillatorNode).stop(); } catch {}
    });
    nodesRef.current = [];
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const playAudio = () => {
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(ctx.destination);

    if (selectedTrack.id === "piano") {
      // Mainkan melodi piano sederhana berulang
      const playNote = (freq: number, startTime: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + 1.5);
        nodesRef.current.push(osc);
      };

      const totalSecs = duration * 60;
      const notes = selectedTrack.frequencies;
      let t = ctx.currentTime + 0.1;
      while (t < ctx.currentTime + totalSecs) {
        notes.forEach((freq, i) => {
          playNote(freq, t + i * 0.6);
        });
        t += notes.length * 0.6 + 1;
      }
    } else {
      // Rain / Ocean: white noise + low freq oscillator
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = selectedTrack.id === "rain" ? 1000 : 400;

      source.connect(filter);
      filter.connect(masterGain);
      source.start();
      nodesRef.current.push(source as unknown as AudioNode);

      // Base rumble
      const rumble = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      rumble.type = "sine";
      rumble.frequency.value = selectedTrack.frequencies[0];
      rumbleGain.gain.value = 0.05;
      rumble.connect(rumbleGain);
      rumbleGain.connect(masterGain);
      rumble.start();
      nodesRef.current.push(rumble);
    }

    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
      setTimeLeft(duration * 60);
    } else {
      setTimeLeft(duration * 60);
      playAudio();
    }
  };

  const handleDurationChange = (d: number) => {
    if (isPlaying) stopAudio();
    setDuration(d);
    setTimeLeft(d * 60);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100;

  return (
    <div className="p-6 min-h-screen flex flex-col bg-purple-accent/5">
      <header className="mt-4 mb-8">
        <Link
          href="/meditasi"
          className="flex items-center text-text-secondary hover:text-purple-accent w-fit"
        >
          <ChevronLeft size={20} />
          <span className="ml-1 text-sm font-medium">Kembali</span>
        </Link>
      </header>

      <h1 className="text-2xl font-bold mb-1">Terapi Musik</h1>
      <p className="text-sm text-text-secondary mb-8">
        Pilih suara yang ingin kamu dengarkan
      </p>

      {/* Track Selection */}
      <div className="space-y-3 mb-8">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => {
              if (isPlaying) stopAudio();
              setSelectedTrack(track);
              setTimeLeft(duration * 60);
            }}
            className={`w-full flex items-center space-x-4 p-4 rounded-2xl border-2 transition ${
              selectedTrack.id === track.id
                ? "border-purple-accent bg-white shadow-md"
                : "border-transparent bg-white/60 hover:bg-white"
            }`}
          >
            <div className={`w-12 h-12 ${track.color} rounded-full flex items-center justify-center text-2xl flex-shrink-0`}>
              {track.emoji}
            </div>
            <div className="text-left">
              <p className="font-semibold text-text-main">{track.name}</p>
              <p className="text-xs text-text-secondary">{track.description}</p>
            </div>
            {selectedTrack.id === track.id && (
              <div className="ml-auto w-2 h-2 bg-purple-accent rounded-full flex-shrink-0" />
            )}
          </button>
        ))}
      </div>

      {/* Duration */}
      <div className="mb-8">
        <p className="text-sm font-medium text-text-main mb-3">Durasi</p>
        <div className="flex space-x-3">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => handleDurationChange(d)}
              className={`flex-1 py-2 rounded-xl text-sm font-medium border transition ${
                duration === d
                  ? "bg-purple-accent text-white border-purple-accent"
                  : "bg-white text-text-secondary border-lavender-soft hover:border-purple-accent"
              }`}
            >
              {d} menit
            </button>
          ))}
        </div>
      </div>

      {/* Volume */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Volume2 size={16} className="text-text-secondary" />
          <p className="text-sm font-medium text-text-main">Volume</p>
        </div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-full accent-purple-600"
        />
      </div>

      {/* Player */}
      <div className="mt-auto">
        {isPlaying && (
          <div className="mb-6 text-center">
            <p className="text-3xl font-bold text-purple-accent mb-2 font-mono">
              {formatTime(timeLeft)}
            </p>
            <div className="w-full bg-lavender-soft rounded-full h-2">
              <div
                className="bg-purple-accent h-2 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={togglePlay}
          className={`w-full flex items-center justify-center space-x-3 py-4 rounded-full font-semibold text-lg transition ${
            isPlaying
              ? "bg-white border-2 border-purple-accent text-purple-accent hover:bg-lavender-soft/30"
              : "bg-purple-accent text-white hover:bg-purple-accent/90"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={22} />
              <span>Hentikan</span>
            </>
          ) : (
            <>
              <Play size={22} fill="currentColor" />
              <span>Putar Sekarang</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
