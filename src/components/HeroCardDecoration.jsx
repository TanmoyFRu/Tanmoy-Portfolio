import { memo } from "react"
import { motion } from "framer-motion"
import { useTheme } from "../context/ThemeContext"

const PALETTES = {
  midnight: {
    s: "rgba(99, 102, 241, 0.25)",
    m: "rgba(99, 102, 241, 0.18)",
    t: "rgba(99, 102, 241, 0.11)",
  },
  solar: {
    s: "rgba(150, 95, 20, 0.35)",
    m: "rgba(150, 95, 20, 0.24)",
    t: "rgba(150, 95, 20, 0.15)",
  },
  cosmic: {
    s: "rgba(168, 85, 247, 0.25)",
    m: "rgba(168, 85, 247, 0.18)",
    t: "rgba(168, 85, 247, 0.11)",
  },
  emerald: {
    s: "rgba(16, 185, 129, 0.25)",
    m: "rgba(16, 185, 129, 0.18)",
    t: "rgba(16, 185, 129, 0.11)",
  },
}

const STEM_1 = "M0,440 C50,390 90,310 140,240 C190,170 260,110 350,72 C420,42 480,30 530,25"
const STEM_2 = "M0,380 C40,340 80,280 120,220 C165,155 220,105 300,72 C360,48 410,40 460,38"
const STEM_V1 = "M20,0 C18,55 25,105 22,160 C18,220 25,270 22,330"
const STEM_V2 = "M55,0 C52,45 58,88 55,132 C52,178 58,218 55,262"

const TAPERED_STEMS = [
  { d: STEM_1, layers: [{ w: 3.0, end: 0.45 }, { w: 2.0, end: 0.75 }, { w: 1.0, end: 1 }] },
  { d: STEM_2, layers: [{ w: 2.4, end: 0.45 }, { w: 1.6, end: 0.75 }, { w: 0.8, end: 1 }] },
  { d: STEM_V1, layers: [{ w: 2.6, end: 0.45 }, { w: 1.7, end: 0.75 }, { w: 0.8, end: 1 }] },
  { d: STEM_V2, layers: [{ w: 2.0, end: 0.45 }, { w: 1.3, end: 0.75 }, { w: 0.6, end: 1 }] },
]

const SPIRALS = [
  { d: "M530,25 C565,12 595,25 598,58 C600,95 572,118 542,108 C515,98 510,68 528,48 C540,35 558,35 565,48 C570,58 562,68 552,65", c: "m", w: 1.1 },
  { d: "M460,38 C488,22 515,35 518,62 C520,92 498,110 472,100 C450,90 448,65 465,52 C476,44 490,48 490,60", c: "m", w: 0.9 },
  { d: "M350,72 C340,45 350,15 380,5 C410,-5 435,12 430,40 C425,65 402,72 395,55 C390,40 402,30 412,35", c: "m", w: 0.9 },
  { d: "M22,330 C10,355 15,385 35,400 C58,415 78,400 72,378 C66,358 45,352 38,368 C32,380 42,392 55,388", c: "m", w: 1.1 },
  { d: "M55,262 C42,282 48,310 68,322 C90,335 108,320 102,298 C96,280 78,275 72,290 C68,302 78,312 88,308", c: "m", w: 0.9 },
  { d: "M140,240 C118,218 122,182 148,162 C178,140 205,155 198,182 C192,205 168,212 160,192 C154,175 168,162 180,168", c: "m", w: 1.0 },
  { d: "M120,220 C100,200 105,168 128,150 C155,132 178,145 172,170 C168,190 148,195 142,178 C138,165 150,155 160,160", c: "m", w: 0.85 },
]

