import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/views/screens/LoginScreen';
import RegistrationScreen from './src/views/screens/RegistrationScreen';
import HomeScreen from './src/views/screens/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from './src/views/components/Loader';
import ResetPasswordScreen from './src/views/screens/ResetPasswordScreen';
import ForgotPasswordScreen from './src/views/screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState('');

  React.useEffect(() => {
    setTimeout(() => {
      authUser();
    }, 2000);
  }, []);

  const authUser = async () => {
    try {
      let userData = await AsyncStorage.getItem('userData');
      if (userData) {
        userData = JSON.parse(userData);
        if (userData.loggedIn) {
          setInitialRouteName('HomeScreen');
        } else {
          setInitialRouteName('LoginScreen');
        }
      } else {
        setInitialRouteName('RegistrationScreen');
      }
    } catch (error) {
      setInitialRouteName('RegistrationScreen');
    }
  };

  return (
    <NavigationContainer>
      {!initialRouteName ? (
        <Loader visible={true} />
      ) : (
        <>
          <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{headerShown: false}}>
            <Stack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
            />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

export default App;