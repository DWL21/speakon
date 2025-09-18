export type ScriptMap = Record<number, string>;

const STORAGE_KEY = 'speakon.scripts';

function readAll(): Record<string, ScriptMap> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeAll(all: Record<string, ScriptMap>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getFileKey(name: string, size: number): string {
  return `${name}__${size}`;
}

export function getScripts(fileKey: string): ScriptMap {
  const all = readAll();
  return all[fileKey] ?? {};
}

export function saveScripts(fileKey: string, scripts: ScriptMap): void {
  const all = readAll();
  all[fileKey] = { ...(all[fileKey] ?? {}), ...scripts };
  writeAll(all);
}

export function setScript(fileKey: string, slideNumber: number, content: string): void {
  const all = readAll();
  const current = all[fileKey] ?? {};
  current[slideNumber] = content;
  all[fileKey] = current;
  writeAll(all);
}

export function getScript(fileKey: string, slideNumber: number): string {
  const all = readAll();
  const current = all[fileKey] ?? {};
  return current[slideNumber] ?? '';
}


