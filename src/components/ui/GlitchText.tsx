"use client";

import { useEffect, useRef, useState } from "react";

const MIN_GAP = 1000;
const MAX_GAP = 3000;
const FIRST_DELAY = 1000;
const MIN_BURST = 260;
const MAX_BURST = 480;
const MONOCHROME = false;
const TEAR = 0.1;

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D uTex;
uniform vec2 uRes;
uniform float uTime;
uniform float uGlitch;
uniform vec3 uColor;
uniform float uMono;
uniform float uTear;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}

void main() {
  float g = uGlitch;
  float t = floor(uTime * 30.0); // stepped time = jittery, like a real signal
  vec2 uv = vUv;

  // soft low-frequency wobble across the whole shape
  uv.x += (noise(vec2(uv.y * 4.0, t * 0.7)) - 0.5) * 0.05 * g;

  // one thin tear at a random height
  float y0 = hash(vec2(t, 3.0));
  float th = 0.03 + 0.06 * hash(vec2(t, 9.0));
  float inside = step(y0, uv.y) * step(uv.y, y0 + th);
  uv.x += (hash(vec2(t, 17.0)) - 0.5) * 2.0 * uTear * inside * g;

  // chromatic split, only while glitching
  float s = 0.016 * g;
  float ar = texture2D(uTex, uv + vec2(s, 0.0)).a;
  float ag = texture2D(uTex, uv).a;
  float ab = texture2D(uTex, uv - vec2(s, 0.0)).a;

  vec3 rgb = vec3(ar, ag, ab);
  float a = max(max(ar, ag), ab);

  // mono mode: main copy plus faint ghosts
  float ma = max(ag, 0.4 * max(ar, ab));
  rgb = mix(rgb, vec3(ma), uMono);
  a = mix(a, ma, uMono);

  vec4 o = vec4(rgb * uColor, a);

  // static dropout inside the letters
  float grain = hash(floor(vUv * uRes * 0.5) + t);
  float drop = step(0.82, grain) * g * 0.5;

  // brightness flicker + faint scanlines
  float flick = 1.0 - g * 0.18 * hash(vec2(t, 5.0));
  float scan = 1.0 - g * 0.12 * step(0.5, fract(vUv.y * uRes.y / 3.0));

  gl_FragColor = o * (1.0 - drop) * flick * scan;
}
`;

type Props = {
  text: string;
  label?: string;
  className?: string;
};

const GlitchText = ({ text, label, className }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const burstRef = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const h1 = h1Ref.current!;
    const canvas = canvasRef.current!;
    const gl = canvas.getContext("webgl", {
      premultipliedAlpha: true,
      alpha: true,
      antialias: false,
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const prog = gl.createProgram()!;
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = {
      tex: gl.getUniformLocation(prog, "uTex"),
      res: gl.getUniformLocation(prog, "uRes"),
      time: gl.getUniformLocation(prog, "uTime"),
      glitch: gl.getUniformLocation(prog, "uGlitch"),
      color: gl.getUniformLocation(prog, "uColor"),
      mono: gl.getUniformLocation(prog, "uMono"),
      tear: gl.getUniformLocation(prog, "uTear"),
    };

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(u.tex, 0);
    gl.uniform1f(u.mono, MONOCHROME ? 1 : 0);
    gl.uniform1f(u.tear, TEAR);
    gl.clearColor(0, 0, 0, 0);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let disposed = false;
    let raf = 0;
    let built = false;
    let g = 0;
    let dirty = true;
    let burstEnd = 0;
    let nextStep = 0;
    let nextBurst = performance.now() + FIRST_DELAY;

    const draw = (now: number) => {
      gl.uniform1f(u.time, now / 1000);
      gl.uniform1f(u.glitch, g);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const startBurst = (now: number) => {
      burstEnd = now + MIN_BURST + Math.random() * (MAX_BURST - MIN_BURST);
      nextStep = 0;
    };

    const build = async () => {
      const cs = getComputedStyle(h1);
      const size = parseFloat(cs.fontSize);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      try {
        await document.fonts.load(
          `${cs.fontWeight} ${size}px ${cs.fontFamily}`,
          text,
        );
      } catch {}
      if (disposed) return;

      const w = h1.offsetWidth;
      const h = h1.offsetHeight;
      const padX = Math.round(w * 0.15);
      const padY = Math.round(h * 0.3);
      const cssW = w + padX * 2;
      const cssH = h + padY * 2;

      canvas.style.left = `${-padX}px`;
      canvas.style.top = `${-padY}px`;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);

      const src = document.createElement("canvas");
      src.width = canvas.width;
      src.height = canvas.height;
      const ctx = src.getContext("2d")!;
      ctx.font = `${cs.fontWeight} ${size * dpr}px ${cs.fontFamily}`;
      (
        ctx as CanvasRenderingContext2D & { letterSpacing: string }
      ).letterSpacing = `${(parseFloat(cs.letterSpacing) || 0) * dpr}px`;
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      const m = ctx.measureText(text);
      const y =
        src.height / 2 +
        (m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2;
      ctx.fillText(text, src.width / 2, y);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src);

      const rgb = cs.color.match(/[\d.]+/g)?.map(Number);
      const [r, gr, b] = rgb && rgb.length >= 3 ? rgb : [243, 240, 236];
      gl.uniform3f(u.color, r / 255, gr / 255, b / 255);
      gl.uniform2f(u.res, canvas.width, canvas.height);

      built = true;
      dirty = true;
      draw(performance.now());
      setReady(true);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!built || reduce) return;

      if (burstEnd && now < burstEnd) {
        if (now >= nextStep) {
          g = Math.random() < 0.2 ? 0 : 0.35 + Math.random() * 0.65;
          nextStep = now + 40 + Math.random() * 60;
        }
      } else if (burstEnd) {
        burstEnd = 0;
        g = 0;
        dirty = true;
        nextBurst = now + MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP);
      } else if (now >= nextBurst) {
        startBurst(now);
      }

      if (g > 0 || dirty) {
        draw(now);
        dirty = false;
      }
    };

    burstRef.current = () => {
      if (built && !burstEnd && !reduce) startBurst(performance.now());
    };

    let rebuildRaf = 0;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rebuildRaf);
      rebuildRaf = requestAnimationFrame(build);
    });
    ro.observe(h1);

    build();
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(rebuildRaf);
      ro.disconnect();
      burstRef.current = null;
      gl.deleteTexture(texture);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [text]);

  return (
    <div
      ref={wrapRef}
      onPointerEnter={() => burstRef.current?.()}
      className="relative w-fit">
      <h1
        ref={h1Ref}
        aria-label={label ?? text}
        className={className}
        style={{ opacity: ready ? 0 : 1 }}>
        {text}
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute"
      />
    </div>
  );
};

export default GlitchText;
