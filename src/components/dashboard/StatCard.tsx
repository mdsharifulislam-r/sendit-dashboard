import React from 'react';
import { StatCardProps } from "@/types";

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendColor, 
  icon: Icon, 
  iconColor, 
  iconBg,
  showStar 
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 flex flex-col justify-between h-40">
      <div className="flex justify-between items-start">
        <span className="text-gray-500 text-sm font-medium">{title}</span>
        <span className={`text-xs font-bold ${trendColor}`}>{trend}</span>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
          {showStar && <span className="text-yellow-400 text-xl block">★</span>}
        </div>
        <div className={`p-3 rounded-2xl ${iconBg}`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;