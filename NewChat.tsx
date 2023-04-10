import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, Pressable, Text, useColorScheme} from 'react-native';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export function NewChat({route,navigation}) {
  const [items, setItems] = useState([
    {
      pic: 'https://reactjs.org/logo-og.png',
      name: 'Yasith',
      msg: '',
      time: '9:39 PM',
      count: '20',
    },
  ]);

  //Load New Users
  async function loadUserList(text) {
    const userJsonText = await AsyncStorage.getItem('user');
    var form = new FormData();
    form.append('requestJSONText', userJsonText);
    form.append('text',text)

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

const isDarkMode = useColorScheme()=== 'dark';

const mainView = {
  flex: 1,
  alignItems: 'center',
  backgroundColor: isDarkMode?Colors.darker:Colors.white,
}

  const ui = (
    <SafeAreaView style={mainView}>
      <View style={isDarkMode?styles.searchInputViewDark:styles.searchInputView}>
        <TextInput style={styles.searxhInput} onChangeText={loadUserList} autoCapitalize='none' placeholder='Search..'/>
        <Icon
          name="search"
          size={20}
          color="#121e2f"
          style={styles.serachInputIcon}
        />
      </View>

      <FlatList data={items} renderItem={itemUI} />
    </SafeAreaView>
  );

  function itemUI({item}) {
    const ui = (
      <Pressable onPress={openChat}>
        {item.msg == '' ? (
          <View style={styles.itemMainView}>
            <Image
            source={{uri: 'http://localhost/chatAppAPI/'+item.pic}}
              style={styles.itemImg}
            />
            <View style={styles.view2}>
              <Text style={isDarkMode?styles.itemNameDark:styles.itemName}>{item.name}</Text>
              <Text style={styles.itemTitle}>New</Text>
            </View>
          </View>
        ) : null}
      </Pressable>
    );

    function openChat() {

      const obj ={
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
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white",
  },
  searchInputView: {
   marginVertical:20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#eff5fd',
    borderRadius:50,
  },
  searxhInput: {
    borderWidth: 0,
    width: '80%',
    height: 50,
    borderRadius: 50,
    paddingStart: 30,
    paddingEnd: 50,
  },
  searchInputViewDark: {
    marginVertical:20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#47555c',
    borderRadius:50,
  },
  serachInputIcon: {
    position: 'absolute',
    end: 30,
  },
  itemMainView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  view2: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    width: '60%',
  },
  itemName: {
    color: '#090f17',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  itemNameDark: {
    color: '#eef5fd',
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  itemTitle: {
    fontSize: 10,
    color: '#47555c',
  },
});
