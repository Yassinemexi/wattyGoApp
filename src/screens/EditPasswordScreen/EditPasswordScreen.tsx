// EditPasswordScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../../Shared/NavBar/NavBar';
import CustomAlert from '../../components/Alert/CustomAlert'; // ajuste le chemin si besoin

const { width } = Dimensions.get('window');

const EditPasswordScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Les mots de passe ne correspondent pas');
      return;
    }
    // logique de sauvegarde réelle...
    setShowSuccess(true);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/backgroundImage.png')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Password</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.subtitle}>
          ENTER YOUR CURRENT PASSWORD AND CHOOSE A NEW ONE.
        </Text>

        {/* Current Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={currentPassword}
              onChangeText={setCurrentPassword}
              placeholder="Current Password"
              secureTextEntry={!showCurrentPassword}
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrentPassword(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                showCurrentPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
              }
            >
              <Ionicons
                name={showCurrentPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#424758"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              secureTextEntry={!showNewPassword}
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNewPassword(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                showNewPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
              }
            >
              <Ionicons
                name={showNewPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#424758"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm Password"
              secureTextEntry={!showConfirmPassword}
              placeholderTextColor="#666"
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(prev => !prev)}
              accessibilityRole="button"
              accessibilityLabel={
                showConfirmPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'
              }
            >
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={20}
                color="#424758"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>SAVE</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />

      {/* Succès popup */}
      <CustomAlert
        visible={showSuccess}
        iconType="ant"
        iconName="checkcircleo"
        iconColor="#292731"
        title="Succès"
        message="Votre mot de passe a été mis à jour."
        buttonText="OK"
        onClose={() => {
          setShowSuccess(false);
          navigation.goBack(); // ou navigation.replace('HomeScreen')
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 50,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#131313ff',
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: '600',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#424758',
    marginBottom: 8,
    fontWeight: '500',
    marginLeft: 10,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    width: width * 0.85,
    alignSelf: 'center',
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 0,
  },
  eyeIcon: {
    padding: 6,
  },
  saveButton: {
    width: 190,
    height: 50,
    backgroundColor: '#292731',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default EditPasswordScreen;
