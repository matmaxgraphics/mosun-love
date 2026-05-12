'use client';

import { useUnlockState } from '@/hooks/use-unlock-state';
import { UnlockScreen } from '@/components/sections/UnlockScreen';
import { IntroSection } from '@/components/sections/IntroSection';
import { TimelineSection } from '@/components/sections/TimelineSection';
import { SpecialCardsSection } from '@/components/sections/SpecialCardsSection';
import { AudioSection } from '@/components/sections/AudioSection';
import { FinalRevealSection } from '@/components/sections/FinalRevealSection';

export default function Home() {
  const { isUnlocked, unlock, loading } = useUnlockState();

  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-[#d4af37] font-playfair text-xl">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-black overflow-x-hidden">
      {!isUnlocked ? (
        <UnlockScreen onUnlock={unlock} />
      ) : (
        <>
          <IntroSection />
          <TimelineSection />
          <SpecialCardsSection />
          <AudioSection />
          <FinalRevealSection />
        </>
      )}
    </main>
  );
}
