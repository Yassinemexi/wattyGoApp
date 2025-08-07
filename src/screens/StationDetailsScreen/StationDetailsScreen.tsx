import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Linking,
  Modal,
  TextInput,
  FlatList,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, RouteProp } from '@react-navigation/native';
import SharePopup from '../../Shared/SharePopup/SharePopup';
import BottomNavBar from '../../Shared/NavBar/NavBar';

const { width, height } = Dimensions.get('window');

type Station = {
  id: number;
  name: string;
  distance: string;
  availability: string;
  type: string;
  ports: string;
  latitude: number;
  longitude: number;
  image: string;
  imageSource?: any;
  website?: string;
  workingHours?: string;
  address?: string;
};

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

type RootStackParamList = {
  StationDetails: { station: Station };
  RouteMap: { station: Station };
  SavedStations: undefined;
};

type StationDetailsRouteProp = RouteProp<RootStackParamList, 'StationDetails'>;

interface StationDetailsProps {
  route: StationDetailsRouteProp;
}

const StationDetailsScreen: React.FC<StationDetailsProps> = ({ route }) => {
  const navigation = useNavigation<any>();
  const { station } = route.params;
  const [shareVisible, setShareVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  
  // Données de démonstration
  const stationImages = [
    station.imageSource || require('../../../assets/images/background/BackgroundImage.png'),
    require('../../../assets/images/stations/TotalEnergiesMornag.png'),
    require('../../../assets/images/stations/NexusChargingStation.png'),
  ];

  const reviews: Review[] = [
    { id: 1, user: 'John D.', rating: 4, comment: 'Great station, fast charging', date: '2023-05-15' },
    { id: 2, user: 'Sarah M.', rating: 5, comment: 'Perfect location and service', date: '2023-06-22' },
    { id: 3, user: 'Alex T.', rating: 3, comment: 'Could be cleaner', date: '2023-07-10' },
  ];

  const handleSharePress = () => {
    setShareVisible(true);
  };

  const handleSaveStation = () => {
    navigation.navigate('SavedStations');
  };

  const handleOpenWebsite = () => {
    if (station.website) {
      Linking.openURL(station.website);
    }
  };

  const handleNavigate = () => {
    navigation.navigate('RouteMap', { station });
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={20}
            color={star <= rating ? '#FFD700' : '#ccc'}
          />
        ))}
      </View>
    );
  };

  const renderOverview = () => (
    <View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionItem} onPress={handleNavigate}>
          <Ionicons name="navigate" size={24} color="#524F4F" />
          <Text style={styles.actionText}>Directions</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionItem} onPress={handleSharePress}>
          <Ionicons name="share-social" size={24} color="#524F4F" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionItem} onPress={handleSaveStation}>
          <Ionicons name="bookmark" size={24} color="#524F4F" />
          <Text style={styles.actionText}>Save</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionItem} onPress={handleOpenWebsite}>
          <Ionicons name="globe" size={24} color="#524F4F" />
          <Text style={styles.actionText}>Website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.portInfo}>
        <Text style={styles.portTitle}>{station.type}</Text>
        <Text style={styles.portAvailability}>
          {station.ports.split(' - ')[0]} - {station.availability}
        </Text>
        <Text style={styles.hours}>Open - 24 hrs</Text>
      </View>
    </View>
  );

  const renderReviews = () => (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.reviewItem}>
          <Text style={styles.reviewUser}>{item.user}</Text>
          {renderStars(item.rating)}
          <Text style={styles.reviewComment}>{item.comment}</Text>
          <Text style={styles.reviewDate}>{item.date}</Text>
        </View>
      )}
      ListFooterComponent={
        <TouchableOpacity 
          style={styles.addReviewButton}
          onPress={() => setPhotoModalVisible(true)}
        >
          <Text style={styles.addReviewButtonText}>Add Review</Text>
        </TouchableOpacity>
      }
    />
  );

  const renderPhotos = () => (
    <View>
      <FlatList
        horizontal
        data={stationImages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={item} style={styles.photoItem} resizeMode="cover" />
        )}
      />
      <TouchableOpacity 
        style={styles.addPhotoButton}
        onPress={() => setPhotoModalVisible(true)}
      >
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addPhotoButtonText}>Add Photo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAbout = () => (
    <View>
      <View style={styles.aboutItem}>
        <Ionicons name="location" size={20} color="#524F4F" />
        <Text style={styles.aboutText}>{station.address || '123 Charging Street, Tunis'}</Text>
      </View>
      <View style={styles.aboutItem}>
        <Ionicons name="time" size={20} color="#524F4F" />
        <Text style={styles.aboutText}>{station.workingHours || 'Open 24/7'}</Text>
      </View>
      <View style={styles.aboutItem}>
        <Ionicons name="globe" size={20} color="#524F4F" />
        <Text style={styles.aboutText}>{station.website || 'www.totalenergies.com'}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Reviews':
        return renderReviews();
      case 'Photos':
        return renderPhotos();
      case 'About':
        return renderAbout();
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color="#000000ff" />
        </TouchableOpacity>
        
        <View style={styles.headerRight}>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={handleSharePress}
          >
            <Ionicons name="share-social" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image principale */}
      <Image 
        source={stationImages[0]} 
        style={styles.stationImage} 
        resizeMode="cover"
      />

      {/* Titre et sous-titre */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{station.name}</Text>
        <Text style={styles.subtitle}>{station.type}</Text>
      </View>

      {/* Onglets */}
      <View style={styles.tabsContainer}>
        {['Overview', 'Reviews', 'Photos', 'About'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Contenu principal avec FlatList */}
      <FlatList
        data={[1]} // Une seule item car nous utilisons renderItem pour tout le contenu
        keyExtractor={() => 'content'}
        renderItem={() => (
          <View style={styles.content}>
            {renderContent()}
          </View>
        )}
        style={styles.mainContent}
      />

      {/* Bouton d'action */}
      <TouchableOpacity style={styles.bookButton}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>

      {/* Popup de partage */}
      <SharePopup
        visible={shareVisible}
        onClose={() => setShareVisible(false)}
        shareData={{
          message: `Check out this charging station: ${station.name}\nType: ${station.type}\nAvailability: ${station.availability}\nDistance: ${station.distance}`,
          title: `Share ${station.name}`
        }}
      />

      {/* Modal pour ajouter une photo/avis */}
     <Modal
  visible={photoModalVisible}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setPhotoModalVisible(false)}
>
  <View style={styles.fullScreenOverlay}>
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <TouchableOpacity 
          style={styles.closeModalButton}
          onPress={() => setPhotoModalVisible(false)}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        
        {activeTab === 'Reviews' ? (
          <>
            <Text style={styles.modalTitle}>Add Your Review</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons
                    name={star <= rating ? 'star' : 'star-outline'}
                    size={30}
                    color={star <= rating ? '#FFD700' : '#ccc'}
                  />
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              placeholder="Write your review..."
              multiline
              value={newReview}
              onChangeText={setNewReview}
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.modalTitle}>Add Photo</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Ionicons name="cloud-upload" size={40} color="#524F4F" />
              <Text style={styles.uploadText}>Select Photo from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  </View>
</Modal>
      
      <BottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
    fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  modalContainer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  modalContent: {
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  header: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  moreButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stationImage: {
    width: '100%',
    height: 250,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    marginBottom: 20,
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  tabsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingHorizontal: 20,
  },
  tab: {
    paddingBottom: 10,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#292731',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#292731',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingBottom: 120, // Espace pour le bouton Book Now
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionItem: {
    alignItems: 'center',
    width: width / 4 - 25,
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#524F4F',
    textAlign: 'center',
  },
  portInfo: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  portTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  portAvailability: {
    fontSize: 16,
    color: '#524F4F',
    marginBottom: 5,
  },
  hours: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    position: 'absolute',
    bottom: 100,
    left: (width - 210) / 2,
    backgroundColor: '#292731',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: 210,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  reviewUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  reviewComment: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
  },
  addReviewButton: {
    backgroundColor: '#292731',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  addReviewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  photoItem: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
  addPhotoButton: {
    flexDirection: 'row',
    backgroundColor: '#292731',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  addPhotoButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  aboutText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },


  closeModalButton: {
    alignSelf: 'flex-end',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    marginBottom: 15,
  },
  uploadButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  uploadText: {
    marginTop: 10,
    color: '#524F4F',
  },
  submitButton: {
    backgroundColor: '#292731',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default StationDetailsScreen;