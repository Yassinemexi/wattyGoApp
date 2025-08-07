// components/SearchBar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

type Props = {
  onMenuPress: () => void;
  onSearchPress: () => void;
  onMicPress: () => void; // ← AJOUT ICI
  style?: any;
};

const SearchBar = ({ onMenuPress, onSearchPress, onMicPress, style }: Props) => {
  return (
    <View style={[styles.searchContainer, style]}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={onMenuPress} style={styles.menuIcon}>
          <Entypo name="menu" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.searchArea} onPress={onSearchPress}>
          <Text style={styles.searchText}>Search a location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.micIcon} onPress={onMicPress}>
          <Entypo name="mic" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  menuIcon: {
    marginRight: 10,
  },
  searchArea: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  searchText: {
    color: '#555',
    fontSize: 16,
  },
  micIcon: {
    borderRadius: 20,
    padding: 5,
  },
});

export default SearchBar;
