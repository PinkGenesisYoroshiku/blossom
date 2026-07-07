"use client";

import { useEffect, useRef, useState } from "react";

/* ======== EDIT ME ======== */
const NAME = "Ella";
const OPENING_LINES = [
  "...",
  "Hi, Ella",
  "Sana naman na-surpise ka 😆",
  "Before the candles, I wanted you to read this slowly.",
  "Alam kong hindi ka excited sa birthday mo",
  "Pero ako excited HAHAHA",
  "Sana tumagal ka pa, Ella",
  "At sana kasama ako diyan 😌",
  "Next Birthday mo ay sa personal na natin siya i-celebrate 😉",
  "Gusto pa kitang makilala and sana napag-isipan mo na yung ehem ehem HAHAHHA" ,
  "Yung messenger kasi, hindi yang nasa isip mo ",
  "Hindi ko masasabi lahat dito",
  "You are loved more than one little page can say.",
  "Happy Birthday!!",
];
const MESSAGE =
  "I couldn't fit everything I wanted to say into one page, so here's the short version: " +
  "I hope this year hands you everything you've quietly been wishing for — and a few " +
  "wonderful things you never thought to ask. Today we celebrate you.";
const SIGNATURE = "— with love, from someone who's really glad you were born ♡";
const MESSAGE_LINES = [
  "I couldn't fit everything I wanted to say into one page, so here's the short version:",
  "I hope this year and the following years hands you everything you've quietly been wishing for",
  "and a few wonderful things you never thought to ask.",
  "Today we celebrate you.",
  "Pakiss",
];
const OPENING_MUSIC_SRC = "/music/LoveLetter.mp3";
/* ========================= */

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  r: number;
  vr: number;
  c: string;
  life: number;
  decay: number;
};

const COLORS = ["#e0a13c", "#e0679a", "#ff8e5e", "#9a6fc4", "#7a4a9e", "#3fae95"];

// How long each opening line stays on screen (keep in sync with the
// bsx-line animation duration in the CSS below)
const LINE_DURATION = 5000;
const LOVE_VOLUME = 0.85;

