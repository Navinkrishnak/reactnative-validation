import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
} from 'react-native';

import COLORS from '../../conts/colors';
import Button from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';

const ResetPasswordScreen = ({navigation}) => {
    const [inputs, setInputs] = React.useState({
        password: '',
        password: '',

      });

      const [errors, setErrors] = React.useState({});
      const [loading, setLoading] = React.useState(false);
      const validate = () => {
        Keyboard.dismiss();
        let isValid = true;
    
    
    
        if (!inputs.password) {
          handleError('Please input password', 'password');
          isValid = false;
        } else if (inputs.password.length < 5) {
          handleError('Min password length of 5', 'password');
          isValid = false;
        }
    
        if (isValid) {
            register();
        }
      };
      const register = () => {
        setLoading(true);
        setTimeout(() => {
          try {
            setLoading(false);
            AsyncStorage.setItem('userData', JSON.stringify(inputs));
            navigation.navigate('LoginScreen');
          } catch (error) {
            Alert.alert('Error', 'Something went wrong');
          }
        }, 3000);
      };
      const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
      };
      const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
      };
      return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
          <Loader visible={loading} />
          <ScrollView
            contentContainerStyle={{paddingTop: 50, paddingHorizontal: 20}}>
            <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
              Password Reset
            </Text>
            <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
              Reset Your Password
            </Text>
            <View style={{marginVertical: 20}}>
              
    

              <Input
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                iconName="lock-outline"
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                password
              />
              <Input
                onChangeText={text => handleOnchange(text, 'password')}
                onFocus={() => handleError(null, 'password')}
                iconName="lock-outline"
                label="Confirm Password"
                placeholder="Re-Enter password"
                error={errors.password}
                password
              />
              <Button title="Reset Password" onPress={validate} />
             
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    };
    
export default ResetPasswordScreen;

