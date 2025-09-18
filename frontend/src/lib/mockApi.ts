// Simple mock API layer to simulate backend calls
// All methods return Promises with small artificial delays

export interface SlideDTO {
  slideNumber: number;
  pageNumber?: number;
  content: string;
}

function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

// Example scripts loader (from public/example-scripts.json)
type ExampleScripts = { slides: { slideNumber: number; content: string }[] };
let exampleScriptsCache: Promise<Map<number, string>> | null = null;

async function loadExampleScripts(): Promise<Map<number, string>> {
  if (!exampleScriptsCache) {
    exampleScriptsCache = fetch('/example-scripts.json')
      .then((res) => {
        if (!res.ok) throw new Error('example-scripts.json not found');
        return res.json() as Promise<ExampleScripts>;
      })
      .then((json) => {
        const map = new Map<number, string>();
        json.slides?.forEach((s) => map.set(s.slideNumber, s.content));
        return map;
      });
  }
  return exampleScriptsCache;
}

export async function generateSlideScript(slide: SlideDTO): Promise<string> {
  await delay(400); // simulate network/LLM time

  // Only example-scripts.json is used in mocked mode
  try {
    const map = await loadExampleScripts();
    const fromJson = map.get(slide.pageNumber ?? slide.slideNumber);
    return fromJson ?? '';
  } catch {
    return '';
  }
}

export async function generateBulkScripts(slides: SlideDTO[]): Promise<SlideDTO[]> {
  await delay(700);
  // Only example-scripts.json is used in mocked mode
  let map: Map<number, string> | undefined;
  try {
    map = await loadExampleScripts();
  } catch {}
  const results = slides.map((s) => {
    const n = s.pageNumber ?? s.slideNumber;
    const fromJson = map?.get(n);
    const content = fromJson ?? (s.content ?? '');
    return { ...s, content };
  });
  return results;
}

export async function saveSlides(_slides: SlideDTO[]): Promise<{ ok: boolean }>
{
  await delay(250);
  // pretend to persist
  return { ok: true };
}

export interface ReportInput {
  totalTime: { minutes: number; seconds: number };
  pageTimes: Record<number, { minutes: number; seconds: number }>;
  slides: SlideDTO[];
  goalTime?: { minutes: number; seconds: number };
}

export interface ReportOutput {
  totalSeconds: number;
  goalSeconds?: number;
  longestSlideNumber?: number;
  percentages: Record<number, number>;
}

export async function buildReport(input: ReportInput): Promise<ReportOutput> {
  await delay(200);
  const totalSeconds = input.totalTime.minutes * 60 + input.totalTime.seconds;
  const goalSeconds = input.goalTime
    ? input.goalTime.minutes * 60 + input.goalTime.seconds
    : undefined;
  const entries = Object.entries(input.pageTimes).map(([n, t]) => ({
    n: Number(n),
    sec: t.minutes * 60 + t.seconds,
  }));
  const longestSlideNumber = entries.length
    ? entries.sort((a, b) => b.sec - a.sec)[0].n
    : undefined;
  const percentages: Record<number, number> = {};
  entries.forEach(({ n, sec }) => {
    percentages[n] = totalSeconds > 0 ? Math.round((sec / totalSeconds) * 100) : 0;
  });
  return { totalSeconds, goalSeconds, longestSlideNumber, percentages };
}


