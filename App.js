import { StatusBar } from 'expo-status-bar';
import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from "expo-location";


export default function App() {

  //1 -Recupérer les coordonnées de user
  const [location, setLocation] = useState(null)
  React.useEffect(() => {
    const getCoordinates = async () => {
      const { status } =  await Location.requestForegroundPermissionsAsync()
      if(status !== "granted") { // si l'user a accepté de partager sa position 
        
        return
      }

      const userlocation = await Location.getCurrentPositionAsync() // on récupère la position
      setLocation(userlocation)
    }
   
    getCoordinates()

  }, [])
  // 2 - Réaliser une requête vers nos serveur
  //city
  //météo du moment
  //prévisions
  if(!location){
    return (
    <View style={styles.container}>
      <Text>Location est null</Text>
    </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text>{location.coords.latitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
