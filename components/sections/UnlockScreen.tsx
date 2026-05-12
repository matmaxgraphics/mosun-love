'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { scaleIn } from '@/lib/animations';

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
    <motion.div
      className="w-full min-h-screen flex items-center justify-center bg-black px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-sm glassmorphism rounded-2xl p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="font-playfair text-4xl font-light text-white mb-2">
            A Moment
          </h1>
          <p className="text-gray-400 font-light">for you</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
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
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm text-center font-light"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#d4af37] text-black font-light py-4 rounded-lg hover:bg-[#f0e68c] disabled:opacity-50 transition-all text-center font-playfair text-lg"
          >
            {isSubmitting ? 'Unlocking...' : 'Unlock'}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xs text-gray-500 text-center mt-6 font-light"
        >
          This moment is for you
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
