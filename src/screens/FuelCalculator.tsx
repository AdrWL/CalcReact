import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, toggleTheme } from '../store/store';
import { DarkModeButton } from "../../assets/icons/index";

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

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: isDarkMode ? '#333' : '#F5F5F5', 
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
  backButton: {
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#6200EE',
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  dropdownButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
    color: '#FFF',
  },
  modalItem: {
    backgroundColor: '#FFF',
    padding: 15,
    paddingLeft: 70,
    paddingRight: 70,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  modalCloseButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 30,
  },
  modalCloseText: {
    color: '#FFF',
    fontSize: 16,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    borderColor: isDarkMode ? '#666' : '#CCC', 
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: isDarkMode ? '#444' : '#FFF', 
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.3)',
    elevation: 5,
  },
  clearButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  result: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});


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
    <View style={styles.container}>
       <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={() => dispatch(toggleTheme())}>
          <Text style={styles.themeToggleText}>
            {isDarkMode ? <DarkModeButton /> : <DarkModeButton />}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Powrót</Text>
      </TouchableOpacity>
      {/* Wybór samochodu */}
      <TouchableOpacity onPress={handleCarSelection} style={styles.dropdownButton}>
        <Text style={styles.dropdownButtonText}>
          {selectedCar ? `Wybrano: ${selectedCar}` : 'Wybierz samochód'}
        </Text>
      </TouchableOpacity>

      {/* Modal z listą samochodów */}
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

      {/* Pola do wprowadzenia danych */}
      <TextInput
        style={styles.input}
        placeholder="Spalanie na 100 km (L/100km)"
        keyboardType="numeric"
        value={averageConsumption}
        onChangeText={setAverageConsumption}
      />
      <TextInput
        style={styles.input}
        placeholder="Odległość przejechana (km)"
        keyboardType="numeric"
        value={distanceTraveled}
        onChangeText={setDistanceTraveled}
      />
      <TextInput
        style={styles.input}
        placeholder="Paliwo początkowe (L)"
        keyboardType="numeric"
        value={initialFuel}
        onChangeText={setInitialFuel}
      />

      {/* Przyciski */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculateFuel}>
          <Text style={styles.buttonText}>Oblicz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clear}>
          <Text style={styles.buttonText}>Czyść</Text>
        </TouchableOpacity>
      </View>

      {/* Wyniki */}
      {fuelUsed !== null && remainingFuel !== null && (
        <View style={styles.resultContainer}>
          <Text style={styles.result}>Spalone paliwo: {fuelUsed} litry</Text>
          <Text style={styles.result}>Zostało paliwa: {remainingFuel} litry</Text>
        </View>
      )}
    </View>
  );
};
