import { useState } from 'react';
import { ControlsPanel } from './components/ControlsPanel.jsx';
import { EffectPreview } from './components/EffectPreview.jsx';
import { CodePanel } from './components/CodePanel.jsx';
import { useEffectSettings } from './hooks/useEffectSettings.js';
import { EFFECT_TYPES } from './utils/presets.js';
import './App.css';

function Layout({ children }) {
  return <div className="app-layout">{children}</div>;
}

export default function App() {
  const {
    settings,
    activePreset,
    setActivePreset,
    setEffectType,
    updateSetting,
    applyPreset,
  } = useEffectSettings();
  const [showCode, setShowCode] = useState(false);
  const [syntax, setSyntax] = useState('native');
  const [framework, setFramework] = useState('react');

  const handleEffectTypeChange = (effectType) => {
    if (!EFFECT_TYPES[effectType]) return;
    setEffectType(effectType);
  };

  const handlePresetSelect = (presetId) => {
    if (presetId === 'custom') {
      setActivePreset('custom');
      return;
    }
    applyPreset(presetId);
  };

  return (
    <Layout>
      <main className="app-shell">
        <EffectPreview settings={settings} showCode={showCode} onToggleView={setShowCode} />
        <ControlsPanel
          settings={settings}
          activeEffect={settings.effectType}
          activePresetId={activePreset}
          onChangeSetting={updateSetting}
          onChangeEffectType={handleEffectTypeChange}
          onSelectPreset={handlePresetSelect}
        />
        {showCode && (
          <CodePanel
            settings={settings}
            syntax={syntax}
            framework={framework}
            onSyntaxChange={setSyntax}
            onFrameworkChange={setFramework}
          />
        )}
      </main>
      <footer className="app-footer">
        <p>
          Built with ❤ using React + Vite. Inspired by the liquid glass explorations from the design
          community.
        </p>
        <span>Copy CSS, Tailwind or drop directly into your next project.</span>
      </footer>
    </Layout>
  );
}
