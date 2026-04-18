import { jobs } from "../api/mockData";
import { useStore } from "../store/store";

export default function DetailPanel() {
  const selectedId = useStore((s) => s.selectedId);

  const job = jobs.find((j) => j.id === selectedId);

  if (!job) return <div>Select a job</div>;

  return (
    <div>
      <h3>Details</h3>
      <p>ID: {job.id}</p>
      <p>Status: {job.status}</p>
    </div>
  );
}