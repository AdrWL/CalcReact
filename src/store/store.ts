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
    editCar: (state, action: PayloadAction<{ index: number; name: string; fuelConsumption: string }>) => {
      const { index, name, fuelConsumption } = action.payload;
      if (state.cars[index]) {
        state.cars[index] = { name, fuelConsumption };
      }
    },
    removeCar: (state, action: PayloadAction<number>) => {
      state.cars.splice(action.payload, 1);
    },
  },
});

export const { addCar, editCar, removeCar } = carSlice.actions;

interface ThemeState {
  isDarkMode: boolean;
}

const initialThemeState: ThemeState = {
  isDarkMode: false, 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const store = configureStore({
  reducer: {
    car: carSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
