import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface CardProps {
  title: string;
  description: string;
  icon?: any;
}

const CardComponent = ({ title, description, icon }: CardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.7,
    height: 200,
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 20,
    marginRight: 52, 
    marginLeft: 3,
    padding: 25,    
    marginBottom: 10, 
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    marginBottom: 12,
    marginTop: 10,
    tintColor: '#FFFFFF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cardDescription: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 18,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default CardComponent;