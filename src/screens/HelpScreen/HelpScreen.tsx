// HelpScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from '../../Shared/NavBar/NavBar'; // ajuste le chemin si nécessaire

const { width } = Dimensions.get('window');

const helpMenuItems = [
  { key: 'playstore', label: 'View in Google Play Store' },
  { key: 'clear_history', label: 'Clear Help history' },
  { key: 'version', label: 'Version info' },
];

const HelpScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [showMenu, setShowMenu] = useState(false);
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<string[]>([]); // simulation : vide pour afficher "No results found."
  const [filteredHistory, setFilteredHistory] = useState<string[]>([]);

  const onSearchChange = (text: string) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredHistory([]);
    } else {
      // filtre simulé
      const filtered = history.filter(h => h.toLowerCase().includes(text.toLowerCase()));
      setFilteredHistory(filtered);
    }
  };

  const handleMenuSelect = (key: string) => {
    setShowMenu(false);
    switch (key) {
      case 'playstore':
        // ouvrir store, placeholder
        console.log('View in Google Play Store');
        break;
      case 'clear_history':
        setHistory([]);
        setFilteredHistory([]);
        break;
      case 'version':
        // afficher version (stub)
        alert('Version 1.0.0');
        break;
    }
  };

  const renderHelpResource = () => {
    const data = search.trim() ? filteredHistory : history;
    if (data.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No results found.</Text>
        </View>
      );
    }
    return (
      <FlatList
        data={data}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={[styles.row, styles.separator]}>
            <MaterialIcons name="help-outline" size={22} color="#424758" />
            <Text style={styles.resourceText}>{item}</Text>
          </View>
        )}
      />
    );
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
        <Text style={styles.headerTitle}>Help</Text>
        <View style={{ flex: 1 }} />
        <TouchableOpacity onPress={() => setShowMenu(true)} style={styles.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Menu modal (trois points) */}
      <Modal transparent visible={showMenu} animationType="fade" onRequestClose={() => setShowMenu(false)}>
        <View style={styles.menuOverlay}>
          <TouchableOpacity style={styles.menuOverlayBackground} onPress={() => setShowMenu(false)} />
          <View style={styles.menuContainer}>
            {helpMenuItems.map(item => (
              <TouchableOpacity
                key={item.key}
                style={styles.menuItem}
                onPress={() => handleMenuSelect(item.key)}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <View style={styles.content}>
        {/* Popular help resources */}
        <Text style={styles.sectionTitle}>Popular help resources</Text>
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={onSearchChange}
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        {renderHelpResource()}

        {/* Send feedback */}
// Dans HelpScreen.tsx, modifiez la partie "Send feedback" :
<TouchableOpacity onPress={() => navigation.navigate('SendFeedbackScreen')}>
  <View style={[styles.card, { marginTop: 30 }]}>
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <MaterialIcons name="info-outline" size={24} color="#424758" />
        <Text style={styles.itemText}>Send feedback</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </View>
  </View>
</TouchableOpacity>
      </View>

      <BottomNavBar />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 40,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginLeft: 6,
  },
  menuButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    textAlign: 'left',
    color: '#424758',
  },
  searchRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e6e6e6',
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 0,
    color: '#222',
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
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
    marginHorizontal: 0,
  },
  row: {
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
  resourceText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#afafafff',
  },
  // menu modal
  menuOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingRight: 15,
    zIndex: 10000,
  },
  menuOverlayBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 220,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  menuItemText: {
    fontSize: 14,
    color: '#424758',
  },
});

export default HelpScreen;
