import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface NoConnectionScreenProps {
  visible: boolean;
  onRetry: () => void;
}

const NoConnectionScreen = ({ visible, onRetry }: NoConnectionScreenProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.popupContainer}>
          {/* Icône wifi désactivé (vectorielle) */}
          <MaterialCommunityIcons
            name="wifi-off"
            size={45}
            color="#000"
            style={styles.icon}
          />
          
          {/* Titre */}
          <Text style={styles.title}>Connection Problem</Text>
          
          {/* Sous-titre */}
          <Text style={styles.subtitle}>Check your internet connection</Text>
          
          {/* Bouton OK */}
          <TouchableOpacity style={styles.button} onPress={onRetry}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: width * 0.85,
    maxWidth: 359,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  icon: {
    width: 45,
    height: 45,
    tintColor: '#000000',
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 23,
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '400',
    color: '#555555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
  
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '600',
    color: '#000000ff',
  },
});

export default NoConnectionScreen;