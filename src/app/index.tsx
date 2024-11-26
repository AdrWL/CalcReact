import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FuelCalculator from '../components/FuelCalculator';
import { Calc } from '../components/Calc'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          title: "",
          headerBackTitle: "",
          headerShadowVisible: false,
       }}
        initialRouteName="FuelCalculator"
    >
        <Stack.Screen 
          name="FuelCalculator" 
          component={FuelCalculator} 
        />
        <Stack.Screen 
          name="Calc" 
          component={Calc} 
          options={{ title: 'Calc' }} 
        />
      </Stack.Navigator>
  );
}