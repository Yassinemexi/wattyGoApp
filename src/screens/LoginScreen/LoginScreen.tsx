import React, { useState, useEffect } from 'react';
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
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomAlert from '../../components/Alert/CustomAlert';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // On mount, check if credentials are saved
    const loadCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('rememberedEmail');
        const savedPassword = await AsyncStorage.getItem('rememberedPassword');
        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (e) {}
    };
    loadCredentials();
  }, []);

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
              <Text style={styles.title}>Welcome back{'\n'}Log in</Text>
              <Text style={styles.subtitle}>Join now and drive the future of mobility</Text>
            </View>


            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => {
                setEmail(text);
                if (emailError) setEmailError('');
              }}
            />


            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#555"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={text => {
                  setPassword(text);
                  if (passwordError) setPasswordError('');
                }}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
              </TouchableOpacity>
            </View>

            <View style={styles.optionsRow}>
              <TouchableOpacity
                style={styles.rememberMe}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <Ionicons
                  name={rememberMe ? 'checkbox-outline' : 'square-outline'}
                  size={20}
                  color="#fff"
                />
                <Text style={styles.optionText}> Remember me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text style={[styles.optionText, styles.forgotText]}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Fixé en bas */}
          <View style={styles.bottomContainer}>


            <TouchableOpacity
              style={styles.loginButton}
              onPress={async () => {
                let valid = true;
                if (!email) {
                  setEmailError('Email is required.');
                  valid = false;
                } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                  setEmailError('Invalid email address.');
                  valid = false;
                }
                if (!password) {
                  setPasswordError('Password is required.');
                  valid = false;
                } else if (password.length < 6) {
                  setPasswordError('Password must be at least 6 characters.');
                  valid = false;
                }
                if (!valid) return;
                // Save or clear credentials
                if (rememberMe) {
                  try {
                    await AsyncStorage.setItem('rememberedEmail', email);
                    await AsyncStorage.setItem('rememberedPassword', password);
                  } catch (e) {}
                } else {
                  await AsyncStorage.removeItem('rememberedEmail');
                  await AsyncStorage.removeItem('rememberedPassword');
                }
                // Proceed with login (replace with your logic)
                setShowSuccess(true);
              }}

            >
              <Text style={styles.loginButtonText}>Login</Text>
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
        {/* Success Alert Popup */}
       <CustomAlert
  visible={showSuccess}
  iconType="ant" 
  iconName="checkcircleo"
  iconColor="#121312ff"
  title="Succès"
  message="Votre action a été effectuée avec succès."
  buttonText="OK"
  onClose={() => {
    setShowSuccess(false);
    navigation.replace('HomeScreen');
  }}
/>

      </View>
    </KeyboardAvoidingView>
  </ImageBackground>
  );
};

export default LoginScreen;



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
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
  },
  forgotText: {
    textDecorationLine: 'underline',
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderWidth: 1,
    marginBottom: 10,
    shadowColor: '#000',
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
  credit: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 8,
  },
  footerLine: {
    marginTop: 8,
    height: 2,
    width: 120,
    backgroundColor: '#fff',
    borderRadius: 1,
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
});
