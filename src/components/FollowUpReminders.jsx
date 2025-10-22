import React, { useState } from 'react';

export default function FollowUpReminders({ followUps, setFollowUps }) {
  const [newFollowUp, setNewFollowUp] = useState({
    customer: '',
    vehicle: '',
    type: '',
    dueDate: '',
    notes: '',
    phone: '',
    email: '',
  });

  const addFollowUp = () => {
    if (newFollowUp.customer && newFollowUp.dueDate) {
      setFollowUps([
        ...followUps,
        {
          id: Date.now(),
          ...newFollowUp,
          status: 'pending',
        },
      ]);
      setNewFollowUp({
        customer: '',
        vehicle: '',
        type: '',
        dueDate: '',
        notes: '',
        phone: '',
        email: '',
      });
    }
  };

  const completeFollowUp = (id) => {
    setFollowUps(
      followUps.map((f) =>
        f.id === id ? { ...f, status: 'completed' } : f
      )
    );
  };

  const deleteFollowUp = (id) => {
    setFollowUps(followUps.filter((f) => f.id !== id));
  };

  return (
    <section>
      <h2 className="section-header mb-4">Follow-up Reminders</h2>
      <div className="mb-6 bg-purple-50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Customer"
          value={newFollowUp.customer}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, customer: e.target.value })
          }
          className="input-field mb-2"
        />
        <input
          type="text"
          placeholder="Vehicle"
          value={newFollowUp.vehicle}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, vehicle: e.target.value })
          }
          className="input-field mb-2"
        />
        <input
          type="text"
          placeholder="Type"
          value={newFollowUp.type}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, type: e.target.value })
          }
          className="input-field mb-2"
        />
        <input
          type="date"
          placeholder="Due Date"
          value={newFollowUp.dueDate}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, dueDate: e.target.value })
          }
          className="input-field mb-2"
        />
        <textarea
          placeholder="Notes"
          value={newFollowUp.notes}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, notes: e.target.value })
          }
          className="input-field mb-2"
        />
        <input
          type="tel"
          placeholder="Phone"
          value={newFollowUp.phone}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, phone: e.target.value })
          }
          className="input-field mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newFollowUp.email}
          onChange={(e) =>
            setNewFollowUp({ ...newFollowUp, email: e.target.value })
          }
          className="input-field mb-2"
        />
        <button onClick={addFollowUp} className="btn-purple px-4 py-2">
          Add Follow-up
        </button>
      </div>
      <div className="space-y-3">
        {followUps.map((fu) => (
          <div
            key={fu.id}
            className={`p-4 rounded-lg border ${
              fu.status === 'completed'
                ? 'bg-green-100 border-green-400'
                : 'bg-white border-gray-300'
            } flex justify-between items-center`}
          >
            <div>
              <p className="font-semibold">{fu.customer} - {fu.type}</p>
              <p className="text-sm">Vehicle: {fu.vehicle}</p>
              <p className="text-sm">Due: {fu.dueDate}</p>
              <p className="text-sm text-gray-700">{fu.notes}</p>
              <p className="text-sm">Phone: {fu.phone} | Email: {fu.email}</p>
            </div>
            <div className="flex gap-2">
              {fu.status !== 'completed' && (
                <button
                  onClick={() => completeFollowUp(fu.id)}
                  className="btn-success btn-sm"
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => deleteFollowUp(fu.id)}
                className="btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
