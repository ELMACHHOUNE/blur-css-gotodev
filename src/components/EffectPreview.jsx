import { useMemo } from 'react';
import { buildEffectTokens } from '../utils/effectTokens.js';
import './EffectPreview.css';

export function EffectPreview({ settings, showCode, onToggleView }) {
  const tokens = useMemo(() => buildEffectTokens(settings), [settings]);

  const style = {
    '--card-border-radius': `${tokens.borderRadius}px`,
    '--card-border-width': `${tokens.borderWidth}px`,
    '--card-border-opacity': tokens.borderOpacity,
    '--card-gradient': tokens.gradient,
    '--card-shadow': tokens.cardShadow,
    '--card-blur': `${tokens.blur}px`,
    '--card-saturation': `${tokens.saturation}%`,
    '--card-brightness': `${tokens.brightness}%`,
    '--card-highlight-color': tokens.highlightColor,
    '--card-highlight-size': tokens.highlightSize,
    '--card-highlight-blur': tokens.highlightBlur,
    '--card-noise-opacity': tokens.noiseOpacity,
  };

  return (
    <section className="effect-preview">
      <header className="effect-preview__header">
        <div>
          <p className="effect-preview__eyebrow">Real-time Playground</p>
          <h1 className="effect-preview__title">Liquid glass, glassmorphism &amp; neumorphism without the guesswork.</h1>
        </div>
        <div className="effect-preview__view-toggle">
          <button
            type="button"
            className={!showCode ? 'is-active' : ''}
            onClick={() => onToggleView(false)}
          >
            Preview
          </button>
          <button
            type="button"
            className={showCode ? 'is-active' : ''}
            onClick={() => onToggleView(true)}
          >
            Code
          </button>
        </div>
      </header>

      <div className="effect-preview__stage" data-mode={tokens.effectType}>
        <div className="effect-preview__backdrop">
          <div className="effect-preview__orb effect-preview__orb--one" />
          <div className="effect-preview__orb effect-preview__orb--two" />
          <div className="effect-preview__orb effect-preview__orb--three" />
        </div>
        <article className="preview-card" style={style}>
          <div className="preview-card__content">
            <header className="preview-card__header">
              <div className="preview-card__avatar">
                <span>JD</span>
              </div>
              <div>
                <p className="preview-card__eyebrow">Product Designer</p>
                <h3 className="preview-card__title">Juno Doe</h3>
              </div>
            </header>
            <p className="preview-card__body">
              Generate future-proof soft glass tokens and copy-paste native CSS or Tailwind markup
              in seconds.
            </p>
            <footer className="preview-card__footer">
              <button type="button" className="preview-card__cta">
                Get Started
              </button>
              <span className="preview-card__hint">⇧ Tip: Try adjusting the blur and highlight spread.</span>
            </footer>
          </div>
        </article>
      </div>
    </section>
  );
}
