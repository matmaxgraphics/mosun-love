'use client';

import { useState } from 'react';

interface UnlockScreenProps {
  onUnlock: () => void;
}

export function UnlockScreen({ onUnlock }: UnlockScreenProps) {
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate DOB format (MM/DD)
    const dobPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
    
    if (!dobPattern.test(dob)) {
      setError('Please enter DOB as MM/DD');
      setIsSubmitting(false);
      return;
    }

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 800));
    onUnlock();
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black px-6">
      <div className="w-full max-w-sm glassmorphism rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-light text-white mb-2">
            A Moment
          </h1>
          <p className="text-gray-400 font-light">for you</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-3 font-light">
              Enter your birthdate
            </label>
            <input
              type="text"
              placeholder="MM/DD"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-black border-2 border-white/20 rounded-lg px-4 py-4 text-white placeholder-gray-600 text-center text-lg font-light focus:outline-none focus:border-[#d4af37] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center font-light">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#d4af37] text-black font-light py-4 rounded-lg hover:bg-[#f0e68c] hover:scale-102 active:scale-95 disabled:opacity-50 transition-all text-center font-playfair text-lg"
          >
            {isSubmitting ? 'Unlocking...' : 'Unlock'}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6 font-light">
          This moment is for you
        </p>
      </div>
    </div>
  );
}
