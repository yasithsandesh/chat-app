import React, {useState} from 'react';
import {
  SafeAreaView,
  Image,
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function LogIn({navigation}) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const ui = (
    <SafeAreaView style={styles.logInMain}>
      <Image
        // source={{uri: 'https://reactjs.org/logo-og.png'}}
        source={require('./img/login.png')}
        style={styles.logInImg}
      />

      <View style={styles.logInInputView}>
        <Icon name="mobile" style={styles.logInIcon} color="#47555c" />
        <TextInput
          style={styles.logInInput}
          placeholder={'Your Mobile'}
          inputMode={'numeric'}
          autoCorrect={false}
          maxLength={10}
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.logInInputView}>
        <Icon name="lock" style={styles.logInIcon} color="#47555c" />
        <TextInput
          style={styles.logInInput}
          placeholder={'Your Password'}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>

      <Pressable style={styles.logInButton} onPress={logIn}>
        <Text style={styles.logInInputText}>Log In</Text>
      </Pressable>

      <Pressable style={styles.logInCreateAccButton} onPress={()=>{ navigation.navigate('Sign Up')}}>
        <Text style={styles.logInInputText}>Create Account</Text>
      </Pressable>
    </SafeAreaView>
  );
  return ui;

  function logIn() {
    var requestJSONObj = JSON.stringify({
      mobile: mobile,
      password: password,
    });

    var form = new FormData();
    form.append('jsonRequestText', requestJSONObj);

    // var request = new XMLHttpRequest();
    // request.onreadystatechange = function(){
    //   if(request.readyState==4&&request.status==200){
    //     var response = request.responseText;
    //     var jsResponseObj = JSON.parse(response);
    //     if(jsResponseObj.msg == 'Error'){
    //       Alert.alert('Message', 'Invalid Details');
    //     }else{
    //       var userObj = jsResponseObj.user;
    //       AsyncStorage.getItem(key:'user',JSON.stringify(userObj));
    //     }
    //   }
    // };
    // request.open('POST','http://localhost/chatAppAPI/login.php',true);
    // request.send(form);

    fetch('http://localhost/chatAppAPI/login.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(async json => {
        try {
          if (json.msg == 'Error') {
            Alert.alert('Message', 'Invalid Details');
          } else {
            await AsyncStorage.setItem('user', JSON.stringify(json.user));

            navigation.navigate('Home');
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch(error => console.log(error));
  }
}

const styles = StyleSheet.create({
  //LOG IN
  logInMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor:"white",
  },

  logInImg: {
    width: 400,
    height: 300,
  },

  logInInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#eff5fd',
    borderRadius:50,

  },

  logInIcon: {
    fontSize: 22,
    position: 'absolute',
    start: 15,
  },

  logInInput: {
    width: '80%',
    height: 50,
    fontSize: 22,
    borderRadius: 50,
    // borderColor: '#cde0f9',
    // borderWidth: 2,
    paddingStart: 35,

  },

  logInButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#5896EB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logInCreateAccButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#47555c',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logInInputText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
