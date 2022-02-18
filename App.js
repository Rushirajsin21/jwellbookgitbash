import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, TouchableOpacity, _Text } from "react-native";

const App = () => {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");
  const changeDrawerPosition = () => {
    if (drawerPosition === "left") {
      setDrawerPosition("right");
    } else {
      setDrawerPosition("left");
    }
  };

  const navigationView = () => (
    <View 
        style={{
          alignItems:"flex-start",
        }}
     >
      <TouchableOpacity
        style={{
          backgroundColor:"#4A0E0E",
          width:60,
          padding:10,
          borderRadius:10,
          alignItems:"center",

        }}
          onPress={() => drawer.current.closeDrawer()}>
            <Text style={{color:"white"}}>close</Text>
          </TouchableOpacity>
          <View style={{backgroundColor:"#4A0E0E",
                    width:100,
                    
        
              
                      }}>

          </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={drawerPosition}
      renderNavigationView={navigationView}
    >
      <View style={{
        alignItems:"flex-start"
      }}>
        
       
        
        <TouchableOpacity style={{
          backgroundColor:"#4A0E0E",
          width:50,
          padding:10,
          borderRadius:10,
          alignItems:"center",

        }}
        onPress={()=>drawer.current.openDrawer()}>
          <Text style={{color:"white", fontSize:20}}>=</Text>
        </TouchableOpacity>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  }
});

export default App;