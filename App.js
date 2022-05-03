import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';

export default function App() {
  const [quote, setQuote] = useState('Loading...');
  const [author, setAuthor] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false)

  const randomQuote = async() => {
    setIsLoading(true)
    fetch(`https://api.quotable.io/random`)
    .then(res => res.json())
    .then(data => {
      setQuote(data.content)
      setAuthor(data.author)
      setIsLoading(false)
    })
  }

  const copyToClipboard = () => {
    Clipboard.setString(
      `${quote} - ${author}`
      )
    Snackbar.show({
      text: `Quote copied!`,
      duration: Snackbar.LENGTH_SHORT
    })
  }

  const tweetNow = () => {
    const url = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    Linking.openURL(url)
  }

  useEffect(() => {
    randomQuote();
  },[])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{width:'90%',backgroundColor:'#fff',borderRadius:20,padding:20}}>
        <Text 
          style={{
            textAlign:'center',
            fontSize:26,fontWeight:'600',
            color:'#333', 
            marginBottom:20
          }}>
            Quote of the Day</Text>
        <FontAwesome5 style={{fontSize:20,marginBottom:-15}} name="quote-left" color="#000" />
        <Text 
          style={{
            color:'#000',
            fontSize:16,
            lineHeight:26,
            letterSpacing:1.1,
            fontWeight:'400',
            textAlign:'center',
            marginBottom:10,
            paddingHorizontal: 30,
          }}>
            {quote}</Text>
        <FontAwesome5 style={{fontSize:20,textAlign:'right',marginTop:-20,marginBottom:20}} name="quote-right" color="#000" />
        <Text  
          style={{
            textAlign:'right',
            fontWeight:'100',
            fontStyle:'italic',
            fontSize:16,
            color:'#000000'
          }}
          >⎯⎯   {author}</Text>
        <TouchableOpacity onPress={() => { randomQuote()}} 
          style={{
            backgroundColor:isLoading ? 'rgba(83,114,240,0.7)' : 'rgba(83,114,240,1)',
            padding:20,
            borderRadius:30,
            marginVertical:20
            }}>
          <Text 
            style={{
              color:'#fff',
              fontSize:18,
              textAlign:'center'
            }}>{isLoading ? 'Loading...' : 'New Quote'}</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
            <TouchableOpacity onPress={() => {copyToClipboard()}} style={{borderWidth:2,borderColor:'#5372F0', borderRadius:50,padding:15}}>
              <FontAwesome name="copy" size={22} color="#5372F0" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {tweetNow()}} style={{borderWidth:2,borderColor:'#5372F0', borderRadius:50,padding:15}}>
              <FontAwesome5 name="twitter" size={22} color="#5372F0" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5372F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
