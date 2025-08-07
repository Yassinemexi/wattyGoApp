// SendFeedbackScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../../Shared/NavBar/NavBar';
import CustomAlert from '../../components/Alert/CustomAlert';
import { DualButtonAlert } from '../../components/Alert/DualButtonAlert';

const { width } = Dimensions.get('window');

const SendFeedbackScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [feedbackText, setFeedbackText] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendPress = () => {
    if (feedbackText.trim()) {
      setShowConfirmation(true);
    }
  };

  const confirmSend = () => {
    setShowConfirmation(false);
    // Simuler l'envoi du feedback
    setTimeout(() => {
      setShowSuccess(true);
    }, 500);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/backgroundImage.png')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.closeButton}
        >
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Feedback</Text>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={handleSendPress}
          disabled={!feedbackText.trim()}
        >
          <Ionicons 
            name="send-outline" 
            size={24} 
            color={feedbackText.trim() ? "#424758" : "#ccc"} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Great! Let's get started 😊</Text>
        </View>

        {/* Description */}
        <Text style={styles.sectionTitle}>Could you describe your issue or suggestion?</Text>
        <Text style={styles.disclaimerText}>Please don't include sensitive information</Text>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Feedback Input */}
        <TextInput
          style={styles.feedbackInput}
          multiline
          placeholder="Tell us how we can improve our product"
          placeholderTextColor="#999"
          value={feedbackText}
          onChangeText={setFeedbackText}
          textAlignVertical="top"
        />
      </ScrollView>

      {/* Confirmation Modal */}
      <DualButtonAlert
        visible={showConfirmation}
        iconType="material"
        iconName="help-outline"
        iconColor="#424758"
        title="Send Feedback?"
        message="Are you sure you want to send this feedback?"
        primaryButtonText="Send"
        secondaryButtonText="Cancel"
        onPrimaryPress={confirmSend}
        onSecondaryPress={() => setShowConfirmation(false)}
      />

      {/* Success Modal */}
      <CustomAlert
        visible={showSuccess}
        iconType="ant"
        iconName="checkcircleo"
        iconColor="#1a1b1aff"
        title="Feedback Sent"
        message="Your feedback has been sent successfully!"
        buttonText="OK"
        onClose={() => {
          setShowSuccess(false);
          navigation.goBack();
        }}
      />

      <BottomNavBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { 
    flex: 1 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    marginBottom: 20,
  },
  closeButton: {
    padding: 6
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    flex: 1,
  },
  sendButton: {
    padding: 8,
    marginLeft: 10,
  },
  welcomeCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: '#424758',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424758',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  feedbackInput: {
    backgroundColor: '#ffffffe1',
    borderRadius: 12,
    padding: 16,
    minHeight: 150,
    fontSize: 16,
    color: '#424758',
    marginBottom: 30,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default SendFeedbackScreen;