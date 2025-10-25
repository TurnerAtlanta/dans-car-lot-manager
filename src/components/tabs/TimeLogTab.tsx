import React from 'react';
import { useTimeLogs } from '../../hooks';
import ActivityTimeline from '../ui/ActivityTimeline';

const TimeLogTab: React.FC = () => {
  const { timeLogs, loading, error } = useTimeLogs();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Time Logs</h2>
      <ActivityTimeline timeLogs={timeLogs} />
    </div>
  );
};

export default TimeLogTab;
