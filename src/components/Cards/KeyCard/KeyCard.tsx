import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

type KeyCardProps = {
  title: string;
  children: React.ReactNode;
  style?: ViewStyle;
};

const KeyCard: React.FC<KeyCardProps> = ({ title, children, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.cardTitle}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default KeyCard;
