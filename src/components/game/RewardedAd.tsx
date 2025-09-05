"use client";

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    rewardedAd: any;
    google: any;
    adsbygoogle: any;
  }
}

interface RewardedAdProps {
  onAdWatched: (rewardEarned: boolean) => void;
}

export const RewardedAd: React.FC<RewardedAdProps> = ({ onAdWatched }) => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [adClosed, setAdClosed] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);

  const adUnitId = process.env.NEXT_PUBLIC_ADMOB_AD_UNIT_ID || '';

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);

    const handleScriptLoad = () => {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      loadAd();
    };

    script.addEventListener('load', handleScriptLoad);

    return () => {
      script.removeEventListener('load', handleScriptLoad);
      document.head.removeChild(script);
    };
  }, []);

  const loadAd = () => {
    if (typeof window.google === 'undefined' || typeof window.google.ads?.adshield?.lib?.rewarded?.Ads === 'undefined' || !adUnitId) {
      setTimeout(loadAd, 200);
      return;
    }
    
    try {
      window.google.ads.adshield.lib.rewarded.Ads.load(adUnitId, (ad: any) => {
          if (ad) {
            window.rewardedAd = ad;
            setAdLoaded(true);
          } else {
            setAdError("Failed to load ad. The ad object was null.");
            onAdWatched(false);
          }
      }, (error: any) => {
        console.error("Error loading rewarded ad:", error);
        setAdError("Error loading ad. Check console for details.");
        onAdWatched(false);
      });
    } catch (e) {
      console.error("Exception when trying to load ad:", e);
      setAdError("An exception occurred while loading the ad.");
      onAdWatched(false);
    }
  };

  useEffect(() => {
    if (adLoaded) {
      const ad = window.rewardedAd;
      if (!ad) {
        setAdError("Ad object is not available to show.");
        onAdWatched(false);
        return;
      }
      
      const handleAdClosed = () => {
        setAdClosed(true);
      };
      
      const handleAdRewarded = () => {
        onAdWatched(true);
      };
      
      ad.addEventListener('ad-closed', handleAdClosed);
      ad.addEventListener('ad-rewarded', handleAdRewarded);

      ad.show();

      return () => {
        ad.removeEventListener('ad-closed', handleAdClosed);
        ad.removeEventListener('ad-rewarded', handleAdRewarded);
      };
    }
  }, [adLoaded, onAdWatched]);

  useEffect(() => {
    // If the ad is closed but no reward has been given
    if (adClosed) {
      onAdWatched(false);
    }
  }, [adClosed, onAdWatched]);

  if (adError) {
    console.error("Ad error state:", adError);
  }

  return null;
};
