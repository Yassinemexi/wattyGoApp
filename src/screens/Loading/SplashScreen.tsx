import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Text,
  Dimensions,
} from 'react-native';
import Footer from '../../components/Footer/Footer';

const { width, height } = Dimensions.get('window');

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../../../assets/images/background/backgroundImage.png')}
        style={styles.backgroundImage}
        imageStyle={[styles.imageStyle, { left: -width * 0.2 }]} // Décalage à gauche
      >
        <View style={styles.content}>
          <ActivityIndicator 
            size="large" 
            color="#FFFFFF" 
            style={styles.loader}
          />
          {/* Sous-titre ajouté ici */}
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
        
        <View style={styles.footer}>
          <Footer />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Couleur de fond si l'image ne couvre pas tout
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    position: 'absolute',
    width: width * 1.2, // Largeur augmentée pour compenser le décalage
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    marginBottom: 10, // Espace réduit entre le loader et le texte
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    marginTop: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
});

export default SplashScreen;