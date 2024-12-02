import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCar, editCar, removeCar } from '../store/store';
import { RootState } from '../store/store';

export const CarAdd = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [carName, setCarName] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddCar = () => {
    if (carName && fuel) {
      if (editingIndex !== null) {
        dispatch(editCar({ index: editingIndex, name: carName, fuelConsumption: fuel }));
        setEditingIndex(null);
      } else {
        dispatch(addCar({ name: carName, fuelConsumption: fuel }));
      }
      setCarName('');
      setFuel('');
    } else {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola.');
    }
  };

  const handleEdit = (index: number) => {
    const car = cars[index];
    setCarName(car.name);
    setFuel(car.fuelConsumption);
    setEditingIndex(index);
  };

  const handleDelete = (index: number) => {
    Alert.alert('Usuń samochód', 'Czy na pewno chcesz usunąć ten samochód?', [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        style: 'destructive',
        onPress: () => dispatch(removeCar(index)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Powrót</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{editingIndex !== null ? 'Edytuj Samochód' : 'Dodaj Samochód'}</Text>
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
        <Text style={styles.addButtonText}>{editingIndex !== null ? 'Zapisz zmiany' : 'Dodaj samochód'}</Text>
      </TouchableOpacity>
      <FlatList
        data={cars}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        style={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.listItem}>
            <View style={styles.carDetails}>
              <Text style={styles.carName}>{item.name}</Text>
              <Text style={styles.carFuel}>Spalanie: {item.fuelConsumption} L/100km</Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(index)} style={styles.editButton}>
                <Text style={styles.actionText}>Edytuj</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                <Text style={styles.actionText}>Usuń</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
  list: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  carDetails: {
    flex: 1,
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  carFuel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    marginRight: 10,
    backgroundColor: '#FFA726',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  actionText: {
    color: '#FFF',
    fontSize: 14,
  },
});
