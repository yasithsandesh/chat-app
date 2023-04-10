import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView} from 'react-native';

export function Main({navigation}) {

  const [login, setLogin] = useState(false);

  useEffect(() => {

    async function checkUser() {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setLogin(true);
      }
    }

    checkUser();
  }, []);

  if (login == false) {
    navigation.navigate('Log In');
  } else {
    navigation.navigate('Home');
  }
}
