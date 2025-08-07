// App.tsx
import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'; // ajuste le chemin si besoin
import NoConnectionScreen from './src/screens/Loading/NoConnectionScreen';


export default function App() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected ?? false);
    });
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      {/* Affiche le popup en cas de perte de connexion */}
      {!isConnected && (
        <NoConnectionScreen visible={!isConnected} onRetry={handleRetry} />
      )}
    </GestureHandlerRootView>
  );
}
