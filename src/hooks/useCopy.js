import { useState } from 'react';

export function useCopy(delay = 1800) {
  const [copied, setCopied] = useState(false);

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), delay);
    } catch (error) {
      console.error('Failed to copy', error);
    }
  };

  return { copied, copy };
}
