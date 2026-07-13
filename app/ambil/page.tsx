"use client"
import { useState } from "react";

export default function Home() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [path, setPath] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchJson(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const q = new URLSearchParams({ owner, repo, path });
      const r = await fetch(`/api/github?${q.toString()}`);
      const json = await r.json();
      if (!r.ok) {
        setError(json.error || "Failed to fetch");
        console.error("Error fetching JSON:", json.error || "Unknown error");
      } else {
        setResult(json.data);
        console.log("Fetched JSON:", json.data)
      }
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Fetch JSON from GitHub via Octokit</h1>
      <form onSubmit={fetchJson} style={{ display: "grid", gap: 8, maxWidth: 560 }}>
        <label>
          Owner (user or org)
          <input value={owner} onChange={(e) => setOwner(e.target.value)} placeholder="e.g. bone04" />
        </label>
        <label>
          Repo
          <input value={repo} onChange={(e) => setRepo(e.target.value)} placeholder="e.g. my-data-repo" />
        </label>
        <label>
          Path to JSON file
          <input value={path} onChange={(e) => setPath(e.target.value)} placeholder="e.g. data/db.json" />
        </label>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Loading…" : "Fetch JSON"}
          </button>
        </div>
      </form>

      {error && (
        <div style={{ marginTop: 16, color: "crimson" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <section style={{ marginTop: 16 }}>
          <h2>Result</h2>
          <pre style={{ background: "#f6f8fa", padding: 12, borderRadius: 6, overflowX: "auto" }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </section>
      )}
    </main>
  );
}
