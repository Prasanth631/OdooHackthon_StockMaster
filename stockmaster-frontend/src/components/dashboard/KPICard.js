import React from 'react';

const KPICard = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
      <div className={`${colorClasses[color] || 'bg-blue-500'} p-3 rounded-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;