import React, { Component } from 'react';
import { View, StyleSheet} from 'react-native';
import Voice from '@react-native-voice/voice';
import Header from './Header';
import ListItem from './ListItem';
import Tts from 'react-native-tts';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { debounce, _, difference, capitalize, trim } from "lodash";

class App extends Component {

  constructor(props) {
    super(props)
    this.getItem();
    this.getListItem();
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechError = this.onSpeechError;
    Voice.onSpeechResults = _.debounce(this.onSpeechResults, 1001);
    Voice.onSpeechEnd = this.onSpeechEnd;
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
    Tts.setDucking(true);
  }

  state = {
    error: "",
    results: [],
    wildcardData: "Shopping List",
    active: true,
    phrase: [],
  }

  onSpeechStart = (e) => {}
  onSpeechRecognized = (e) => {};
  onSpeechError = (e) => {};


  onSpeechEnd = () => {
    Voice.start('en-US')
  }



  onSpeechResults = (e) => {
    var list = [...this.state.results];
    var word = e.value[0].split(" ");
    oldLength = this.state.phrase.length
    currentPhrase = [];

    if(oldLength == 0){
      currentPhrase = word;
    }
    else{
      currentPhrase = word.slice(oldLength - word.length)
    }

    this.state.phrase = word;

    if(currentPhrase.length == 1){
      if(currentPhrase[0].toLowerCase() == "add"){
        Voice.stop()
        Tts.speak("Please say something after add")
        Voice.start("en-US")
      }
      else if(currentPhrase[0].toLowerCase() == "create"){
        Voice.stop()
        Tts.speak("Please say something after create")
        Voice.start("en-US")
      }
      else if(currentPhrase[0].toLowerCase() == "remove"){
        Voice.stop()
        Tts.speak("Please say something after remove")
        Voice.start("en-US")
      }
      else if(currentPhrase[0].toLowerCase() == "clear"){
        if(list.length !== 0){
          Voice.stop()
          Tts.speak("Removed all items")
          Voice.start("en-US")
          this.setState({results:[]});
          this.storeListItem(this.state.results);
        }
        if(list.length == 0){
          Voice.stop()
          Tts.speak("Nothing to remove")
          Voice.start("en-US")
        }
      }
    }

    else if(currentPhrase.length == 4 && currentPhrase.join(" ").toLowerCase() == "tell me my list"){
      if(list.length == 0){
        Voice.stop()
        Tts.speak("No items in list.")
        Voice.start("en-US")
      }
      else if(list.length !== 0){
        Voice.stop()
        list.map((item) => {
          setTimeout(() => {
            Tts.speak(item)
          }, 1000)
        })
        Voice.start("en-US")
      }
    }

    else if(currentPhrase.length >= 2){
      if(currentPhrase[0].toLowerCase() === "add"){
        var add = _.trim(currentPhrase.join(" ").slice(3))
        var UpCase = _.capitalize(add)

        if(list.includes(UpCase) === true){
          Voice.stop()
          Tts.speak("Word already in list")
          Voice.start("en-US")
        }

        else {
          this.setState({results:[...this.state.results, UpCase]});
          Voice.stop()
          Tts.speak("Added " + UpCase)
          Voice.start("en-US")
          this.storeListItem(this.state.results);
        }
      }

      else if(currentPhrase[0].toLowerCase() === "create"){
        var create = _.trim(currentPhrase.join(" ").slice(6))
        var CreateUp = _.capitalize(create)
        this.setState({ wildcardData: CreateUp });
        this.storeData(this.state.wildcardData);
        Voice.stop()
        Tts.speak("Name is " +  create )
        Voice.start("en-US")
      }

      else if(currentPhrase[0].toLowerCase() === "remove"){
        var remove = _.trim(currentPhrase.join(" ").slice(6))
        var removeUp = _.capitalize(remove)

        var item = list.indexOf(removeUp)

        if(list.includes(removeUp) === true){
          Voice.stop()
          Tts.speak("Removed " + removeUp)
          Voice.start("en-US")
          list.splice(item, 1);
          this.setState({results:list})
          this.storeListItem(this.state.results);
        }

        if(list.includes(removeUp) === false){
          Voice.stop()
          Tts.speak("Word not in list")
          Voice.start("en-US")
        }
      }
    }
  }

  activateDeactivateHandler = () => {
    this.setState({ active: !this.state.active });
    if(this.state.active){
      Voice.start('en-US')
    } else{
      Voice.stop()
      Voice.cancel()
      Voice.destroy()
      Voice.removeAllListeners()
      this.state.phrase = [];
    }
  };

  sayDelete = (index) => {
    var list = [...this.state.results]
    Voice.stop()
    Tts.speak("Removed " + list[index])
    Voice.start("en-US")
  }

  deleteListItem = (index) => {
    this.sayDelete(index)
    var list = [...this.state.results]
    list.splice(index,1);
    this.setState({ results:list })
    this.storeListItem(list);
  }


  storeData = async (value) => {
    try {
      await AsyncStorage.setItem('wildcard', value)
    } catch (e) {
      console.log(e)
    }
  }

  getItem = async () => {
    try {
      const value = await AsyncStorage.getItem('wildcard')
      if(value !== null) {
        this.setState({ wildcardData: value })
      }
    } catch(e) {
      console.log(e)
    }
  }

  storeListItem = async (value) => {
    try {
      await AsyncStorage.setItem('listItem', JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getListItem = async () => {
    try {
      const value = await AsyncStorage.getItem('listItem')
      let parsedValue = JSON.parse(value)
      if(value !== null) {
        this.setState({ results: parsedValue })
      }
    } catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <View style = {styles.blackscreen}>
        <Header heading={this.state.wildcardData} clicked={this.activateDeactivateHandler} active={this.state.active}/>
        <ListItem list={this.state.results} clicked = {this.deleteListItem}/>
      </View>
  );
  }}

const styles = StyleSheet.create({
  blackscreen : {
    backgroundColor: "#282C34",
  }
})

export default App;
