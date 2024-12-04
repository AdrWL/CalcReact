import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/store';
import { RootStackParamList } from '../navigation/types';
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
    themeToggle: {
      marginTop: 30,
      padding: 10,
      borderRadius: 5,
      backgroundColor: isDarkMode ? '#555' : '#CCC',
    },
    themeToggleText: {
      color: isDarkMode ? '#FFF' : '#000',
    },
  });

  return (
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
      <TouchableOpacity style={styles.themeToggle} onPress={() => dispatch(toggleTheme())}>
        <Text style={styles.themeToggleText}>
          {isDarkMode ? 'Przełącz na jasny tryb' : 'Przełącz na ciemny tryb'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
