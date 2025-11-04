import { useState } from 'react';
import { X, Clock, Mail} from 'lucide-react';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (schedule: ScheduleConfig) => void;
}

interface ScheduleConfig {
  frequency: string;
  time: string;
  email: boolean;
  sms: boolean;
  recipients: string;
}

export default function ScheduleModal({ isOpen, onClose, onSchedule }: ScheduleModalProps) {
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('09:00');
  const [email, setEmail] = useState(true);
  const [sms, setSms] = useState(false);
  const [recipients, setRecipients] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSchedule({ frequency, time, email, sms, recipients });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Schedule Reports</h2>
            <p className="modal-subtitle">Automate report delivery</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="form-label">Frequency</label>
            <select 
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="select-field"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label className="form-label">Time</label>
            <input 
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="form-label">Delivery Method</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={email}
                  onChange={(e) => setEmail(e.target.checked)}
                />
                <Mail size={16} />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  checked={sms}
                  onChange={(e) => setSms(e.target.checked)}
                />
                <span>SMS</span>
              </label>
            </div>
          </div>

          <div>
            <label className="form-label">Recipients</label>
            <input 
              type="text"
              placeholder="email@example.com"
              value={recipients}
              onChange={(e) => setRecipients(e.target.value)}
              className="input-field"
            />
          </div>

          <button onClick={handleSubmit} className="btn-primary w-full">
            <Clock size={18} />
            Schedule Report
          </button>
        </div>
      </div>
    </div>
  );
}
