import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import CardComponent from '../../components/Cards/StartsScreensCards/CardComponent';
import Footer from '../../components/Footer/Footer';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

const { width, height } = Dimensions.get('window');

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const StartScreen1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();



  return (
    <ImageBackground 
      source={require('../../../assets/images/background/backgroundImage.png')}
      style={styles.backgroundImage}
      imageStyle={[styles.imageStyle, { alignSelf: 'flex-end' }]}
    >
      <View style={styles.container}>
        {/* Back Button at top left */}
        <View style={styles.header}>
          <Text style={styles.subtitle}>Welcome to</Text>
          <Text style={styles.title}>WattyGo</Text>
          <Text style={styles.text}>Powering the future of mobility.</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.infoText}>Find the perfect charge  instantly</Text>
          <Text style={styles.infoText}>Smart suggestions, tailored to your journey</Text>
          <Text style={styles.infoText}>Seamless charging  wherever you go</Text>
        </View>
        <View style={styles.bottomContent}>
          <TouchableOpacity 
            style={styles.letsGoButton}
            onPress={() => navigation.navigate('StartScreen2')}
          >
            <Text style={styles.letsGoText}>Let's Go</Text>
          </TouchableOpacity>
          <Footer />
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
  },
  header: {
    alignItems: 'flex-start',
    marginTop: height * 0.2,
    marginBottom: 30,
    paddingLeft: 40,
  },
    backButton: {
  
   width: width * 0.09,
    height: width * 0.09,
    position: 'absolute',
    left: width * 0.075,
    top: -height * 0.002,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '400',
    marginBottom: 0,
    textAlign: 'left',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 0,
    textAlign: 'left',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'left',
  },
  infoBlock: {
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingLeft: 40,
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'left',
  },
  cardsContainer: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 50,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  letsGoButton: {
     width: 210, // même largeur fixe
    paddingVertical: 12,
    paddingHorizontal: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    marginBottom: 90,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'center',
  alignItems: 'center', // centrer le texte
  },
  letsGoText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default StartScreen1;