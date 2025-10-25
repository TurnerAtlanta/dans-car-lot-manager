import React from 'react';
import { TimeLog } from '../../types';
import { formatDate, formatDuration } from '../../utils/formatters';

interface ActivityTimelineProps {
  timeLogs: TimeLog[];
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ timeLogs }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h4 className="font-bold mb-2">Activity Timeline</h4>
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-gray-300"></div>
        {timeLogs.map(log => (
          <div key={log.id} className="mb-4 relative">
            <div className="absolute left-[-10px] top-2 w-4 h-4 bg-blue-500 rounded-full"></div>
            <p className="text-sm">{formatDate(log.startTime)}</p>
            <p>{log.description || 'No description'}</p>
            <p className="text-sm text-gray-500">Duration: {formatDuration(log.duration)}</p>
            <p className="text-sm text-gray-500">By: {log.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTimeline;
