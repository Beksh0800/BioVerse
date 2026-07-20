/**
 * Приводит формулы из ответа модели к обычному тексту.
 *
 * Модели любят оборачивать химические уравнения в LaTeX ($...$, \rightarrow,
 * \text{}, _{2}), а рендерер markdown в чате его не понимает — на экране
 * появляются доллары и обратные слэши. Просить модель в системном промпте
 * не делать так помогает лишь частично, поэтому подстраховываемся здесь:
 * преобразование детерминированное и от поведения модели не зависит.
 */

const SUB: Record<string, string> = {
  "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄",
  "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
  "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
  a: "ₐ", e: "ₑ", o: "ₒ", x: "ₓ", h: "ₕ", k: "ₖ",
  l: "ₗ", m: "ₘ", n: "ₙ", p: "ₚ", s: "ₛ", t: "ₜ",
};

const SUP: Record<string, string> = {
  "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
  "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
  "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾",
  n: "ⁿ", i: "ⁱ",
};

const COMMANDS: [RegExp, string][] = [
  [/\\(?:rightarrow|to|longrightarrow)\b/g, "→"],
  [/\\(?:leftarrow|longleftarrow)\b/g, "←"],
  [/\\(?:leftrightarrow|rightleftharpoons)\b/g, "⇌"],
  [/\\uparrow\b/g, "↑"],
  [/\\downarrow\b/g, "↓"],
  [/\\times\b/g, "×"],
  [/\\cdot\b/g, "·"],
  [/\\div\b/g, "÷"],
  [/\\pm\b/g, "±"],
  [/\\leq\b/g, "≤"],
  [/\\geq\b/g, "≥"],
  [/\\neq\b/g, "≠"],
  [/\\approx\b/g, "≈"],
  [/\\degree\b/g, "°"],
  [/\\alpha\b/g, "α"],
  [/\\beta\b/g, "β"],
  [/\\gamma\b/g, "γ"],
  [/\\Delta\b/g, "Δ"],
  [/\\lambda\b/g, "λ"],
];

/** Переводит содержимое _{...} и ^{...} в юникодные знаки, если это возможно. */
function convertScripts(input: string) {
  const apply = (body: string, map: Record<string, string>) => {
    const chars = [...body];
    // Если хоть один символ не переводится, оставляем группу как есть —
    // иначе формула превратится в кашу из половины знаков.
    if (!chars.every((ch) => map[ch.toLowerCase()])) return null;
    return chars.map((ch) => map[ch.toLowerCase()]).join("");
  };

  return input
    .replace(/_\{([^{}]*)\}|_([A-Za-z0-9])/g, (match, braced, single) => {
      const converted = apply(braced ?? single, SUB);
      return converted ?? (braced !== undefined ? braced : single);
    })
    .replace(/\^\{([^{}]*)\}|\^([A-Za-z0-9])/g, (match, braced, single) => {
      const converted = apply(braced ?? single, SUP);
      return converted ?? (braced !== undefined ? braced : single);
    });
}

export function normalizeMath(input: string) {
  let out = input;

  // \text{Жарық}, \mathrm{CO}, \mathbf{...} — оставляем только содержимое.
  out = out.replace(/\\(?:text|mathrm|mathbf|mathit|textbf)\{([^{}]*)\}/g, "$1");

  // \frac{a}{b} → a/b
  out = out.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, "$1/$2");

  for (const [pattern, replacement] of COMMANDS) out = out.replace(pattern, replacement);

  out = convertScripts(out);

  // Снимаем ограничители формул: $$...$$, \[...\], \(...\) и одиночные $...$.
  // Одиночный доллар трогаем только парами и без переноса строки внутри,
  // чтобы не съесть знак валюты в обычном тексте.
  out = out.replace(/\$\$([\s\S]*?)\$\$/g, "$1");
  out = out.replace(/\\\[([\s\S]*?)\\\]/g, "$1");
  out = out.replace(/\\\(([\s\S]*?)\\\)/g, "$1");
  out = out.replace(/\$([^$\n]+)\$/g, "$1");

  // Экранированные пробелы и остатки служебных символов LaTeX.
  out = out.replace(/\\[,;:!]/g, " ");
  out = out.replace(/\\\\/g, "\n");

  return out;
}
