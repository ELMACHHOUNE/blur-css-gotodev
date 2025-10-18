import { useMemo } from 'react';
import { generateNativeSnippet, generateTailwindSnippet } from '../utils/generateCode.js';
import { useCopy } from '../hooks/useCopy.js';
import './CodePanel.css';

const SYNTAX_OPTIONS = [
  { id: 'native', label: 'Native CSS' },
  { id: 'tailwind', label: 'Tailwind CSS' },
];

const FRAMEWORK_OPTIONS = [
  { id: 'react', label: 'React component' },
  { id: 'html', label: 'HTML snippet' },
];

function CodeBlock({ title, code, onCopy, copied }) {
  if (!code) return null;
  return (
    <div className="code-panel__block">
      <div className="code-panel__block-header">
        <span>{title}</span>
        <button type="button" onClick={onCopy} className={copied ? 'is-copied' : ''}>
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function CodePanel({ settings, syntax, onSyntaxChange, framework, onFrameworkChange }) {
  const { copied: copiedMarkup, copy: copyMarkup } = useCopy();
  const { copied: copiedStyles, copy: copyStyles } = useCopy();

  const data = useMemo(() => {
    if (syntax === 'tailwind') {
      return generateTailwindSnippet(settings, framework);
    }
    return generateNativeSnippet(settings, framework);
  }, [framework, settings, syntax]);

  const { markup, styles, tailwindNotes } = data;

  return (
    <section className="code-panel" aria-label="Generated code">
      <header className="code-panel__header">
        <div>
          <p className="code-panel__eyebrow">Copy &amp; paste ready</p>
          <h2 className="code-panel__title">Production ready snippets tailored to your stack.</h2>
        </div>
        <div className="code-panel__toggles">
          <div className="code-panel__toggle-group">
            {SYNTAX_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={syntax === option.id ? 'is-active' : ''}
                onClick={() => onSyntaxChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="code-panel__toggle-group">
            {FRAMEWORK_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                className={framework === option.id ? 'is-active' : ''}
                onClick={() => onFrameworkChange(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="code-panel__content">
        <CodeBlock
          title={framework === 'react' ? 'Component' : 'Markup'}
          code={markup}
          copied={copiedMarkup}
          onCopy={() => copyMarkup(markup)}
        />
        {syntax === 'native' ? (
          <CodeBlock title="CSS" code={styles} copied={copiedStyles} onCopy={() => copyStyles(styles)} />
        ) : (
          <CodeBlock
            title="Tailwind notes"
            code={tailwindNotes}
            copied={copiedStyles}
            onCopy={() => copyStyles(tailwindNotes)}
          />
        )}
      </div>
    </section>
  );
}
