// RouteMapScreen.tsx
import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const PANEL_HEIGHT = 360;
const MINIMUM_PANEL_HEIGHT = 100;

const RouteMapScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const pan = useRef(new Animated.ValueXY()).current;
  const panelHeight = useRef(new Animated.Value(PANEL_HEIGHT)).current;

  const { start = '', end = '' } = (route.params || {}) as {
    start?: string;
    end?: string;
  };

  const coordinates = [
    { latitude: 36.8663, longitude: 10.1647 },
    { latitude: 36.8853, longitude: 10.325 },
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const newHeight = PANEL_HEIGHT - gestureState.dy;
      if (newHeight > MINIMUM_PANEL_HEIGHT && newHeight < height * 0.9) {
        panelHeight.setValue(newHeight);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 0) {
        Animated.spring(panelHeight, {
          toValue: MINIMUM_PANEL_HEIGHT,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(panelHeight, {
          toValue: PANEL_HEIGHT,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Keep current height for toggle logic
  const currentPanelHeight = useRef(PANEL_HEIGHT);
  panelHeight.addListener(({ value }) => {
    currentPanelHeight.current = value;
  });

  const togglePanel = () => {
    const currentHeight = currentPanelHeight.current;
    Animated.spring(panelHeight, {
      toValue:
        currentHeight > MINIMUM_PANEL_HEIGHT + 100
          ? MINIMUM_PANEL_HEIGHT
          : PANEL_HEIGHT,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 36.8663,
          longitude: 10.1647,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={coordinates[0]} title="Start" />
        <Marker coordinate={coordinates[1]} title="Destination" />
        <Polyline
          coordinates={coordinates}
          strokeWidth={4}
          strokeColor="#f75252"
        />
      </MapView>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
        accessibilityRole="button"
      >
        <Ionicons name="chevron-back" size={28} color="#0e0e0eff" />
      </TouchableOpacity>

      <View style={styles.headerCard}>
        <View style={styles.locationsContainer}>
          <View style={styles.row}>
            <MaterialIcons
              name="my-location"
              size={18}
              color="#555050"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.locationText}>{start}</Text>
          </View>
          <View style={styles.separatorLine} />
          <View style={styles.row}>
            <MaterialIcons
              name="location-on"
              size={18}
              color="#555050"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.locationText}>{end}</Text>
          </View>
        </View>
        <TouchableOpacity accessibilityRole="button">
          <MaterialIcons name="swap-vert" size={28} color="#555050" />
        </TouchableOpacity>
      </View>

      {/* Animated Bottom Panel */}
      <Animated.View
        style={[
          styles.bottomPanel,
          {
            height: panelHeight,
            transform: [{ translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity onPress={togglePanel} style={styles.panelHandleContainer}>
          <View style={styles.panelHandle} />
        </TouchableOpacity>

        <View style={styles.panelContent}>
          <View style={styles.titleRow}>
            <Text style={styles.driveTitle}>Drive</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.subHeading}>
                Chargemap Carrefour La Marsa
              </Text>
            </View>
          </View>

          <Text style={styles.subText}>
            Fastest route, despite the usual traffic
          </Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Distance estimée:</Text>
            <View style={styles.detailValue}>
              <MaterialIcons
                name="directions-car"
                size={20}
                color="#555050"
              />
              <Text style={styles.detailText}>42 min (8.1 km)</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Type de chargeur:</Text>
            <View style={styles.detailValue}>
              <MaterialIcons
                name="electrical-services"
                size={20}
                color="#555050"
              />
              <Text style={styles.detailText}>CCS</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Statut:</Text>
            <View style={styles.detailValue}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="green"
              />
              <Text style={styles.detailText}>Available</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Places disponibles:</Text>
            <View style={styles.detailValue}>
              <MaterialIcons
                name="event-available"
                size={20}
                color="#555050"
              />
              <Text style={styles.detailText}>1/3 Available</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.bookBtn} accessibilityRole="button">
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  headerCard: {
    position: 'absolute',
    top: 100,
    left: 45,
    right: 45,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    zIndex: 5,
  },
  locationsContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
    marginLeft: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#555050',
  },
  bottomPanel: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  panelHandleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  panelHandle: {
    width: 60,
    height: 7,
    borderRadius: 3,
    backgroundColor: '#ccc',
  },
  panelContent: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    width: '100%',
  },
  driveTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeading: {
    fontSize: 12,
    color: '#565555ff',
  },
  subText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  detailValue: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    justifyContent: 'flex-end',
  },
  detailText: {
    fontSize: 13,
    marginLeft: 4,
    color: '#444',
  },
  bookBtn: {
    backgroundColor: '#292731',
    borderRadius: 30,
    marginTop: 15,
    paddingVertical: 10,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  bookText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});

export default RouteMapScreen;
