import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

interface LowBatteryCardProps {
  batteryLevel: number;
  onDismiss: () => void;
  onFindStations: () => void;
}

const LowBatteryCard: React.FC<LowBatteryCardProps> = ({
  batteryLevel,
  onDismiss,
  onFindStations
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Ionicons name="warning-outline" size={30} color="#050505" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.warningText}>{batteryLevel}% Remaining</Text>
          <Text style={styles.subText}>Please Charge.</Text>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
          <Text style={styles.buttonText}>Dismiss</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.stationsButton} onPress={onFindStations}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Nearby Stations</Text>
          <MaterialIcons name="directions" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
   width: '70%',
    backgroundColor: '#ebebede6',
    borderRadius: 15,
    padding: 12,
   shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,

    // Ombres
    
  },
  content: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  warningText: {
    color: '#040404',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subText: {
    color: '#555050',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  dismissButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationsButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#050505',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 12,
  },
});

export default LowBatteryCard;
