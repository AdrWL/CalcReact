import { StatusBar } from 'react-native';
import React from 'react';

interface StatusBarsProps {
  isDarkMode: boolean;
}

export const StatusBars: React.FC<StatusBarsProps> = ({ isDarkMode }) => {
  return (
    <>
      <StatusBar
        backgroundColor={isDarkMode ? '#1E1E2F' : '#E3F2FD'}
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
      />
    </>
  );
}