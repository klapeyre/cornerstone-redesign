"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

const PASSWORD_BASE64 = "Y29ybmVyc3RvbmUyMDI2IQ==";
const STORAGE_KEY = "cornerstone-gate-expires-at";
const CHANGE_EVENT = "cornerstone-gate-changed";
const SESSION_DURATION_MS = 60 * 60 * 1000;
const RECHECK_INTERVAL_MS = 30 * 1000;

function readExpiry(): number | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const expiresAt = Number(raw);
  return Number.isFinite(expiresAt) ? expiresAt : null;
}

function isCleared(): boolean {
  const expiresAt = readExpiry();
  return expiresAt !== null && expiresAt > Date.now();
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  const interval = window.setInterval(onChange, RECHECK_INTERVAL_MS);

  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.clearInterval(interval);
  };
}

function getServerSnapshot() {
  return false;
}

export default function AccessGate({ children }: { children: React.ReactNode }) {
  const unlocked = useSyncExternalStore(subscribe, isCleared, getServerSnapshot);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (btoa(password) === PASSWORD_BASE64) {
      window.localStorage.setItem(
        STORAGE_KEY,
        String(Date.now() + SESSION_DURATION_MS),
      );
      window.dispatchEvent(new Event(CHANGE_EVENT));
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  }

  if (!unlocked) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-bg px-6">
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[360px] flex-col gap-5 border border-line bg-card p-8"
        >
          <div>
            <h1 className="font-display text-xl text-ink">Restricted preview</h1>
            <p className="mt-2 text-sm text-muted">
              This is a temporary preview build. Enter the password to continue.
            </p>
          </div>
          <div>
            <label htmlFor="gate-password" className="field-label">
              Password
            </label>
            <input
              id="gate-password"
              name="password"
              type="password"
              autoFocus
              className="field"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError(false);
              }}
            />
            {error && (
              <p className="mt-2 text-sm text-accent">Incorrect password.</p>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Enter
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
