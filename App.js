import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Button, DrawerLayoutAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { openDatabase } from 'react-native-sqlite-storage';




const Stack = createNativeStackNavigator();
var db=openDatabase({
  name:'jwellbook.db',
});
const App = () => {
  return (
      
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home ">
    <Stack.Screen
        name="Home"
        component={Home}          
      />
      <Stack.Screen
        name="Accounts"
        component={Accounts}         
      />
    </Stack.Navigator>
    
    </NavigationContainer>
  );
};
const Accounts=({navigation})=>{
  const [Name,setName] = useState('');
  const [AccountGroupName,setAccountGroupName]=useState('');
  const [Mobile,setMobile]=useState('');
  const [Whatsappno,setWhatsappno]=useState('');
  const [Email,setEmail]=useState('');
  const [Website,setWebsite]=useState('');
  const [Address,setAddress]=useState('');
  const [Open_Gold,setOpeninGold]=useState('');
  const [Open_Silver,setOpeninSilver]=useState('');
  const [Open_Amount,setOpeninAmount]=useState('');

  useEffect(()=>{

    db.transaction(function(txns)
    {
      txns.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='accounts' ",[],
      function(txns,res)
      {
        console.log("item:",res.rows.length);
            
        if(res.rows.length == 0)
        {
          console.log("item:",res.rows.length);
          txns.executeSql("CREATE TABLE IF NOT EXISTS accounts (name VARCHAR(30), account_group VARCHAR(30), mobile INTEGER, whatsappno INTEGER, email VARCHAR(30), website VARCHAR(30), address VARCHAR(30) , open_gold VARCHAR(30) , open_silver VARCHAR(30), open_amount VARCHAR(30))",[],
            function(_txns,res1){
              if(res1.rowsAffected>0){
                console.log("Result:",res1.rowsAffected);
                console.log("Item:",res.rows.length);
                Alert.alert("Table",res.rows.length);
              }
              console.log("item:",res.rows.length);

            });
        }
      });
    });
  },[]);

  const insertData = () => {
    if(Name =='' || AccountGroupName == '' || Mobile ==''|| Whatsappno =='' || Email=='' || Website=='' || Address=='' ){
      Alert.alert("Please Enter All Values");
  
    }
    else{
      db.transaction(function(tx) {
        tx.executeSql("INSERT INTO accounts (name,account_group,mobile,whatsappno,email,website,address,open_gold,open_silver,open_amount) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [Name, AccountGroupName, Mobile, Whatsappno, Email, Website, Address,Open_Gold,Open_Silver,Open_Amount],
        function(_tx,res2){
          console.log("results",res2.rowsAffected)
          if(res2.rowsAffected>0){
            Alert.alert("Account added");   
            setName('');
            setAccountGroupName('');
            setMobile('');
            setWhatsappno('');
            setEmail('');
            setWebsite('');
            setAddress('');
            setOpeninGold('');
            setOpeninSilver('');
            setOpeninAmount('');
  
  
          }
          else{
            Alert.alert("Failed add account");
          }
  
        });
      });
    }
  }
  return(
    <View>
       <ScrollView style = {stylestwo.container}>

<TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Name"
   placeholderTextColor = "gray"
      autoCapitalize = "none"

   onChangeText={(text)=>setName(text)}
   value={Name}
   />

    <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = " Account Group Name"
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setAccountGroupName(text)}
   value={AccountGroupName}
   />

  <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Mobile No"
   placeholderTextColor = "gray"              
   autoCapitalize = "none"
   keyboardType={'numeric'}
   onChangeText={(text)=>setMobile(text)}
   value={Mobile}
   />  

<TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  WhatsApp No."
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setWhatsappno(text)}
   value={Whatsappno}
   />

 

 

  

 <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Email"
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setEmail(text)}
   value={Email}
   
   />

  <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Website"
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setWebsite(text)}
   value={Website}
   />

   <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Address"
   placeholderTextColor = "gray"
   multiline={true}
   
   autoCapitalize = "none"
   onChangeText={(text)=>setAddress(text)}
   value={Address}
   

   />
   <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Opening Balance in Gold"
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setOpeninGold(text)}
   value={Open_Gold}
   />
    <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Opening Balance in Silver"
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setOpeninSilver(text)}
   value={Open_Silver}
   />
   <TextInput style = {stylestwo.input}
   underlineColorAndroid = "transparent"
   placeholder = "  Opening Balance in Amount"
   placeholderTextColor = "gray"
   autoCapitalize = "none"
   onChangeText={(text)=>setOpeninAmount(text)}
   value={Open_Amount}
   />


 <View>
     
 </View>



<TouchableOpacity
   style = {stylestwo.submitButton}
   onPress = {insertData}
   >
   <Text style = {stylestwo.submitButtonText}>Add </Text>
</TouchableOpacity>

<TouchableOpacity
   style = {stylestwo.closeButton}
   onPress = {()=>{navigation.navigate(Home)}
      
   }>
   <Text style = {stylestwo.closeButtonText}> Close </Text>
