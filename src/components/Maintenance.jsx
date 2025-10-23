import React from 'react';

export default function Maintenance({ maintenanceRecords }) {
  return (
    <section>
      <h2 className="section-header mb-4">Maintenance Records</h2>
      <div className="space-y-4">
        {maintenanceRecords.map((record) => (
          <div
            key={record.id}
            className="card p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-lg">{record.service}</h3>
              <span className="badge">
                {record.status}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Vehicle: {record.vehicle} | Date: {record.date}
            </p>
            {record.notes && (
              <p className="mt-2 text-gray-700">
                Notes: {record.notes}
              </p>
            )}
            <p className="mt-2 font-semibold">
              Cost: {record.cost}
            </p>
            <div className="flex gap-2 mt-2">
              {record.photos?.map((photo, idx) => (
                <span
                  key={idx}
                  aria-label="photo"
                  className="photo-thumbnail"
                  style={{
                    display: 'inline-block',
                    width: 40,
                    height: 40,
                    borderRadius: 8,
                    backgroundImage: `url(${photo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
