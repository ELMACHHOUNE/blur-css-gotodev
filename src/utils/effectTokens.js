import { clamp } from './number.js';

const lighten = (value, amount) => clamp(value + amount, 0, 100);
const darken = (value, amount) => clamp(value - amount, 0, 100);

const hueShift = (h, shift) => {
  const result = (h + shift) % 360;
  return result < 0 ? result + 360 : result;
};

export function buildEffectTokens(settings) {
  const {
    effectType,
    blur,
    saturation,
    brightness,
    borderRadius,
    borderWidth,
    borderOpacity,
    backgroundAngle,
    backgroundIntensity,
    highlightHue,
    highlightIntensity,
    highlightSpread,
    shadowOpacity,
    noise,
  } = settings;

  const highlightColor = `hsla(${highlightHue}, 95%, ${lighten(highlightIntensity, 28)}%, ${clamp(0.35 + shadowOpacity, 0.35, 0.85)})`;
  const highlightRim = `hsla(${highlightHue}, 100%, ${lighten(highlightIntensity, 18)}%, ${clamp(0.2 + shadowOpacity, 0.25, 0.7)})`;
  const accentHue = hueShift(highlightHue, 140);
  const accentColor = `hsla(${accentHue}, 90%, ${darken(100 - backgroundIntensity, 20)}%, ${clamp(backgroundIntensity / 120, 0.15, 0.5)})`;
  const luminousHue = hueShift(highlightHue, -35);
  const luminousColor = `hsla(${luminousHue}, 85%, ${lighten(highlightIntensity, 20)}%, ${clamp(0.25 + backgroundIntensity / 300, 0.25, 0.55)})`;

  const baseOverlay = 'rgba(15, 23, 42, 0.35)';

  const gradient = `linear-gradient(${backgroundAngle}deg, ${luminousColor}, ${baseOverlay}), linear-gradient(${(backgroundAngle + 145) % 360}deg, ${accentColor}, rgba(15, 23, 42, 0.65))`;

  const cardShadow = (() => {
    if (effectType === 'neomorphic') {
      return [
        `inset 6px 6px 24px rgba(2, 6, 23, ${clamp(0.35 + shadowOpacity, 0.45, 0.75)})`,
        `inset -10px -10px 28px rgba(148, 163, 184, ${clamp(0.05 + shadowOpacity / 3, 0.08, 0.2)})`,
        `0 24px 55px -25px rgba(2, 6, 23, ${clamp(0.45 + shadowOpacity, 0.5, 0.9)})`,
      ].join(', ');
    }

    const glowColor = `hsla(${highlightHue}, 95%, ${lighten(highlightIntensity, 12)}%, ${clamp(0.35 + shadowOpacity, 0.4, 0.95)})`;
    const ambientColor = `rgba(15, 23, 42, ${clamp(0.55 + shadowOpacity / 4, 0.6, 0.85)})`;
    const outerGlow = effectType === 'liquid' ? `0 25px ${Math.round(40 + highlightSpread)}px -20px ${glowColor}` : `0 20px ${Math.round(35 + highlightSpread)}px -18px ${glowColor}`;
    const ambient = `0 18px 65px -28px ${ambientColor}`;
    const rim = `0 0 ${Math.round(18 + highlightSpread / 2)}px ${Math.round(8 + highlightSpread / 4)}px ${highlightRim}`;
    return [outerGlow, ambient, rim].join(', ');
  })();

  const haloColor = `hsla(${highlightHue}, 95%, ${lighten(highlightIntensity, 25)}%, ${clamp(0.15 + shadowOpacity / 2, 0.18, 0.45)})`;

  const tokens = {
    effectType,
    blur,
    saturation,
    brightness,
    borderRadius,
    borderWidth,
    borderOpacity,
    backgroundAngle,
    backgroundIntensity,
    highlightHue,
    highlightIntensity,
    highlightSpread,
    shadowOpacity,
    noise,
    highlightColor,
    highlightRim,
    accentColor,
    luminousColor,
    gradient,
    cardShadow,
    haloColor,
    borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
    noiseOpacity: clamp(noise, 0, 0.6),
    highlightSize: `${Math.round(36 + highlightSpread)}%`,
    highlightBlur: `${Math.round(highlightSpread * 0.85)}px`,
  };

  return tokens;
}
