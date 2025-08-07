import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  UIManager,
  findNodeHandle
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

import CustomAlert from '../../components/Alert/CustomAlert'; // adapte le chemin si besoin

const { width, height } = Dimensions.get('window');

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const scrollViewRef = useRef<ScrollView>(null);
  const passwordFieldRef = useRef<View>(null);

  const [showSuccess, setShowSuccess] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const scrollToPasswordField = () => {
    const passwordNode = findNodeHandle(passwordFieldRef.current);
    const scrollNode = findNodeHandle(scrollViewRef.current);

    if (passwordNode && scrollNode && scrollViewRef.current) {
      UIManager.measureLayout(
        passwordNode,
        scrollNode,
        () => {},
        (_x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
        }
      );
    }
  };

  const validateInputs = () => {
    let valid = true;
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
   
    if (!username.match(/^[A-Za-z0-9_]+$/)) {
      setUsernameError('Only letters, numbers and underscores are allowed.');
      valid = false;
    }

    if (!email.endsWith('@gmail.com')) {
      setEmailError('Email must end with @gmail.com');
      valid = false;
    }

    if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/)) {
      setPasswordError('Password must be at least 8 characters and include letters, numbers, and symbols.');
      valid = false;
      setTimeout(scrollToPasswordField, 100);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      setShowSuccess(true);
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <BackBtn />
            <View style={styles.header}>
              <Text style={styles.title}>Let’s get started{'\n'}Register</Text>
              <Text style={styles.subtitle}>Join now and drive the future of mobility</Text>
            </View>

            {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#555"
              value={username}
              onChangeText={setUsername}
            />

            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="user@galim.com"
              placeholderTextColor="#555"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordContainer} ref={passwordFieldRef}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#555"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
              </TouchableOpacity>
            </View>

            {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
            <Text style={styles.label}>Confirm Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#555"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#555" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.bottomFixed} pointerEvents="box-none">
            <TouchableOpacity style={styles.registerButton} onPress={validateInputs}>
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>
                Already have an account?{' '}
                <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
                  Log In
                </Text>
              </Text>
            </View>
          </View>
          <CustomAlert
            visible={showSuccess}
            iconType="ant"
            iconName="checkcircleo"
            iconColor="#121312ff"
            title="Succès"
            message="Votre compte a été créé avec succès !"
            buttonText="OK"
            onClose={() => {
              setShowSuccess(false);
              navigation.navigate('Login');
            }}
          />

        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 30,
    paddingBottom: 150,
  },
  header: {
    marginTop: height * 0.15,
    marginBottom: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 4,
    color: '#22262B',
    borderColor: '#fff',
    borderWidth: 1,
    fontSize: 14,
    height: 38,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    paddingHorizontal: 12,
    marginBottom: 4,
    height: 38,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 0,
    color: '#22262B',
    fontSize: 14,
    height: 38,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  bottomFixed: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 70,
    alignItems: 'center',
  },
  registerButton: {
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
    shadowColor: '#000',
  },
  registerButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  loginLink: {
    color: '#FF4C4C',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
});
