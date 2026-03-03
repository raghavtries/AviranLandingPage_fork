import type { ReactNode } from 'react';
import content from './cases/content.txt?raw';

function parseInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const key = `${keyPrefix}-${index}`;

    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={key} className="font-semibold text-zinc-100">{part.slice(2, -2)}</strong>;
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={key} className="rounded bg-zinc-800/80 px-1.5 py-0.5 text-[0.9em] text-emerald-300">
          {part.slice(1, -1)}
        </code>
      );
    }

    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={key} className="italic text-zinc-200">{part.slice(1, -1)}</em>;
    }

    return <span key={key}>{part}</span>;
  });
}

function renderFigure(label: string, index: number) {
  const figureSource =
    /Accuracy bar chart|Baseline vs Optimized/i.test(label)
      ? '/cases/fig3_accuracy_bar.svg'
      : /Basic architecture|Agent Architecture/i.test(label)
      ? '/cases/fig1_pipeline_architecture.svg'
      : /Optimization Rounds|Search Loop|Tunable Parameters Per Agent/i.test(label)
        ? '/cases/fig2_mutation_space_bridge.svg'
        : null;

  return (
    <figure
      key={`figure-${index}`}
      className="my-6 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900/70"
    >
      {figureSource ? (
        <img src={figureSource} alt={label} className="h-auto w-full bg-white/5 p-3" />
      ) : (
        <div className="p-4 text-sm text-zinc-400">Figure placeholder: {label}</div>
      )}
      <figcaption className="border-t border-zinc-800 px-4 py-3 text-xs text-zinc-400">{label}</figcaption>
    </figure>
  );
}

