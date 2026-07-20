/**
 * Фирменная печать BIOVERSE.
 *
 * Это знак самой платформы, а не оттиск школы, министерства или иного
 * официального органа: такие эмблемы на демонстрационном сертификате
 * ставить нельзя — документ сразу превращается в подделку.
 *
 * Нарисована инлайновым SVG. Цвета заданы в hex, потому что сертификат
 * уходит в PDF через html2canvas, а тот не разбирает формат oklch из
 * палитры Tailwind.
 */

const DARK = "#7a5606";
const DEEP = "#a97c11";
const MID = "#d2a52c";
const LIGHT = "#f2d47c";
const PALE = "#fbeec2";

/**
 * Координаты зубчиков считаются тригонометрией, а её результат Node и браузер
 * округляют по-разному в последнем знаке (…197876 против …19786). React видит
 * расхождение разметки и роняет гидратацию, поэтому округляем сами.
 */
function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

const TEETH = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * Math.PI * 2;
  return {
    cx: round(100 + Math.cos(angle) * 94),
    cy: round(100 + Math.sin(angle) * 94),
  };
});

export function Seal({ size = 128 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      role="img"
      aria-label="BIOVERSE мөрі"
      style={{ flexShrink: 0 }}
    >
      <defs>
        {/* Диагональные градиенты дают металлический блеск — плоская
            заливка выглядит как наклейка, а не как тиснёная печать. */}
        <linearGradient id="seal-edge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={LIGHT} />
          <stop offset="30%" stopColor={MID} />
          <stop offset="60%" stopColor={DEEP} />
          <stop offset="100%" stopColor={MID} />
        </linearGradient>

        <linearGradient id="seal-band" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={PALE} />
          <stop offset="40%" stopColor={LIGHT} />
          <stop offset="75%" stopColor={MID} />
          <stop offset="100%" stopColor={LIGHT} />
        </linearGradient>

        <linearGradient id="seal-core" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={MID} />
          <stop offset="45%" stopColor={PALE} />
          <stop offset="100%" stopColor={MID} />
        </linearGradient>

        <path id="seal-arc-top" d="M 100,100 m -74,0 a 74,74 0 1,1 148,0" fill="none" />
        <path id="seal-arc-bottom" d="M 100,100 m -63,0 a 63,63 0 1,0 126,0" fill="none" />
      </defs>

      {/* Зубчатый венчик по краю — характерный силуэт наградной печати. */}
      <g fill="url(#seal-edge)">
        {TEETH.map((tooth, i) => (
          <circle key={i} cx={tooth.cx} cy={tooth.cy} r="6" />
        ))}
      </g>

      <circle cx="100" cy="100" r="92" fill="url(#seal-edge)" />
      {/* Кольцо под текстом — светлое золото, а не белый: печать целиком
          металлическая, светлая вставка разбивала бы её на две части. */}
      <circle cx="100" cy="100" r="83" fill="url(#seal-band)" />
      <circle cx="100" cy="100" r="83" fill="none" stroke={DEEP} strokeWidth="1.4" />
      <circle cx="100" cy="100" r="55" fill="url(#seal-core)" />
      <circle cx="100" cy="100" r="55" fill="none" stroke={DEEP} strokeWidth="2" />
      <circle cx="100" cy="100" r="50" fill="none" stroke={LIGHT} strokeWidth="1" />

      <text
        fill={DARK}
        fontSize="16"
        fontWeight="700"
        letterSpacing="3.2"
        fontFamily="var(--font-inter), sans-serif"
      >
        <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
          BIOVERSE
        </textPath>
      </text>

      <text
        fill={DARK}
        fontSize="10.5"
        fontWeight="600"
        letterSpacing="2.2"
        fontFamily="var(--font-inter), sans-serif"
      >
        <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
          PBL ECOSYSTEM
        </textPath>
      </text>

      {/* Звёзды-разделители на стыке дуг. */}
      {[26, 174].map((x) => (
        <text
          key={x}
          x={x}
          y={106}
          fill={DARK}
          fontSize="15"
          textAnchor="middle"
          fontFamily="var(--font-inter), sans-serif"
        >
          ★
        </text>
      ))}

      <text
        x="100"
        y="96"
        fill={DARK}
        fontSize="40"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="1"
        fontFamily="var(--font-inter), sans-serif"
      >
        BV
      </text>

      <rect x="57" y="106" width="86" height="19" rx="2.5" fill={DARK} />
      <text
        x="100"
        y="119.5"
        fill={PALE}
        fontSize="10.5"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="1.8"
        fontFamily="var(--font-inter), sans-serif"
      >
        CERTIFIED
      </text>
    </svg>
  );
}
