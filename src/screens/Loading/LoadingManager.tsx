import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from './SplashScreen';
import NoConnectionScreen from './NoConnectionScreen';

const LoadingManager = ({ onReady }: { onReady: () => void }) => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [showNoConnection, setShowNoConnection] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);
      
      if (!connected) {
        setShowNoConnection(true);
      } else if (connected && !showNoConnection) {
        setTimeout(onReady, 2500);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    setShowNoConnection(false);
    NetInfo.fetch().then(state => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);
      if (connected) {
        onReady();
      } else {
        setShowNoConnection(true);
      }
    });
  };

  return (
    <>
      <SplashScreen />
      <NoConnectionScreen 
        visible={showNoConnection} 
        onRetry={handleRetry} 
      />
    </>
  );
};

export default LoadingManager;