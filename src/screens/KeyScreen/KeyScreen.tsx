import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import KeyCard from '../../components/Cards/KeyCard/KeyCard'; 

const KeyScreen = () => {
  const navigation = useNavigation();

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
          <Text style={styles.headerTitle}>Key</Text>
        </View>

        {/* Status Card */}
        <KeyCard title="Status">
  <View style={styles.statusRow}>
    <View style={styles.statusItem}>
      <View style={[styles.statusIcon, { backgroundColor: '#00C853' }]}>
        <Ionicons name="checkmark-done" size={14} color="#fff" />
      </View>
      <Text style={styles.statusLabel}>Available</Text>
    </View>
    <View style={styles.statusItem}>
      <View style={[styles.statusIcon, { backgroundColor: '#2979FF' }]}>
        <Ionicons name="flash-outline" size={14} color="#fff" />
      </View>
      <Text style={styles.statusLabel}>Charging</Text>
    </View>
    <View style={styles.statusItem}>
      <View style={[styles.statusIcon, { backgroundColor: '#D50000' }]}>
        <Ionicons name="close" size={14} color="#fff" />
      </View>
      <Text style={styles.statusLabel}>Out of service</Text>
    </View>
    <View style={styles.statusItem}>
      <View style={[styles.statusIcon, { backgroundColor: '#9E9E9E' }]}>
        <Ionicons name="remove" size={14} color="#fff" />
      </View>
      <Text style={styles.statusLabel}>Out of order</Text>
    </View>
  </View>
</KeyCard>


        {/* Power Card */}
        <KeyCard title="Power">
          {[
            { color: '#3D5AFE', label: 'Ultra-rapid', desc: '150KW and above' },
            { color: '#7C4DFF', label: 'Rapid', desc: 'from 50KW to less than 150KW' },
            { color: '#FFA000', label: 'Fast', desc: 'from 8KW to less than 50KW' },
            { color: '#FFEB3B', label: 'Slow', desc: 'below 8KW' },
            { color: '#BDBDBD', label: 'Unknown', desc: '' },
          ].map((item, index) => (
            <View style={styles.powerRow} key={index}>
              <View style={styles.powerIconLabel}>
                <Ionicons name="location" size={26} color={item.color} />
                <Text style={[styles.powerLabel, { color: item.color }]}>{item.label}</Text>
              </View>
              {item.desc ? <Text style={styles.powerDesc}>{item.desc}</Text> : null}
            </View>
          ))}
        </KeyCard>

        {/* Type Card */}
        <KeyCard title="Type">
          <View style={styles.typeRow}>
            <Ionicons name="location-outline" size={24} color="#000" />
            <Text style={styles.typeLabel}>Public charging point</Text>
          </View>
          <View style={styles.typeRow}>
            <MaterialCommunityIcons name="home-map-marker" size={26} color="#000" />

            <Text style={styles.typeLabel}>Private charging point</Text>
          </View>
        </KeyCard>

        {/* Connector Types */}
       <KeyCard title="Connector types">
  <View style={styles.connectorRow}>
    <MaterialCommunityIcons name="ev-plug-chademo" size={26} color="#000" />
    <Text style={styles.connectorLabel}>CHAdeMo</Text>
  </View>
  <View style={styles.connectorRow}>
    <MaterialCommunityIcons name="ev-plug-ccs1" size={26} color="#000" />
    <Text style={styles.connectorLabel}>CCS (Combo 1)</Text>
  </View>
  <View style={styles.connectorRow}>
    <MaterialCommunityIcons name="ev-plug-ccs2" size={26} color="#000" />
    <Text style={styles.connectorLabel}>CCS (Combo 2)</Text>
  </View>
  <View style={styles.connectorRow}>
    <MaterialCommunityIcons name="ev-plug-type2" size={26} color="#000" />
    <Text style={styles.connectorLabel}>Type 2 / Tesla</Text>
  </View>
  <View style={styles.connectorRow}>
    <MaterialCommunityIcons name="ev-plug-type1" size={26} color="#000" />
    <Text style={styles.connectorLabel}>Type 1</Text>
  </View>
</KeyCard>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    color: '#ffffffcd',
  },
  container: {
    padding: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // blanc 50%},
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
  statusRow: {
  flexDirection: 'column',
  alignItems: 'flex-start',
},
statusItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 4,
},
statusIcon: {
  width: 22,
  height: 22,
  borderRadius: 12,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 8,
},
statusLabel: {
  fontSize: 14,
},

  powerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  powerIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  powerLabel: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
  powerDesc: {
    fontSize: 12,
    color: '#333',
    maxWidth: '55%',
    textAlign: 'right',
    marginRight: 15,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  typeLabel: {
    marginLeft: 10,
    fontSize: 14,
  },
  connectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  connectorLabel: {
    fontSize: 14,
    marginLeft: 10,
  },
});

export default KeyScreen;
