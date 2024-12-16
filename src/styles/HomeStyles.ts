import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#1E1E2F' : '#E3F2FD',
      padding: 20,
    },
    headerContainer: {
      alignItems: 'center',
      marginBottom: 40,
    },
    headerText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFFFFF' : '#333333',
      textAlign: 'center',
    },
    subHeaderText: {
      fontSize: 16,
      color: isDarkMode ? '#BBBBBB' : '#555555',
      marginTop: 10,
      textAlign: 'center',
    },
    button: {
      width: '90%',
      backgroundColor: isDarkMode ? '#444' : '#6200EE',
      paddingVertical: 16,
      borderRadius: 30,
      marginBottom: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 18,
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: 1.2,
    },
    footerContainer: {
      position: 'absolute',
      bottom: 30,
      alignItems: 'center',
    },
    footerText: {
      fontSize: 14,
      color: isDarkMode ? '#AAAAAA' : '#666666',
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: isDarkMode ? '#1E1E2F' : '#E3F2FD',
      zIndex: -1,
      borderRadius: 10,
    },
    radialGradient: {
      position: 'absolute',
      width: 400,
      height: 400,
      borderRadius: 200,
      backgroundColor: isDarkMode ? '#33334D' : '#90CAF9',
      opacity: 0.6,
      top: '20%',
      left: '10%',
    },
    radialGradient2: {
      position: 'absolute',
      width: 300,
      height: 300,
      borderRadius: 150,
      backgroundColor: isDarkMode ? '#66667A' : '#42A5F5',
      opacity: 0.3,
      bottom: '15%',
      right: '15%',
    },
    themeToggle: {
      position: 'absolute',
      top: 40,
      right: 20,
    },
  });
};