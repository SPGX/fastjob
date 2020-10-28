import React, { useEffect,useState } from 'react'
import { Image, Text, Picker, TextInput, Button, TouchableOpacity, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../firebase/config'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Alert } from 'react-native';

import ImageResizer from 'react-native-image-resizer';

export default function RegistrationScreen({navigation}) {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [gender,setGender] = useState('')
    const [education,setEducation] = useState('')
    const [exp,setExp] = useState('')
    const [birth,setBirth] = useState('')
    const [image, setImage] = useState(null);

    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }

    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
            setImage(result.uri)
            const selectedPictureUri = result.uri
            .then(() => {
                Alert.alert("Success");
            })
            .catch((error) => {
                Alert.alert(error)
            })
        }
      };


    const onRegisterPress = () => {
        if (password !== confirmPassword) {
            alert("Passwords don't match.")
            return
        }
    
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    image: image,
                    id: uid,
                    email: email,
                    fullName: fullName,
                    gender: gender,
                    education: education,
                    exp: exp,
                };

                let newWidth = 40;
                let newHeight = 40;
                let compressFormat = 'PNG';
                let quality = 100;
                let rotation = 0;
                let outputPath = null;
                let imageUri = this.state.selectedPictureUri;
                ImageResizer.createResizedImage(
                imageUri,
                newWidth,
                newHeight,
                compressFormat,
                quality,
                rotation,
                outputPath,
                )
                .then((response) => {
                    // response.uri is the URI of the new image that can now be displayed, uploaded...
                    //resized image uri
                    let uri = response.uri;
                    //generating image name
                    let imageName = 'profile';
                    //to resolve file path issue on different platforms
                    let uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
                    //setting the image name and image uri in the state
                    this.setState({
                    uploadUri,
                    imageName,
                    });
                })
                .catch((err) => {
                    console.log('image resizing error => ', err);
                });

                firebase
                    .storage()
                    .ref(imageName)
                    .putFile(imageUri)
                    .then((snapshot) => {
                        //You can check the image is now uploaded in the storage bucket
                        console.log(`${imageName} has been successfully uploaded.`);
                    })
                    .catch((e) => console.log('uploading image error => ', e));

                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Home', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
                // var message = uri;
                // ref.putString(message, 'data_url').then(function(snapshot) {
                //     console.log('Uploaded a data_url string!');
                //     });
            })
            .catch((error) => {
                alert(error)
        });
    }

    

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView
                style={{ flex: 1, width: '100%' }}
                keyboardShouldPersistTaps="always">
                <TextInput
                    style={styles.input}
                    placeholder='ชื่อ-นามสกุล'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue) => setGender(itemValue)}
                >
                    <Picker.Item label="ชาย" value="Male" />
                    <Picker.Item label="หญิง" value="Female" />
                </Picker>

                <Picker
                    selectedValue={education}
                    style={styles.input}
                    onValueChange={(itemValue) => setEducation(itemValue)}
                >
                    <Picker.Item label="Software Engineer" value="Software Engineer" />
                    <Picker.Item label="Computer Engineer" value="Computer Engineer" />
                    <Picker.Item label="Accounting" value="Accounting" />
                    <Picker.Item label="Tourism and Hotel" value="Tourism and Hotel" />
                    <Picker.Item label="Graphic Designer" value="Graphic Designer" />
                </Picker>
                <TextInput
                    style={styles.input}
                    placeholder='ประสบการณ์'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setExp(text)}
                    value={exp}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder='อีเมล'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='รหัสผ่าน'
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#aaaaaa"
                    secureTextEntry
                    placeholder='ยืนยันรหัสผ่าน'
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.entityButton}>
                            <View style={{alignItems: "center"}}>
                                <TouchableOpacity style={styles.buttonimage}onPress={pickImage}>
                                    <Text style={styles.buttonText}>
                                        เลือกรูปภาพ
                                    </Text>     
                                </TouchableOpacity>
                                    <View>
                                        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 , marginTop: 10,}} />}
                                    </View>
                            
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => onRegisterPress()}>
                    <Text style={styles.buttonTitle}>ยืนยัน</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.footerText}>มีบัญชีแล้ว <Text onPress={onFooterLinkPress} style={styles.footerLink}>Log in</Text></Text>
                </View>
            </View>
            </View>
            </KeyboardAwareScrollView>
        </View>
    )
}
