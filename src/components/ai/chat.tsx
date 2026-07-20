"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, RotateCcw, Send, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { normalizeMath } from "@/lib/normalize-math";

type Message = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "bioverse-chat";

const GREETING =
  "Сәлем! Мен — BIOVERSE AI көмекшісімін. Биология бойынша сұрақтарыңызға жауап беремін, гипотеза құруға, зерттеу жоспарын жасауға және қорытындыны тексеруге көмектесемін. Немен бастаймыз?";

const SUGGESTIONS = [
  {
    icon: "sparkles",
    title: "Гипотеза құру",
    prompt:
      "Фотосинтезге жарық түсінің әсері туралы жоба үшін ғылыми гипотеза құрастыруға көмектес.",
  },
  {
    icon: "clipboard",
    title: "Зерттеу жоспары",
    prompt:
      "Ашыту процесіндегі микроорганизмдердің рөлін зерттеу үшін кезең-кезеңімен эксперимент жоспарын жаса.",
  },
  {
    icon: "help",
    title: "Биология сұрағы",
    prompt: "Компост жасауда микроорганизмдер қандай рөл атқарады? Түсіндіріп бер.",
  },
  {
    icon: "star",
    title: "Қорытындыны тексеру",
    prompt:
      "Жоба қорытындысын ғылыми тұрғыда қалай дұрыс тұжырымдау керек? Мысал келтір.",
  },
];

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /*
    История живёт в localStorage: бэкенда в демо нет, но диалог должен
    переживать перезагрузку страницы во время показа.

    Читаем после монтирования, а не при инициализации состояния: на сервере
    localStorage нет, и сразу подставленная история разошлась бы с разметкой,
    пришедшей с сервера. Обновление состояния уводим в микрозадачу, чтобы
    первый клиентский рендер совпал с серверным.
  */
  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setMessages(JSON.parse(saved));
      } catch {
        // Повреждённая запись — просто начинаем с чистого диалога.
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages, loaded]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, streaming]);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || streaming) return;

      const history: Message[] = [...messages, { role: "user", content: question }];
      setMessages([...history, { role: "assistant", content: "" }]);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.body) throw new Error("no body");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let answer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          answer += decoder.decode(value, { stream: true });
          // Дописываем последнее сообщение на месте, чтобы текст «печатался».
          setMessages([...history, { role: "assistant", content: answer }]);
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") return;
        setMessages([
          ...history,
          {
            role: "assistant",
            content:
              "Кешіріңіз, жауап алу кезінде қате шықты. Интернет байланысын тексеріп, қайта көріңіз.",
          },
        ]);
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, streaming],
  );

  // Не оставляем висящий запрос, если пользователь ушёл со страницы.
  useEffect(() => () => abortRef.current?.abort(), []);

  function reset() {
    abortRef.current?.abort();
    setMessages([]);
    setStreaming(false);
    inputRef.current?.focus();
  }

  const isEmpty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-13rem)] min-h-[520px] flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] ring-1 ring-hairline">
      {/* Шапка чата */}
      <div className="flex items-center justify-between gap-3 border-b border-hairline px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
            <Bot className="size-[18px]" />
          </span>
          <div>
            <p className="text-sm font-bold text-navy-900">BIOVERSE AI көмекшісі</p>
            <p className="flex items-center gap-1.5 text-xs text-muted">
              <span className="size-1.5 rounded-full bg-leaf" />
              {streaming ? "Жауап жазып жатыр…" : "Дайын"}
            </p>
          </div>
        </div>
        {!isEmpty && (
          <Button variant="secondary" size="sm" onClick={reset}>
            <RotateCcw className="size-3.5" />
            Тазалау
          </Button>
        )}
      </div>

      {/* Лента сообщений */}
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-5">
        <Bubble role="assistant" content={GREETING} />

        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Bubble
                role={m.role}
                content={m.content}
                pending={
                  m.role === "assistant" && m.content === "" && streaming
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {isEmpty && (
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.title}
                onClick={() => send(s.prompt)}
                className="group flex items-start gap-3 rounded-xl bg-white p-3.5 text-left ring-1 ring-hairline transition hover:bg-navy-50 hover:ring-navy-200"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-brand transition group-hover:bg-brand group-hover:text-white">
                  <Icon name={s.icon} className="size-4" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-navy-900">
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-xs leading-snug text-muted">
                    {s.prompt}
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Поле ввода */}
      <div className="border-t border-hairline p-3 sm:p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-2"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              // Enter отправляет, Shift+Enter переносит строку.
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            placeholder="Сұрағыңызды жазыңыз…"
            aria-label="Сұрақ"
            className="max-h-32 min-h-11 flex-1 resize-none rounded-xl bg-slate-50 px-4 py-3 text-sm text-navy-900 ring-1 ring-hairline transition outline-none placeholder:text-muted focus:bg-white focus:ring-2 focus:ring-brand"
          />
          <Button
            type="submit"
            disabled={streaming || !input.trim()}
            aria-label="Жіберу"
            className="size-11 shrink-0 px-0"
          >
            <Send className="size-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-[11px] text-muted">
          AI жауаптарын ғылыми дереккөзбен салыстырып тексеріңіз.
        </p>
      </div>
    </div>
  );
}

function Bubble({
  role,
  content,
  pending = false,
}: {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
}) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg",
          isUser ? "bg-navy-100 text-navy-700" : "bg-brand text-white",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </span>

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[75%]",
          isUser
            ? "rounded-tr-sm bg-brand text-white"
            : "rounded-tl-sm bg-slate-50 text-navy-900 ring-1 ring-hairline",
        )}
      >
        {pending ? (
          <span className="flex gap-1 py-1" aria-label="Жауап жазылып жатыр">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="size-1.5 rounded-full bg-muted"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18 }}
              />
            ))}
          </span>
        ) : isUser ? (
          <p className="whitespace-pre-wrap">{content}</p>
        ) : (
          <div
            className={cn(
              "space-y-2.5",
              "[&_a]:text-brand [&_a]:underline",
              "[&_code]:rounded [&_code]:bg-navy-50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-xs",
              "[&_h1]:text-base [&_h1]:font-bold [&_h2]:text-sm [&_h2]:font-bold [&_h3]:text-sm [&_h3]:font-bold",
              "[&_li]:ml-1 [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5",
              "[&_strong]:font-bold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5",
              "[&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:border [&_td]:border-hairline [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-hairline [&_th]:px-2 [&_th]:py-1",
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {normalizeMath(content)}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
