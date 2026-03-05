import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { analyzeGarbageImage } from '../services/aiDetection';

export default function ReportGarbageScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [analyzing, setAnalyzing] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      handleAnalysis(photo.uri);
    }
  };

  const handleAnalysis = async (uri) => {
    setAnalyzing(true);
    try {
      const result = await analyzeGarbageImage(uri);
      
      if (result.isGarbage) {
        Alert.alert(
          "Garbage Detected!",
          `Confidence: ${(result.confidence * 100).toFixed(1)}%\nWould you like to report this?`,
          [
            { text: "Cancel", onPress: () => { setCapturedImage(null); setAnalyzing(false); }, style: "cancel" },
            { text: "Report", onPress: () => submitReport(uri) }
          ]
        );
      } else {
        Alert.alert(
          "No Garbage Detected",
          "Please capture a valid waste photo.",
          [{ text: "OK", onPress: () => { setCapturedImage(null); setAnalyzing(false); } }]
        );
      }
    } catch (error) {
      Alert.alert("Error", "Could not analyze image.");
      setAnalyzing(false);
    }
  };

  const submitReport = async (uri) => {
    setAnalyzing(true);
    try {
      // Get location
      let location = await Location.getCurrentPositionAsync({});
      
      // Simulating Firebase upload
      console.log("Uploading report for:", location.coords, uri);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      Alert.alert(
        "Success", 
        "Garbage reported successfully! Our collectors will arrive soon.",
        [{ text: "Home", onPress: () => navigation.navigate('CitizenHome') }]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to submit report.");
    } finally {
      setAnalyzing(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.center}><ActivityIndicator /></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.center}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      {capturedImage ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage }} style={styles.preview} />
          {analyzing && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.overlayText}>AI Analyzing Image...</Text>
            </View>
          )}
        </View>
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef}>
          <View style={styles.cameraView}>
            <Text style={styles.cameraTip}>Point camera at garbage area</Text>
          </View>
          
          <View style={styles.controls}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.controlText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureBtn} 
              onPress={takePicture}
            >
              <View style={styles.captureInner} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.flipBtn} 
              onPress={() => setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}
            >
              <Text style={styles.controlText}>Flip</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cameraView: {
    padding: 40,
    alignItems: 'center',
  },
  cameraTip: {
    color: '#fff',
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  controlText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 125, 50, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  }
});
