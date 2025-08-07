// screens/HomeScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import SearchBar from '../../Shared/SearchBar/SearchBar';
import BottomNavBar from '../../Shared/NavBar/NavBar';
import UserCard from '../../components/Cards/UserCard/UserCard';
import Sidebar from '../../components/CustomSidebar/CustomSidebar';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import LowBatteryCard from '../../components/Cards/LowBatteryCard/LowBatteryCard';
import { MaterialIcons } from '@expo/vector-icons';
import KeyButton from '../../components/Buttons/KeyButton/KeyButton';
import NearbyStationsButton from '../../components/Buttons/NearbyStationsButton/NearbyStationsButton';
import LocationButton from '../../components/Buttons/LocationButton/LocationButton';
import PinButton from '../../components/Buttons/PinButton/PinButton';
import { DualButtonAlert } from '../../components/Alert/DualButtonAlert';
import CustomAlert from '../../components/Alert/CustomAlert';
import FilterButton from '../../components/Buttons/FilterButton/FilterButton';

import userJson from '../../utils/Data/user.json'; 

const { width } = Dimensions.get('window');

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  vehicle: string;
};

const defaultProfile: UserProfile = {
  firstName: 'User',
  lastName: 'User',
  email: 'user@example.com',
  profilePic: '',
  vehicle: 'Tesla Model 3',
};

