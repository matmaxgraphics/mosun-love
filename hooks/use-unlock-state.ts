'use client';

import { useState, useEffect } from 'react';

export function useUnlockState() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('birthday-unlocked');
    setIsUnlocked(stored === 'true');
    setLoading(false);
  }, []);

  const unlock = () => {
    localStorage.setItem('birthday-unlocked', 'true');
    setIsUnlocked(true);
  };

  return { isUnlocked, unlock, loading };
}
