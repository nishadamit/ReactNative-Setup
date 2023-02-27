import React,{useState} from 'react';
import {View, TextInput, Text, StyleSheet,Button, TouchableOpacity, ActivityIndicator, Image} from 'react-native';
import axios from 'axios';
import md5 from 'md5'
import { height, width} from '../utils/Dimensions';

const websiteKey = 'D21B2DBA59F52167BEBFF2484DAFB'
const websiteMsaSalt = 'CoLo&Mi!2021'

// https://qa-apigateway.extramarks.com/cognito-login-service/auth/login?v=2

const styles = StyleSheet.create({
    container: {
       width: width,
       height: height,
       flex: 1,
       alignItems: 'center',
      marginTop: height * 0.045
    },
    logocontainer:{
        height: height * 0.2,
        width: width,
        // backgroundColor:"#000000",
        alignItems: 'flex-end',
    },
    container2:{
      width:width*0.4,
      height: height * 0.2,
      backgroundColor:"#f2c6b7",
      borderBottomLeftRadius: 200,
      alignItems: 'flex-end'
    },
    container3:{
      width:width*0.3,
      height: height * 0.15,
      backgroundColor:"#ec977a",
      borderBottomLeftRadius: 200,
      alignItems: 'flex-end'
    },
    container4:{
      width:width*0.2,
      height: height * 0.1,
      backgroundColor: "#df5c2f",
      borderBottomLeftRadius: 200,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      marginTop: height * 0.1,
      alignItems:'center'
    },
    header:{
      fontWeight: 'bold',
      fontSize: 30,
      color:"#0E0E10",
      opacity: 0.7
   },
   text1:{
          fontSize:20
   },
   input: {
     height: 40,
     margin: 12,
     borderWidth: 1,
     padding: 10,
     width: width * 0.8,
     borderRadius: 5
   },
   button:{
       width: width * 0.8,
       // borderWidth: 1,
       backgroundColor: "#f45e29",
       borderRadius: 5,
       height: height * 0.07
   },
   buttonText:{
       textAlign: 'center',
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       color: "#fff",
       fontWeight: 'bold',
       fontSize: 20,
       marginTop: 10
   },
  });
  
const Login = ({navigation}) => {

    console.log("navigation",navigation.navigate)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);

  const getChecksum = (action, username, password) => {
    let checksum = md5(`${action}:${websiteKey}:${username}:${password}:${websiteMsaSalt}`);
    return checksum
  }


  const login = async() =>{
    //   navigation.navigate('Dashboard')

    try {
        setLoader(true)
        let url = 'https://qa-apigateway.extramarks.com/cognito-login-service/auth/login?v=2'
        let data = {
            action: "cognito_login",
            apikey: websiteKey,
            checksum: getChecksum("cognito_login", username, password),
            login_details: {
              username: username,
              password: password,
              app_name: 'CRM',
              acess_id: "",
              // access_type:"",
              app_version: "",
              gcm_key: "",
              email_address: "",
              latitude: "",
              longitude: "",
              operating_system_version: 10,
              source: "crm"
            },
            refresh_token: ""
          };

        //   console.log(data)
        
        const response = await axios.post(url,data);

        if(response?.data?.message === "User logged in successfully"){
          navigation.navigate('Dashboard')
        }
        // console.log("response",response.data);
    } catch (error) {
        console.log(error)
    }finally{
       setLoader(false);
       setUsername('');
       setPassword('')
    }


  }

  return (
    <View style={styles.container}>
        <View style={styles.logocontainer}>
             <View style={styles.container2}>
                 <View style={styles.container3}>
                  <View style={styles.container4}>
                    <Image source={require("../assets/logo.png")} style={{zIndex: 100000}}/>
                  </View>
                 </View>
             </View>
        </View>
        <View style={styles.formContainer}>
            <Text style={styles.header}>Sign In</Text>
            <Text style={styles.text1}>Enter Details below</Text>
            <TextInput 
                  style={styles.input}
                  onChangeText={setUsername}
                  value={username}
            />
            <TextInput 
                  style={styles.input}
                  onChangeText={setPassword}
                  value={password}
            />
            <TouchableOpacity onPress={login}>
                <View style={styles.button}>
                    {
                        loader ? 
                        <ActivityIndicator />
                        :
                        <Text style={styles.buttonText}>Sign In</Text>
                    }
                </View>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Login

// #ec977a
// #df5c2f