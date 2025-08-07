import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>By Innov Alliance Tech</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  line: {
    width: 80,
    height: 4,
    backgroundColor: '#FFFFFF',
    marginBottom: 5,
    borderRadius: 2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Footer;