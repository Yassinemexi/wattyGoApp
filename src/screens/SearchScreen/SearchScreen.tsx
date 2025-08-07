import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Keyboard,
} from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomAlert from '../../components/Alert/CustomAlert';
import { DualButtonAlert } from '../../components/Alert/DualButtonAlert';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [recentSearches, setRecentSearches] = useState([
    'BMTC Charging Station',
    'type 2 charger',
    'super fast charging ports',
    'Tesla Charging Station',
    'CCS charger',
    'parking lots near Megrine',
  ]);

  const handleDeleteClick = (item: string) => {
    setItemToDelete(item);
    setDeleteAlertVisible(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      setRecentSearches(recentSearches.filter(term => term !== itemToDelete));
    }
    setDeleteAlertVisible(false);
    setItemToDelete(null);
  };

  const cancelDelete = () => {
    setDeleteAlertVisible(false);
    setItemToDelete(null);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      // Ajouter la recherche aux recherches récentes si elle n'existe pas déjà
      if (!recentSearches.includes(searchTerm)) {
        setRecentSearches([searchTerm, ...recentSearches]);
      }
      
      // Naviguer vers SearchStationScreen avec le terme de recherche
      (navigation as any).navigate('SearchStationScreen', { searchQuery: searchTerm });
      Keyboard.dismiss();
    }
  };

  const handleRecentSearchPress = (item: string) => {
    setSearchTerm(item);
    (navigation as any).navigate('SearchStationScreen', { searchQuery: item });
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => handleRecentSearchPress(item)}
    >
      <View style={styles.row}>
        <AntDesign name="clockcircleo" size={18} color="#524F4F" style={{ marginRight: 10 }} />
        <Text style={styles.itemText}>{item}</Text>
        <TouchableOpacity 
          onPress={() => handleDeleteClick(item)} 
          style={styles.deleteButton}
        >
          <AntDesign name="close" size={18} color="#524F4F" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.innerContainer}>
        {/* Barre de recherche */}
        <View style={styles.searchBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={28} color="#524F4F" />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Search a location"
            value={searchTerm}
            onChangeText={setSearchTerm}
            autoFocus
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />

          <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchBtn}>
            <Entypo name="magnifying-glass" size={22} color="#524F4F" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setAlertVisible(true)}>
            <Entypo name="mic" size={20} color="#524F4F" />
          </TouchableOpacity>
        </View>
  

        {/* Liste des recherches récentes */}
        <FlatList
          data={recentSearches}
          keyExtractor={(item) => item}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>

      {/* Popup micro */}
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        title="Try saying something"
        message={`Tap the mic and speak your request\nFind nearest fast charger\n\nEnglish`}
        buttonText="OK"
        iconType="material-community"
        iconName="microphone"
        iconColor="#524F4F"
      />

      {/* Popup de confirmation de suppression */}
      <DualButtonAlert
        visible={deleteAlertVisible}
        iconType="material-community"
        iconName="delete"
        iconColor="#0c0c0cff"
        title="Delete Suggested search?"
        message="This suggested search will be removed from VoltLink"
        primaryButtonText="Delete"
        secondaryButtonText="Cancel"
        onPrimaryPress={confirmDelete}
        onSecondaryPress={cancelDelete}
      />
    </ImageBackground>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  innerContainer: {
    flex: 1,
    paddingTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 25,
    margin: 25,
    paddingHorizontal: 20,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemContainer: {
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
  },
  deleteButton: {
    padding: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#898989',
    marginTop: 10,
  },
  searchBtn: {
   
    padding: 12,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});