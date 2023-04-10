import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Pressable, Text, TextInput, useColorScheme} from 'react-native';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import {ResetPassword} from './resetPassword';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function Settings({route, navigation}) {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [mobile, setMobile] = useState('');
  const [about, setAbout] = useState('');

  const [data, setData] = useState([
    {
      fname: '',
      lname: '',
      mobile: '',
    },
  ]);

  const [profileImage, setProfileImage] = useState();

  async function updateRequest() {
    
    var userDataJson = await AsyncStorage.getItem('user');
    var userDataJs = JSON.parse(userDataJson);
    var jsObject = {
      id: userDataJs.id,
      fname: fname,
      lname: lname,
      mobile: mobile,
      about: about,
    };

    var form = new FormData();
    form.append('jsonRequestObj', JSON.stringify(jsObject));
    form.append('profileImg', profileImage);

    fetch('http://localhost/chatAppAPI/editProfile.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        
      })
      .catch(error => console.log(error));


      function loadUserData() {
        fetch(
          'http://localhost/chatAppAPI/userDataLoad.php?id=' + route.params.id,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          },
        )
          .then(response => response.json())
          .then(json => {
            setData(json);
          })
          .catch(error => console.log(error));
      }
      loadUserData();
  }

  function loadUserData() {
    fetch(
      'http://localhost/chatAppAPI/userDataLoad.php?id=' + route.params.id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        setData(json);
      })
      .catch(error => console.log(error));
  }
  useEffect(loadUserData,[]);

  const dark = useColorScheme()=== 'dark';

  const background = {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    backgroundColor: dark?Colors.darker:Colors.white,
  }

  const ui = (
    <SafeAreaView style={background}>
      <FlatList data={data} renderItem={dataUi} />
    </SafeAreaView>
  );

  function dataUi({item}) {
    const ui = (
      <View style={dark?styles.itemMainViewDark:styles.itemMainView}>
        <View style={styles.profileEditView}>
          <Image
            source={{
              uri: 'http://localhost/chatAppAPI/' + route.params.profile_url,
            }}
            style={styles.profilePic}
          />
          <Pressable style={styles.editBtn} onPress={selectProfilePicture}>
            <Icon
              name="edit"
              style={styles.editIcon}
              size={20}
              color="#eef5fd"
            />
            <Text style={styles.editBtnText}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.SettingTextInputView}>
          <Icon name="user" style={styles.icon} color="#47555c" />
          <TextInput
            style={styles.SettingTextInput}
            placeholder={item.fname}
            onChangeText={setFname}
            autoCorrect={false}
          />
          <Icon name="pencil" color="#98a0a4" style={styles.endIcon} />
        </View>

        <View style={styles.SettingTextInputView}>
          <Icon name="user" style={styles.icon} color="#47555c" />
          <TextInput
            style={styles.SettingTextInput}
            placeholder={item.lname}
            onChangeText={setLname}
            autoCorrect={false}
          />
          <Icon name="pencil" color="#98a0a4" style={styles.endIcon} />
        </View>

        <View style={styles.SettingTextInputView}>
          <Icon name="mobile" style={styles.icon} color="#47555c" />
          <TextInput
            style={styles.SettingTextInput}
            placeholder={item.mobile}
            inputMode={'numeric'}
            autoCorrect={false}
            maxLength={10}
            onChangeText={setMobile}
          />
          <Icon name="pencil" color="#98a0a4" style={styles.endIcon} />
        </View>

        <View style={styles.SettingTextInputView}>
          <Icon name="pencil" style={styles.icon} color="#47555c" />
          <TextInput
            style={styles.SettingTextInput}
            placeholder={item.about}
            onChangeText={setAbout}
          />
        </View>

        <Pressable style={styles.doneBtn} onPress={updateRequest}>
          <Text style={styles.doneText}>Done</Text>
        </Pressable>

        <Pressable style={styles.resetPasswordBtn} onPress={resetPassword}>
          <Text style={styles.resetPasswordText}>Reset Password</Text>
        </Pressable>
      </View>
    );
    return ui;
  }

  return ui;

  function resetPassword() {
    navigation.navigate('Reset Password');
  }

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
}

const styles = StyleSheet.create({
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 50,
    top: 10,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
  },

  itemMainView: {
    alignItems: 'center',
    gap: 20,
    backgroundColor: 'white',
  },

  itemMainViewDark: {
    alignItems: 'center',
    gap: 20,
    backgroundColor: Colors.darker,
  },

  SettingTextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    position: 'absolute',
    fontSize: 22,
    start: 15,
  },

  endIcon: {
    position: 'absolute',
    end: 15,
    fontSize: 22,
  },

  SettingTextInput: {
    borderColor: '#cde0f9',
    borderWidth: 2,
    borderRadius: 50,
    width: '90%',
    height: 50,
    fontSize: 22,
    paddingStart: 40,
    paddingEnd: 35,
  },
  doneBtn: {
    backgroundColor: '#5896EB',
    width: '40%',
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

  profileEditView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  editBtn: {
    width: '30%',
    height: 50,
    backgroundColor: '#6c777d',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    borderRadius: 50,
  },

  editIcon: {
    paddingRight: 10,
  },

  editBtnText: {
    fontSize: 20,
    color: '#eef5fd',
    fontWeight: 'bold',
  },

  resetPasswordBtn: {
    backgroundColor: '#98a0a4',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },

  resetPasswordText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
