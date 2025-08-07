// RouteScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const RouteScreen = () => {
  const navigation = useNavigation();
  const [startLocation, setStartLocation] = React.useState('');
  const [destination, setDestination] = React.useState('');

  const recentSearches = [
    'Chargemap Carrefour La Marsa',
    'TotalEnergies Momag – 50kW Fast',
    'Autoroute A1 – Station El Fahs',
    'Centre Urbain Nord – Tunis',
    'Sousse Medina – Public charger',
  ];

  const handleSearch = () => {
    if (startLocation && destination) {
      (navigation as any).navigate('RouteMapScreen', {
        start: startLocation,
        end: destination,
      });
    }
  };


  const swapLocations = () => {
    const temp = startLocation;
    setStartLocation(destination);
    setDestination(temp);
  };

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <MaterialIcons name="history" size={20} color="#000" style={{ marginRight: 10 }} />
        <Text style={styles.itemText}>{item}</Text>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../../assets/images/background/backgroundImage.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />

      {/* Conteneur blanc arrondi */}
      <View style={styles.cardContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: -8 }}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Plan Your Route</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Inputs */}
        <View style={styles.inputSection}>
          <View style={styles.inputsWrapper}>
            <View style={styles.iconColumn}>
              <MaterialIcons name="my-location" size={20} color="#5d5c5cff" />
              <View style={styles.solidLine} />
              <MaterialIcons name="location-on" size={20} color="#5d5c5cff" />
            </View>

            <View style={styles.inputColumn}>
              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Choose start location"
                  value={startLocation}
                  onChangeText={setStartLocation}
                  placeholderTextColor="#888"
                  style={styles.input}
                />
              </View>

              <View style={styles.inputBox}>
                <TextInput
                  placeholder="Choose destination"
                  value={destination}
                  onChangeText={setDestination}
                  placeholderTextColor="#888"
                  style={styles.input}
                />
              </View>
            </View>

            <TouchableOpacity onPress={swapLocations} style={styles.swapButton}>
              <MaterialIcons name="swap-vert" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recherches récentes */}
      <View style={styles.listContainer}>
        <FlatList
          data={recentSearches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  cardContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 0, // supprime les marges à gauche/droite
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  inputSection: {
    alignItems: 'center',
  },
  inputsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconColumn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 90,
    marginRight: 10,
  },
  solidLine: {
    width: 1,
    height: 25,
    backgroundColor: '#ccc',
    marginVertical: 2,
  },
  inputColumn: {
    justifyContent: 'space-between',
    height: 90,
  },
  inputBox: {
    width: width * 0.65,
    height: 45,
    backgroundColor: '#d9d6d6ff',
    borderRadius: 30,
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#524F4F',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 4,
    elevation: 4,
  },
  input: {
    fontSize: 14,
    color: '#000',
  },
  swapButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  searchButton: {
    backgroundColor: '#292731',
    borderRadius: 30,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '40%',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 5,
    elevation: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    paddingHorizontal: 2,
  },
  listContent: {
    paddingBottom: 10,
    paddingHorizontal: 30,
  },
  itemContainer: {
    paddingVertical: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.49)',
    marginVertical: 5,
  },
});

export default RouteScreen;
