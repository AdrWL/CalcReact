import { View } from "react-native";
import FuelCalculator from '../components/FuelCalculator';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FuelCalculator />
    </View>
  );
}
