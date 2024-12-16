import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [averageConsumption, setAverageConsumption] = useState<string>('');
  const [distanceTraveled, setDistanceTraveled] = useState<string>('');
  const [initialFuel, setInitialFuel] = useState<string>('');
  const [remainingFuel, setRemainingFuel] = useState<number | null>(null);
  const [fuelUsed, setFuelUsed] = useState<number | null>(null);
  const styles = createStyles(isDarkMode);

  useEffect(() => {
    if (selectedCar) {
      const car = cars.find((c) => c.name === selectedCar);
      if (car) setAverageConsumption(car.fuelConsumption);
    }
  }, [selectedCar]);

  const handleCarSelection = () => {
    if (cars.length === 0) {
      Alert.alert('Brak samochodów w bazie', 'Dodaj samochód przed kontynuowaniem.', [
        { text: 'OK', onPress: () => {} },
      ]);
    } else {
      setModalVisible(true);
    }
  };

  const calculateFuel = () => {
    const avg = parseFloat(averageConsumption);
    const distance = parseFloat(distanceTraveled);
    const initial = parseFloat(initialFuel);

    if (!isNaN(avg) && !isNaN(distance) && !isNaN(initial)) {
      const used = (avg * distance) / 100;
      setFuelUsed(parseFloat(used.toFixed(2)));
      setRemainingFuel(parseFloat((initial - used).toFixed(2)));
    } else {
      setFuelUsed(null);
      setRemainingFuel(null);
    }
  };

  const clear = () => {
    setSelectedCar(null);
    setAverageConsumption('');
    setDistanceTraveled('');
    setInitialFuel('');
    setFuelUsed(null);
    setRemainingFuel(null);
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
              {selectedCar ? `Wybrano: ${selectedCar}` : 'Wybierz samochód'}
            </Text>
          </TouchableOpacity>
          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Wybierz samochód:</Text>
              <FlatList
                data={cars}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                      setSelectedCar(item.name);
                      setModalVisible(false);
                    }}
                  >
                    <Text style={styles.modalItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Zamknij</Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TextInput
            style={styles.input}
            placeholder="Spalanie na 100 km (L/100km)"
            placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
            keyboardType="numeric"
            value={averageConsumption}
            onChangeText={setAverageConsumption}
          />
          <TextInput
            style={styles.input}
            placeholder="Odległość przejechana (km)"
            placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
            keyboardType="numeric"
            value={distanceTraveled}
            onChangeText={setDistanceTraveled}
          />
          <TextInput
            style={styles.input}
            placeholder="Paliwo początkowe (L)"
            placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
            keyboardType="numeric"
            value={initialFuel}
            onChangeText={setInitialFuel}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={calculateFuel}>
              <Text style={styles.buttonText}>Oblicz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clear}>
              <Text style={styles.buttonText}>Czyść</Text>
            </TouchableOpacity>
          </View>
          {fuelUsed !== null && remainingFuel !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.result}>Paliwo zużyte: {fuelUsed} L</Text>
              <Text style={styles.result}>Pozostałe paliwo: {remainingFuel} L</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </>
  );
};
