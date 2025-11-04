import { Phone, Mail, Car } from 'lucide-react';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  status: 'Hot Lead' | 'Warm Lead' | 'Cold Lead' | 'New Lead';
  added: string;
  lastContact?: string;
  vehicleInterest?: string;
}

interface CustomerContactCardProps {
  customer: Customer;
  onCall: (customer: Customer) => void;
  onEmail: (customer: Customer) => void;
}

export function CustomerContactCard({ customer, onCall, onEmail }: CustomerContactCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-bold text-gray-800">{customer.name}</h4>
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-1 ${
            customer.status === 'Hot Lead' ? 'bg-red-100 text-red-700' :
            customer.status === 'Warm Lead' ? 'bg-yellow-100 text-yellow-700' :
            customer.status === 'Cold Lead' ? 'bg-blue-100 text-blue-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {customer.status}
          </span>
        </div>
        <div className="text-right text-xs text-gray-500">
          Last: {customer.lastContact || 'Never'}
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {customer.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} />
            <span>{customer.phone}</span>
          </div>
        )}
        {customer.email && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} />
            <span>{customer.email}</span>
          </div>
        )}
        {customer.vehicleInterest && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Car size={14} />
            <span>Interest: {customer.vehicleInterest}</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <button onClick={() => onCall(customer)} className="btn-primary flex-1 py-2 text-sm">
          <Phone size={14} />
          Call
        </button>
        <button onClick={() => onEmail(customer)} className="btn-secondary flex-1 py-2 text-sm">
          <Mail size={14} />
          Email
        </button>
      </div>
    </div>
  );
}