function renderContent(markdown: string) {
  const lines = markdown.split('\n');
  const blocks: ReactNode[] = [];
  let i = 0;
  let blockIndex = 0;
  const inferredHeadingLevels: Record<string, 1 | 2 | 3> = {
    'Multi-Agent Manufacturing Diagnostics Optimization': 1,
    'The Core Idea': 2,
    Background: 2,
    Goal: 2,
    Setup: 2,
    'How the Optimization Works': 2,
    'The mechanism': 3,
    'Stability gated scoring': 3,
    Scoring: 3,
    'What the Algorithm Found: Tool Description Rewrites': 2,
    'Superlinear interaction': 3,
    'What the Algorithm Found: Cross-Agent Parameter Dependencies': 2,
    'Temperature coupling': 3,
    'Context flag interference': 3,
    'Model description dependency': 3,
    'Stability: Why Single Pass Eval Misses Production Failures': 2,
    'Stability: Why Single-Pass Eval Is Not Enough': 2,
    'Context Optimization': 2,
    'Routing Layer': 2,
    'Verification Agent': 2,
    Results: 2,
    'Ablation: Where the Gains Came From': 3,
    'By test case difficulty': 3,
    'Optimization scale': 3,
    'What Existing Tools Cannot Do': 2,
    Conclusion: 2,
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed === '---') {
      blocks.push(<hr key={`hr-${blockIndex++}`} className="my-8 border-zinc-800" />);
      i += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const headingText = headingMatch[2];

      if (level === 1) {
        blocks.push(
          <h1 key={`h1-${blockIndex++}`} className="mt-1 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            {parseInline(headingText, `h1-${blockIndex}`)}
          </h1>
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={`h2-${blockIndex++}`} className="mt-10 text-2xl font-semibold text-zinc-100">
            {parseInline(headingText, `h2-${blockIndex}`)}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={`h3-${blockIndex++}`} className="mt-8 text-xl font-semibold text-zinc-200">
            {parseInline(headingText, `h3-${blockIndex}`)}
          </h3>
        );
      }

      i += 1;
      continue;
    }

    const inferredLevel = inferredHeadingLevels[trimmed];
    if (inferredLevel) {
      if (inferredLevel === 1) {
        blocks.push(
          <h1 key={`ih1-${blockIndex++}`} className="mt-1 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            {parseInline(trimmed, `ih1-${blockIndex}`)}
          </h1>
        );
      } else if (inferredLevel === 2) {
        blocks.push(
          <h2 key={`ih2-${blockIndex++}`} className="mt-10 text-2xl font-semibold text-zinc-100">
            {parseInline(trimmed, `ih2-${blockIndex}`)}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={`ih3-${blockIndex++}`} className="mt-8 text-xl font-semibold text-zinc-200">
            {parseInline(trimmed, `ih3-${blockIndex}`)}
          </h3>
        );
      }
      i += 1;
      continue;
    }

    const plainFigureMatch = trimmed.match(/^\[FIGURE:\s*(.+)\]$/i);
    if (plainFigureMatch) {
      blocks.push(renderFigure(plainFigureMatch[1], blockIndex++));
      i += 1;
      continue;
    }

    if (/^\|/.test(trimmed)) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i += 1;
      }

      const rows = tableLines
        .filter((row) => !/^\|[-\s|:]+\|$/.test(row))
        .map((row) => row.split('|').slice(1, -1).map((cell) => cell.trim()));

      if (rows.length > 0) {
        const [header, ...bodyRows] = rows;
        blocks.push(
          <div key={`table-${blockIndex++}`} className="my-6 overflow-x-auto rounded-lg border border-zinc-800">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead className="bg-zinc-900 text-zinc-100">
                <tr>
                  {header.map((cell, idx) => (
                    <th key={`th-${idx}`} className="border-b border-zinc-800 px-3 py-2 font-semibold">
                      {parseInline(cell, `th-${blockIndex}-${idx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-zinc-950/70 text-zinc-300">
                {bodyRows.map((row, rowIdx) => (
                  <tr key={`tr-${rowIdx}`} className="border-b border-zinc-900 last:border-b-0">
                    {row.map((cell, cellIdx) => (
                      <td key={`td-${rowIdx}-${cellIdx}`} className="px-3 py-2 align-top">
                        {parseInline(cell, `td-${blockIndex}-${rowIdx}-${cellIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ol key={`ol-${blockIndex++}`} className="my-4 list-decimal space-y-2 pl-6 text-zinc-200">
          {items.map((item, idx) => (
            <li key={`oli-${idx}`}>{parseInline(item, `oli-${blockIndex}-${idx}`)}</li>
          ))}
        </ol>
      );
      continue;
    }

    if (/^-\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^-\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^-\s+/, ''));
        i += 1;
      }
      blocks.push(
        <ul key={`ul-${blockIndex++}`} className="my-4 list-disc space-y-2 pl-6 text-zinc-200">
          {items.map((item, idx) => (
            <li key={`uli-${idx}`}>{parseInline(item, `uli-${blockIndex}-${idx}`)}</li>
          ))}
        </ul>
      );
      continue;
    }

    if (/^>/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>/.test(lines[i].trim())) {
        quoteLines.push(lines[i].replace(/^>\s?/, ''));
        i += 1;
      }
      const quoteText = quoteLines.join('\n').trim();
      const figureMatch = quoteText.match(/\*\*\[FIGURE:\s*(.+?)\]\*\*/i);

      if (figureMatch) {
        blocks.push(renderFigure(figureMatch[1], blockIndex++));
      } else {
        blocks.push(
          <blockquote
            key={`quote-${blockIndex++}`}
            className="my-5 rounded-lg border-l-4 border-zinc-600 bg-zinc-900/70 px-4 py-3 text-zinc-200"
          >
            <p className="whitespace-pre-line">{parseInline(quoteText, `quote-${blockIndex}`)}</p>
          </blockquote>
        );
      }
      continue;
    }

    const paragraphLines: string[] = [trimmed];
    i += 1;
    while (i < lines.length) {
      const nextTrimmed = lines[i].trim();
      if (
        !nextTrimmed ||
        nextTrimmed === '---' ||
        /^(#{1,3})\s+/.test(nextTrimmed) ||
        /^\d+\.\s+/.test(nextTrimmed) ||
        /^-\s+/.test(nextTrimmed) ||
        /^>/.test(nextTrimmed)
      ) {
        break;
      }
      paragraphLines.push(nextTrimmed);
      i += 1;
    }

    const paragraphText = paragraphLines.join(' ');
    blocks.push(
      <p key={`p-${blockIndex++}`} className="my-4 text-base leading-8 text-zinc-300">
        {parseInline(paragraphText, `p-${blockIndex}`)}
      </p>
    );
  }

  return blocks;
}

export default function CasesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black px-4 py-10 text-zinc-100 md:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-10">
        {renderContent(content)}
      </div>
    </div>
  );
}
