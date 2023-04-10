import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Alert, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export function RemoveBtn(props) {
  const ui = (
    <SafeAreaView>
      <TouchableOpacity onPress={clickRemoveResponse} style={styles.btn}>
        <Icon name="delete" color="white" size={25} />
      </TouchableOpacity>
    </SafeAreaView>
  );
  return ui;

  async function clickRemoveResponse() {
    const userJsonObj = await AsyncStorage.getItem('user');
    const userJsObj = JSON.parse(userJsonObj);

    const fromId = userJsObj.id;
    const toId = props.toUserId;

    fetch('http://localhost/chatAppAPI/loadUsers.php?fromId='+fromId +'&toId='+toId, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then(response => response.json())
      .then(json => {})
      .catch(error => console.log(error));
  }
}

const styles = StyleSheet.create({
  btn: {
    position: 'absolute',
    start: 130,
    top: 20,
    backgroundColor: '#2c4b76',
    padding: 5,
    borderRadius: 50,
  },
});
