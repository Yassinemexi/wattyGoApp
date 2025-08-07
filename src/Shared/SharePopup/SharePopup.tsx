import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Dimensions, 
  ScrollView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';
import { Linking } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ShareOption {
  name: string;
  icon: string;
  bgColor: string;
}

interface SharePopupProps {
  visible: boolean;
  onClose: () => void;
  shareData: {
    message: string;
    url?: string;
    title?: string;
  };
}

const SharePopup: React.FC<SharePopupProps> = ({ visible, onClose, shareData }) => {
  const shareOptions: ShareOption[] = [
    { name: 'WhatsApp', icon: 'logo-whatsapp', bgColor: '#25D366' },
    { name: 'Facebook', icon: 'logo-facebook', bgColor: '#3b5998' },
    { name: 'Twitter', icon: 'logo-twitter', bgColor: '#1DA1F2' },
    { name: 'Email', icon: 'mail', bgColor: '#666' }
  ];

  const handleShare = async (platform: string) => {
    // ... (votre logique de partage existante reste inchangée)
  };

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        {/* Overlay cliquable pour fermer */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayBackground} />
        </TouchableWithoutFeedback>

        {/* Contenu du popup */}
        <View style={styles.popupContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Share</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.optionsContainer}
          >
            {shareOptions.map((option, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.optionItem}
                onPress={() => handleShare(option.name)}
              >
                <View style={[styles.iconContainer, { backgroundColor: option.bgColor }]}>
                  <Ionicons name={option.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.optionText}>{option.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  overlayBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  popupContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 20,
    gap: 1,
  },
  optionItem: {
    alignItems: 'center',
    marginHorizontal: 1,
    
    width: 80,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SharePopup;