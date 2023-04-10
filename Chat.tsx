import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, Pressable, TouchableOpacity, useColorScheme} from 'react-native';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RemoveBtn} from './removeButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function Chat({route, navigation}) {
  const [chatText, setChatText] = useState();

  const [chatHistory, setChatHistory] = useState([

  ]);

  //Load Chat Request
  async function loadChatRequest() {
    var fromUserJsonObj = await AsyncStorage.getItem('user');
    var fromUserJsObj = JSON.parse(fromUserJsonObj);

    var requestJsonUsersId = {
      key: route.params.key,
      id1: fromUserJsObj.id,
      id2: route.params.id,
    };

    var form = new FormData();
    form.append('requestJsonUsersId', JSON.stringify(requestJsonUsersId));

    fetch('http://localhost/chatAppAPI/loadChat.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        setChatHistory(json);
      })
      .catch(error => console.log(error));
  }

  const [reload,setReload] = useState(false);


  //Save Chat
  async function saveChat() {
    setReload(true);
    
    var fromUserJsonObj = await AsyncStorage.getItem('user');
    var fromUserJsObj = JSON.parse(fromUserJsonObj);

    var requestObj = {
      from_user_id: fromUserJsObj.id,
      to_user_id: route.params.id,
      message: chatText,
    };

    var form = new FormData();
    form.append('requestJson', JSON.stringify(requestObj));

    fetch('http://localhost/chatAppAPI/saveChat.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => console.log(error));
  }

  const dark = useColorScheme() === 'dark';


  //main UI
  const ui = (
    <SafeAreaView style={dark?styles.chatMainViewDark:styles.chatMainView}>
        <RemoveBtn  toUserId={route.params.id}/>
      <Pressable style={styles.mainImg} onPress={profile}>
        <Image
          source={{uri: 'http://localhost/chatAppAPI/' + route.params.pic}}
          style={styles.profileImg}
        />
      </Pressable>
    
      <Text style={dark?styles.profileNameDark:styles.profileName}>{route.params.name}</Text>

      <FlatList
        data={chatHistory}
        renderItem={chatItem}
        style={styles.chatList}
      />

      <View style={styles.sendView}>
        <TextInput
          autoCorrect={false}
          style={styles.sendInput}
          onChangeText={setChatText}
          autoCapitalize={'none'}
        
        />
        <TouchableOpacity onPress={saveChat}>
          <View style={styles.iconShape}>
            <Icon name="send" size={20} color="#eef5fd" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  function profile() {
    var obj = {
      id: route.params.id,
      pic: route.params.pic,
    };

    navigation.navigate('Profile', obj);
  }

  function start() {
    setInterval(loadChatRequest, 5000);
  }

  useEffect(start, []);

  return ui;
}

//FlatList UI
function chatItem({item}) {
  const itemUI = (
    <View
      style={item.side == 'right' ? styles.chatViewRight : styles.chatViewLeft}>
      <Text style={item.side == 'right' ? styles.msg : styles.msgLeft}>
        {item.msg}
      </Text>
      <View style={styles.timeCheckView}>
        <Text style={item.side == 'right' ? styles.time : styles.timeLeft}>
          {item.time}
        </Text>
        {item.side == 'right' ? (
          <Icon
            name="check"
            size={12}
            style={
              item.status == 'seen'
                ? styles.checkIconSeen
                : styles.checkIconSent
            }
          />
        ) : null}
      </View>
    </View>
  );
  return itemUI;
}

const styles = StyleSheet.create({
  chatMainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  chatMainViewDark: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.darker,
  },
  mainImg: {
    color: '#090f17',
    fontSize: 33,
    paddingVertical: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    color: '#090f17',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom:18,
  },
  profileNameDark: {
    color: '#eef5fd',
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom:18,
  },

  //Chat History
  //Right
  chatViewRight: {
    backgroundColor: '#5896EB',
    alignSelf: 'flex-end',
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginRight: 10,
    marginLeft: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  msg: {
    color: '#eef5fd',
    fontSize: 20,
    paddingBottom: 2,
  },
  timeCheckView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  time: {
    fontSize: 12,
    color: '#eef5fd',
  },
  checkIconSent: {
    paddingLeft: 10,
    color: '#accbf5',
  },
  checkIconSeen: {
    paddingLeft: 10,
    color: '#233c5e',
  },

  //Left
  chatViewLeft: {
    backgroundColor: '#cde0f9',
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginRight: 100,
    borderRadius: 10,
    marginBottom: 10,
  },

  msgLeft: {
    color: '#47555c',
    fontSize: 15,
    paddingBottom: 2,
  },
  timeLeft: {
    color: '#47555c',
    fontSize: 12,
  },

  ////
  chatList: {
    width: '100%',
    paddingVertical: 10,
  },

  //send
  sendView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  sendInput: {
    borderStyle: 'solid',
    borderWidth: 2,
    width: '80%',
    height: 40,
    borderRadius: 50,
    borderColor: '#cde0f9',
    paddingLeft: 10,
    paddingRight: 10,
  },
  iconShape: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5896EB',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
});
