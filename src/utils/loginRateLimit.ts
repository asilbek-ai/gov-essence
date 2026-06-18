/* Client-side admin login rate limiter.
 *
 * Mitigates brute-force by throttling repeated failed attempts in the same
 * browser. State is persisted to localStorage so a refresh cannot reset it.
 *
 * Tiered lockouts (resets fully after a clean window of NO failures):
 *   < 5 failed attempts  → no lock
 *   5  failed attempts   → 30s lock
 *   7  failed attempts   → 2min lock
 *   10 failed attempts   → 10min lock
 *   15+ failed attempts  → 30min lock
 *
 * Note: This is a UX-level mitigation only. A determined attacker can clear
 * localStorage. Real protection requires server-side rate limiting.
 */

const KEY = "st_admin_rl_v1";
const RESET_AFTER_MS = 30 * 60 * 1000; // a clean half hour clears the counter

type State = { fails: number; firstFailAt: number; lockedUntil: number };

function read(): State {
  if (typeof window === "undefined") return { fails: 0, firstFailAt: 0, lockedUntil: 0 };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { fails: 0, firstFailAt: 0, lockedUntil: 0 };
    const s = JSON.parse(raw) as State;
    // auto-reset if last failure is older than RESET_AFTER_MS and not locked
    if (s.lockedUntil < Date.now() && s.firstFailAt && Date.now() - s.firstFailAt > RESET_AFTER_MS) {
      return { fails: 0, firstFailAt: 0, lockedUntil: 0 };
    }
    return s;
  } catch {
    return { fails: 0, firstFailAt: 0, lockedUntil: 0 };
  }
}

function write(s: State) {
  try { window.localStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

function lockoutFor(fails: number): number {
  if (fails >= 15) return 30 * 60 * 1000;
  if (fails >= 10) return 10 * 60 * 1000;
  if (fails >= 7) return 2 * 60 * 1000;
  if (fails >= 5) return 30 * 1000;
  return 0;
}

export function getLockRemainingMs(): number {
  const s = read();
  return Math.max(0, s.lockedUntil - Date.now());
}

export function getFailCount(): number {
  return read().fails;
}

/** Call BEFORE attempting a login. Returns remaining lock in ms (0 = allowed). */
export function checkRateLimit(): number {
  return getLockRemainingMs();
}

/** Record a failed attempt and apply tiered lockout. Returns the new lock ms (0 = none). */
export function recordFail(): number {
  const now = Date.now();
  const prev = read();
  const fails = prev.fails + 1;
  const firstFailAt = prev.firstFailAt || now;
  const lock = lockoutFor(fails);
  const lockedUntil = lock > 0 ? now + lock : 0;
  write({ fails, firstFailAt, lockedUntil });
  return lock;
}

/** Clear all rate-limit state (call on successful login). */
export function recordSuccess() {
  try { window.localStorage.removeItem(KEY); } catch {}
}

export function formatRemaining(ms: number): string {
  const s = Math.ceil(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return r ? `${m}m ${r}s` : `${m}m`;
}
