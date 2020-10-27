import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, ActivityIndicator, Image, ScrollView } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen(props) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const entityRef = firebase.firestore().collection('CompanyEntities')
    const contactRef = firebase.firestore().collection('CompanyContact')
    const userID = props.extraData.id

    const navigation = useNavigation();

    useEffect(() => {
        entityRef
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const userSignOut = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
        }).catch(function(error) {
            // An error happened.
        });
        Updates.reload();
    }


    const renderEntity = ({item}) => {

        return (
        <View>
               
                <View style={styles.container}>
                    <View style={styles.entityButton}>
                        <TouchableOpacity                             
                                    onPress={() =>
                                    navigation.navigate(
                                        'Job',
                                        { id: item.id, user: userID, company: item.authorID }
                                        )
                                    }>
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 80, height: 80 ,marginLeft: 10}}
                                PlaceholderContent={<ActivityIndicator />}
                                />
                            {/* <Text style={styles.buttonText}>Apply</Text> */}
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={{fontSize: 15, fontWeight: "bold"}}>
                            {item.text}
                        </Text>
                        <Text>
                            จังหวัด: {item.Profit}
                        </Text>
                        <Text>
                            ตำแหน่ง: {item.job}
                        </Text>
                        {/* <Text>
                            รายละเอียด {item.description}
                        </Text> */}
                        <Text>
                            รายได้: {item.Profit}
                        </Text>
                    </View>
                    <View style={styles.entityButton}>
                        <TouchableOpacity 
                                style={styles.button} 
                                onPress={() =>
                                    navigation.navigate(
                                        'Job',
                                        { id: item.id, user: userID, company: item.authorID }
                                        )
                                    }>
                            <Text style={styles.buttonText}>เยี่ยมชม</Text>
                        </TouchableOpacity>
                    </View>
                </View>   
               
        </View>
        )
    }

    return (
    <ScrollView>
        <View>
            <View> 
                <View>            
                    <View style={{ alignItems: 'center'}}>
                        <Image
                            style={{ width: 380, height: 150, marginVertical: 5}}
                            source={{
                            uri: 'https://scontent.fbkk5-6.fna.fbcdn.net/v/t1.0-0/p600x600/117843750_3663876400289894_4502009832578628223_o.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_eui2=AeF0BcB4Umj_SDwFPqwpnbJUNWkyZ7duZ7o1aTJnt25nuhZY37686YanuMMOUdWTVwQUnztw0dWyjumpdqTqalBl&_nc_ohc=M1MTUe04J_kAX9U1DfW&_nc_ht=scontent.fbkk5-6.fna&tp=6&oh=4f36c04fd8af0c4cbb74ab0145295f7a&oe=5FB9EF52',
                            }}
                        />              
                    </View>
                </View>

                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>                
                    <View style={styles.entityButton}>
                        <TouchableOpacity style={styles.button} 
                            onPress={() =>
                                navigation.navigate(
                                    'Profile',
                                    { user: userID }
                                )}
                            >
                            <Text style={styles.buttonText}>
                                โปรไฟล์
                            </Text>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity style={styles.button} 
                                onPress={userSignOut}
                                >
                                <Text style={styles.buttonText}>
                                    ออกระบบ
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </View>
                    { entities && (
                        <View>
                            
                                <View>                      
                                    <FlatList 
                                        data={entities}
                                        renderItem={renderEntity}
                                        keyExtractor={(item) => item.id}
                                        removeClippedSubviews={true}
                                    />                           
                                </View>
                            
                        </View>
                        
                    )}
            </View>
        </ScrollView>
    )
}
