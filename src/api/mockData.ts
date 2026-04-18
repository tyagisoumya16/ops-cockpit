export const jobs = Array.from({ length: 10 }, (_, i) => ({
  id: `job-${i}`,
  name: `Workflow ${i}`,
  status: i % 2 === 0 ? "running" : "failed",
}));