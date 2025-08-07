import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

const { width, height } = Dimensions.get('window');

const StartScreen4 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <ImageBackground
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <BackBtn />

        <View style={styles.header}>
          <Text style={styles.title}>Register For Free</Text>
          <Text style={styles.subtitle}>and unlock the full experience</Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featurePoint}>• Add your EV to see compatible charge points</Text>
          <Text style={styles.featurePoint}>• Plan routes and save them to the app</Text>
          <Text style={styles.featurePoint}>• Store and view charging receipts</Text>
          <Text style={styles.featurePoint}>• Ask our community for help and advice</Text>
          <Text style={styles.featurePoint}>• Sync your usage across devices</Text>
        </View>

        <View style={styles.buttonsContainer}>
          

          <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.skipButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
              Log In
            </Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 30,
  },
  header: {
    marginTop: height * 0.15,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
fontSize: width * 0.09,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  featuresContainer: {
    marginTop: 30,
    marginBottom: 80,
    alignItems: 'center',
    width: '100%',
  },

  featurePoint: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'left',
    width: '90%',
    maxWidth: 350,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  registerButton: {
    width: 190,
    paddingVertical: 10,
    backgroundColor: '#292731',
    borderRadius: 30,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    width: 190,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    position: 'absolute',
    bottom:70,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
  color: '#FFFFFF',
  fontSize: 14,
  textAlign: 'center',
},

  loginLink: {
    color: '#FF4C4C',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default StartScreen4;
