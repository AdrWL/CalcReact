import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CarAdd = () => {
  const navigation = useNavigation(); 
  const [carName, setCarName] = useState<string>(''); 
  const [fuel, setFuel] = useState<string>(''); 

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Powrót</Text>
      </TouchableOpacity>
      <TextInput
          style={styles.input}
          placeholder={"Nazwa samochodu"}
          keyboardType="default"
          value={carName}
          onChangeText={(text: string) => setCarName(text)} 
        />
      <TextInput
          style={styles.input}
          placeholder={"Wprowadz spalanie"}
          keyboardType="numeric"
          value={fuel} 
          onChangeText={(text: string) => setFuel(text)} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
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
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#6200EE',
    fontSize: 16,
  },
});