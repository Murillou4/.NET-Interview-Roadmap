import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { TECHNICAL_GLOSSARY, TechnicalGlossaryEntry } from '../data/technicalGlossary';

interface TechnicalTextProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

interface GlossaryMatch {
  start: number;
  end: number;
  value: string;
  entry: TechnicalGlossaryEntry;
}

const names = TECHNICAL_GLOSSARY.flatMap((entry) =>
  [entry.term, ...(entry.aliases ?? [])].map((name) => ({
    name,
    entry,
  })),
).sort((left, right) => right.name.length - left.name.length);

const escapedNames = names.map(({ name }) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
const glossaryPattern = new RegExp(
  `(?<![\\p{L}\\p{N}_])(${escapedNames.join('|')})(?![\\p{L}\\p{N}_])`,
  'giu',
);

const entryByName = new Map(names.map(({ name, entry }) => [name.toLocaleLowerCase('pt-BR'), entry]));

const findMatches = (text: string): GlossaryMatch[] => {
  const matches: GlossaryMatch[] = [];

  for (const match of text.matchAll(glossaryPattern)) {
    if (match.index === undefined) continue;

    const entry = entryByName.get(match[0].toLocaleLowerCase('pt-BR'));
    if (!entry) continue;

    matches.push({
      start: match.index,
      end: match.index + match[0].length,
      value: match[0],
      entry,
    });
  }

  return matches;
};

const TechnicalTerm: React.FC<{ value: string; entry: TechnicalGlossaryEntry }> = ({ value, entry }) => {
  const triggerRef = useRef<HTMLElement>(null);
  const tooltipId = useId();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0, placement: 'top' as 'top' | 'bottom' });

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const tooltipWidth = Math.min(320, window.innerWidth - 24);
      const left = Math.min(
        Math.max(rect.left + rect.width / 2, 12 + tooltipWidth / 2),
        window.innerWidth - 12 - tooltipWidth / 2,
      );
      const placement = rect.top > 150 ? 'top' : 'bottom';

      setPosition({
        left,
        top: placement === 'top' ? rect.top - 10 : rect.bottom + 10,
        placement,
      });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    const closeWhenClickingOutside = (event: PointerEvent) => {
      if (!triggerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', closeWhenClickingOutside);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
      document.removeEventListener('pointerdown', closeWhenClickingOutside);
    };
  }, [open]);

  return (
    <>
      <dfn
        ref={triggerRef}
        tabIndex={0}
        className="technical-term"
        aria-describedby={open ? tooltipId : undefined}
        aria-expanded={open}
        onPointerEnter={(event) => {
          if (event.pointerType === 'mouse') setOpen(true);
        }}
        onPointerLeave={(event) => {
          if (event.pointerType === 'mouse') setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
            triggerRef.current?.blur();
          }
        }}
      >
        {value}
      </dfn>

      {open && typeof document !== 'undefined'
        ? createPortal(
            <span
              id={tooltipId}
              role="tooltip"
              className="technical-tooltip"
              data-placement={position.placement}
              style={{
                left: position.left,
                top: position.top,
              }}
            >
              <strong>{entry.term}</strong>
              <span>{entry.definition}</span>
            </span>,
            document.body,
          )
        : null}
    </>
  );
};

export const TechnicalText: React.FC<TechnicalTextProps> = ({
  children,
  className,
  as: Component = 'span',
}) => {
  const matches = useMemo(() => findMatches(children), [children]);

  if (matches.length === 0) {
    return <Component className={className}>{children}</Component>;
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  matches.forEach((match, index) => {
    if (match.start > cursor) {
      parts.push(children.slice(cursor, match.start));
    }

    parts.push(<TechnicalTerm key={`${match.start}-${match.value}-${index}`} value={match.value} entry={match.entry} />);
    cursor = match.end;
  });

  if (cursor < children.length) {
    parts.push(children.slice(cursor));
  }

  return <Component className={className}>{parts}</Component>;
};
