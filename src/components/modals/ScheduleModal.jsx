import React, { useState } from 'react';
import { X, Calendar, Mail, MessageSquare } from 'lucide-react';

export default function ScheduleModal({ isOpen, onClose, onSchedule }) {
  const [frequency, setFrequency] = useState('daily');
  const [time, setTime] = useState('17:00');
  const [method, setMethod] = useState('email');
  const [recipientEmail, setRecipientEmail] = useState('boss@carlot.com');
  const [recipientPhone, setRecipientPhone] = useState('555-0123');

  if (!isOpen) return null;

  const handleSchedule = () => {
    onSchedule({
      frequency,
      time,
      method,
      recipient: method === 'email' ? recipientEmail : recipientPhone,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Schedule Automatic Reports</h2>
            <p className="modal-subtitle">Set up automatic report delivery via email or text</p>
          </div>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="email"
                  checked={method === 'email'}
                  onChange={(e) => setMethod(e.target.value)}
                  className="text-indigo-600"
                />
                <Mail size={18} />
                <span>Email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="text"
                  checked={method === 'text'}
                  onChange={(e) => setMethod(e.target.value)}
                  className="text-indigo-600"
                />
                <MessageSquare size={18} />
                <span>Text/SMS</span>
              </label>
            </div>
          </div>

          {method === 'email' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                placeholder="boss@carlot.com"
                className="input-field"
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                placeholder="555-0123"
                className="input-field"
              />
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button onClick={handleSchedule} className="btn-primary flex-1">
              <Calendar size={20} />
              Schedule Report
            </button>
            <button onClick={onClose} className="btn-secondary px-6">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

