"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Clapperboard } from 'lucide-react';

declare global {
  interface Window {
    admob: any;
  }
}

type RewardedAdProps = {
  onAdWatched: () => void;
};

export const RewardedAd: React.FC<RewardedAdProps> = ({ onAdWatched }) => {
  const [ad, setAd] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [adLoaded, setAdLoaded] = useState(false);

  const adUnitId = process.env.NEXT_PUBLIC_ADMOB_AD_UNIT_ID || 'ca-app-pub-3940256099942544/5224354917';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://admob-app-id.firebaseapp.com/admob.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.admob) {
        loadAd();
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const loadAd = async () => {
    if (!window.admob) return;
    setIsLoading(true);
    setAdLoaded(false);
    try {
      const rewardedAd = await window.admob.requestRewardedAd(adUnitId, {
        requestNonPersonalizedAds: true,
      });
      setAd(rewardedAd);
      setAdLoaded(true);
    } catch (e) {
      console.error(e);
      setAdLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const showAd = async () => {
    if (ad && adLoaded) {
      try {
        ad.on('reward', () => {
          onAdWatched();
          // Load a new ad for the next time
          loadAd();
        });
        await ad.show();
      } catch (e) {
        console.error('Error showing ad:', e);
        // If showing fails, try to load a new one.
        loadAd();
      }
    } else {
      // If ad is not loaded, try to load it again.
      console.log('Ad not ready, trying to load...');
      loadAd();
    }
  };

  return (
    <Button
      onClick={showAd}
      disabled={isLoading}
      variant="default"
      size="lg"
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold"
    >
      <Clapperboard className="mr-2 h-5 w-5" />
      {isLoading ? 'Loading Ad...' : adLoaded ? 'Watch Ad for New Game' : 'Ad Not Ready'}
    </Button>
  );
};
