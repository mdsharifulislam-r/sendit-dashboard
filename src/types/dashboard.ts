import { LucideIcon } from 'lucide-react';

export interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendColor: string;
    icon: LucideIcon | React.ElementType;
    iconColor: string;
    iconBg: string;
    showStar?: boolean;
}
