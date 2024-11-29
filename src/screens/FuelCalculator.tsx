import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface FormData {
  averageConsumption: string;
  distanceTraveled: string;
  initialFuel: string;
}

export const FuelCalculator = () => {
  const navigation = useNavigation(); 
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
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Powrót</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Kalkulator Paliwa</Text>
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
        <TouchableOpacity style={styles.button} onPress={clear}>
          <Text style={styles.buttonText}>Czyść</Text>
        </TouchableOpacity>
      </View>
      {remainingFuel !== null && (
        <View style={styles.resultContainer}>
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
    backgroundColor: '#F5F5F5', 
    alignItems: 'center', 
  },
  backButton: {
    alignSelf: 'flex-start', 
    marginBottom: 20,
  },
  backButtonText: {
    color: '#6200EE',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333', 
  },
  input: {
    width: '90%', 
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
