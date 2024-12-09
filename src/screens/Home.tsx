import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/store';
import { RootStackParamList } from '../navigation/types';
import { DarkModeButton } from "../../assets/icons/index";
import { RootState } from '../store/store';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const styles = StyleSheet.create({
    statusBarDark: {
      backgroundColor: '#333',
    },
    statusBarLight: {
      backgroundColor: '#F5F5F5',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#333' : '#F5F5F5',
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
    themeToggleText: {
      color: isDarkMode ? '#FFF' : '#000',
    },
  });

  return (
    <>
    <StatusBar 
      backgroundColor={isDarkMode ? styles.statusBarDark.backgroundColor : styles.statusBarLight.backgroundColor} 
      barStyle={isDarkMode ? 'light-content' : 'dark-content'} 
    />
    <View style={styles.container}>
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
          <Text style={styles.themeToggleText}>
            {isDarkMode ? <DarkModeButton /> : <DarkModeButton />}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};
