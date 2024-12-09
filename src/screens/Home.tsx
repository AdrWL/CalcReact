import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/store';
import { RootStackParamList } from '../navigation/types';
import { DarkModeButton } from '../../assets/icons/index';
import { RootState } from '../store/store';

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
      padding: 20,
    },
    button: {
      width: '80%',
      backgroundColor: isDarkMode ? '#444' : '#6200EE',
      paddingVertical: 16,
      borderRadius: 12,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: isDarkMode ? '#000' : '#FFF',
      elevation: 4,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
    },
    themeToggleContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
    },
    image: {
      width: 250,
      height: 250,
      marginBottom: 20,
      borderRadius: 15,
    },
  });

  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? '#1E1E2F' : '#E3F2FD'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        colors={isDarkMode ? ['#1E1E2F', '#3A3A55'] : ['#E3F2FD', '#90CAF9']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/car_anime.png')}
            style={styles.image}
            resizeMode="contain"
          />
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
            <Text style={styles.buttonText}>Wprowadź Samochód</Text>
          </TouchableOpacity>
          <View style={styles.themeToggleContainer}>
            <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
              <DarkModeButton />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};
