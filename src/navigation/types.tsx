import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Definicja stosu nawigacji
export type RootStackParamList = {
  Home: undefined;
  FuelCalculator: undefined;
  CarAdd: undefined;
};

// Użycie typów dla propsów ekranów (opcjonalnie)
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FuelCalculatorScreenProps = NativeStackScreenProps<RootStackParamList, 'FuelCalculator'>;
export type CalcScreenProps = NativeStackScreenProps<RootStackParamList, 'CarAdd'>;
