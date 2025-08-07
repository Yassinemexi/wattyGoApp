import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {
  MaterialIcons,
  FontAwesome,
  Ionicons,
} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

enum AppRoutes {
  HOME = 'Home',
  ROUTE = 'Route',
  CHARGE = 'Charge',
  CHAT = 'Chat'
}

type NavButtonProps = {
  icon: string;
  text: string;
  active?: boolean;
  onPress?: () => void;
};

const NavButton: React.FC<NavButtonProps> = ({ icon, text, active = false, onPress }) => {
  const getIconComponent = () => {
    const color = active ? '#f75252' : '#000000';
    const size = 24;

    switch (icon) {
      case 'map':
        return <MaterialIcons name="map" size={size} color={color} />;
      case 'directions':
        return <MaterialIcons name="directions" size={size} color={color} />;
      case 'car':
        return <FontAwesome name="car" size={size} color={color} />;
      case 'battery-charging':
        return <Ionicons name="battery-charging" size={size} color={color} />;
      case 'chat':
        return <Ionicons name="chatbubble" size={size} color={color} />;
      default:
        return <MaterialIcons name="help" size={size} color={color} />;
    }
  };

  return (
    <TouchableOpacity 
      style={styles.navButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      {getIconComponent()}
      <Text style={[styles.navButtonText, { color: active ? '#f75252' : '#000' }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const BottomNavBar: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getActiveRoute = (): AppRoutes => {
    switch (route.name) {
      case 'Home':
        return AppRoutes.HOME;
      case 'Route':
        return AppRoutes.ROUTE;
      case 'Charge':
        return AppRoutes.CHARGE;
      case 'Chat':
        return AppRoutes.CHAT;
      default:
        return AppRoutes.HOME;
    }
  };

  return (
    <View style={styles.bottomNavBar}>
      <NavButton 
        icon="map" 
        text="Map" 
        active={getActiveRoute() === AppRoutes.HOME} 
        onPress={() => (navigation as any).navigate('HomeScreen')}
      />
      <NavButton 
        icon="directions" 
        text="Route" 
        active={getActiveRoute() === AppRoutes.ROUTE} 
        onPress={() => (navigation as any).navigate('RouteScreen')}
      />
      <NavButton icon="car" text="" />
      <NavButton 
        icon="battery-charging" 
        text="Charge" 
        active={getActiveRoute() === AppRoutes.CHARGE} 
        onPress={() => (navigation as any).navigate('Charge')}
      />
      <NavButton 
        icon="chat" 
        text="Chat" 
        active={getActiveRoute() === AppRoutes.CHAT} 
        onPress={() => (navigation as any).navigate('Chat')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 100,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    minWidth: 50,
  },
  navButtonText: {
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
});

export default BottomNavBar;