import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  FuelCalculator: undefined;
  CarAdd: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type FuelCalculatorScreenProps = NativeStackScreenProps<RootStackParamList, 'FuelCalculator'>;
export type CalcScreenProps = NativeStackScreenProps<RootStackParamList, 'CarAdd'>;