export function BirthdaySurprise() {
  const [openingIndex, setOpeningIndex] = useState(-1);
  const [cakeShown, setCakeShown] = useState(false);
  const [out, setOut] = useState(false);
  const [muted, setMuted] = useState(false);

  const starsRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flameHitRef = useRef<HTMLButtonElement>(null);
  const loveAudioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);
  const piecesRef = useRef<Piece[]>([]);
  const rafRef = useRef<number | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- effects ---- */

  useEffect(() => {
    const host = starsRef.current;
    if (!host) return;
    for (let i = 0; i < 46; i++) {
      const s = document.createElement("div");
      s.className = "bsx-star";
      const sz = Math.random() * 2.2 + 0.8;
      s.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random() * 100}%;top:${Math.random() * 70}%;animation-delay:${Math.random() * 3}s;`;
      host.appendChild(s);
    }
    return () => {
      host.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const fit = () => {
      cv.width = innerWidth * devicePixelRatio;
      cv.height = innerHeight * devicePixelRatio;
    };
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  // music: LoveLetter loops for the whole page. We try to autoplay
  // immediately and retry on tab focus; if the browser still blocks it
  // (a browser rule we can't override), the first tap or keypress
  // anywhere starts it.
  useEffect(() => {
    const audio = new Audio(OPENING_MUSIC_SRC);
    audio.loop = true;
    audio.autoplay = true;
    audio.volume = LOVE_VOLUME;
    loveAudioRef.current = audio;

    const tryPlay = () => {
      if (!mutedRef.current && audio.paused) {
        audio.play().catch(() => {});
      }
    };
    tryPlay();

    addEventListener("pointerdown", tryPlay);
    addEventListener("keydown", tryPlay);
    addEventListener("touchstart", tryPlay);
    document.addEventListener("visibilitychange", tryPlay);

    return () => {
      removeEventListener("pointerdown", tryPlay);
      removeEventListener("keydown", tryPlay);
      removeEventListener("touchstart", tryPlay);
      document.removeEventListener("visibilitychange", tryPlay);
      audio.pause();
      audio.src = "";
      loveAudioRef.current = null;
    };
  }, []);

  // teardown animation + timers on unmount
  useEffect(
    () => () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    },
    []
  );

  // opening lines: one at a time — fade in, hold, fade out, then the next
  useEffect(() => {
    let i = -1;
    const advance = () => {
      i += 1;
      if (i < OPENING_LINES.length) {
        setOpeningIndex(i);
        revealTimerRef.current = setTimeout(advance, LINE_DURATION);
        return;
      }
      setOpeningIndex(-1);
      setCakeShown(true);
    };
    revealTimerRef.current = setTimeout(advance, 600);
    return () => {
      if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    };
  }, []);

  /* ---- confetti + interactions ---- */

  function burst(x: number, y: number, count: number) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = Math.random() * 9 + 3;
      piecesRef.current.push({
        x,
        y,
        vx: Math.cos(a) * sp,
        vy: Math.sin(a) * sp - 6,
        w: Math.random() * 8 + 4,
        h: Math.random() * 5 + 3,
        r: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        c: COLORS[(Math.random() * COLORS.length) | 0],
        life: 1,
        decay: Math.random() * 0.006 + 0.004,
      });
    }
  }

  function tick() {
    const cv = canvasRef.current;
    const cx = cv?.getContext("2d");
    if (!cv || !cx) return;
    cx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    cx.clearRect(0, 0, innerWidth, innerHeight);
    piecesRef.current = piecesRef.current.filter((p) => p.life > 0 && p.y < innerHeight + 40);
    for (const p of piecesRef.current) {
      p.vy += 0.16;
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      p.life -= p.decay;
      cx.save();
      cx.translate(p.x, p.y);
      cx.rotate(p.r);
      cx.globalAlpha = Math.max(p.life, 0);
      cx.fillStyle = p.c;
      cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      cx.restore();
    }
    if (piecesRef.current.length) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      cx.clearRect(0, 0, innerWidth, innerHeight);
      rafRef.current = null;
    }
  }

  function confetti(x: number, y: number) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    burst(x, y, reduced ? 40 : 160);
    if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    if (!reduced) {
      setTimeout(() => {
        burst(innerWidth * 0.2, innerHeight * 0.3, 70);
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      }, 500);
      setTimeout(() => {
        burst(innerWidth * 0.8, innerHeight * 0.3, 70);
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      }, 950);
    }
  }

  function handleBlow() {
    if (out || !cakeShown) return;
    setOut(true);
    const r = flameHitRef.current?.getBoundingClientRect();
    confetti(r ? r.left + r.width / 2 : innerWidth / 2, r ? r.top + r.height / 2 : innerHeight / 2);
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    mutedRef.current = next;
    const love = loveAudioRef.current;
    if (love) {
      love.muted = next;
      if (!next && love.paused) {
        love.play().catch(() => {});
      }
    }
  }

  return (
    <div className={`bsx${cakeShown ? " bsx-cake-shown" : ""}${out ? " bsx-out" : ""}`}>
      <style>{css}</style>

      <div ref={starsRef} className="bsx-stars" aria-hidden="true" />

      <button type="button" className="bsx-mute" aria-pressed={muted} onClick={toggleMute}>
        Sound: {muted ? "off" : "on"}
      </button>

      <div className="bsx-opening" aria-label="Opening message">
        {openingIndex >= 0 && !cakeShown && (
          <p key={openingIndex} className="bsx-opening-line">
            {OPENING_LINES[openingIndex]}
          </p>
        )}
      </div>

      <div className="bsx-stage">
        <div className="bsx-glow" />
        <div className="bsx-scene">
          <div className="bsx-candle-wrap">
            <button
              type="button"
              ref={flameHitRef}
              className="bsx-flame-hit"
              aria-label="Blow out the candle"
              onClick={handleBlow}
            >
              <div className="bsx-flame" />
              <div className="bsx-smoke" />
            </button>
            <div className="bsx-wick" />
            <div className="bsx-candle" />
          </div>
          <div className="bsx-cake">
            <div className="bsx-tier bsx-tier-top">
              <div className="bsx-drip" />
            </div>
            <div className="bsx-tier bsx-tier-bottom">
              <div className="bsx-drip" />
            </div>
          </div>
          <div className="bsx-plate" />
          <div className="bsx-prompt">make a wish · tap the flame</div>
        </div>
      </div>

      <div className="bsx-message" role="dialog" aria-label="Birthday message">
        <div className="bsx-eyebrow bsx-rise bsx-d1">your wish is on its way</div>
        <h2 className="bsx-rise bsx-d2">
          Happy Birthday,
          <br />
          <span className="bsx-name">{NAME}</span>
        </h2>
        <div className="bsx-message-lines" aria-label={MESSAGE}>
          {MESSAGE_LINES.map((line, index) => (
            <p
              key={line}
              className="bsx-message-line bsx-rise"
              style={{ transitionDelay: `${2.3 + index * 0.65}s` }}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="bsx-sig bsx-rise" style={{ transitionDelay: `${2.3 + MESSAGE_LINES.length * 0.65}s` }}>
          {SIGNATURE}
        </div>
      </div>

      <canvas ref={canvasRef} className="bsx-fx" />
    </div>
  );
}

const css = `
.bsx{
  --pink-hi:#ffeef4; --pink-lo:#f6c3d7;
  --glow:#ffb45e; --flame:#ffd27a;
  --cream:#fff3e0; --ink:#5c2340; --rose:#d4517f; --gold:#c9862e; --dim:#a86a8b;
  position:fixed; inset:0; z-index:60; overflow:hidden;
  background:radial-gradient(120% 90% at 50% 108%, var(--pink-hi) 0%, var(--pink-lo) 62%);
  color:var(--ink);
  font-family:var(--font-jost), "Segoe UI", system-ui, sans-serif;
  -webkit-tap-highlight-color:transparent;
}
.bsx-stars{position:absolute; inset:0; pointer-events:none;}
.bsx-star{position:absolute; border-radius:50%; background:#e07daa; animation:bsx-tw 3.4s ease-in-out infinite;}
@keyframes bsx-tw{0%,100%{opacity:.15;}50%{opacity:.7;}}
.bsx-fx{position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:6;}

.bsx-eyebrow{font-size:12px; letter-spacing:.32em; text-transform:uppercase; color:var(--dim);}

.bsx-opening{
  position:absolute; inset:0; z-index:5;
  display:flex; align-items:center; justify-content:center;
  padding:28px; text-align:center; pointer-events:none;
}
.bsx-opening-line{
  max-width:26ch; margin:0;
  font-family:var(--font-cormorant), Georgia, serif;
  font-size:clamp(28px,5.5vw,52px); line-height:1.3; text-wrap:balance;
  color:var(--ink);
  animation:bsx-line 5s ease forwards; /* keep in sync with LINE_DURATION */
}
@keyframes bsx-line{
  0%{opacity:0; transform:translateY(18px);}
  12%{opacity:1; transform:none;}
  70%{opacity:1; transform:none;}
  100%{opacity:0; transform:translateY(-12px);}
}

.bsx-stage{
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  opacity:0; pointer-events:none; transform:translateY(18px) scale(.97);
  transition:opacity 1.2s ease, transform 1.2s ease;
}
.bsx-cake-shown .bsx-stage{opacity:1; pointer-events:auto; transform:none;}
.bsx-out .bsx-stage{opacity:.14; pointer-events:none;}
.bsx-glow{
  position:absolute; left:50%; top:38%; width:520px; height:520px;
  transform:translate(-50%,-50%);
  background:radial-gradient(circle, rgba(255,180,94,.34) 0%, rgba(255,180,94,.10) 40%, transparent 68%);
  pointer-events:none; z-index:1; transition:opacity 1.4s ease;
}
.bsx-out .bsx-glow{opacity:0;}

.bsx-scene{display:flex; flex-direction:column; align-items:center; transform:translateY(4vh); z-index:2;}
.bsx-candle-wrap{position:relative; z-index:3; display:flex; flex-direction:column; align-items:center;}
.bsx-flame-hit{
  position:relative; width:96px; height:120px; border:none; background:none; cursor:pointer; padding:0;
  display:flex; align-items:flex-end; justify-content:center;
}
.bsx-flame-hit:focus-visible{outline:2px dashed var(--gold); outline-offset:6px; border-radius:14px;}
.bsx-flame{
  position:absolute; bottom:-6px; left:50%; width:26px; height:52px;
  transform:translateX(-50%);
  background:radial-gradient(50% 62% at 50% 72%, #fff6df 0%, var(--flame) 42%, #ff9038 78%, transparent 100%);
  border-radius:50% 50% 45% 45% / 62% 62% 38% 38%;
  filter:blur(.4px) drop-shadow(0 0 18px rgba(255,180,94,.85));
  transform-origin:50% 95%;
  animation:bsx-flick 1.15s ease-in-out infinite alternate;
  transition:opacity .5s ease, transform .5s ease;
}
.bsx-flame::after{
  content:""; position:absolute; inset:38% 30% 12% 30%;
  background:radial-gradient(circle at 50% 70%, #fff 0%, rgba(255,255,255,0) 75%);
  border-radius:inherit;
}
@keyframes bsx-flick{
  0%{transform:translateX(-50%) scale(1) rotate(-2.5deg);}
  45%{transform:translateX(-52%) scale(1.06,.94) rotate(2deg);}
  100%{transform:translateX(-48%) scale(.95,1.08) rotate(-1.5deg);}
}
.bsx-out .bsx-flame{opacity:0; transform:translateX(-50%) scale(.2,1.6); animation:none;}
.bsx-smoke{
  position:absolute; bottom:0; left:50%; width:10px; height:10px; opacity:0;
  border-radius:50%;
  background:radial-gradient(circle, rgba(150,110,135,.7), transparent 70%);
  pointer-events:none;
}
.bsx-out .bsx-smoke{animation:bsx-puff 2.6s ease-out forwards;}
@keyframes bsx-puff{
  0%{opacity:.9; transform:translate(-50%,0) scale(1);}
  100%{opacity:0; transform:translate(-30%,-130px) scale(5);}
}
.bsx-wick{width:4px; height:14px; background:#3c2b21; border-radius:2px; z-index:2;}
.bsx-candle{
  width:26px; height:96px; border-radius:8px 8px 3px 3px;
  background:linear-gradient(90deg,#e77c9d 0%,#ffc2d6 45%,#e77c9d 100%);
  position:relative; z-index:2;
  box-shadow:0 0 22px rgba(255,160,180,.25);
}
.bsx-candle::before{
  content:""; position:absolute; inset:0; border-radius:inherit;
  background:repeating-linear-gradient(-38deg, transparent 0 10px, rgba(255,255,255,.38) 10px 17px);
}
.bsx-cake{position:relative; z-index:2; margin-top:-4px; filter:drop-shadow(0 18px 30px rgba(122,42,80,.28));}
.bsx-tier{position:relative; margin:0 auto; border-radius:12px 12px 8px 8px;}
.bsx-tier-top{width:170px; height:74px; background:linear-gradient(180deg,#8a4bb0 0%,#6d3691 100%);}
.bsx-tier-bottom{width:250px; height:92px; margin-top:-8px; background:linear-gradient(180deg,#5b2f7e 0%,#452063 100%); border-radius:14px 14px 10px 10px;}
.bsx-drip{
  position:absolute; top:-2px; left:0; right:0; height:26px;
  background:
    radial-gradient(14px 20px at 12% 0%, var(--cream) 60%, transparent 62%),
    radial-gradient(12px 26px at 30% 0%, var(--cream) 60%, transparent 62%),
    radial-gradient(15px 17px at 48% 0%, var(--cream) 60%, transparent 62%),
    radial-gradient(12px 24px at 66% 0%, var(--cream) 60%, transparent 62%),
    radial-gradient(14px 19px at 84% 0%, var(--cream) 60%, transparent 62%),
    linear-gradient(var(--cream) 0 9px, transparent 9px);
  border-radius:12px 12px 0 0;
}
.bsx-plate{
  width:320px; height:16px; margin:-4px auto 0; border-radius:50%;
  background:linear-gradient(180deg,#d9c6ea,#8f76a8); z-index:1; position:relative;
}
.bsx-prompt{
  margin-top:34px; z-index:3; text-align:center;
  font-size:14px; letter-spacing:.22em; text-transform:uppercase; color:var(--dim);
  animation:bsx-breathe 2.8s ease-in-out infinite;
  transition:opacity .6s ease;
}
@keyframes bsx-breathe{0%,100%{opacity:.55;}50%{opacity:1;}}
.bsx-out .bsx-prompt{opacity:0;}

.bsx-message{
  position:absolute; inset:0; z-index:7;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;
  text-align:center; padding:28px; opacity:0; pointer-events:none;
  background:radial-gradient(85% 75% at 50% 50%, rgba(255,241,247,.92) 0%, rgba(255,241,247,.55) 55%, transparent 80%);
  transition:opacity 1.6s ease .9s;
}
.bsx-out .bsx-message{opacity:1; pointer-events:auto;}
.bsx-message .bsx-eyebrow{color:var(--rose);}
.bsx-message h2{
  font-family:var(--font-great-vibes), cursive;
  font-weight:400; margin:0;
  font-size:clamp(52px,11vw,110px); line-height:1.1; text-wrap:balance;
  color:var(--rose);
  text-shadow:0 0 42px rgba(212,81,127,.25);
}
.bsx-name{color:var(--gold);}
.bsx-message-lines{
  display:flex; flex-direction:column; align-items:center; gap:8px;
  max-width:48ch;
}
.bsx-message p{
  max-width:44ch; margin:0;
  font-family:var(--font-cormorant), Georgia, serif;
  font-size:clamp(18px,2.6vw,22px); line-height:1.75; color:var(--ink);
}
.bsx-sig{
  font-family:var(--font-cormorant), Georgia, serif; font-style:italic;
  color:var(--rose); font-size:19px; letter-spacing:.04em;
}
.bsx-rise{opacity:0; transform:translateY(18px); transition:opacity 1s ease, transform 1s ease;}
.bsx-out .bsx-rise{opacity:1; transform:none;}
.bsx-out .bsx-rise.bsx-d1{transition-delay:1.1s;}
.bsx-out .bsx-rise.bsx-d2{transition-delay:1.6s;}

.bsx-mute{
  position:absolute; top:18px; right:18px; z-index:11;
  font:inherit; font-size:12px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--dim); background:rgba(255,255,255,.55);
  border:1px solid rgba(92,35,64,.16); border-radius:999px;
  padding:9px 16px; cursor:pointer;
}
.bsx-mute:focus-visible{outline:2px solid var(--gold); outline-offset:2px;}

@media (prefers-reduced-motion: reduce){
  .bsx-flame{animation:none;}
  .bsx-prompt{animation:none; opacity:.85;}
  .bsx-star{animation:none; opacity:.3;}
  .bsx-opening-line{animation-duration:.01s; animation-name:none; opacity:1;}
  .bsx-rise, .bsx-message, .bsx-glow, .bsx-stage{transition-duration:.01s; transition-delay:0s;}
}
`;
