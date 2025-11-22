import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, ArrowRightLeft, ClipboardCheck } from 'lucide-react';
import Badge from '../common/Badge';

const typeIcons = {
  receipt: { icon: ArrowDownCircle, color: 'text-green-500' },
  delivery: { icon: ArrowUpCircle, color: 'text-red-500' },
  transfer: { icon: ArrowRightLeft, color: 'text-blue-500' },
  adjustment: { icon: ClipboardCheck, color: 'text-purple-500' }
};

const RecentMovements = ({ movements }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Movements</h3>
      
      {!movements || movements.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No recent movements</p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {movements.map((movement) => {
            const { icon: Icon, color } = typeIcons[movement.type] || typeIcons.receipt;
            return (
              <div
                key={movement.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Icon className={`${color} flex-shrink-0`} size={24} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900 truncate">{movement.document}</p>
                    <Badge status={movement.status} />
                  </div>
                  <p className="text-sm text-gray-500">{movement.product}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`font-semibold ${
                    movement.quantity.startsWith('+') ? 'text-green-600' : 
                    movement.quantity.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {movement.quantity}
                  </p>
                  <p className="text-xs text-gray-500">{movement.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentMovements;