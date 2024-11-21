import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
}

const FuelCalculator = () => {
  const [averageConsumption, setAverageConsumption] = useState<string>('');
  const [distanceTraveled, setDistanceTraveled] = useState<string>('');
  const [initialFuel, setInitialFuel] = useState<string>('');
  const [remainingFuel, setRemainingFuel] = useState<number | null>(null);
  const [fuelUsed, setFuelUsed] = useState<number | null>(null); // Nowa zmienna stanu dla zużytego paliwa

  useEffect(() => {
    calculateRemainingFuel();
  }, [initialFuel, distanceTraveled, averageConsumption]);

  const calculateRemainingFuel = () => {
    const avgConsumption = parseFloat(averageConsumption);
    const distance = parseFloat(distanceTraveled);
    const initial = parseFloat(initialFuel);

    // Sprawdzenie, czy jakiekolwiek wymagane dane są brakujące
    if (isNaN(avgConsumption) || isNaN(distance) || isNaN(initial)) {
      setRemainingFuel(null);
      setFuelUsed(null); // Ustawienie zużytego paliwa na null, gdy dane są nieprawidłowe
      return;
    }

    const fuelUsedValue = (avgConsumption * distance) / 100;
    const fuelLeft = initial - fuelUsedValue;
    setRemainingFuel(parseFloat(fuelLeft.toFixed(2)));
    setFuelUsed(parseFloat(fuelUsedValue.toFixed(2))); // Ustawienie zużytego paliwa
  };

  const clear = () => {
    setAverageConsumption('');
    setDistanceTraveled('');
    setInitialFuel('');
    setRemainingFuel(null); 
    setFuelUsed(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fuel Kalkulator</Text>

      <InputField 
        label="Spalanie na 100 (L/100km)" 
        value={averageConsumption} 
        onChangeText={setAverageConsumption} 
      />
      <InputField 
        label="Odległość przejechana (km)" 
        value={distanceTraveled} 
        onChangeText={setDistanceTraveled} 
      />
      <InputField 
        label="Paliwo początkowe (L)" 
        value={initialFuel} 
        onChangeText={setInitialFuel} 
      />

      <View style={styles.buttonContainer}>
        <Button title="Oblicz paliwo" onPress={calculateRemainingFuel} />
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

const InputField = ({ label, value, onChangeText }: InputFieldProps) => (
  <>
    <Text>{label}</Text>
    <TextInput
      style={styles.input}
      placeholder={label}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
    />
  </>
);

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
    flexDirection: 'row',
    justifyContent: 'space-between', 
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

export default FuelCalculator;