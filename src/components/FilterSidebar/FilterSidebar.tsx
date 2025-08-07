import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';

const bgImage = require('../../../assets/images/background/sidebar-bg.png');

const FilterSidebar = ({ onClose, onApplyFilters }: { onClose: () => void, onApplyFilters: (filters: any) => void }) => {
  // État pour chaque section
  const [connectorTypes, setConnectorTypes] = useState([
    { name: 'Type 1', selected: false },
    { name: 'Type 2', selected: false },
    { name: 'CCS Combo', selected: false },
    { name: 'CHAdeMO', selected: false },
    { name: 'Tesla Supercharger', selected: false },
  ]);

  const [rechargeSpeeds, setRechargeSpeeds] = useState([
    { name: 'Slow (≤ 7 kW)', selected: false },
    { name: 'Medium (≥ 22 kW)', selected: false },
    { name: 'Fast (≥ 50 kW)', selected: false },
    { name: 'Ultra fast (≥150 kW)', selected: false },
  ]);

  const [availabilities, setAvailabilities] = useState([
    { name: 'Kiosks available now', selected: false },
    { name: 'Reservation possible', selected: false },
    { name: 'Accessible 24/7', selected: false },
  ]);

  const [paymentOptions, setPaymentOptions] = useState([
    { name: 'Free', selected: false },
    { name: 'Fixed price', selected: false },
    { name: 'Pay by the minute', selected: false },
    { name: 'Pay by kWh', selected: false },
  ]);

  // Fonction pour sélectionner/désélectionner tous les éléments d'une section
  const toggleAll = (section: string, selectAll: boolean) => {
    switch (section) {
      case 'connector':
        setConnectorTypes(connectorTypes.map(item => ({ ...item, selected: selectAll })));
        break;
      case 'speed':
        setRechargeSpeeds(rechargeSpeeds.map(item => ({ ...item, selected: selectAll })));
        break;
      case 'availability':
        setAvailabilities(availabilities.map(item => ({ ...item, selected: selectAll })));
        break;
      case 'payment':
        setPaymentOptions(paymentOptions.map(item => ({ ...item, selected: selectAll })));
        break;
    }
  };

  // Fonction pour gérer la sélection individuelle
  const handleSelect = (section: string, index: number) => {
    switch (section) {
      case 'connector':
        const updatedConnectors = [...connectorTypes];
        updatedConnectors[index].selected = !updatedConnectors[index].selected;
        setConnectorTypes(updatedConnectors);
        break;
      case 'speed':
        const updatedSpeeds = [...rechargeSpeeds];
        updatedSpeeds[index].selected = !updatedSpeeds[index].selected;
        setRechargeSpeeds(updatedSpeeds);
        break;
      case 'availability':
        const updatedAvailabilities = [...availabilities];
        updatedAvailabilities[index].selected = !updatedAvailabilities[index].selected;
        setAvailabilities(updatedAvailabilities);
        break;
      case 'payment':
        const updatedPayments = [...paymentOptions];
        updatedPayments[index].selected = !updatedPayments[index].selected;
        setPaymentOptions(updatedPayments);
        break;
    }
  };

  // Fonction pour appliquer les filtres
  const applyFilters = () => {
    const filters = {
      connectors: connectorTypes.filter(item => item.selected).map(item => item.name),
      speeds: rechargeSpeeds.filter(item => item.selected).map(item => item.name),
      availabilities: availabilities.filter(item => item.selected).map(item => item.name),
      payments: paymentOptions.filter(item => item.selected).map(item => item.name),
    };
    onApplyFilters(filters);
    onClose();
  };

  return (
    <ImageBackground source={bgImage} style={styles.background} imageStyle={styles.imageStyle}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialIcons name="close" size={24} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>Find the perfect{'\n'}charging spot</Text>

        <ScrollView style={styles.scrollView}>
          {/* Section Connector Type */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.section}>
                <MaterialCommunityIcons name="lightning-bolt" size={18} color="#333" /> Connector type
              </Text>
              <TouchableOpacity onPress={() => toggleAll('connector', !connectorTypes.every(item => item.selected))}>
                <Text style={styles.selectAllText}>
                  {connectorTypes.every(item => item.selected) ? 'Deselect all' : 'Select all'}
                </Text>
              </TouchableOpacity>
            </View>
            {connectorTypes.map((type, index) => (
              <View key={index} style={styles.optionRow}>
                <Text style={[
                  styles.optionText,
                  type.selected && styles.selectedOptionText
                ]}>
                  {type.name}
                </Text>
                <Checkbox
                  value={type.selected}
                  onValueChange={() => handleSelect('connector', index)}
                  color={type.selected ? '#575555ff' : undefined}
                />
              </View>
            ))}
          </View>

          {/* Section Recharge Speed */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.section}>
              <MaterialCommunityIcons name="speedometer" size={18} color="#333" />Recharge speed</Text>
              <TouchableOpacity onPress={() => toggleAll('speed', !rechargeSpeeds.every(item => item.selected))}>
                <Text style={styles.selectAllText}>
                  {rechargeSpeeds.every(item => item.selected) ? 'Deselect all' : 'Select all'}
                </Text>
              </TouchableOpacity>
            </View>
            {rechargeSpeeds.map((speed, i) => (
              <View key={i} style={styles.optionRow}>
                <Text style={[
                  styles.optionText,
                  speed.selected && styles.selectedOptionText
                ]}>
                  {speed.name}
                </Text>
                <Checkbox
                  value={speed.selected}
                  onValueChange={() => handleSelect('speed', i)}
                  color={speed.selected ? '#575555ff' : undefined}
                />
              </View>
            ))}
          </View>

          {/* Section Availability */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.section}>
                <MaterialCommunityIcons name="clock-outline" size={18} color="#333" />
                Availability</Text>
              <TouchableOpacity onPress={() => toggleAll('availability', !availabilities.every(item => item.selected))}>
                <Text style={styles.selectAllText}>
                  {availabilities.every(item => item.selected) ? 'Deselect all' : 'Select all'}
                </Text>
              </TouchableOpacity>
            </View>
            {availabilities.map((opt, i) => (
              <View key={i} style={styles.optionRow}>
                <Text style={[
                  styles.optionText,
                  opt.selected && styles.selectedOptionText
                ]}>
                  {opt.name}
                </Text>
                <Checkbox
                  value={opt.selected}
                  onValueChange={() => handleSelect('availability', i)}
                  color={opt.selected ? '#575555ff' : undefined}
                />
              </View>
            ))}
          </View>

          {/* Section Payment Options */}
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.section}>
                <MaterialCommunityIcons name="credit-card-outline" size={18} color="#333" />Payment Options</Text>
              <TouchableOpacity onPress={() => toggleAll('payment', !paymentOptions.every(item => item.selected))}>
                <Text style={styles.selectAllText}>
                  {paymentOptions.every(item => item.selected) ? 'Deselect all' : 'Select all'}
                </Text>
              </TouchableOpacity>
            </View>
            {paymentOptions.map((pay, i) => (
              <View key={i} style={styles.optionRow}>
                <Text style={[
                  styles.optionText,
                  pay.selected && styles.selectedOptionText
                ]}>
                  {pay.name}
                </Text>
                <Checkbox
                  value={pay.selected}
                  onValueChange={() => handleSelect('payment', i)}
                  color={pay.selected ? '#6b6a6aff' : undefined}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bouton Apply en bas */}
        <View style={styles.applyButtonContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
  imageStyle: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 50,
  },
  scrollView: {
    flex: 1,
    marginBottom: 70,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 25,
    color: '#333',
    textAlign: 'left',
    paddingLeft: 15,
  },
  sectionContainer: {
    marginBottom: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  section: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
  },
  selectAllText: {
    fontSize: 10,
    color: '#FF3B30',
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 18,
  },
  optionText: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 15,
  },
  selectedOptionText: {
    color: '#0c0c0cff',
    fontWeight: '600',
  },
  applyButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#f8f4f4ff',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 3,
    width: '70%',
  },
  applyButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FilterSidebar;