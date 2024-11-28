import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface FormData {
  averageConsumption: string;
  distanceTraveled: string;
  initialFuel: string;
}

export const FuelCalculator = () => {
  const initialState = {
    averageConsumption: '',
    distanceTraveled: '',
    initialFuel: '',
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [remainingFuel, setRemainingFuel] = useState<number | null>(null);
  const [fuelUsed, setFuelUsed] = useState<number | null>(null);

  useEffect(() => {
    const avg = parseFloat(formData.averageConsumption);
    const distance = parseFloat(formData.distanceTraveled);
    const initial = parseFloat(formData.initialFuel);
    if (!isNaN(avg) && !isNaN(distance) && !isNaN(initial)) {
      const used = (avg * distance) / 100;
      setRemainingFuel(parseFloat((initial - used).toFixed(2)));
      setFuelUsed(parseFloat(used.toFixed(2)));
    } else {
      setRemainingFuel(null);
      setFuelUsed(null);
    }
  }, [formData]);

  const clear = () => {
    setFormData(initialState);
    setRemainingFuel(null);
    setFuelUsed(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fuel Kalkulator</Text>
      {['Spalanie na 100 (L/100km)', 'Odległość przejechana (km)', 'Paliwo początkowe (L)'].map((label, index) => (
     <TextInput
      key={index}
      style={styles.input}
      placeholder={label}
      keyboardType="numeric"
      value={Object.values(formData)[index]}
      onChangeText={(text: string) => setFormData({ ...formData, [Object.keys(formData)[index]]: text })}
    />
  ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonClear} onPress={clear}>
          <Text>Czyść</Text>
        </TouchableOpacity>
      </View>
      {remainingFuel !== null && (
        <View>
          <Text style={styles.result}>Zostało paliwa: {remainingFuel} litry</Text>
          <Text style={styles.result}>Spalone paliwo: {fuelUsed} litry</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  buttonContainer: {
    alignItems: 'center',
  },
  buttonClear: {
    width: "50%",
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  result: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
