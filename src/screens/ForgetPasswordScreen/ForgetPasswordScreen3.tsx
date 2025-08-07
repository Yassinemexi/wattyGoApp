import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import CustomAlert from '../../components/Alert/CustomAlert';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width, height } = Dimensions.get('window');

const ForgetPasswordScreen3 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<any>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const email = route.params?.email;

  const handleSave = async () => {
    let hasError = false;
    if (!newPassword || newPassword.length < 6) {
      setPasswordLengthError('Password must be at least 6 characters.');
      hasError = true;
    } else {
      setPasswordLengthError('');
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      hasError = true;
    } else {
      setPasswordMatchError('');
    }

    if (hasError) return;

    try {
      if (rememberMe) {
        await AsyncStorage.setItem('rememberedEmail', email);
        await AsyncStorage.setItem('rememberedPassword', newPassword);
      } else {
        await AsyncStorage.removeItem('rememberedEmail');
        await AsyncStorage.removeItem('rememberedPassword');
      }

      setShowSuccess(true);
    } catch (e) {
      setPasswordLengthError('Something went wrong.');
    }
  };

  const handleAlertClose = () => {
    setShowSuccess(false);
    navigation.replace('Login');
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/backgroundImage.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
            <BackBtn />

            <View style={styles.header}>
              <Text style={styles.title}>Forgot your{'\n'}password?</Text>
              <Text style={styles.subtitle}>
                We'll help you reset it in a few steps{'\n'}
                <Text style={{ fontWeight: 'bold' }}>
                  Enter your email. We'll send a verification code.
                </Text>
              </Text>
            </View>

            {/* Password Length Error */}
            {passwordLengthError ? <Text style={styles.errorText}>{passwordLengthError}</Text> : null}
            {/* New Password */}
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter new password"
                placeholderTextColor="#555"
                secureTextEntry={!showNew}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity onPress={() => setShowNew(!showNew)}>
                <Ionicons name={showNew ? 'eye' : 'eye-off'} size={22} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Confirm Password */}
            {passwordMatchError ? <Text style={styles.errorText}>{passwordMatchError}</Text> : null}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm password"
                placeholderTextColor="#555"
                secureTextEntry={!showConfirm}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
                <Ionicons name={showConfirm ? 'eye' : 'eye-off'} size={22} color="#555" />
              </TouchableOpacity>
            </View>

            {/* Remember Me */}
            <TouchableOpacity
              style={styles.rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <Ionicons
                name={rememberMe ? 'checkbox-outline' : 'square-outline'}
                size={20}
                color="#fff"
              />
              <Text style={styles.optionText}> Remember me for next login</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* Success Alert Popup */}
          <CustomAlert
            visible={showSuccess}
            iconType="ant"
            iconName="checkcircleo"
            iconColor="#0d0d0dff"
            title="Password Reset"
            message="Your password has been reset successfully!"
            buttonText="OK"
            onClose={handleAlertClose}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Les styles restent les mêmes que dans votre fichier original
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingBottom: 150,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  header: {
    marginTop: height * 0.15,
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    color: '#22262B',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 6,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'left',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  saveButton: {
    width: 190,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 30,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
  },
  saveButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ForgetPasswordScreen3;