import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import * as Location from "expo-location";

import CurrentWeather from "./components/CurrentWeather";

const API_URL = (lat, lon) =>
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ae03e5b17c2b36e4d2b9734af35de223&lang=fr&units=metric`;

export default function App() {
  //1 -Recupérer les coordonnées de user
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  React.useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // si l'user a accepté de partager sa position

        return;
      }

      const userlocation = await Location.getCurrentPositionAsync(); // on récupère la position
      getWeather(userlocation);
    };

    getCoordinates();
  }, []);
  // 2 - Réaliser une requête vers nos serveur

  const getWeather = async (location) => {
    try {
      const response = await axios.get(
        API_URL(location.coords.latitude, location.coords.longitude)
      );

      setData(response.data);
      setLoading(false);
    } catch (e) {
      console.log("Erreur");
    }
  };
  //city
  //météo du moment
  //prévisions
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <CurrentWeather data={data} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
