import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCar, editCar, removeCar, toggleTheme } from '../store/store';
import { RootState } from '../store/store';
import { LinearGradient } from 'expo-linear-gradient';
import { DarkModeButton } from "../../assets/icons/index";
import { createStyles } from '../styles/CarStyles'; 

export const CarAdd = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [carName, setCarName] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const styles = createStyles(isDarkMode);

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
        <Text style={styles.title}>{editingIndex !== null ? 'Edytuj Samochód' : 'Dodaj Samochód'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Nazwa samochodu"
          placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
          value={carName}
          onChangeText={setCarName}
        />
        <TextInput
          style={styles.input}
          placeholder="Spalanie (L/100km)"
          placeholderTextColor={isDarkMode ? '#AAA' : '#888'}
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
    </LinearGradient>
  );
};
