import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Pressable, TextInput, useColorScheme} from 'react-native';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function Home({navigation}) {
  const [items, setItems] = useState([
    {
      pic: 'https://reactjs.org/logo-og.png',
      name: 'Sandesh1',
      msg: "You're welcome",
      time: '9:39 PM',
      count: '20',
    },
  ]);

  // console.log(items[0].name);

  //Load Chat Users
  async function loadUserList(text) {
    const userJsonText = await AsyncStorage.getItem('user');
    var form = new FormData();
    form.append('requestJSONText', userJsonText);
    form.append('text',text);

    fetch('http://localhost/chatAppAPI/loadUsers.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    })
      .then(response => response.json())
      .then(json => {
        setItems(json);
      })
      .catch(error => console.log(error));
  }
  function start(){
    loadUserList("");
  }
  useEffect(start,[]);

  const isDarkMode = useColorScheme() === 'dark';

  const background = {
    backgroundColor: isDarkMode? Colors.darker:Colors.white,
    flex: 1,
    alignItems: 'center',
    gap: 30,
  };

  const ui = (
    <SafeAreaView style={background}>
      <View style={styles.topView}>
        <Text style={isDarkMode? styles.mainTextDark:styles.mainText1}>Messages</Text>
        <Pressable style={styles.btnViewCricle} onPress={SettingBtn}>
          <Icon name="more-v-a" size={20} color="#eef5fd" style={styles.btn} />
        </Pressable>
      </View>

      <View style={isDarkMode?styles.searchInputViewDark:styles.searchInputView}>
        <TextInput autoCorrect={false} style={styles.searchInput} placeholder={'Search'} onChangeText={loadUserList} autoCapitalize={"none"}/>
        <Icon
          name="search"
          size={20}
          color="#121e2f"
          style={styles.serachInputIcon}
        />
      </View>

      <FlatList data={items} renderItem={itemUI} />

      <Pressable style={styles.newChatIconShape} onPress={newChat}>
        <Icon name="commenting" size={20} color="#eef5fd" />
      </Pressable>
    </SafeAreaView>
  );

  async function SettingBtn() {

    var logUserDataJsonObj = await AsyncStorage.getItem('user');
    var logUserJsObj = JSON.parse(logUserDataJsonObj);


    navigation.navigate('Settings',logUserJsObj);
  }

  function newChat() {
    navigation.navigate('New Chat');
  }

  function itemUI({item}) {
    const ui = (
      <Pressable onPress={chatNavigation}>
        {item.msg !== '' && item.rstatus == '0' ? (
          <View style={isDarkMode?styles.mainItemViewDark:styles.mainItemView}>
            <Image source={{uri: 'http://localhost/chatAppAPI/'+item.pic}} style={styles.itemProfileImage} />
            <View style={styles.itemView1}>
              <Text style={isDarkMode?styles.itemNameDark:styles.itemName}>{item.name}</Text>
              <Text style={isDarkMode?styles.itemMsgDark:styles.itemMsg}>{item.msg}</Text>
            </View>
            <View style={styles.itemView2}>
              <Text style={isDarkMode?styles.itemTimeDark:styles.itemTime}>{item.time}</Text>
              <View style={styles.itemShape}>
                <Text style={styles.itemCount}>{item.count}</Text>
              </View>
            </View>
          </View>
        ) : null}
      </Pressable>
    );

    function chatNavigation() {
  
      fetch('http://localhost/chatAppAPI/loadUsers.php?id='+ item.id,{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response=>response.json())
      .then(json=>{
        Alert.alert("mm",JSON.parse(json));
      })
      .catch(error=>console.log(error));

      const obj ={
        key:'2',
        name:item.name,
        id:item.id,
        pic:item.pic,
      }

      navigation.navigate('Chat',obj);
    }

    return ui;
  }

  return ui;
}


const styles = StyleSheet.create({
  homeMainView: {
    flex: 1,
    alignItems: 'center',
    gap: 30,
    backgroundColor:"white",
  },
  mainText1: {
    fontSize: 30,
    paddingRight: 20,
  },
  mainTextDark: {
    fontSize: 30,
    paddingRight: 20,
    color: '#eef5fd',
  },
  searchInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#eff5fd',
    borderRadius:50,
  },
  searchInputViewDark: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#47555c',
    borderRadius:50,
  },
  searchInput: {
    borderWidth: 0,
    borderRadius: 50,
    width: '80%',
    height: 50,
    paddingStart: 30,
    paddingEnd: 50,
  },
  serachInputIcon: {
    position: 'absolute',
    end: 30,
  },
  mainItemView: {
    flexDirection: 'row',
    width: '90%',
    paddingVertical: 20,
    backgroundColor: '#cde0f9',
    borderRadius: 30,
    marginBottom: 10,
  },
  mainItemViewDark: {
    flexDirection: 'row',
    width: '90%',
    paddingVertical: 20,
    backgroundColor: '#47555c',
    borderRadius: 30,
    marginBottom: 10,
  },
  itemProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  itemView1: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '55%',
  },
  itemName: {
    color: '#090f17',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  itemNameDark: {
    color: '#eef5fd',
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  itemMsg: {
    fontSize: 15,
    color: '#47555c',
  },
  itemMsgDark: {
    fontSize: 15,
    color: '#eef5fd',
  },
  itemView2: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '30%',
  },
  itemTime: {
    color: '#47555c',
    fontSize: 15,
    paddingBottom: 5,
  },
  itemTimeDark: {
    color: '#eef5fd',
    fontSize: 15,
    paddingBottom: 5,
  },
  itemShape: {
    backgroundColor: '#5896EB',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  itemCount: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  btn: {},
  topView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 40,
  },
  btnViewCricle: {
    backgroundColor: '#47555c',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },

  newChatIconShape: {
    position: 'absolute',
    backgroundColor: '#47555c',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 60,
  },
});
