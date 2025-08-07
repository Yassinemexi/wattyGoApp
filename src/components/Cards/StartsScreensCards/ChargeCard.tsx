
import * as React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const ChargeCard = () => {
  return (
    <View style={styles.card}>
        <Text style={styles.cardTitle}>ONE CARD. All NETWORKS.</Text>
        <Text style={styles.cardTitle}>UNLIMITED FREEDOM.</Text>
      <Image
        source={require('../../../../assets/images/booking/charge-card.png')}
        style={styles.cardImage}
        resizeMode="contain"
      />
    
      
      <View style={styles.cardInfo}>
        <Text style={styles.cardText}>• No subscription required</Text>
        <Text style={styles.cardText1}>• Card cost: 50 DT - valid throughout Tunisia</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 16,
    paddingVertical: height * 0.015, 
    paddingHorizontal: width * 0.04,
    alignItems: 'center',
    marginBottom: 17,
    width: width * 0.75, 
    alignSelf: 'center',
  },
  cardImage: {
    width: '90%',
    height: height * 0.13, // image plus petite
    marginBottom: -12,
    marginTop: -5,
  },
  cardTitle: {
    fontSize: width * 0.035, // plus petit
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 1,
    marginTop: 3,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  cardInfo: {
    width: '100%',
    alignItems: 'center',
    marginTop: 6,
  },
  cardText: {
    fontSize: width * 0.033, // plus petit
    color: '#FFFFFF',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  cardText1: {
    fontSize: width * 0.033,
    color: '#FFFFFF',
    marginBottom: 0,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
});


export default ChargeCard;