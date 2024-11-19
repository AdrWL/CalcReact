import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const FuelCalculator = () => {
  const [averageConsumption, setAverageConsumption] = useState('');
  const [distanceTraveled, setDistanceTraveled] = useState('');
  const [initialFuel, setInitialFuel] = useState('');
  const [remainingFuel, setRemainingFuel] = useState(null);

  const calculateRemainingFuel = () => {
    // Oblicz zużyte paliwo
    const fuelUsed = (parseFloat(averageConsumption) * parseFloat(distanceTraveled)) / 100;
    // Oblicz pozostałe paliwo
    const fuelLeft = parseFloat(initialFuel) - fuelUsed;
    // Zapisz wynik (zaokrąglony do 2 miejsc)
    setRemainingFuel(fuelLeft.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fuel Kalkulator</Text>

      {/* Input for Average Consumption */}
      <TextInput
        style={styles.input}
        placeholder="Spalanie na 100 (L/100km)"
        keyboardType="numeric"
        value={averageConsumption}
        onChangeText={setAverageConsumption}
      />

      {/* Input for Distance Traveled */}
      <TextInput
        style={styles.input}
        placeholder="Dystans (km)"
        keyboardType="numeric"
        value={distanceTraveled}
        onChangeText={setDistanceTraveled}
      />

      {/* Input for Initial Fuel */}
      <TextInput
        style={styles.input}
        placeholder="Ile w zbiorniku (L)"
        keyboardType="numeric"
        value={initialFuel}
        onChangeText={setInitialFuel}
      />

      {/* Button to Calculate */}
      <Button title="Oblicz paliwo" onPress={calculateRemainingFuel} />

      {/* Display Result */}
      {remainingFuel !== null && (
        <Text style={styles.result}>Zostało paliwa: {remainingFuel} litry</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FuelCalculator;
