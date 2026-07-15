"use client"
import { useState, useEffect } from "react";

export default function AmbilPage() {
    const [data, setData] = useState<{ message: string } | null>(null);
    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(`https://bone04.github.io/octotes/api/ambil`) // Relative URL works perfectly on the client side
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
 if (loading) return <p>Loading...</p>;
  
  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <h1>Fetch JSON from GitHub via Octokit</h1>
      <div>{data?.message}</div>
    </main>
  );
}
