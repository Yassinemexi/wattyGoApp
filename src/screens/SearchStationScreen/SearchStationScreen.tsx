import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
  FlatList,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import FilterButton from '../../components/Buttons/FilterButton/FilterButton';
import SearchBar from '../../Shared/SearchBar/SearchBar';
import BottomNavBar from '../../Shared/NavBar/NavBar';
import SharePopup from '../../Shared/SharePopup/SharePopup';

// Import JSON
import stationsData from '../../utils/Data/stations.json';

// Types
type Station = {
  id: number;
  name: string;
  distance: string;
  availability: string;
  type: string;
  ports: string;
  latitude: number;
  longitude: number;
  image: string;
  imageSource?: any;
};

// Constantes
const { width, height } = Dimensions.get('window');
const PANEL_HEIGHT = height * 0.5;
const MINIMUM_PANEL_HEIGHT = height * 0.2;
const BOTTOM_BAR_HEIGHT = 70;

// Images
const TotalEnergiesImg = require('../../../assets/images/stations/TotalEnergiesMornag.png');
const NexusImg = require('../../../assets/images/stations/NexusChargingStation.png');
const ZeonImg = require('../../../assets/images/stations/ZeonChargingStation.png');
const DefaultImg = require('../../../assets/images/background/backgroundImage.png');

const stationImages: Record<string, any> = {
  'TotalEnergies_Mornag.png': TotalEnergiesImg,
  'Nexus_Charging_Station.png': NexusImg,
  'Zeon_Charging_Station.png': ZeonImg,
};

const SearchStationScreen = () => {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const panelHeight = useRef(new Animated.Value(PANEL_HEIGHT)).current;
  const [activeFilter, setActiveFilter] = useState('Relevance');
  const [showMicAlert, setShowMicAlert] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [stations, setStations] = useState<Station[]>([]);
  const [shareVisible, setShareVisible] = useState(false);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  useEffect(() => {
    const preparedStations: Station[] = stationsData.map((station) => {
      const imageName = station.image.split('/').pop() || station.image;
      const imageSource = stationImages[imageName] || DefaultImg;

      return {
        ...station,
        imageSource,
      };
    });

    setStations(preparedStations);
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = PANEL_HEIGHT - gestureState.dy;
      if (newHeight > MINIMUM_PANEL_HEIGHT && newHeight < height * 0.8) {
        panelHeight.setValue(newHeight);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      const toValue =
        gestureState.dy > 0 ? MINIMUM_PANEL_HEIGHT : PANEL_HEIGHT;
      Animated.spring(panelHeight, {
        toValue,
        useNativeDriver: false,
      }).start();
    },
  });

  const handleSharePress = (station: Station) => {
    setSelectedStation(station);
    setShareVisible(true);
  };

  const handleShare = async (platform: string) => {
    if (!selectedStation) return;
    
    const shareData = {
      message: `Check out this charging station: ${selectedStation.name}\nType: ${selectedStation.type}\nAvailability: ${selectedStation.availability}\nDistance: ${selectedStation.distance}`,
      title: `Share ${selectedStation.name}`,
    };

    setShareVisible(false);
    
    // Vous pouvez ajouter ici la logique spécifique à chaque plateforme si nécessaire
    console.log(`Sharing ${selectedStation.name} via ${platform}`, shareData);
  };

 // Dans SearchStationScreen.tsx

const renderStationItem = ({ item }: { item: Station }) => (
  <TouchableOpacity 
    style={styles.stationItem}
    onPress={() => navigation.navigate('StationDetailsScreen', { station: item })}
  >
    <Image
      source={item.imageSource}
      style={styles.stationImage}
      defaultSource={DefaultImg}
    />
    <View style={styles.stationInfo}>
      <Text style={styles.stationName}>{item.name}</Text>
      <Text style={styles.stationDistance}>{item.distance}</Text>
      <Text style={styles.stationAvailability}>{item.availability}</Text>
      <View style={styles.stationDetails}>
        <View style={styles.iconWithText}>
          <Ionicons
            name="flash"
            size={14}
            color="#292731"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.stationType}>{item.type}</Text>
        </View>
        <Text style={styles.stationPorts}>{item.ports}</Text>
      </View>
    </View>
    <TouchableOpacity 
      style={styles.shareButton}
      onPress={() => handleSharePress(item)}
    >
      <Ionicons name="share-social" size={20} color="#555" />
    </TouchableOpacity>
  </TouchableOpacity>
);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 36.8065,
          longitude: 10.1815,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.latitude,
              longitude: station.longitude,
            }}
            title={station.name}
            description={station.type}
          />
        ))}
      </MapView>

      <View style={styles.header}>
        <View style={styles.topRow}>
          <SearchBar
            onMenuPress={() => {}}
            onSearchPress={() => navigation.navigate('SearchScreen')}
            onMicPress={() => setShowMicAlert(true)}
          />
          <FilterButton onPress={() => setShowFilter(true)} />
        </View>
      </View>

      <Animated.View
        style={[
          styles.bottomPanel,
          { height: panelHeight, marginBottom: BOTTOM_BAR_HEIGHT },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.panelHandleContainer}>
          <View style={styles.panelHandle} />
        </View>

        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Results</Text>
          <TouchableOpacity
            style={styles.closeButtonCircle}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Ionicons name="close" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={stations}
          renderItem={renderStationItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.stationsList}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>

      <SharePopup
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        shareData={{
          message: selectedStation 
            ? `Check out this charging station: ${selectedStation.name}\nType: ${selectedStation.type}\nAvailability: ${selectedStation.availability}\nDistance: ${selectedStation.distance}`
            : '',
          title: selectedStation ? `Share ${selectedStation.name}` : '',
        }}
      />

      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { ...StyleSheet.absoluteFillObject },
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    zIndex: 10,
  },
  topRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 15,
    elevation: 10,
  },
  panelHandleContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  panelHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  panelTitle: {
    fontSize: 25,
    fontWeight: '400',
    left: 10,
  },
  stationsList: {
    paddingBottom: 100,
  },
  stationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  stationImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 15,
    backgroundColor: '#eee',
  },
  stationInfo: { flex: 1 },
  stationName: { fontSize: 16, fontWeight: 'bold', marginBottom: 3 },
  stationDistance: { fontSize: 14, color: '#555', marginBottom: 3 },
  stationAvailability: { fontSize: 12, color: '#777', marginBottom: 5 },
  stationDetails: { flexDirection: 'row' },
  stationType: {
    fontSize: 12,
    color: '#292731',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
  },
  stationPorts: {
    fontSize: 12,
    color: '#292731',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  iconWithText: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
  },
  closeButtonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a8a6a6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchStationScreen;