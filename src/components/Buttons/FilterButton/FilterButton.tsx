// components/Buttons/FilterButton/FilterButton.tsx
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterButtonProps {
  onPress: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.filterButton}>
      <MaterialIcons name="filter-list" size={30} color="#333" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
    marginLeft: 10,
    elevation: 4,
  },
});

export default FilterButton;
