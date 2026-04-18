import { jobs } from "../api/mockData";
import { useStore } from "../store/store";

export default function QueueList() {
  const setSelectedId = useStore((s) => s.setSelectedId);

  return (
    <div>
      <h3>Queue</h3>
      {jobs.map((job) => (
        <div
          key={job.id}
          onClick={() => setSelectedId(job.id)}
          style={{
            padding: "10px",
            borderBottom: "1px solid gray",
            cursor: "pointer",
          }}
        >
          {job.name} - {job.status}
        </div>
      ))}
    </div>
  );
}