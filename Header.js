import React from 'react';
import Mic from "react-native-vector-icons/dist/MaterialIcons"
import MicOff from "react-native-vector-icons/dist/Octicons"
import { View, StyleSheet , Text, SafeAreaView, StatusBar, TouchableHighlight } from 'react-native';

const Header = (props) => (
    <SafeAreaView>
      <StatusBar barStyle={"light-content"}/>
      <View style = {styles.container}>
          <Text style = {styles.text}>{props.heading}</Text>
          { props.active ? <TouchableHighlight underlayColor="red" style={styles.micOff} onPress={props.clicked} ><MicOff name="mute" color="black" size={40}/></TouchableHighlight> : <TouchableHighlight underlayColor="green" onPress = {props.clicked} style={styles.micOn}><Mic name="keyboard-voice" color="black" size={45} /></TouchableHighlight> }
      </View>
    </SafeAreaView>


);


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#292Z34',
    borderBottomColor: '#1a1a1a',
    borderBottomWidth: 2,
    paddingBottom: 20,
  },
    
  text: {
    color: 'white',
    fontSize: 40,
    textAlign: 'left',
    paddingLeft: 15,
    paddingTop: 20,
    fontWeight: "bold",
  },

  micOff: {
    borderRadius: 50,
    padding: 14,
    width: 70,
    backgroundColor: 'red',
    justifyContent: 'center',
    textAlign: "center",
    marginTop: 9.5,
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 15,
    
  },
  micOn: {
    borderRadius: 50,
    padding: 12,
    backgroundColor: 'green',
    justifyContent: 'center',
    textAlign: "center",
    marginTop: 9.5,
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 15,
  },
  
  });

export default Header;
