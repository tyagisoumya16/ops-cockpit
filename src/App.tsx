import { useEffect, useMemo, useState } from "react";

type Status = "running" | "failed" | "completed" | "paused";

type Job = {
  id: string;
  name: string;
  status: Status;
};

function App() {
  // 🔥 LARGE DATASET
  const [jobs, setJobs] = useState<Job[]>(
    Array.from({ length: 200 }, (_, i) => ({
      id: String(i),
      name: `Workflow ${i}`,
      status: i % 3 === 0 ? "failed" : "running",
    }))
  );

  const [selected, setSelected] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("selected");
  });

  const [filter, setFilter] = useState<"all" | "running" | "failed">("all");

  const [events, setEvents] = useState<string[]>([]);
  const [isOffline, setIsOffline] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selected);

  // 🔥 FILTERED LIST
  const filteredJobs = useMemo(() => {
    if (filter === "all") return jobs;
    return jobs.filter((j) => j.status === filter);
  }, [jobs, filter]);

  // 🔥 URL sync
  useEffect(() => {
    const params = new URLSearchParams();
    if (selected) params.set("selected", selected);
    params.set("filter", filter);
    window.history.replaceState({}, "", "?" + params.toString());
  }, [selected, filter]);

  // 🔥 LIVE UPDATES + CONFLICT
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prev) => {
        const index = Math.floor(Math.random() * prev.length);

        const updated = prev.map((job, i) =>
          i === index
            ? {
                ...job,
                status:
                  job.status === "running"
                    ? "failed"
                    : "running",
              }
            : job
        );

        setEvents((e) => [
          `External update on job ${prev[index].id}`,
          ...e,
        ]);

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 OFFLINE SIM
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOffline(Math.random() < 0.3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 ACTION HANDLER (retry / pause / cancel)
  const handleAction = (id: string, action: string) => {
    const prev = [...jobs];

    setEvents((e) => [`${action} triggered on ${id}`, ...e]);

    // optimistic update
    setJobs((j) =>
      j.map((job) =>
        job.id === id
          ? {
              ...job,
              status:
                action === "retry"
                  ? "running"
                  : action === "pause"
                  ? "paused"
                  : "failed",
            }
          : job
      )
    );

    setTimeout(() => {
      const success = Math.random() > 0.5;

      if (!success) {
        setJobs(prev); // rollback
        setEvents((e) => [`${action} failed → rollback`, ...e]);
        alert(`${action} failed`);
      } else {
        setEvents((e) => [`${action} success`, ...e]);
      }
    }, 1500);
  };

  const color = (s: Status) =>
    s === "running" ? "blue" : s === "failed" ? "red" : s === "paused" ? "orange" : "green";

  return (
    <div style={{ fontFamily: "Arial" }}>

      {/* OFFLINE */}
      {isOffline && (
        <div style={{ background: "red", color: "white", padding: "5px" }}>
          Offline mode
        </div>
      )}

      <div style={{ display: "flex", height: "100vh" }}>

        {/* LEFT */}
        <div style={{ width: "30%", borderRight: "1px solid gray", padding: "10px", overflow: "auto" }}>
          <h3>Queue</h3>

          {/* FILTER */}
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
            <option value="all">All</option>
            <option value="running">Running</option>
            <option value="failed">Failed</option>
          </select>

          {filteredJobs.map((job) => (
            <div
              key={job.id}
              onClick={() => setSelected(job.id)}
              style={{
                padding: "6px",
                cursor: "pointer",
                background: selected === job.id ? "#eee" : "",
              }}
            >
              {job.name} - <span style={{ color: color(job.status) }}>{job.status}</span>
            </div>
          ))}
        </div>

        {/* MIDDLE */}
        <div style={{ width: "40%", borderRight: "1px solid gray", padding: "10px" }}>
          <h3>Details</h3>

          {selectedJob ? (
            <>
              <p>ID: {selectedJob.id}</p>
              <p>Status: {selectedJob.status}</p>

              <button onClick={() => handleAction(selectedJob.id, "retry")}>
                Retry
              </button>

              <button onClick={() => handleAction(selectedJob.id, "pause")}>
                Pause
              </button>

              <button onClick={() => handleAction(selectedJob.id, "cancel")}>
                Cancel
              </button>
            </>
          ) : (
            <p>Select a job</p>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ width: "30%", padding: "10px", overflow: "auto" }}>
          <h3>Timeline</h3>

          {events.map((e, i) => (
            <div key={i} style={{ fontSize: "12px" }}>
              {e}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;