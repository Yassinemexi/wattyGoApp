// SettingsScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Switch,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
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
import SharePopup from '../../Shared/SharePopup/SharePopup'; // ajuste le chemin si nécessaire

const { width, height } = Dimensions.get('window');

type SettingRowProps = {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  trailing?: React.ReactNode;
  hideArrow?: boolean;
  isLast?: boolean;
};

const DualButtonAlert: React.FC<{
  visible: boolean;
  title: string;
  message: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryPress: () => void;
  onSecondaryPress: () => void;
}> = ({
  visible,
  title,
  message,
  primaryButtonText = 'Logout',
  secondaryButtonText = 'Cancel',
  onPrimaryPress,
  onSecondaryPress,
}) => {
  return (
    <ModalWrapper visible={visible} onRequestClose={onSecondaryPress}>
      <View style={styles.dualAlertContainer}>
        <Ionicons name="log-out-outline" size={48} color="#292731" style={styles.icon} />
        <Text style={styles.modalTitle}>{title}</Text>
        <Text style={styles.modalMessage}>{message}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={onSecondaryPress}
            style={[styles.actionButton, styles.cancelButton]}
            activeOpacity={0.7}
          >
            <Text style={styles.actionButtonText}>{secondaryButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPrimaryPress}
            style={[styles.actionButton, styles.confirmButton]}
            activeOpacity={0.7}
          >
            <Text style={[styles.actionButtonText, styles.confirmButtonText]}>
              {primaryButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalWrapper>
  );
};

const ModalWrapper: React.FC<{
  visible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}> = ({ visible, children, onRequestClose }) => {
  if (!visible) return null;
  return (
    <View style={styles.fullScreenOverlay}>
      <StatusBar backgroundColor="rgba(0,0,0,0.7)" translucent />
      <TouchableWithoutFeedback onPress={onRequestClose}>
        <View style={styles.fullScreenBackground} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContainer}>{children}</View>
    </View>
  );
};

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [language, setLanguage] = useState<'FR' | 'EN'>('EN'); // par défaut anglais
  const [showLanguageOverlay, setShowLanguageOverlay] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);

  const toggleSwitch = () => setIsNotificationsEnabled(prev => !prev);
  const toggleLanguageOverlay = () => setShowLanguageOverlay(prev => !prev);

  const changeLanguage = (lang: 'FR' | 'EN') => {
    setLanguage(lang);
    setShowLanguageOverlay(false);
    // TODO: intégrer la logique de changement de langue globale ici
  };

  const currentLanguageLabel = language === 'EN' ? 'English' : 'Français';

  const handleLogout = () => {
    // nettoyer session/token si besoin
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
    setShowLogoutConfirm(false);
  };

  const shareData = {
    message: 'Check out this awesome app!',
    url: 'https://example.com', // optionnel
    title: 'Invite a friend',
  };

  const SettingRow: React.FC<SettingRowProps> = ({
    icon,
    label,
    onPress,
    trailing,
    hideArrow = false,
    isLast = false,
  }) => {
    const content = (
      <View style={[styles.item, !isLast && styles.separator]}>
        <View style={styles.rowLeft}>
          {icon}
          <Text style={styles.itemText}>{label}</Text>
        </View>
        <View style={styles.rowRight}>
          {trailing}
          {!hideArrow && onPress && (
            <Ionicons name="chevron-forward" size={20} color="#999" />
          )}
        </View>
      </View>
    );
    return onPress ? (
      <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>
    ) : (
      <View>{content}</View>
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/background/BackgroundImage.png')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile & Settings</Text>
        </View>

        {/* Account Section */}
        <View style={styles.card}>
           <SettingRow
            icon={<MaterialIcons name="person-outline" size={24} color="#424758" />}
            label="My Account"
            onPress={() => navigation.navigate('MyAccountScreen')}
            isLast={false}
          />
          <SettingRow
            icon={<MaterialIcons name="notifications-none" size={24} color="#424758" />}
            label="Notifications"
            trailing={
              <Switch
                value={isNotificationsEnabled}
                onValueChange={toggleSwitch}
                trackColor={{ false: '#e6e6e6', true: '#424758' }}
                thumbColor="#ffffff"
                ios_backgroundColor="#e6e6e6"
              />
            }
            hideArrow
            isLast={false}
          />
          <SettingRow
            icon={<MaterialCommunityIcons name="earth" size={20} color="#424758" />}
            label={`Language: ${currentLanguageLabel}`}
            onPress={toggleLanguageOverlay}
            isLast={true}
          />
        </View>

        {/* Help Section */}
        <View style={styles.card}>
          <SettingRow
            icon={<Ionicons name="information-circle-outline" size={24} color="#424758" />}
            label="Help"
            onPress={() => navigation.navigate('HelpScreen')}
            isLast={true}
          />
        </View>

        {/* Invite & Logout */}
        <View style={styles.card}>
          <SettingRow
            icon={<Ionicons name="people-outline" size={24} color="#424758" />}
            label="Invite a friend"
            onPress={() => setShowSharePopup(true)}
            isLast={false}
          />
          <TouchableOpacity onPress={() => setShowLogoutConfirm(true)}>
            <View style={[styles.item, styles.noSeparator]}>
              <View style={styles.rowLeft}>
                <MaterialIcons name="logout" size={24} color="#424758" />
                <Text style={[styles.itemText, { color: '#424758' }]}>Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNavBar />

      {/* Language overlay */}
      {showLanguageOverlay && (
        <View style={styles.fullOverlay}>
          <TouchableWithoutFeedback onPress={toggleLanguageOverlay}>
            <View style={styles.fullOverlayBackground} />
          </TouchableWithoutFeedback>
          <View style={styles.languagePickerContainer}>
            <Text style={styles.pickerTitle}>Select Language</Text>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => changeLanguage('FR')}
            >
              <Image
                source={require('../../../assets/images/flags/fr.png')}
                style={styles.flagIcon}
                resizeMode="contain"
              />
              <Text style={styles.languageText}>Français</Text>
              {language === 'FR' && (
                <Ionicons name="checkmark" size={20} color="#424758" />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.languageOption, styles.lastLanguageOption]}
              onPress={() => changeLanguage('EN')}
            >
              <Image
                source={require('../../../assets/images/flags/gb.png')}
                style={styles.flagIcon}
                resizeMode="contain"
              />
              <Text style={styles.languageText}>English</Text>
              {language === 'EN' && (
                <Ionicons name="checkmark" size={20} color="#424758" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Logout confirmation */}
      <DualButtonAlert
        visible={showLogoutConfirm}
        title="Logout Confirmation"
        message="Are you sure you want to disconnect?"
        primaryButtonText="Logout"
        secondaryButtonText="Cancel"
        onPrimaryPress={handleLogout}
        onSecondaryPress={() => setShowLogoutConfirm(false)}
      />

      {/* Share popup */}
      <SharePopup
        visible={showSharePopup}
        onClose={() => setShowSharePopup(false)}
        shareData={shareData}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#ffffffe1',
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#afafafff',
  },
  noSeparator: {
    borderBottomWidth: 0,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#424758',
    marginLeft: 10,
  },
  fullOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  fullOverlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  languagePickerContainer: {
    width: width * 0.75,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 10,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  lastLanguageOption: {
    borderBottomWidth: 0,
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 10,
  },
  languageText: {
    flex: 1,
    fontSize: 16,
    color: '#424758',
  },
  // DualButtonAlert styles
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    zIndex: 10000,
  },
  fullScreenBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  dualAlertContainer: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 4,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  confirmButton: {
    backgroundColor: '#292731',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButtonText: {
    color: '#fff',
  },
});

export default SettingsScreen;
