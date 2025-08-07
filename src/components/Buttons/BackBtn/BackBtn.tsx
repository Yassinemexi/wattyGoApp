import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width, height } = Dimensions.get('window');

interface BackBtnProps {
  style?: ViewStyle;
}

const BackBtn: React.FC<BackBtnProps> = ({ style }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={() => navigation.goBack()}
      activeOpacity={0.7}
    >
      <Image
        source={require('../../../../assets/icons/back-icon.png')}
        style={styles.backIcon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: width * 0.09,
    height: width * 0.09,
    position: 'absolute',
    left: width * 0.075,
    top: height * 0.1,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    width: width * 0.09,
    height: width * 0.09,
    tintColor: '#FFFFFF',
  },
});

export default BackBtn;
