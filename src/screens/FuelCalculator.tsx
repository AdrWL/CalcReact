import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, toggleTheme } from '../store/store';
import { LinearGradient } from 'expo-linear-gradient';
import { DarkModeButton } from '../../assets/icons/index';
import { createStyles } from '../styles/FuelCalculatorStyles'; 

export const FuelCalculator = () => {
  const navigation = useNavigation();
  const cars = useSelector((state: RootState) => state.car.cars);
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  
  const [formState, setFormState] = useState({
    modalVisible: false,
    selectedCar: null as string | null,
    averageConsumption: '',
    distanceTraveled: '',
    initialFuel: '',
    remainingFuel: null as number | null,
    fuelUsed: null as number | null,
  });

  const styles = createStyles(isDarkMode);

  useEffect(() => {
    if (formState.selectedCar) {
      const car = cars.find((c) => c.name === formState.selectedCar);
      if (car) setFormState(prev => ({ ...prev, averageConsumption: car.fuelConsumption }));
    }
  }, [formState.selectedCar]);

  const handleCarSelection = () => {
    if (cars.length === 0) {
      Alert.alert('Brak samochodów w bazie', 'Dodaj samochód przed kontynuowaniem.', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      setFormState(prev => ({ ...prev, modalVisible: true }));
    }
  };

  const calculateFuel = () => {
    const avg = parseFloat(formState.averageConsumption);
    const distance = parseFloat(formState.distanceTraveled);
    const initial = parseFloat(formState.initialFuel);

    if (!isNaN(avg) && !isNaN(distance) && !isNaN(initial)) {
      const used = (avg * distance) / 100;
      setFormState(prev => ({
        ...prev,
        fuelUsed: parseFloat(used.toFixed(2)),
        remainingFuel: parseFloat((initial - used).toFixed(2)),
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        fuelUsed: null,
        remainingFuel: null,
      }));
    }
  };

  const clear = () => {
    setFormState({
      modalVisible: false,
      selectedCar: null,
      averageConsumption: '',
      distanceTraveled: '',
      initialFuel: '',
      remainingFuel: null,
      fuelUsed: null,
    });
  };

  return (
    <>
      <LinearGradient
        colors={isDarkMode ? ['#1E1E2F', '#3A3A55'] : ['#E3F2FD', '#90CAF9']}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.themeToggleContainer}>
            <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
              <DarkModeButton />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Powrót</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCarSelection} style={styles.dropdownButton}>
            <Text style={styles.dropdownButtonText}>
              {formState.selectedCar ? `Wybrano: ${formState.selectedCar}` : 'Wybierz samochód'}
            </Text>
          </TouchableOpacity>
          <Modal visible={formState.modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Wybierz samochód:</Text>
              <FlatList
                data={cars}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setFormState(prev => ({ ...prev, selectedCar: item.name, modalVisible: false }));
                      }}
                    >
                      <Text style={styles.modalItemText}>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setFormState(prev => ({ ...prev, modalVisible: false }))}>
                  <Text style={styles.modalCloseText}>Zamknij</Text>
                </TouchableOpacity>
              </View>
            </Modal>
            <TextInput
              style={styles.input}
              placeholder="Spalanie na 100 km (L/100km)"
              placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
              keyboardType="numeric"
              value={formState.averageConsumption}
              onChangeText={value => setFormState(prev => ({ ...prev, averageConsumption: value }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Odległość przejechana (km)"
              placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
              keyboardType="numeric"
              value={formState.distanceTraveled}
              onChangeText={value => setFormState(prev => ({ ...prev, distanceTraveled: value }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Paliwo początkowe (L)"
              placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
              keyboardType="numeric"
              value={formState.initialFuel}
              onChangeText={value => setFormState(prev => ({ ...prev, initialFuel: value }))}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={calculateFuel}>
                <Text style={styles.buttonText}>Oblicz</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clear}>
                <Text style={styles.buttonText}>Czyść</Text>
              </TouchableOpacity>
            </View>
            {formState.fuelUsed !== null && formState.remainingFuel !== null && (
              <View style={styles.resultContainer}>
                <Text style={styles.result}>Paliwo zużyte: {formState.fuelUsed} L</Text>
                <Text style={styles.result}>Pozostałe paliwo: {formState.remainingFuel} L</Text>
              </View>
            )}
          </View>
        </LinearGradient>
      </>
    );
  };