import React from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export function ResetPasswordSuccess({navigation}) {
  const ui = (
    <SafeAreaView style={styles.main}>
      <ImageBackground
        source={require('./img/resetPasswordSuccess.jpg')}
        resizeMode="cover"
        blurRadius={4} style={styles.background}>
        <View style={styles.textView}>
          <Text style={styles.mainText}>Password Reset</Text>
          <Text style={styles.subText}>
            Your password has been reset successfully
          </Text>
          <Pressable style={styles.btn} onPress={()=>{
            navigation.navigate('Log In');
          }}>
            <Text style={styles.btnText}>Log In</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
  return ui;
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  background:{},
  img: {
    width: 200,
    height: 400,
  },
  textView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    gap:5,
  },
  mainText: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop:20,
    color:"#47555c"
  },
  subText: {
    fontSize: 15,
    color:"#98a0a4"
  },
  btn:{
    width: '80%',
    height: 50,
    backgroundColor: '#2c4b76',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:10,
  },
  btnText:{
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
