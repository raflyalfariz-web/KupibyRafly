"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * The product presentation used whenever the 3D scene is not running:
 * no WebGL, reduced motion, a lost GL context, or while the scene chunk loads.
 *
 * Two layers of safety — the real photograph, and if that fails to load, an
 * inline SVG bottle that needs no network at all.
 */
export function StaticProduct({ className }: { className?: string }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className={`relative mx-auto w-full max-w-[26rem] ${className ?? ""}`}>
      <div className="relative aspect-[3/5] w-full">
        {imageFailed ? (
          <BottleIllustration className="h-full w-full" />
        ) : (
          <Image
            src="/brand/kupi-bottle.jpg"
            alt="Botol KUPI by Rafly berisi Es KUPI Gula Aren, dengan label krem bertanda atap joglo."
            fill
            priority
            sizes="(max-width: 768px) 70vw, 26rem"
            className="object-contain"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

/**
 * Last-resort vector bottle: no image request, no WebGL, still on-brand.
 * Proportions match the real bottle — slim body, tight shoulder, ribbed cap,
 * and a label covering roughly three quarters of the height.
 */
export function BottleIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 420"
      className={className}
      role="img"
      aria-label="Ilustrasi botol KUPI 500 ml berisi kopi susu gula aren"
      fill="none"
    >
      <defs>
        <linearGradient id="kupi-liquid" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a9773f" />
          <stop offset="42%" stopColor="#d3a878" />
          <stop offset="100%" stopColor="#9e6c39" />
        </linearGradient>
        <linearGradient id="kupi-glass" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="34%" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="kupi-cap" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9ea4a8" />
          <stop offset="30%" stopColor="#e8ecee" />
          <stop offset="62%" stopColor="#b8bec2" />
          <stop offset="100%" stopColor="#8e9498" />
        </linearGradient>
        {/* Body outline: straight sides, tight shoulder, short neck. */}
        <clipPath id="kupi-body">
          <path d="M61 31h38v11c0 6 4 9 12 14 14 8 24 12 24 24v323c0 10-8 17-18 17H43c-10 0-18-7-18-17V80c0-12 10-16 24-24 8-5 12-8 12-14V31Z" />
        </clipPath>
      </defs>

      {/* Ribbed cap */}
      <rect x="57" y="8" width="46" height="24" rx="3" fill="url(#kupi-cap)" />
      {[62, 68, 74, 80, 86, 92, 98].map((x) => (
        <line
          key={x}
          x1={x}
          y1="11"
          x2={x}
          y2="29"
          stroke="#7d8488"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
      ))}

      {/* Liquid, filling up into the neck, then the glass sheen over it */}
      <g clipPath="url(#kupi-body)">
        <rect x="20" y="36" width="120" height="384" fill="url(#kupi-liquid)" />
        <rect x="20" y="28" width="120" height="392" fill="url(#kupi-glass)" />
      </g>
      <path
        d="M61 31h38v11c0 6 4 9 12 14 14 8 24 12 24 24v323c0 10-8 17-18 17H43c-10 0-18-7-18-17V80c0-12 10-16 24-24 8-5 12-8 12-14V31Z"
        stroke="#44250E"
        strokeOpacity="0.32"
        strokeWidth="1.6"
      />

      {/* Label */}
      <rect x="25" y="96" width="110" height="279" fill="#FBF1DF" />
      <path d="M80 116l34 40v14l-34-40-34 40v-14l34-40Z" fill="#44250E" />
      <text
        x="80"
        y="205"
        textAnchor="middle"
        fill="#44250E"
        fontSize="30"
        fontFamily="Georgia, serif"
        letterSpacing="2.5"
      >
        KUPI
      </text>
      <text
        x="92"
        y="230"
        textAnchor="middle"
        fill="#44250E"
        fontSize="15"
        fontStyle="italic"
        fontFamily="Georgia, serif"
      >
        by Rafly
      </text>
      <line
        x1="46"
        y1="250"
        x2="114"
        y2="250"
        stroke="#44250E"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      <text
        x="80"
        y="330"
        textAnchor="middle"
        fill="#44250E"
        fillOpacity="0.7"
        fontSize="9"
        fontFamily="Helvetica, Arial, sans-serif"
        letterSpacing="1.6"
      >
        ES KUPI GULA AREN
      </text>
      <text
        x="80"
        y="348"
        textAnchor="middle"
        fill="#44250E"
        fillOpacity="0.55"
        fontSize="8"
        fontFamily="Helvetica, Arial, sans-serif"
        letterSpacing="1.4"
      >
        500 ML · TANGERANG
      </text>
    </svg>
  );
}
