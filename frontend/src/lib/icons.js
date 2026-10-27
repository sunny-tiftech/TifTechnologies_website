import {
  Globe,
  Smartphone,
  Server,
  Target,
  Sparkles,
  Bot,
  Newspaper,
  Megaphone,
  TrendingUp,
  Gift,
} from "lucide-react";

export const iconMap = {
  globe: Globe,
  smartphone: Smartphone,
  server: Server,
  target: Target,
  sparkles: Sparkles,
  bot: Bot,
  newspaper: Newspaper,
  megaphone: Megaphone,
  trending: TrendingUp,
  gift: Gift,
};

export const Icon = ({ name, ...props }) => {
  const Cmp = iconMap[name] || Globe;
  return <Cmp {...props} />;
};
