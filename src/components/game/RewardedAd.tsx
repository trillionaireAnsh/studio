"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    rewardedAd: any;
    google: any;
  }
}

interface RewardedAdProps {
  onAdWatched: (rewardEarned: boolean) => void;
}

export const RewardedAd: React.FC<RewardedAdProps> = ({ onAdWatched }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adClosed, setAdClosed] = useState(false);

  const adUnitId = process.env.NEXT_PUBLIC_ADMOB_AD_UNIT_ID || '';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      loadAd();
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const loadAd = () => {
    if (typeof window.google === 'undefined' || !adUnitId) {
      setTimeout(loadAd, 100);
      return;
    }
    
    window.google.ads.adshield.lib.rewarded.Ads.load(adUnitId, (ad: any) => {
        window.rewardedAd = ad;
        setAdLoaded(true);
    });
  };

  useEffect(() => {
    if (adLoaded) {
      const ad = window.rewardedAd;
      ad.addEventListener('ad-closed', () => {
        setAdClosed(true);
      });
      ad.addEventListener('ad-rewarded', () => {
        onAdWatched(true);
      });
      ad.show();
    }
  }, [adLoaded, onAdWatched]);

  useEffect(() => {
    if (adClosed) {
      onAdWatched(false);
    }
  }, [adClosed, onAdWatched]);

  return null;
};
