import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Pressable, Text, View, useColorScheme} from 'react-native';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Data ={
  name:string,
  about:string,
  mobile:string,
  email:string,
  country:string,
}


export function Profile({route, navigation}) {
  const [userData, setUserData] = useState<Data[]>([
    {
      name: 'Yasith Sandseh',
      about: 'Good',
      mobile: '0785640111',
      email: 'yayayaya',
      country: 'Sri Lanka',
    },
]);

  //Load User Data
  function loadUserData() {
    fetch(
      'http://localhost/chatAppAPI/userDataLoad.php?userId=' + route.params.id,
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
        setUserData(json);
      })
      .catch(error => console.log(error));
  }
  useEffect(loadUserData, []);

  const dark = useColorScheme() === 'dark';


  //main UI
  const ui = (
    <SafeAreaView style={dark?styles.mainViewDarke:styles.mainView}>
      <View style={styles.imgView}>
        <Image
          source={{uri: 'http://localhost/chatAppAPI/' + route.params.pic}}
          style={styles.mainImg}
        />
      </View>

      <FlatList data={userData} renderItem={userDataUI} />

    </SafeAreaView>
  );
  return ui;

  function userDataUI({item}) {
    const ui = (
      <View style={styles.flatlistView}>
        <View style={styles.viewBoxAbout}>
          <Text style={dark?styles.nameDarke:styles.name}>{item.name}</Text>
          <Text style={styles.title}>{item.about}</Text>
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>{item.mobile}</Text>
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>{item.email}</Text>
        </View>
        <View style={styles.viewBox}>
          <Text style={styles.title}>{item.country}</Text>
        </View>
      </View>
    );
    return ui;
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:"white",
  },

  mainViewDarke: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.darker,
  },
  
  
  imgView: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  name: {
    color: '#090f17',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  nameDarke: {
    color: '#eef5fd',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 15,
  },
  viewBox: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d6d8',
    marginBottom: 10,
    width: '100%',
    height: 50,
    borderRadius: 10,
    padding:10,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4c5358',
  },
  viewBoxAbout: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 30,
    height: 50,
    rowGap: 5,
  },

  flatlistView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
