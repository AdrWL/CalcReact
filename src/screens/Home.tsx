import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types'; 

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const Home = () => {
  const navigation = useNavigation<NavigationProp>(); 

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FuelCalculator")}
      >
        <Text style={styles.buttonText}>Kalkulator Paliwa</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate("CarAdd")}
      >
        <Text style={styles.buttonText}>Wprowadź Samochód</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', 
    padding: 20,
  },
  button: {
    width: '80%', 
    backgroundColor: '#6200EE',
    paddingVertical: 16, 
    borderRadius: 12,
    marginBottom: 20, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
