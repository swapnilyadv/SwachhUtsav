import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function CitizenHomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Mock markers for nearby garbage
  const [markers, setMarkers] = useState([
    { id: '1', latitude: 37.78825, longitude: -122.4324, title: 'Reported Garbage #1', status: 'Pending' },
    { id: '2', latitude: 37.78925, longitude: -122.4344, title: 'Reported Garbage #2', status: 'In Progress' },
    { id: '3', latitude: 37.78525, longitude: -122.4314, title: 'Reported Garbage #3', status: 'Resolved' },
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleReportPress = () => {
    navigation.navigate('ReportGarbage');
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            description={`Status: ${marker.status}`}
            pinColor={marker.status === 'Resolved' ? 'green' : marker.status === 'In Progress' ? 'orange' : 'red'}
          />
        ))}
      </MapView>

      <View style={styles.header}>
        <Text style={styles.appTitle}>SwachhUtsav</Text>
        <TouchableOpacity 
          style={styles.profileBtn}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.profileEmoji}>👤</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>🔍 Search for nearby bins or festival areas...</Text>
        </View>
      </View>

      <View style={styles.floatingAction}>
        <TouchableOpacity 
          style={styles.reportBtn}
          onPress={handleReportPress}
        >
          <Text style={styles.reportBtnEmoji}>📸</Text>
          <Text style={styles.reportBtnText}>Report Garbage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileEmoji: {
    fontSize: 20,
  },
  searchContainer: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
  },
  searchBar: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  searchText: {
    color: '#9E9E9E',
    fontSize: 14,
  },
  floatingAction: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  reportBtn: {
    flexDirection: 'row',
    backgroundColor: '#2E7D32',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 35,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#2E7D32',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
  },
  reportBtnEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  reportBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
