import { useState, useMemo } from 'react';
import { DEFAULT_SETTINGS, PRESETS } from '../utils/presets.js';

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const mergeSettings = (base, patch) => ({
  ...base,
  ...patch,
});

export function useEffectSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [activePreset, setActivePreset] = useState(PRESETS[0].id);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setActivePreset('custom');
  };

  const setEffectType = (effectType) => {
    setSettings((prev) => ({
      ...prev,
      effectType,
    }));
    setActivePreset('custom');
  };

  const applyPreset = (presetId) => {
    const preset = PRESETS.find((item) => item.id === presetId);
    if (!preset) return;
    setActivePreset(preset.id);
    setSettings(mergeSettings(DEFAULT_SETTINGS, {
      effectType: preset.effectType,
      ...preset.settings,
    }));
  };

  const sanitizedSettings = useMemo(
    () => ({
      ...settings,
      blur: clamp(settings.blur, 6, 120),
      saturation: clamp(settings.saturation, 20, 250),
      brightness: clamp(settings.brightness, 20, 180),
      borderRadius: clamp(settings.borderRadius, 0, 64),
      borderWidth: clamp(settings.borderWidth, 0, 6),
      borderOpacity: clamp(settings.borderOpacity, 0, 1),
      backgroundAngle: clamp(settings.backgroundAngle, 0, 360),
      backgroundIntensity: clamp(settings.backgroundIntensity, 0, 100),
      highlightHue: clamp(settings.highlightHue, 0, 360),
      highlightIntensity: clamp(settings.highlightIntensity, 0, 100),
      highlightSpread: clamp(settings.highlightSpread, 0, 100),
      shadowOpacity: clamp(settings.shadowOpacity, 0, 1),
      noise: clamp(settings.noise, 0, 0.6),
    }),
    [settings],
  );

  return {
    settings: sanitizedSettings,
    setSettings,
    activePreset,
    setActivePreset,
    setEffectType,
    updateSetting,
    applyPreset,
  };
}
