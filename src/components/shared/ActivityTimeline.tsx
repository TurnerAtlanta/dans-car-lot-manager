

interface TimelineEntry {
  id: number;
  time: string;
  duration: string;
  activity: string;
}

interface ActivityTimelineProps {
  entries: TimelineEntry[];
}

export function ActivityTimeline({ entries }: ActivityTimelineProps) {
  return (
    <div className="space-y-3">
      {entries.map((entry, index) => (
        <div key={entry.id} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            {index < entries.length - 1 && (
              <div className="w-0.5 flex-1 bg-blue-200 mt-1"></div>
            )}
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-800">{entry.time}</span>
              <span className="text-xs text-gray-500">• {entry.duration}</span>
            </div>
            <p className="text-sm text-gray-600">{entry.activity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
