import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { firebase } from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, HomeScreen, RegistrationScreen, JobScreen, EditProfileScreen, ProfileScreen } from './src/screens'
import {decode, encode} from 'base-64'
import { Button } from 'react-native'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();


export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  if (loading) {
    return (
      <></>
    )
  }

  const profileButton = () => {
    return (
      <Button>
        
      </Button>
    )
  }  

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFC700',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        { user ? (
          <>
          <Stack.Screen name="Home" options={{ title: 'หน้าหลัก', headerTitleAlign: 'center' }}>
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen name="Job" component={JobScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'หน้าโปรไฟล์', headerTitleAlign: 'center'}} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'แก้ไขโปรไฟล์  ', headerTitleAlign: 'center'}} />
          {/* <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'เข้าสู่ระบบ', headerTitleAlign: 'center'}} />
            <Stack.Screen name="Registration" component={RegistrationScreen} options={{ title: 'สมัครสมาชิก', headerTitleAlign: 'center'}} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
