import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { site } from "@/content/site";

/**
 * Сабсеты cyrillic и cyrillic-ext обязательны: без cyrillic-ext казахские
 * глифы (ә, ғ, қ, ң, ө, ұ, ү, һ, і) уходят на системный шрифт и текст
 * рассыпается по начертаниям прямо посреди строки.
 */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.fullTitle,
  keywords: ["BIOVERSE", "PBL", "биология", "BIO SCORE", "Daryn Teacher Prize"],
};

export const viewport: Viewport = {
  themeColor: "#0b2a5b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      className={`${inter.variable} h-full`}
      /* Плавная прокрутка задана в globals.css. Без этого атрибута Next
         отключает её на переходах между страницами — и предупреждает об этом
         в консоли разработки. */
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
