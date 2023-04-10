import React, {useEffect, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SelectDropdown from 'react-native-select-dropdown';
import {launchImageLibrary} from 'react-native-image-picker';

export function SignUp({navigation}) {
  const [mobile, setMobile] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, SetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [profileImage, setProfileImage] = useState(null);
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState([]);
  const ui = (
    <SafeAreaView style={styles.signUpMain}>
      <View style={styles.SignUpTextInputView}>
        <Icon name="mobile" style={styles.icon1} color="#47555c" />
        <TextInput
          style={styles.SignUpTextInput}
          placeholder={'Mobile'}
          inputMode={'numeric'}
          autoCorrect={false}
          maxLength={10}
          onChangeText={setMobile}
        />
      </View>

      <View style={styles.SignUpTextInputView}>
        <Icon name="user" style={styles.icon1} color="#47555c" />
        <TextInput
          style={styles.SignUpTextInput}
          placeholder={'First Name'}
          onChangeText={setFname}
          autoCorrect={false}
        />
      </View>

      <View style={styles.SignUpTextInputView}>
        <Icon name="user" style={styles.icon1} color="#47555c" />
        <TextInput
          style={styles.SignUpTextInput}
          placeholder={'Last Name'}
          onChangeText={setLname}
          autoCorrect={false}
        />
      </View>

      <View style={styles.SignUpTextInputView}>
        <Icon name="envelope-o" style={styles.icon1} color="#47555c" />
        <TextInput
          style={styles.SignUpTextInput}
          placeholder={'Email'}
          onChangeText={SetEmail}
          autoCorrect={false}
          autoCapitalize={"none"}
        />
      </View>

      <View style={styles.SignUpTextInputView}>
        <Icon name="lock" style={styles.icon1} color="#47555c" />
        <TextInput
          style={styles.SignUpTextInput}
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={setPassword}
          autoCorrect={false}
        />
      </View>

      <View style={styles.SignUpTextInputView}>
        <Icon name="lock" style={styles.icon1} color="#47555c" />
        <TextInput
          style={styles.SignUpTextInput}
          placeholder={'Re-enter Password'}
          secureTextEntry={true}
          onChangeText={setRePassword}
          autoCorrect={false}
        />
      </View>

      <View style={styles.SignUpTextInputView}>
        <Icon name="user" style={styles.icon1} color="#47555c" />
        <SelectDropdown
          data={countries}
          onSelect={setCountry}
          defaultButtonText={'Select Country'}
          buttonStyle={styles.select}
        />
      </View>

      <Pressable
        style={styles.selectProfilePictureBtn}
        onPress={selectProfilePicture}>
        <Icon name="camera" style={styles.icon2} color="white" />
        <Text style={styles.selectProfilePictureText}>
          Select Profile Picture
        </Text>
      </Pressable>

      <Pressable style={styles.createAccBtn} onPress={signUpRequest}>
        <Text style={styles.createAccBtnText}>Create Account</Text>
      </Pressable>
    </SafeAreaView>
  );

//load Countries
  function loadCountries() {
    fetch('http://localhost/chatAppAPI/loadCountries.php', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then(json => {
        setCountries(json);
      })
      .catch(error => console.log(error));
  }
  useEffect(loadCountries, []);

  //Image Libary

  async function selectProfilePicture() {
    const options = {
      mediaType: 'photo',
    };

    const result = await launchImageLibrary(options);

    if (result.didCancel) {
      Alert.alert('Message', 'No Image');
    } else {
      const imageObject = {
        uri: result.assets[0].uri.replace('file://', ''),
        name: 'profile.png',
        type: 'image/png',
      };

      setProfileImage(imageObject);
    }
  }

  //signUp Reequest
  function signUpRequest() {
    var requestJSONText = {
      mobile: mobile,
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      rePassword: rePassword,
      country: country,
    };
    Alert.alert("k",requestJSONText.password)

    var form = new FormData();
    form.append('jsonRequestText', JSON.stringify(requestJSONText));
    form.append('profileImg',profileImage);

    fetch('http://localhost/chatAppAPI/signUp.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(json => {       
        if(json.alert == 'success'){
          navigation.navigate('Log In');
        }else{
          Alert.alert('Alert',json.alert);
        } 
      })
      .catch(error => console.log(error));
  }

  return ui;
}

const styles = StyleSheet.create({
  signUpMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    backgroundColor:"white",
  },
  SignUpTextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#eff5fd',
    borderRadius:50,
  },
  SignUpTextInput: {
    // borderColor: '#47555c',
    // borderWidth: 2,
    borderRadius: 50,
    width: '80%',
    height: 50,
    fontSize: 22,
    paddingStart: 40,
    paddingEnd: 35,
  },
  icon1: {
    position: 'absolute',
    fontSize: 22,
    start: 15,
  },
  select: {
    width: '80%',
    borderRadius: 50,
  },
  createAccBtn: {
    width: '80%',
    height: 50,
    backgroundColor: '#5896EB',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createAccBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectProfilePictureBtn: {
    width: '80%',
    height: 50,
    backgroundColor: '#47555c',
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectProfilePictureText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon2: {
    position: 'absolute',
    fontSize: 22,
    start: 22,
  },
});
