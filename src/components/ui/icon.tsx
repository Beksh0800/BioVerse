import {
  Award,
  Bot,
  ChartColumn,
  ClipboardList,
  FlaskConical,
  Folder,
  Home,
  Info,
  Leaf,
  ListChecks,
  QrCode,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  CircleHelp,
  type LucideIcon,
} from "lucide-react";

/**
 * Контент хранит иконки строковыми ключами, чтобы файлы в src/content
 * оставались чистыми данными без импортов React.
 */
const registry: Record<string, LucideIcon> = {
  home: Home,
  info: Info,
  folder: Folder,
  star: Star,
  chart: ChartColumn,
  bot: Bot,
  qr: QrCode,
  award: Award,
  target: Target,
  help: CircleHelp,
  sparkles: Sparkles,
  list: ListChecks,
  shield: Shield,
  clipboard: ClipboardList,
  trend: TrendingUp,
  leaf: Leaf,
  flask: FlaskConical,
};

export function Icon({
  name,
  className,
  strokeWidth = 2,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} strokeWidth={strokeWidth} aria-hidden />;
}
