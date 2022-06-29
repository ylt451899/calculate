import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [textInput, setTextInput] = useState('')
  const [symbol, setSymbol] = useState('')
  const [printText, setPrintText] = useState('');
  const [total,setTotal] = useState(0);
  const buttonClick = (state,text) => {
    function count(){
        const numberFloat = parseInt(textInput);
        setTextInput('')
        if(symbol == ''){
            setTotal(total + numberFloat);
        }else if(symbol == '+'){
          setTotal(total + numberFloat);
        }else if(symbol == '-'){
          setTotal(total - numberFloat);
        }else if(symbol == '*'){
          setTotal(total * numberFloat);
        }else if(symbol == '/'){
          setTotal(total / numberFloat);
        }
        console.log(symbol)
    }

    setPrintText(printText + text);
    if(state == "number"){
      setTextInput(textInput + text)
    }else if(state == "symbol"){
        count()
        switch(text){
            case '+':
                setSymbol('+');
                break;
            case '-':
                setSymbol('-');
                break;
            case '*':
                setSymbol('*');
                break;
            case '/':
                setSymbol('/');
                break;
        }
    }else if(state == "equal"){
        count()
        console.log(symbol)
        setPrintText(printText)
    }else if(state == "clear"){
        setTextInput('');
        setSymbol('');
        setTotal(0);
        setPrintText('');
    }
    console.log(total.toString())
  }

  const createDigits = () => {
    const digits = [];
    for(let i=1;i<10;i++){
      digits.push(<TouchableOpacity style={styles.button} onPress={() => buttonClick("number",i.toString())}>
                      <Text style={styles.text}>{i.toString()}</Text>
                    </TouchableOpacity>)
    }
    return digits;
  }
  const createSymbol = () => {
    const symbol = [];
    const kind = ["+","-","*","/"];
    for(let i=0;i<kind.length;i++){
      symbol.push(<TouchableOpacity style={styles.buttonSymbol} onPress={() => buttonClick("symbol",kind[i])}>
                      <Text style={styles.text}>{kind[i]}</Text>
                    </TouchableOpacity>)
    }
    return symbol;
  }
  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} value = {`${printText}(${total.toString()})`}></TextInput>
      <View style={{flexDirection:'row'}}>
        {createSymbol()}
      </View>
      <View style={{flexDirection:'row'}}>
        {createDigits()[0]}{createDigits()[1]}{createDigits()[2]}
      </View>
      <View style={{flexDirection:'row'}}>
        {createDigits()[3]}{createDigits()[4]}{createDigits()[5]}
      </View>
      <View style={{flexDirection:'row'}}>
        {createDigits()[6]}{createDigits()[7]}{createDigits()[8]}
      </View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity style={styles.button} onPress={() => buttonClick("number","0")}>
          <Text style={styles.text}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonClick("clear","c")}>
          <Text style={styles.text}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => buttonClick("equal","=")}>
          <Text style={styles.text}>=</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    width:115,
    height:70,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  buttonSymbol:{
    width:86.25,
    height:60,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  textInput:{
    height:60, 
    width:345, 
    borderRadius:0, 
    borderColor:'black', 
    borderWidth:5, 
    backgroundColor:'black', 
    color:'white',
    fontSize:28, 
    textAlign:'center'
  },
  text:{
    textAlign:'center',
    fontSize:30,
    color:'white'
  }
});
