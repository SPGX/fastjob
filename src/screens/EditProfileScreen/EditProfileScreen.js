import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, Image, ActivityIndicator, Picker } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

import * as ImagePicker from 'expo-image-picker';

export default function EditProfileScreen({ navigation, route }) {

    const userID = route.params.user

    const [entities, setEntities] = useState([])
    const [entitiesContact, setEntitiesContact] = useState([])

    const [fullName, setFullName] = useState('')
    const [gender,setGender] = useState('')
    const [education,setEducation] = useState('')
    const [exp,setExp] = useState('')
    const [birth,setBirth] = useState('')

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
      };

    const onSaveButtonPress = () => {
        const updateDBRef = firebase.firestore().collection('users').doc(userID)
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        updateDBRef.update({
            image: image,
            fullName: fullName,
            gender: gender,
            exp: exp,
            education: education,
            createdAt: timestamp,
        });
        navigation.goBack();
    }

    return (
            <View>
                <TextInput
                    style={styles.buttoncss}
                    placeholder='ชื่อ-นามสกุล'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setFullName(text)}
                    value={fullName}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <Picker
                    style={styles.buttoncss}
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                    <Picker.Item label="ชาย" value="Male" />
                    <Picker.Item label="หญิง" value="Female" />
                </Picker>

                <Picker
                    style={styles.buttoncss}
                    selectedValue={education}
                    onValueChange={(itemValue, itemIndex) => setEducation(itemValue)}
                >
                    <Picker.Item label="Software Engineer" value="Software Engineer" />
                    <Picker.Item label="Computer Engineer" value="Computer Engineer" />
                    <Picker.Item label="Accounting" value="Accounting" />
                    <Picker.Item label="Tourism and Hotel" value="Tourism and Hotel" />
                    <Picker.Item label="Graphic Designer" value="Graphic Designer" />
                </Picker>
                <TextInput
                    style={styles.buttoncss}
                    placeholder='ประสบการณ์'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setExp(text)}
                    value={exp}
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
                            </View>
				</View>

                    <View style={{borderBottomColor:'white', borderBottomWidth: 0.8, marginVertical:10, marginTop: 10}}></View>

                        <View style={styles.entityButton}>
                            <View style={{alignItems: "center"}}>
                                <TouchableOpacity style={styles.button}onPress={onSaveButtonPress}>
                                    <Text style={styles.buttonText}>
                                        บันทึก
                                    </Text>
                                </TouchableOpacity>
                            </View>
					    </View>
                    </View>
    )
}
