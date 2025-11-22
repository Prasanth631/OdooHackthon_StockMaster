import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

const variants = {
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: Info
  },
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: CheckCircle
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertCircle
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: XCircle
  }
};

const Alert = ({ variant = 'info', title, message, onClose, className = '' }) => {
  const { bg, text, icon: Icon } = variants[variant];

  return (
    <div className={`border rounded-lg p-4 ${bg} ${className}`}>
      <div className="flex">
        <Icon className={`h-5 w-5 ${text} mr-3 flex-shrink-0`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-medium ${text}`}>{title}</h4>
          )}
          <p className={`text-sm ${text} ${title ? 'mt-1' : ''}`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button onClick={onClose} className={`${text} hover:opacity-70`}>
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;