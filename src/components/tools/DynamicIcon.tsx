import React from 'react';
import {
  DollarSign,
  Search,
  Sparkles,
  TrendingUp,
  Wrench,
  BadgeCheck,
  Fingerprint,
  Tag,
  Calculator,
  Gauge,
  Users,
  Image,
  FileText,
  Hash,
  Smartphone,
  ListOrdered,
  Percent,
  CheckSquare,
  Layers,
  HelpCircle,
  Info,
  ShieldCheck,
  Activity,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  DollarSign,
  Search,
  Sparkles,
  TrendingUp,
  Wrench,
  BadgeCheck,
  Fingerprint,
  Tag,
  Calculator,
  Gauge,
  Users,
  Image,
  FileText,
  Hash,
  Smartphone,
  ListOrdered,
  Percent,
  CheckSquare,
  Layers,
  HelpCircle,
  Info,
  ShieldCheck,
  Activity,
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className = 'h-5 w-5' }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name] || Wrench;
  return <IconComponent className={className} />;
}
