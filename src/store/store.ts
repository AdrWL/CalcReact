import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Car {
  name: string;
  fuelConsumption: string;
}

interface CarState {
  cars: Car[];
}

const initialState: CarState = {
  cars: [],
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    addCar: (state, action: PayloadAction<Car>) => {
      state.cars.push(action.payload);
    },
  },
});

export const { addCar } = carSlice.actions;

const store = configureStore({
  reducer: {
    car: carSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
