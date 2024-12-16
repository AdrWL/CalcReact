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
    themeToggleText: {
      color: isDarkMode ? '#FFF' : '#000',
    },
    backButton: {
      marginBottom: 20,
      alignSelf: 'flex-start',
    },
    backButtonText: {
      color: '#6200EE',
      fontSize: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: isDarkMode ? '#FFF' : '#333',
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderColor: isDarkMode ? '#666' : '#CCC',
      borderRadius: 10,
      padding: 12,
      marginBottom: 20,
      fontSize: 16,
      backgroundColor: isDarkMode ? '#444' : '#FFF',
      alignSelf: 'center',
      color: isDarkMode ? '#FFF' : '#000',
    },
    addButton: {
      backgroundColor: '#6200EE',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      elevation: 5,
    },
    addButtonText: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    list: {
      marginTop: 20,
    },
    listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#444' : '#FFF',
      borderRadius: 10,
      padding: 15,
      marginBottom: 10,
      elevation: 2,
    },
    carDetails: {
      flex: 1,
    },
    carName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDarkMode ? '#FFF' : '#333',
    },
    carFuel: {
      fontSize: 14,
      color: isDarkMode ? '#CCC' : '#666',
      marginTop: 4,
    },
    actions: {
      flexDirection: 'row',
    },
    editButton: {
      marginRight: 10,
      backgroundColor: '#FFA726',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    deleteButton: {
      backgroundColor: '#E53935',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    actionText: {
      color: '#FFF',
      fontSize: 14,
    },
});
};