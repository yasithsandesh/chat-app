import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function ResetPassword({navigation}) {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  async function resetPassword() {
    var userDataJson = await AsyncStorage.getItem('user');
    var userDataJs = JSON.parse(userDataJson);

    var passwordJsObj = {
      userId: userDataJs.id,
      password: password,
      reEnterPassword: rePassword,
    };

    var form = new FormData();
    form.append('passwordJsonObj', JSON.stringify(passwordJsObj));

    fetch('http://localhost/chatAppAPI/changePassword.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        if (json.alert == 'Password must be 5-10 characters') {
          Alert.alert('Alert', json.alert);
        } else if (json.alert == 'The password you entered do not match') {
          Alert.alert('Alert', json.alert);
        } else if (json.alert == 'Password changed successfully') {
           AsyncStorage.removeItem('user');
          navigation.navigate('Success');
        } else {
        }
      })
      .catch(error => console.log(error));
  }

  const dark = useColorScheme() === "dark";

  const ui = (
    <SafeAreaView style={styles.mainView}>
      <Image source={require('./img/resetPassword.jpg')} style={styles.img}/>
      <View style={styles.inputView}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          style={styles.inputPassword}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder={'New Password'}
        />
      </View>

      <View style={styles.inputView}>
        <Icon name="lock" style={styles.icon} />
        <TextInput
          style={styles.inputPassword}
          onChangeText={setRePassword}
          secureTextEntry={true}
          placeholder={'Confirm Password'}
        />
      </View>

      <Pressable style={styles.donePassword} onPress={resetPassword}>
        <Text style={styles.doneText}>Done</Text>
      </Pressable>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white",
    gap: 20,
  },

  mainViewDark: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:Colors.darker,
    gap: 20,
  },

  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputPassword: {
    borderColor: '#cde0f9',
    borderWidth: 2,
    borderRadius: 50,
    width: '80%',
    height: 50,
    fontSize: 22,
    paddingStart: 40,
    paddingEnd: 35,
  },

  icon: {
    position: 'absolute',
    fontSize: 22,
    start: 15,
  },

  donePassword: {
    backgroundColor: '#5896EB',
    width: '80%',
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  doneText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

  img:{
    width:300,
    height:400,
  },
});
