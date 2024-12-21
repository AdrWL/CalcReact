import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/store';
import { RootStackParamList } from '../navigation/types';
import { DarkModeButton, CarIcon } from '../../assets/icons/index'; 
import { RootState } from '../store/store';
import { StatusBars } from './StatusBar';
import { createStyles } from '../styles/HomeStyles'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const styles = createStyles(isDarkMode);

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
          <Text style={styles.buttonText}>Dodaj Samochód<CarIcon/></Text>
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
