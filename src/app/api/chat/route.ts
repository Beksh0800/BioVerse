import { NextRequest } from "next/server";

export const runtime = "nodejs";

const MODEL = process.env.OPENROUTER_MODEL ?? "google/gemini-2.5-flash-lite";

const SYSTEM_PROMPT = `Сен — BIOVERSE платформасының AI көмекшісісің.

BIOVERSE — биология пәнінде Project-Based Learning (PBL) жобаларын жоспарлауға,
сүйемелдеуге және бағалауға арналған цифрлық платформа. Сенің қолданушыларың —
7–11 сынып оқушылары және биология пәнінің мұғалімдері.

Сенің міндеттерің:
1. Биология бойынша сұрақтарға нақты әрі түсінікті жауап беру.
2. Зерттеу гипотезасын құрастыруға көмектесу.
3. Зерттеу жоспарын және эксперимент әдістемесін жасауға көмектесу.
4. Оқушының қорытындысын тексеріп, ғылыми тұрғыда бағалау.
5. Жобаны жақсарту бойынша нақты ұсыныстар беру.

Жауап беру ережелері:
- ӘРҚАШАН қазақ тілінде жауап бер.
- Жауабың нақты, құрылымды және оқушыға түсінікті болсын.
- Ұзын жауаптарды тақырыпшаларға және тізімдерге бөл.
- Ғылыми терминді қолданғанда қысқаша түсіндірме бер.
- Зертханалық жұмыс туралы айтқанда қауіпсіздік ережелерін еске сал.
- Оқушының орнына жұмысты толық жасап берме — ойлануға бағыттайтын сұрақтар қой.
- Формулаларды LaTeX түрінде ЖАЗБА ($...$, \\rightarrow, _{...} қолданба).
  Оның орнына қарапайым мәтін мен Юникод таңбаларын пайдалан.
  Дұрыс мысал: 6CO₂ + 6H₂O + жарық → C₆H₁₂O₆ + 6O₂`;

/**
 * Причина отката всегда пишется в консоль сервера.
 *
 * Без этого демо-режим выглядит как штатная работа: однажды из-за неверного
 * идентификатора модели запросы молча падали в заглушку, и понять это по
 * интерфейсу было нельзя — в браузере всё выглядело нормально.
 */
function logFallback(reason: string, detail?: unknown) {
  console.error(
    `[BIOVERSE AI] Демо-режим: ${reason}`,
    detail ? `\n${typeof detail === "string" ? detail.slice(0, 500) : detail}` : "",
  );
}

/**
 * Ответ на случай, когда ключ не задан или OpenRouter недоступен.
 * Демонстрация не должна падать во время защиты из-за сети или лимита —
 * лучше показать осмысленную заглушку, чем экран с ошибкой.
 */
const FALLBACK_REPLY = `Қазір AI қызметіне қосылу мүмкін болмай тұр — демонстрациялық режим қосылды.

**Гипотеза құру үлгісі**

Гипотеза «Егер … болса, онда … болады, өйткені …» құрылымы бойынша жазылады.

*Мысал:* Егер өсімдікке қызыл және көк жарық берілсе, онда фотосинтез қарқындылығы артады, өйткені хлорофилл дәл осы толқын ұзындығын жақсы сіңіреді.

**Зерттеу жоспарының кезеңдері**

1. Мәселені анықтау және мақсат қою
2. Зерттеу сұрағын тұжырымдау
3. Гипотеза ұсыну
4. Экспериментті жоспарлау және бақылау тобын белгілеу
5. Өлшеу жүргізу және деректерді жазу
6. Нәтижені талдау, диаграмма құру
7. Қорытынды шығару

**Кеңес:** эксперимент нәтижесі сенімді болуы үшін бақылау тобын қосыңыз және өлшеуді кемінде үш рет қайталаңыз.

_AI толық жұмыс істеуі үшін .env файлына OPENROUTER_API_KEY кілтін қосыңыз._`;

type ChatMessage = { role: "user" | "assistant"; content: string };

/** Отдаёт готовый текст как поток, чтобы клиент не различал два режима. */
function streamText(text: string) {
  const encoder = new TextEncoder();
  return new Response(
    new ReadableStream({
      start(controller) {
        // Порциями по нескольку слов — иначе заглушка появляется мгновенно
        // и заметно отличается от живого ответа модели.
        const chunks = text.match(/\S+\s*/g) ?? [text];
        let i = 0;
        const timer = setInterval(() => {
          if (i >= chunks.length) {
            clearInterval(timer);
            controller.close();
            return;
          }
          controller.enqueue(encoder.encode(chunks[i]));
          i += 1;
        }, 18);
      },
    }),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}

export async function POST(req: NextRequest) {
  let messages: ChatMessage[] = [];

  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return Response.json({ error: "Сұрау форматы дұрыс емес." }, { status: 400 });
  }

  if (messages.length === 0) {
    return Response.json({ error: "Хабарлама бос." }, { status: 400 });
  }

  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) {
    logFallback("в .env не задан OPENROUTER_API_KEY");
    return streamText(FALLBACK_REPLY);
  }

  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "X-Title": "BIOVERSE",
      },
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.7,
        // Развёрнутый план эксперимента на казахском легко перешагивает
        // 1200 токенов, и ответ обрывался на полуслове. Запас взят с учётом
        // того, что кириллица «дороже» латиницы по токенам.
        max_tokens: 2400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          // Держим только хвост переписки: длинная история раздувает
          // стоимость запроса, а для учебного диалога она не нужна.
          ...messages.slice(-12),
        ],
      }),
    });

    if (!upstream.ok || !upstream.body) {
      // Тело ответа читаем целиком: именно там OpenRouter объясняет причину
      // («No endpoints found for …», нехватка средств, неверный ключ).
      const detail = await upstream.text().catch(() => "");
      logFallback(
        `OpenRouter вернул ${upstream.status} для модели «${MODEL}»`,
        detail,
      );
      return streamText(FALLBACK_REPLY);
    }

    // Переупаковываем SSE от OpenRouter в простой текстовый поток,
    // чтобы на клиенте не тащить парсер событий.
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        const reader = upstream.body!.getReader();
        let buffer = "";

        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              const payload = trimmed.slice(5).trim();
              if (payload === "[DONE]") continue;

              try {
                const delta = JSON.parse(payload)?.choices?.[0]?.delta?.content;
                if (delta) controller.enqueue(encoder.encode(delta));
              } catch {
                // Неполный JSON в конце чанка — придёт со следующей порцией.
              }
            }
          }
        } finally {
          reader.releaseLock();
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    logFallback("не удалось связаться с OpenRouter", String(error));
    return streamText(FALLBACK_REPLY);
  }
}
