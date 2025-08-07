// components/Buttons/KeyButton.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

interface KeyButtonProps {
  onPress: () => void;
}

const KeyButton: React.FC<KeyButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.rectangle}>
        <Text style={styles.text}>Key</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
  },
  rectangle: {
    height: 42,
    width: 78,
    backgroundColor: '#fff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
        justifyContent: 'center',
    alignItems: 'center',
        textAlign: 'center',
  },
});

export default KeyButton;