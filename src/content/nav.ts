/** Навигация платформы. Подписи на казахском, термины BIO SCORE / AI / QR — латиницей. */

export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Басты бет", icon: "home" },
  { href: "/about", label: "BIOVERSE туралы", icon: "info" },
  { href: "/projects", label: "Жобалар", icon: "folder" },
  { href: "/bio-score", label: "BIO SCORE", icon: "star" },
  { href: "/analytics", label: "Аналитика", icon: "chart" },
  { href: "/ai", label: "AI көмекшісі", icon: "bot" },
  { href: "/portfolio", label: "Портфолио (QR)", icon: "qr" },
  { href: "/certificate", label: "Сертификат", icon: "award" },
];
