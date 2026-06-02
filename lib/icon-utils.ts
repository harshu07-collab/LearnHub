import React from 'react';
import {
  BookOpen,
  Brain,
  Code,
  Palette,
  Cloud,
  Zap,
  BarChart3,
  Database,
  Layers,
  Smartphone,
  PenTool,
  Gauge,
  Award,
  Compass,
  Lightbulb,
  Rocket,
  Shield,
  Cpu,
  Network,
  Feather,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Brain,
  Code,
  Palette,
  Cloud,
  Zap,
  BarChart3,
  Database,
  Layers,
  Smartphone,
  PenTool,
  Gauge,
  Award,
  Compass,
  Lightbulb,
  Rocket,
  Shield,
  Cpu,
  Network,
  Feather,
};

export function getIcon(iconName: string = 'BookOpen'): LucideIcon {
  return iconMap[iconName] || BookOpen;
}

export function renderIcon(iconName: string = 'BookOpen', className: string = 'w-6 h-6') {
  const IconComponent = getIcon(iconName);
  return React.createElement(IconComponent, { className });
}
