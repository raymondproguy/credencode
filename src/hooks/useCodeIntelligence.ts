import { useState, useEffect } from 'react';

export const useCodeIntelligence = () => {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('code_intelligence_enabled');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('code_intelligence_enabled', JSON.stringify(enabled));
  }, [enabled]);

  return {
    enabled,
    setEnabled
  };
};
