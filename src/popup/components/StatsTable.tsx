import { useEffect, useState } from 'react';

export default function StatsTable() {
  const [stats, setStats] = useState<{ [channel: string]: Stats }>({});

  function minutesToString(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const minutesRemaining = minutes % 60;
    return `${hours}h ${minutesRemaining}m`;
  }

  useEffect(() => {
    chrome.storage.sync.get(setStats);
  }, [stats]);

  return (
    <table>
      <thead>
        <tr>
          <th>Channel</th>
          <th>Messages</th>
          <th>Watchtime</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(stats).map(([channel, stats]) => (
          <tr key={channel}>
            <td>{channel}</td>
            <td>{stats.messages}</td>
            <td>{minutesToString(stats.minutesWatched)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
