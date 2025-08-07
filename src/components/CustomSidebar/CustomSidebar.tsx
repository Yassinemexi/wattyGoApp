import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import userData from '../../utils/Data/user.json'; // adapte ce chemin
const bgImage = require('../../../assets/images/background/sidebar-bg.png');

type SidebarProps = {
  onClose: () => void;
  // onNavigate retiré ou facultatif maintenant
};

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navigation = useNavigation<any>();
  const { firstName, lastName, profilePic } = userData;

  const menuItems = [
    {
      label: 'Profile & Settings',
      icon: <MaterialIcons name="person-outline" size={24} color="#333" />,
      screen: 'SettingsScreen',
    },
    {
      label: 'My Vehicle',
      icon: <MaterialCommunityIcons name="car" size={24} color="#333" />,
      screen: 'VehicleScreen',
    },
    {
      label: 'Recharge',
      icon: <MaterialCommunityIcons name="ev-station" size={24} color="#333" />,
      screen: 'RechargeScreen',
    },
    {
      label: 'History',
      icon: <MaterialIcons name="history" size={24} color="#333" />,
      screen: 'HistoryScreen',
    },
    {
      label: 'Community',
      icon: <FontAwesome5 name="users" size={20} color="#333" />,
      screen: 'CommunityScreen',
    },
    {
      label: 'Payments',
      icon: <MaterialIcons name="payment" size={24} color="#333" />,
      screen: 'PaymentScreen',
    },
  ];

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen);
    onClose();
  };

  return (
    <ImageBackground source={bgImage} style={styles.background} imageStyle={styles.imageStyle}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          {profilePic ? (
            <Image source={{ uri: profilePic }} style={styles.avatar} />
          ) : (
            <Ionicons name="person-circle-outline" size={60} color="#666" />
          )}
          <Text style={styles.name}>{firstName} {lastName}</Text>
        </View>

        <ScrollView style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleNavigate(item.screen)}
            >
              <View style={styles.iconLabel}>
                {item.icon}
                <Text style={styles.menuText}>{item.label}</Text>
              </View>
              <AntDesign name="right" size={18} color="#000" />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.logout} onPress={() => {
          navigation.navigate('Logout');
          onClose();
        }}>
          <View style={styles.iconLabel}>
            <MaterialIcons name="logout" size={24} color="#000" />
            <Text style={[styles.menuText, { color: '#000' }]}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '105%',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  imageStyle: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.81)',
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  menu: {
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  iconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logout: {
    marginBottom: 80,
    borderTopColor: '#eee',
    paddingTop: 15,
  },
});

export default Sidebar;
