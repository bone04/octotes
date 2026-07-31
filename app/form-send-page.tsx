'use client';

import React, { useState } from 'react';

type Field = { id: number; key: string; value: string };

export default function FormPage() {
  const [fields, setFields] = useState<Field[]>([
    { id: 1, key: 'name', value: 'Alice' },
    { id: 2, key: 'email', value: 'alice@example.com' },
  ]);
  const [nextId, setNextId] = useState(3);
  const [rawMode, setRawMode] = useState(false);
  const [rawJson, setRawJson] = useState('{ "foo": "bar" }');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addField() {
    setFields((s) => [...s, { id: nextId, key: '', value: '' }]);
    setNextId((n) => n + 1);
  }

  function updateField(id: number, patch: Partial<Field>) {
    setFields((s) => s.map((f) => (f.id === id ? { ...f, ...patch } : f)));
  }

  function removeField(id: number) {
    setFields((s) => s.filter((f) => f.id !== id));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResponse(null);
    setLoading(true);

    let payload: any;
    if (rawMode) {
      try {
        payload = JSON.parse(rawJson);
      } catch (err: any) {
        setError('Raw JSON is invalid: ' + err.message);
        setLoading(false);
        return;
      }
    } else {
      payload = {};
      for (const f of fields) {
        if (!f.key) continue;
        // try to parse primitives (number, boolean, null) else use string
        const v = (() => {
          const trimmed = f.value.trim();
          if (trimmed === 'null') return null;
          if (trimmed === 'true') return true;
          if (trimmed === 'false') return false;
          if (!Number.isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);
          return f.value;
        })();
        payload[f.key] = v;
      }
    }

    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResponse({ status: res.status, body: data });
    } catch (err: any) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 900 }}>
      <h1>Send Any Data — Demo Form</h1>

      <label style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <input
          type="checkbox"
          checked={rawMode}
          onChange={(e) => setRawMode(e.target.checked)}
        />
        Use raw JSON (paste full JSON)
      </label>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        {!rawMode ? (
          <section style={{ marginBottom: 12 }}>
            {fields.map((f) => (
              <div
                key={f.id}
                style={{
                  display: 'flex',
                  gap: 8,
                  marginBottom: 8,
                  alignItems: 'center',
                }}
              >
                <input
                  placeholder="key"
                  value={f.key}
                  onChange={(e) => updateField(f.id, { key: e.target.value })}
                  style={{ width: 200, padding: 8 }}
                />
                <input
                  placeholder="value"
                  value={f.value}
                  onChange={(e) => updateField(f.id, { value: e.target.value })}
                  style={{ flex: 1, padding: 8 }}
                />
                <button
                  type="button"
                  onClick={() => removeField(f.id)}
                  aria-label="Remove field"
                  style={{ padding: '6px 10px' }}
                >
                  Remove
                </button>
              </div>
            ))}
            <div>
              <button type="button" onClick={addField} style={{ padding: '8px 12px' }}>
                + Add field
              </button>
            </div>
          </section>
        ) : (
          <section style={{ marginBottom: 12 }}>
            <textarea
              value={rawJson}
              onChange={(e) => setRawJson(e.target.value)}
              rows={8}
              style={{ width: '100%', padding: 8, fontFamily: 'monospace' }}
            />
          </section>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button type="submit" disabled={loading} style={{ padding: '10px 14px' }}>
            {loading ? 'Sending…' : 'Send to /api/send'}
          </button>
          <button
            type="button"
            onClick={() => {
              setFields([
                { id: 1, key: 'name', value: 'Alice' },
                { id: 2, key: 'email', value: 'alice@example.com' },
              ]);
              setRawJson('{ "foo": "bar" }');
              setRawMode(false);
              setResponse(null);
              setError(null);
            }}
            style={{ padding: '10px 14px' }}
          >
            Reset
          </button>
        </div>
      </form>

      <section>
        <h2>Payload preview</h2>
        <pre style={{ background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {JSON.stringify(
            rawMode
              ? (() => {
                  try {
                    return JSON.parse(rawJson);
                  } catch {
                    return rawJson;
                  }
                })()
              : fields.reduce<Record<string, any>>((acc, f) => {
                  if (!f.key) return acc;
                  const trimmed = f.value.trim();
                  let val: any = f.value;
                  if (trimmed === 'null') val = null;
                  else if (trimmed === 'true') val = true;
                  else if (trimmed === 'false') val = false;
                  else if (!Number.isNaN(Number(trimmed)) && trimmed !== '') val = Number(trimmed);
                  acc[f.key] = val;
                  return acc;
                }, {}),
            null,
            2
          )}
        </pre>
      </section>

      <section style={{ marginTop: 16 }}>
        <h2>Response</h2>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        {response ? (
          <pre style={{ background: '#0b1220', color: '#d6f8ff', padding: 12, borderRadius: 6 }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        ) : (
          <div style={{ color: '#666' }}>No response yet.</div>
        )}
      </section>
    </main>
  );
}