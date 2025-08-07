import React, { createContext, useContext, useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import NoConnectionScreen from '../screens/Loading/NoConnectionScreen';

interface NetworkContextType {
  isConnected: boolean;
  isInternetReachable?: boolean | null;
}

const NetworkContext = createContext<NetworkContextType>({ 
  isConnected: true,
  isInternetReachable: true
});

export const NetworkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [networkState, setNetworkState] = useState<NetworkContextType>({
    isConnected: true,
    isInternetReachable: true
  });
  const [showModal, setShowModal] = useState(false);

  const handleConnectionChange = (state: NetInfoState) => {
    const newState = {
      isConnected: state.isConnected ?? false,
      isInternetReachable: state.isInternetReachable
    };
    
    setNetworkState(newState);
    setShowModal(!newState.isConnected);
  };

  useEffect(() => {
    // Vérification initiale
    NetInfo.fetch().then(handleConnectionChange);

    // Abonnement aux changements
    const unsubscribe = NetInfo.addEventListener(handleConnectionChange);

    return () => {
      unsubscribe();
    };
  }, []);

  const handleRetry = async () => {
    const state = await NetInfo.fetch();
    handleConnectionChange(state);
  };

  return (
    <NetworkContext.Provider value={networkState}>
      {children}
      <NoConnectionScreen 
        visible={showModal} 
        onRetry={handleRetry} 
      />
    </NetworkContext.Provider>
  );
};

export const useNetwork = () => {
  const context = useContext(NetworkContext);
  if (!context) {
    throw new Error('useNetwork must be used within a NetworkProvider');
  }
  return context;
};