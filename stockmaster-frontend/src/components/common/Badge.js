import React from 'react';
import { STATUS_COLORS } from '../../utils/constants';

const Badge = ({ status, children, className = '' }) => {
  const colorClass = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800';

  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full 
        text-xs font-medium capitalize
        ${colorClass}
        ${className}
      `}
    >
      {children || status}
    </span>
  );
};

export default Badge;