import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Footer from '../../components/Footer/Footer';
import ChargeCard from '../../components/Cards/StartsScreensCards/ChargeCard'; 
import BackBtn from '../../components/Buttons/BackBtn/BackBtn';

const { width, height } = Dimensions.get('window');

const StartScreen3 = () => {
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
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Simplify your charging {"\n"}experience</Text>
          <Text style={styles.subtitle}>Order your charge card</Text>
        </View></View>

        <ChargeCard />

        {/* Boutons */}
      <View style={styles.buttonsContainer}>
  <TouchableOpacity 
    style={styles.orderButton}
    onPress={() => console.log('Order Now')}
  >
    <Text style={styles.orderButtonText}>Order Now</Text>
  </TouchableOpacity>

  <TouchableOpacity 
  style={styles.skipButton}
  onPress={() => navigation.navigate('StartScreen4')}
>
  <Text style={styles.skipButtonText}>Skip</Text>
</TouchableOpacity>

</View>

{/* Footer déplacé ici */}
<View style={styles.footerContainer}>
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
      flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.1,
    marginBottom: 20,
  },
  titleContainer: {
 flex: 1,
    alignItems: 'center',    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
     marginBottom: 0,
  },
orderButton: {
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
  alignSelf: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#FFFFFF', // ✅ bordure blanche
},

orderButtonText: {
  color: '#FFFFFF',
  fontSize: 18,
  fontWeight: 'bold',
},

skipButton: {
  width: 190, // même largeur fixe
  paddingVertical: 10,
  backgroundColor: '#FFFFFF',
  borderRadius: 30,
  marginBottom: 15,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,
  alignSelf: 'center',
  alignItems: 'center', // centrer le texte
},
skipButtonText: {
  color: '#000000',
  fontSize: 18,
  fontWeight: 'bold',
},

  footer: {
    width: '100%',
    alignItems: 'center',
  },
  footerContainer: {
  position: 'absolute',
  bottom: 30, 
  width: '100%',
  alignItems: 'center',
},

});

export default StartScreen3;