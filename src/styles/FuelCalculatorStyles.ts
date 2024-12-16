import { StyleSheet } from 'react-native';

export const createStyles = (isDarkMode: boolean) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    themeToggleContainer: {
      position: 'absolute',
      top: 10,
      right: 10,
      zIndex: 1,
    },
    backButton: {
      marginBottom: 30,
      alignSelf: 'flex-start',
    },
    backButtonText: {
      color: '#6200EE',
      fontSize: 16,
    },
    dropdownButton: {
      backgroundColor: '#6200EE',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 25,
    },
    dropdownButtonText: {
      color: '#FFF',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 40,
      marginBottom: 40,
      color: '#FFF',
    },
    modalItem: {
      backgroundColor: '#FFF',
      padding: 15,
      paddingHorizontal: 70,
      borderRadius: 10,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
    },
    modalItemText: {
      fontSize: 18,
      color: '#333',
    },
    modalCloseButton: {
      backgroundColor: '#6200EE',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginTop: 20,
    },
    modalCloseText: {
      color: '#FFF',
      fontSize: 16,
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderColor: isDarkMode ? '#666' : '#CCC',
      borderRadius: 10,
      color: isDarkMode ? '#FFF' : '#333',
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#444' : '#FFF',
      alignSelf: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
      alignSelf: 'center',
      marginTop: 20,
    },
    button: {
      backgroundColor: '#6200EE',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 5,
    },
    clearButton: {
      backgroundColor: '#E53935',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    resultContainer: {
      marginTop: 30,
      alignItems: 'center',
    },
    result: {
      fontSize: 18,
      fontWeight: '500',
      color: isDarkMode ? '#FFF' : '#333',
      textAlign: 'center',
    },
});
};