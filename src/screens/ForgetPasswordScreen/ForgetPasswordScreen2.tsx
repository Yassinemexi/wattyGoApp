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
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

const { width, height } = Dimensions.get('window');

const ForgetPasswordScreen2 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<any>();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const expectedCode = '123456'; // À remplacer plus tard

  // 🔁 Récupérer l’email transmis depuis ForgetPasswordScreen1
  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
  }, [route.params]);

  const handleNext = () => {
    if (!code) {
      setCodeError('Verification code is required.');
      return;
    } else if (code !== expectedCode) {
      setCodeError('Invalid verification code.');
      return;
    }

    // Naviguer vers l’étape suivante avec l’email
    navigation.navigate('ForgetPasswordScreen3', { email });
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
                  We’ve just sent a 6-digit code to your email.
                </Text>
              </Text>
            </View>

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, { backgroundColor: '#eee' }]}
              value={email}
              editable={false}
              selectTextOnFocus={false}
            />

            {codeError ? <Text style={styles.errorText}>{codeError}</Text> : null}

            <Text style={styles.label}>Verification Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter the 6-digit code"
              placeholderTextColor="#555"
              keyboardType="number-pad"
              value={code}
              onChangeText={text => {
                setCode(text);
                if (codeError) setCodeError('');
              }}
              maxLength={6}
            />
          </ScrollView>

          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.loginButton} onPress={handleNext}>
              <Text style={styles.loginButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default ForgetPasswordScreen2;

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
  input: {
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderRadius: 25,
    padding: 12,
    marginBottom: 12,
    color: '#22262B',
    borderColor: '#fff',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
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
});
