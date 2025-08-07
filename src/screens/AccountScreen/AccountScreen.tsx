// MyAccountScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../../Shared/NavBar/NavBar';
import CustomAlert from '../../components/Alert/CustomAlert'; // ajuste le chemin si nécessaire

const { width } = Dimensions.get('window');

type UserProfile = {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
  vehicle: string;
};

const defaultProfile: UserProfile = {
  firstName: 'User',
  lastName: 'User',
  email: 'user@example.com',
  profilePic: '',
  vehicle: 'Tesla Model 3',
};

const MyAccountScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const json: UserProfile = defaultProfile;
      setProfile(json);
      setFullName(`${json.firstName} ${json.lastName}`);
      setEmail(json.email);
    };
    loadProfile();
  }, []);

  const onPressAvatar = async () => {
    setIsEditingAvatar(true);
    setTimeout(() => setIsEditingAvatar(false), 500);
  };

  const handleSave = () => {
    const parts = fullName.trim().split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || '';
    setProfile(prev => ({ ...prev, firstName, lastName, email }));
    setShowSuccess(true);
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 6 }}>
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Account</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Avatar + name subtitle */}
        <View style={styles.avatarSection}>
          <TouchableOpacity onPress={onPressAvatar}>
            {profile.profilePic ? (
              <Image source={{ uri: profile.profilePic }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={48} color="#fff" />
              </View>
            )}
            <View style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="#fff" />
            </View>
          </TouchableOpacity>
          <Text style={styles.editText}>Edit your profile picture</Text>
        </View>

        {/* Inputs */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor="#666"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
        </View>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        {/* Options: Change Password & My Car */}
        <View style={styles.card}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditPasswordScreen')}
            style={[styles.settingRow, styles.separator]}
          >
            <View style={styles.rowLeft}>
              <MaterialIcons name="lock-outline" size={24} color="#424758" />
              <Text style={styles.itemText}>Change Password</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('MyCarScreen')}
            style={styles.settingRow}
          >
            <View style={styles.rowLeft}>
              <MaterialCommunityIcons name="car-outline" size={24} color="#424758" />
              <Text style={styles.itemText}>My Car</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavBar />

      {/* Popup de succès */}
      <CustomAlert
        visible={showSuccess}
        iconType="ant"
        iconName="checkcircleo"
        iconColor="#292731"
        title="Succès"
        message="Votre profil a été mis à jour."
        buttonText="OK"
        onClose={() => {
          setShowSuccess(false);
        }}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  container: {
    padding: 20,
    paddingBottom: 140,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    paddingHorizontal: 10,
    gap: 8,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 8,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: 1,
    marginBottom: 10,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#292731',
    padding: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  editText: {
    marginTop: 8,
    fontSize: 14,
    color: '#424758',
  },
  card: {
    backgroundColor: '#ffffffe1',
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#424758',
    marginBottom: 10,
    fontWeight: '500',
    marginLeft: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 17,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e6e6e6',
    color: '#222',
    width: width * 0.85,
    alignSelf: 'center',
  },
  saveButton: {
    width: 190,
    height: 50,
    paddingVertical: 10,
    backgroundColor: '#292731',
    borderRadius: 30,
    marginBottom: 1,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#424758',
    marginLeft: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#afafafff',
  },
});

export default MyAccountScreen;
