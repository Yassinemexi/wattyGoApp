import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CardComponent from '../../components/Cards/StartsScreensCards/CardComponent';
import Footer from '../../components/Footer/Footer';
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';


const { width, height } = Dimensions.get('window');

const StartScreen2 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const cardsData = [
    { 
      id: 1, 
      title: 'Add Your EV', 
      description: 'Plug in your profile — we\'ll show you every compatible charger, instantly',
      icon: require('../../../assets/icons/EV-icon.png') 
    },
    { 
      id: 2, 
      title: 'Plan & Save Routes', 
      description: 'Smart routes, real-time availability, and saved journeys',
      icon: require('../../../assets/icons/route-icon.png')
    },
    { 
      id: 3, 
      title: 'EV Community', 
      description: 'Join thousands of drivers helping each other',
      icon: require('../../../assets/icons/community-icon.png')
    },
    { 
      id: 4, 
      title: 'All Your Charges', 
      description: 'One app for every session, every receipt',
      icon: require('../../../assets/icons/charge-icon.png')
    },
  ];

  return (
    <ImageBackground 
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.backgroundImage}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.container}>
        <BackBtn />

        <View style={styles.header}>
          
          <View style={styles.titleContainer}>
            <Text style={[styles.title, {marginTop: 30}]}>WattyGo</Text>
            <Text style={[styles.subtitle, {marginTop: 2}]}>Powering the future of mobility.</Text>
          </View>
        </View>
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
        >
          {cardsData.map((card) => (
            <CardComponent 
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </ScrollView>
        <View style={styles.bottomContent}>
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.navigate('StartScreen3')}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <Footer />
        </View>
      </View>
    </ImageBackground>

  );
}

export default StartScreen2;

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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: 30,
  },
  
  titleContainer: {
    flex: 1,
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
    fontSize: width * 0.04,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
  skipButton: {
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
  skipText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
});
