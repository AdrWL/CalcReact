import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCar, editCar, removeCar, toggleTheme } from '../store/store';
import { RootState } from '../store/store';
import { DarkModeButton } from "../../assets/icons/index";

export const CarAdd = () => {
  const cars = useSelector((state: RootState) => state.car.cars);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);
  const [carName, setCarName] = useState<string>('');
  const [fuel, setFuel] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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
      color: isDarkMode ? '#FFF' : '#333', 
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderColor: isDarkMode ? '#666' : '#CCC',
      borderRadius: 10,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#444' : '#FFF', // Zmiana koloru tła inputu
      alignSelf: 'center',
      color: isDarkMode ? '#FFF' : '#000', // Zmiana koloru tekstu w inputach
    },
    addButton: {
      backgroundColor: '#6200EE',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
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
      backgroundColor: isDarkMode ? '#444' : '#FFF', // Zmiana koloru tła elementu listy
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 2,
    },
    carDetails: {
      flex: 1,
    },
    carName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFF' : '#333', // Zmiana koloru nazwy samochodu
    },
    carFuel: {
      fontSize: 14,
      color: isDarkMode ? '#CCC' : '#666', // Zmiana koloru spalania
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