const HomeScreen: React.FC = () => {
  const [sidebarAnim] = useState(new Animated.Value(-width * 0.75));
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showLowBattery, setShowLowBattery] = useState(true);
  const [showLocationAlert, setShowLocationAlert] = useState(false);
  const [showMicAlert, setShowMicAlert] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [currentZoom, setCurrentZoom] = useState(15);
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultProfile);

  useEffect(() => {
    // Chargement du JSON utilisateur avec fallback
    if (userJson && typeof userJson === 'object') {
      setUserProfile(userJson as UserProfile);
    } else {
      console.warn('user.json invalide, fallback au profil par défaut');
      setUserProfile(defaultProfile);
    }
  }, []);

  const openSidebar = () => {
    setSidebarVisible(true);
    Animated.timing(sidebarAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: -width * 0.75,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setSidebarVisible(false));
  };

  const handleKeyPress = () => {
    (navigation as any).navigate('KeyScreen');
  };

  const zoomIn = () => {
    mapRef.current?.getCamera().then(camera => {
      if (typeof camera.zoom === 'number') {
        const newZoom = Math.min(camera.zoom + 1, 20);
        setCurrentZoom(newZoom);
        mapRef.current?.animateCamera({ ...camera, zoom: newZoom }, { duration: 300 });
      }
    });
  };

  const zoomOut = () => {
    mapRef.current?.getCamera().then(camera => {
      if (typeof camera.zoom === 'number') {
        const newZoom = Math.max(camera.zoom - 1, 3);
        setCurrentZoom(newZoom);
        mapRef.current?.animateCamera({ ...camera, zoom: newZoom }, { duration: 300 });
      }
    });
  };

  const handleRegionChangeComplete = (region: any) => {
    setCurrentZoom(region.latitudeDelta ? calculateZoomLevel(region.latitudeDelta) : currentZoom);
  };

  const calculateZoomLevel = (latitudeDelta: number) => {
    return Math.round(Math.log(360 / latitudeDelta) / Math.LN2);
  };

  const stations = [
    {
      id: 1,
      latitude: 36.8065,
      longitude: 10.1815,
      title: 'Station A',
      description: 'Fast charging',
      status: 'available',
      type: 'standard',
    },
    // ... autres stations
  ];

  const getMarkerColor = (station: typeof stations[0]) => {
    if (station.status === 'out-of-service') return 'red';
    if (station.status === 'busy') return 'orange';
    if (station.type === 'ultra-fast') return 'blue';
    return 'green';
  };

  const findNearestStation = () => {
    const nearestStation = stations.reduce((prev, curr) =>
      curr.latitude < prev.latitude ? curr : prev
    );

    mapRef.current?.animateToRegion(
      {
        latitude: nearestStation.latitude,
        longitude: nearestStation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      1000
    );
  };

  const handleLocationPress = () => {
    setShowLocationAlert(true);
  };

  const handleAllowLocation = () => {
    setShowLocationAlert(false);
    (navigation as any).navigate('RouteScreen');
  };

  const handleDenyLocation = () => {
    setShowLocationAlert(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 36.8065,
          longitude: 10.1815,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        zoomEnabled={true}
        zoomControlEnabled={true}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}
      >
        {stations.map(station => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.title}
            description={station.description}
            pinColor={getMarkerColor(station)}
          />
        ))}
      </MapView>

      <View style={styles.overlay}>
        <View style={styles.topRow}>
          <SearchBar
            onMenuPress={openSidebar}
            onSearchPress={() => (navigation as any).navigate('SearchScreen')}
            onMicPress={() => setShowMicAlert(true)}
          />
          <FilterButton onPress={() => setShowFilter(true)} />
        </View>

        <View style={styles.verticalCards}>
          <UserCard
            name={`${userProfile.firstName} ${userProfile.lastName}`}
            battery={10}
            distance={1.5}
          />
          {showLowBattery && (
            <LowBatteryCard
              batteryLevel={20}
              onDismiss={() => setShowLowBattery(false)}
              onFindStations={findNearestStation}
            />
          )}
        </View>

        <BottomNavBar />
      </View>

      <View style={styles.zoomControls}>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomIn}>
          <Text style={styles.zoomText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={zoomOut}>
          <Text style={styles.zoomText}>-</Text>
        </TouchableOpacity>
        <LocationButton onPress={handleLocationPress} />
        <PinButton onPress={() => (navigation as any).navigate('PinScreen')} />
      </View>

      <View style={styles.bottomButtonsContainer}>
        <NearbyStationsButton onPress={findNearestStation} />
        <KeyButton onPress={handleKeyPress} />
      </View>

      {showFilter && (
        <>
          <TouchableWithoutFeedback onPress={() => setShowFilter(false)}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <Animated.View style={styles.filterSidebar}>
            <FilterSidebar
              onClose={() => setShowFilter(false)}
              onApplyFilters={filters => console.log('Filtres appliqués :', filters)}
            />
          </Animated.View>
        </>
      )}

      {sidebarVisible && (
        <>
          <TouchableWithoutFeedback onPress={closeSidebar}>
            <View style={styles.backdrop} />
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
            <Sidebar onClose={closeSidebar} />
          </Animated.View>
        </>
      )}

      <DualButtonAlert
        visible={showLocationAlert}
        iconType="material"
        iconName="location-on"
        iconColor="#121312"
        title="Location Access Required"
        message="To continue, your device will need to allow WattyGo to access this device's location service."
        primaryButtonText="Allow"
        secondaryButtonText="Deny"
        onPrimaryPress={handleAllowLocation}
        onSecondaryPress={handleDenyLocation}
      />

      <CustomAlert
        visible={showMicAlert}
        onClose={() => setShowMicAlert(false)}
        title="Try saying something"
        message="Tap the mic and speak your request\nFind nearest fast charger\n\nEnglish"
        buttonText="OK"
        iconType="material-community"
        iconName="microphone"
        iconColor="#0a0a0aff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 15,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  verticalCards: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 10,
    left: 20,
    marginBottom: 20,
  },
  filterSidebar: {
    position: 'absolute',
    top: 0,
    right: 10,
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    zIndex: 1000,
    elevation: 10,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 999,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 998,
  },
  zoomControls: {
    position: 'absolute',
    right: 20,
    bottom: 150,
    zIndex: 200,
    alignItems: 'center',
  },
  zoomButton: {
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    elevation: 5,
  },
  zoomText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 85,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 200,
  },
});

export default HomeScreen;
