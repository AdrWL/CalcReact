import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addCar } from '../store/store';

export const CarAdd = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [carName, setCarName] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');

  const handleAddCar = () => {
    if (carName && fuel) {
      dispatch(addCar({ name: carName, fuelConsumption: fuel }));
      setCarName('');
      setFuel('');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Powrót</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Dodaj Samochód</Text>
      <TextInput
        style={styles.input}
        placeholder="Nazwa samochodu"
        value={carName}
        onChangeText={setCarName}
      />
      <TextInput
        style={styles.input}
        placeholder="Spalanie (L/100km)"
        keyboardType="numeric"
        value={fuel}
        onChangeText={setFuel}
      />
      <TouchableOpacity onPress={handleAddCar} style={styles.addButton}>
        <Text style={styles.addButtonText}>Dodaj samochód</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    marginBottom: 20,
    alignSelf: 'flex-start',
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
    alignSelf: 'center',
  },
  addButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
