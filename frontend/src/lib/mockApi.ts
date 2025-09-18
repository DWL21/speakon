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

export async function generateSlideScript(slide: SlideDTO): Promise<string> {
  await delay(400); // simulate network/LLM time
  const base = slide.content && slide.content.trim().length > 0 ? slide.content : undefined;
  if (base) return base; // keep existing

  // Deterministic per-page script (pre-authored). If exists, always return this.
  try {
    const { getMockPageScript } = await import('./pdfScriptMock');
    const fixed = getMockPageScript(slide.pageNumber ?? slide.slideNumber);
    if (fixed) return fixed;
  } catch {}

  // If we have per-page mock text (from PDF content), synthesize a focused script
  try {
    const { getMockPageText } = await import('./pdfContentMock');
    const mock = getMockPageText('Emileo', slide.pageNumber ?? slide.slideNumber);
    if (mock) {
      // Convert brief page text into a concise speaking script
      const lines = mock.split('\n').filter(Boolean);
      const [title, ...bullets] = lines;
      const bulletText = bullets.map(b => `- ${b.replace(/^[-•]\s*/, '')}`).join('\n');
      return `${title}\n${bulletText}`;
    }
  } catch {}

  // Final fallback: concise template
  const scenario: Record<number, string> = {};

  return scenario[slide.slideNumber]
    ?? `이번 슬라이드에서는 핵심 내용을 간결하게 정리해 말씀드리겠습니다. 이어지는 흐름 속에서 앞뒤 맥락이 자연스럽게 연결되도록 구성했습니다.`;
}

export async function generateBulkScripts(slides: SlideDTO[]): Promise<SlideDTO[]> {
  await delay(700);
  return slides.map((s) => ({
    ...s,
    content: s.content && s.content.trim().length > 0 ? s.content : `슬라이드 ${s.slideNumber} 요약\n- 핵심 포인트 1\n- 핵심 포인트 2\n- 결론`,
  }));
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


