import React from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  Platform,
  StatusBar 
} from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface DualButtonAlertProps {
  visible: boolean;
  iconType?: 'material' | 'ant' | 'ion' | 'material-community';
  iconName: string;
  iconColor?: string;
  title: string;
  message: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
  showCheckbox?: boolean;
  checkboxText?: string;
  onCheckboxChange?: (value: boolean) => void;
  checkboxValue?: boolean;
}

export const DualButtonAlert: React.FC<DualButtonAlertProps> = ({
  visible,
  iconType = 'material',
  iconName,
  iconColor = '#000',
  title,
  message,
  primaryButtonText = 'OK',
  secondaryButtonText = 'Cancel',
  onPrimaryPress,
  onSecondaryPress,
  showCheckbox = false,
  checkboxText = "Don't ask again",
  onCheckboxChange,
  checkboxValue = false,
}) => {
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
        IconComponent = MaterialCommunityIcons;
        break;
      case 'material':
      default:
        IconComponent = MaterialIcons;
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
    <Modal 
      animationType="fade" 
      transparent 
      visible={visible}
      onRequestClose={onSecondaryPress}
      statusBarTranslucent
    >
      <View style={styles.fullScreenOverlay}>
        <StatusBar backgroundColor="rgba(0,0,0,0.7)" translucent />
        <View style={styles.modalContainer}>
          {renderIcon()}
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalMessage}>{message}</Text>
          
          {showCheckbox && (
            <View style={styles.checkboxRow}>
              <TouchableOpacity 
                style={styles.checkboxButton} 
                onPress={() => onCheckboxChange && onCheckboxChange(!checkboxValue)}
              >
                <View style={[styles.checkboxBox, checkboxValue && styles.checkboxActive]}>
                  {checkboxValue && <AntDesign name="check" size={14} color="white" />}
                </View>
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>{checkboxText}</Text>
            </View>
          )}
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              onPress={onSecondaryPress} 
              style={[styles.actionButton, styles.cancelButton]}
              activeOpacity={0.7}
            >
              <Text style={styles.actionButtonText}>{secondaryButtonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onPrimaryPress} 
              style={[styles.actionButton, styles.confirmButton]}
              activeOpacity={0.7}
            >
              <Text style={[styles.actionButtonText, styles.confirmButtonText]}>{primaryButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxButton: {
    marginRight: 8,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  confirmButton: {
    backgroundColor: '#292731',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
  },
});