const TENDRILS = [
  { d: "M300,72 C288,48 295,20 318,8 C342,-4 362,10 358,35 C354,55 338,60 332,45 C328,32 340,24 348,30", c: "t", w: 0.55 },
  { d: "M260,110 C248,88 255,60 275,48 C298,35 315,48 312,72 C310,90 295,95 290,80 C286,68 296,60 304,65", c: "t", w: 0.5 },
  { d: "M190,170 C175,150 180,125 200,112 C222,100 240,112 236,135 C232,152 218,155 214,142 C210,130 222,122 230,128", c: "t", w: 0.5 },
  { d: "M90,310 C72,295 75,268 95,255 C118,242 135,255 132,278 C130,295 115,298 112,285 C108,272 120,265 128,272", c: "t", w: 0.5 },
  { d: "M50,390 C35,375 38,352 55,340 C75,328 92,340 88,358 C85,372 72,375 68,362 C65,352 75,345 82,350", c: "t", w: 0.45 },
  { d: "M22,160 C8,172 5,195 15,210 C28,228 48,222 46,202 C44,186 28,182 24,196 C20,208 32,218 42,212", c: "t", w: 0.5 },
  { d: "M55,132 C42,142 40,162 50,175 C62,190 80,184 78,166 C76,152 62,148 58,160 C55,170 64,178 72,174", c: "t", w: 0.45 },
  { d: "M22,220 C10,232 8,252 18,265 C30,280 48,274 46,256 C44,242 30,238 26,250", c: "t", w: 0.4 },
  { d: "M480,30 C490,15 505,10 515,18 C528,28 522,45 510,42 C500,40 498,30 506,25", c: "t", w: 0.4 },
  { d: "M410,40 C418,28 432,24 440,32 C450,42 445,56 434,54 C425,52 424,42 430,38", c: "t", w: 0.35 },
  { d: "M0,420 C12,408 18,390 14,372 C10,355 16,340 28,332 C42,324 52,335 48,348 C44,358 34,358 32,350", c: "t", w: 0.45 },
  { d: "M0,360 C8,350 12,338 10,325 C8,312 14,302 24,298 C34,294 42,302 38,312 C36,320 28,320 26,314", c: "t", w: 0.4 },
]

const CornerGroup = ({ style, delay, palette }) => {
  let idx = 0

  return (
    <div className="absolute" style={{ width: "40%", height: "44%", ...style }}>
      <svg className="w-full h-full" viewBox="0 0 620 460" fill="none">
        {TAPERED_STEMS.map((stem, si) =>
          stem.layers.map((layer, li) => {
            const i = idx++
            return (
              <motion.path
                key={`s-${si}-${li}`}
                d={stem.d}
                stroke={palette.s}
                strokeWidth={layer.w}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: layer.end, opacity: 1 }}
                transition={{
                  pathLength: { duration: 2.5 + li * 0.8, ease: [0.25, 0.1, 0.25, 1], delay: delay + si * 0.3 },
                  opacity: { duration: 0.4, delay: delay + si * 0.3 },
                }}
              />
            )
          })
        )}

        {SPIRALS.map((s, i) => (
          <motion.path
            key={`sp-${i}`}
            d={s.d}
            stroke={palette[s.c]}
            strokeWidth={s.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 2.2, ease: [0.25, 0.1, 0.25, 1], delay: delay + 0.8 + i * 0.15 },
              opacity: { duration: 0.3, delay: delay + 0.8 + i * 0.15 },
            }}
          />
        ))}

        {TENDRILS.map((s, i) => (
          <motion.path
            key={`t-${i}`}
            d={s.d}
            stroke={palette[s.c]}
            strokeWidth={s.w}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.8, ease: [0.25, 0.1, 0.25, 1], delay: delay + 1.5 + i * 0.1 },
              opacity: { duration: 0.3, delay: delay + 1.5 + i * 0.1 },
            }}
          />
        ))}
      </svg>
    </div>
  )
}

const HeroCardDecoration = () => {
  const { theme } = useTheme()
  const p = PALETTES[theme] || PALETTES.midnight

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ borderRadius: "inherit" }}>
      <CornerGroup style={{ top: 0, left: 0 }} delay={0} palette={p} />
      <CornerGroup style={{ top: 0, right: 0, transform: "scaleX(-1)" }} delay={0.3} palette={p} />
      <CornerGroup style={{ bottom: 0, left: 0, transform: "scaleY(-1)" }} delay={0.6} palette={p} />
      <CornerGroup style={{ bottom: 0, right: 0, transform: "scale(-1,-1)" }} delay={0.9} palette={p} />
    </div>
  )
}

export default memo(HeroCardDecoration)
