import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { isSameDay } from "date-fns"

const CurrentWeather = ({ data }) => {
    const [currentWeather, setCurrentWeather] = useState(null)
    useEffect(() => {
        //on filtre la liste des prévisions 
        const currentW = data.list.filter(forecast => { // on veut savoir si la date de la prévision correspond a la date du jour
            const today = new Date().getTime() + Math.abs(data.city.timezone * 1000)  // valeur absolue de la date du jour
            const forecastDate = new Date (forecast.dt * 1000) // date de la prévision
            return isSameDay(today, forecastDate) // on vérifie que les dates correspondent
            
        })
        setCurrentWeather(currentW[0])
        console.log(data);
        console.log(currentW);
        console.log(currentW[0]);
        
    }, [data])
  return (
    <>
      <View>
        <Text>{data?.city?.name}</Text>
        <Text>Aujourd'hui</Text>
        <Text>{currentWeather?.main.temp}°C</Text>
        <Text>{currentWeather?.weather[0].description}°C</Text>
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
    city: {

    }
})
export default CurrentWeather;
