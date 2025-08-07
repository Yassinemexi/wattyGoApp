import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type UserCardProps = {
  name: string;
  battery: number;
  distance: number;
};

const UserCard: React.FC<UserCardProps> = ({ name, battery, distance }) => {
  return (
    <View style={styles.userCard}>
      <Text style={styles.greeting}>Hello, {name}!</Text>
      <View style={styles.infoRow}>
        <Ionicons name="battery-charging" size={20} color="#033" />
        <Text style={styles.infoText}>Battery: {battery}%</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="home" size={20} color="#033" />
        <Text style={styles.infoText}>Home: {distance}km away</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  userCard: {
    width: '70%',
    backgroundColor: '#ebebede6',
    borderRadius: 15,
    padding: 15,
   shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    
  },
  greeting: {
    color: '#555050',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 1,
  },
  infoText: {
    color: '#555050',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default UserCard;
