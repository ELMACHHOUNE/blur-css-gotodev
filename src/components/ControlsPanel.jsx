import { EFFECT_TYPES, PRESETS } from '../utils/presets.js';
import './ControlsPanel.css';

const SLIDER_DEFS = [
  {
    key: 'blur',
    label: 'Blur radius',
    min: 6,
    max: 120,
    step: 1,
    unit: 'px',
    description: 'Backdrop blur applied through backdrop-filter.',
  },
  {
    key: 'saturation',
    label: 'Saturation',
    min: 20,
    max: 250,
    step: 1,
    unit: '%',
    description: 'Color intensity boost layered over the blurred background.',
  },
  {
    key: 'brightness',
    label: 'Brightness',
    min: 20,
    max: 180,
    step: 1,
    unit: '%',
    description: 'Fine tune how luminous the glass panel appears.',
  },
  {
    key: 'borderRadius',
    label: 'Border radius',
    min: 0,
    max: 64,
    step: 1,
    unit: 'px',
    description: 'Roundness of the primary panel corners.',
  },
  {
    key: 'borderWidth',
    label: 'Border width',
    min: 0,
    max: 6,
    step: 1,
    unit: 'px',
    description: 'Frosted rim intensity along the card edge.',
  },
  {
    key: 'borderOpacity',
    label: 'Border opacity',
    min: 0,
    max: 1,
    step: 0.01,
    unit: '',
    description: 'Transparency of the border highlight.',
  },
  {
    key: 'backgroundAngle',
    label: 'Gradient angle',
    min: 0,
    max: 360,
    step: 1,
    unit: '°',
    description: 'Rotation of the internal liquid gradient.',
  },
  {
    key: 'backgroundIntensity',
    label: 'Background energy',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    description: 'Controls contrast inside the panel gradient.',
  },
  {
    key: 'highlightHue',
    label: 'Highlight hue',
    min: 0,
    max: 360,
    step: 1,
    unit: '°',
    description: 'Primary spectral hue used for glow and highlight.',
  },
  {
    key: 'highlightIntensity',
    label: 'Highlight intensity',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    description: 'Controls the brightness of highlight gradients.',
  },
  {
    key: 'highlightSpread',
    label: 'Highlight spread',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    description: 'Size of the spectral bloom overlay.',
  },
  {
    key: 'shadowOpacity',
    label: 'Shadow weight',
    min: 0,
    max: 1,
    step: 0.01,
    unit: '',
    description: 'Ambient depth through drop shadows or inset glows.',
  },
  {
    key: 'noise',
    label: 'Surface noise',
    min: 0,
    max: 0.6,
    step: 0.01,
    unit: '',
    description: 'Amount of frosted grain blended over the glass.',
  },
];

function SliderControl({ label, description, value, min, max, step, unit, onChange }) {
  return (
    <label className="control-slider">
      <div className="control-slider__meta">
        <span className="control-slider__label">{label}</span>
        <span className="control-slider__value">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <p className="control-slider__description">{description}</p>
    </label>
  );
}

export function ControlsPanel({
  settings,
  onChangeSetting,
  onChangeEffectType,
  activeEffect,
  activePresetId,
  onSelectPreset,
}) {
  return (
    <aside className="controls">
      <div className="controls__section">
        <p className="controls__eyebrow">Effects</p>
        <div className="controls__tabs">
          {Object.entries(EFFECT_TYPES).map(([key, meta]) => (
            <button
              key={key}
              type="button"
              className={`controls__tab ${activeEffect === key ? 'is-active' : ''}`}
              onClick={() => onChangeEffectType(key)}
            >
              <span>{meta.label}</span>
            </button>
          ))}
        </div>
        <p className="controls__caption">{EFFECT_TYPES[activeEffect].description}</p>
      </div>

      <div className="controls__section">
        <div className="controls__header">
          <p className="controls__eyebrow">Presets</p>
          <span className="controls__badge">{activeEffect.toUpperCase()}</span>
        </div>
        <div className="controls__presets">
          {PRESETS.filter((preset) => preset.effectType === activeEffect).map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={`controls__preset ${activePresetId === preset.id ? 'is-active' : ''}`}
              onClick={() => onSelectPreset(preset.id)}
            >
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
        <button
          className={`controls__preset controls__preset--outline ${activePresetId === 'custom' ? 'is-active' : ''}`}
          type="button"
          onClick={() => onSelectPreset('custom')}
        >
          Custom blend
        </button>
      </div>

      <div className="controls__section controls__section--grid">
        {SLIDER_DEFS.map((config) => (
          <SliderControl
            key={config.key}
            label={config.label}
            description={config.description}
            value={settings[config.key]}
            min={config.min}
            max={config.max}
            step={config.step}
            unit={config.unit}
            onChange={(value) => onChangeSetting(config.key, value)}
          />
        ))}
      </div>
    </aside>
  );
}
