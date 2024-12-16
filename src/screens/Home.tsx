import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/store';
import { RootStackParamList } from '../navigation/types';
import { DarkModeButton } from '../../assets/icons/index'; 
import { RootState } from '../store/store';
import { StatusBars } from './StatusBar';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1E1E2F' : '#E3F2FD',
      padding: 20,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    headerText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      textAlign: 'center',
    },
    subHeaderText: {
      fontSize: 16,
      color: isDarkMode ? '#BBBBBB' : '#555555',
      marginTop: 10,
      textAlign: 'center',
    },
    button: {
      width: '90%',
      backgroundColor: isDarkMode ? '#444' : '#6200EE',
      paddingVertical: 16,
      borderRadius: 30,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
    footerContainer: {
      position: 'absolute',
      bottom: 30,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 14,
      color: isDarkMode ? '#AAAAAA' : '#666666',
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? '#1E1E2F' : '#E3F2FD',
      zIndex: -1,
      borderRadius: 10,
    },
    radialGradient: {
      position: 'absolute',
      width: 400,
      height: 400,
      borderRadius: 200,
      backgroundColor: isDarkMode ? '#33334D' : '#90CAF9',
      opacity: 0.6,
      top: '20%',
      left: '10%',
    },
    radialGradient2: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: 150,
      backgroundColor: isDarkMode ? '#66667A' : '#42A5F5',
      opacity: 0.3,
      bottom: '15%',
      right: '15%',
    },
    themeToggle: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
  });

  return (
    <>
      <StatusBars isDarkMode={isDarkMode} />
      <View style={styles.container}>
        <View style={styles.gradientBackground}>
          <View style={styles.radialGradient}></View>
          <View style={styles.radialGradient2}></View>
        </View>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>CarFuel - OWner</Text>
          <Text style={styles.subHeaderText}>
            Aplikacja do obliczania spalania paliwa w samochodach
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('FuelCalculator')}
        >
          <Text style={styles.buttonText}>Kalkulator Paliwa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CarAdd')}
        >
          <Text style={styles.buttonText}>Dodaj Samochód</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.themeToggle}
          onPress={() => dispatch(toggleTheme())}
        >
          <DarkModeButton /> 
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>© 2024 Aplikacja Samochodowa</Text>
        </View>
      </View>
    </>
  );
};