</TouchableOpacity>         
</ScrollView>
    </View>
  );
}
const Home=({navigation})=>{
  const drawer = useRef(null);
  const [masterpress,setMasterpress]=useState(false);
  const [reportpress,setReportpress]=useState(false);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };
  
  
  

  const navigationView = () => (
      <ScrollView>
       
    <View style={[styles.container, styles.navigationContainer]}>
      <TouchableOpacity
        onPress={() => drawer.current.closeDrawer()}
        style={{

          backgroundColor:"#4A0E0E",
          borderRadius:10,

          padding:10,
          width:55,
        }}
      >
        <Text style={{color:"white"}}>close</Text>
      </TouchableOpacity>
      <View style={{
          backgroundColor:"#4A0E0E",
          width:270,
          height:"100%",
          marginTop:3,
          borderBottomLeftRadius:10,
          alignItems:"baseline",}}>
                <TouchableOpacity
                  onPress={()=>setMasterpress(!masterpress)}
                >

                <Text style={{
                  color:"white",
                  fontSize:20,
                  padding:10,
                  
                }} >Master ^</Text>
                </TouchableOpacity>
                { masterpress ? (
                  <>
                <TouchableOpacity
                   
                   onPress={()=>{navigation.navigate(Accounts)}}>



                

                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                    }} 
                    >Accounts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                                >

                  <Text style={{
                    color:"white",
                    fontSize:15,
                    padding:0,
                    marginLeft:60,
                    alignItems:"flex-end"
                    }} >Contact Import</Text>
              </TouchableOpacity>
              <TouchableOpacity
                >

                  <Text style={{
                    color:"white",
                    fontSize:15,
                    padding:0,
                    marginLeft:60,
                    alignItems:"flex-end"
                    }} >Opening Stock</Text>
              </TouchableOpacity>
                    </>
                ) :null
                  }
                <TouchableOpacity
                >

                <Text style={{
                  color:"white",
                  fontSize:20,
                  padding:10,
                }} >Sell/Purchase</Text>
                </TouchableOpacity>
                <TouchableOpacity
                >

                <Text style={{
                  color:"white",
                  fontSize:20,
                  padding:10,
                }} >Cashbook</Text>
                </TouchableOpacity>
              
                <TouchableOpacity
                  onPress={()=>setReportpress(!reportpress)}
                >

                <Text style={{
                  color:"white",
                  fontSize:20,
                  padding:10,
                  
                }} >Reports ^</Text>
                </TouchableOpacity>
                {reportpress?(
                  <>
                  <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                      }} >Outstanding</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                      }} >Ledger</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                      }} >Balance Sheet</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                      }} >Stock Status</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                      }} >Gold Bullion</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:15,
                      padding:0,
                      marginLeft:60,
                      alignItems:"flex-end"
                      }} >Silver Bullion</Text>
                </TouchableOpacity>
                      </>
                ):null

                }
                 <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:20,
                      padding:10,
                      alignItems:"baseline"
                      }}
                      
                      >Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:20,
                      padding:10,
                      alignItems:"baseline"
                      }} >Support</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  >
            
                    <Text style={{
                      color:"white",
                      fontSize:20,
                      padding:10,
                      
                      alignItems:"flex-start"
                      }} >Profile</Text>
                </TouchableOpacity>
                
        </View>
    </View>
        </ScrollView>
  );

    return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <View style={styles.container}>
          
          
          <TouchableOpacity 
          
            onPress={() => drawer.current.openDrawer()}
            style={{
              backgroundColor:"#4A0E0E",
              padding:10,
              width:51,
              borderRadius:10,
              alignItems:"center"

            }}
          >
              <Text style={{color:"white"}}>=</Text>
          </TouchableOpacity>
          
      </View>
    </DrawerLayoutAndroid>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "baseline",
    justifyContent: "flex-start",
    padding: 16
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
    height:"100%"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});
const stylestwo = StyleSheet.create({
  container: {
     paddingTop: 0,
     marginTop:0,

  },

  input: {
      alignContent:'center',
      borderRadius:5,
      width:300,
      margin: 10,
      
      marginLeft:30,
      height: 30,
      borderColor: '#7a42f4',
      borderWidth: 1,
      borderColor:'#4A0E0E',
  },

  submitButton: {
     width:180,
     marginLeft:160,
     backgroundColor: '#7a42f4',
     marginTop:30,
     padding: 10,
     margin: 15,
     borderRadius:5,
     height: 44,
     backgroundColor:'#4A0E0E'
  },
  submitButtonText:{
     color: 'white',
     textAlign:'center',
     fontSize:18
  },

  closeButton: {
   width:70,
   marginLeft:70,
   marginTop:-58,
   borderRadius:5,
   padding: 10,
   margin: 15,
   height: 44,
   backgroundColor:'#6C757D'
},
closeButtonText:{
   color: 'white',
   textAlign:'center',
   fontSize:18
}
});

const styles1 = StyleSheet.create({
  container1: {
    width:'86%',
    height:'59%',
    marginTop:-5,
    marginLeft:27,
    borderRadius:5,
    
    backgroundColor:'#4A0E0E',
    
  },

  registerButton: {
     width:180,
     marginLeft:88,
     marginTop:-275,
       backgroundColor: '#7a42f4',
       padding: 10,
       borderRadius:5,
       margin: 20,
       height: 40,
     
       backgroundColor:'#690A0A'
    },
    registerButtonText:{
       color: 'white',
       textAlign:'center',
       fontSize:18
    },
    forgotButton: {
     width:250,
     marginLeft:58,
     marginTop:-8,
       backgroundColor: '#7a42f4',
       padding: 10,
       borderRadius:5,
       margin: 15,
       height: 48,
       borderWidth:2,
     borderColor:'#690A0A',
       backgroundColor:'#4A0E0E'

    },
    forgotText:{
       color: 'white',
       textAlign:'center',
       fontSize:18
    }
    
    
    

    


 
});




export default App;