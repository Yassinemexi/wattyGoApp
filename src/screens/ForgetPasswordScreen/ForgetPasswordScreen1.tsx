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
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

const { width, height } = Dimensions.get('window');

const ForgetPasswordScreen1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleNext = () => {
    if (!email) {
      setEmailError('Email is required.');
      return;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setEmailError('Invalid email address.');
      return;
    }

    setEmailSent(true);
    // TODO: Ajouter logique d'envoi email ici
   navigation.navigate('ForgetPasswordScreen2', { email }); // <-- passe l'email ici

  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <BackBtn />

            <View style={styles.header}>
              <Text style={styles.title}>Forgot your{'\n'}password?</Text>
              <Text style={styles.subtitle}>
                We’ll help you reset it in a few steps{'\n'}
                <Text style={{ fontWeight: 'bold' }}>
                  Enter your email. We'll send a verification code.
                </Text>
              </Text>
            </View>

            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
            />

      
              <View style={styles.infoContainer}>
                <Text style={styles.infoSubtitle}>Check your inbox & spam folder</Text>
                <Text style={[styles.infoSubtitle, { fontWeight: 'bold' }]}>Reset link expires in 10 minutes</Text>
              </View>
          
          </ScrollView>

          {/* Bas de l'écran */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
              <Text style={styles.loginButtonText}>Next</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Don’t have an account?{' '}
              <Text
                style={styles.footerLink}
                onPress={() => navigation.navigate('Register')}
              >
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ForgetPasswordScreen1;

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
  input: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 25,
    padding: 12,
    marginBottom: 12,
    color: '#22262B',
    borderColor: '#fff',
    borderWidth: 1,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  infoText: {
    color: '#ffe',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 8,
  },
  infoContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoSubtitle: {
    color: '#ffe',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 2,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  loginButton: {
    width: 190,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  loginButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  footerLink: {
    color: '#FF4C4C',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
