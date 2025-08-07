import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface CustomAlertProps {
  visible: boolean;
  iconType?: 'material-community' | 'ant' | 'ion';
  iconName: string;
  iconColor?: string;
  title: string;
  message: string;
  buttonText: string;
  onClose: () => void;
}

const CustomAlert = ({
  visible,
  iconType = 'material-community',
  iconName,
  iconColor = '#000',
  title,
  message,
  buttonText,
  onClose,
}: CustomAlertProps) => {
  const renderIcon = () => {
    let IconComponent: any;

    switch (iconType) {
      case 'ant':
        IconComponent = AntDesign;
        break;
      case 'ion':
        IconComponent = Ionicons;
        break;
      case 'material-community':
      default:
        IconComponent = MaterialCommunityIcons;
        break;
    }

    return (
      <IconComponent
        name={iconName}
        size={48}
        color={iconColor}
        style={styles.icon}
      />
    );
  };

  return (
    <Modal animationType="fade" transparent visible={visible} statusBarTranslucent>
      <View style={styles.fullScreenOverlay}>
        <View style={styles.popupContainer}>
          {renderIcon()}
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  popupContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  icon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

export default CustomAlert;
