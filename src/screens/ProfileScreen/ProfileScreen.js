import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function ProfileScreen({ navigation, route }) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const user = route.params.user

    const entityRef = firebase.firestore().collection('users').where(firebase.firestore.FieldPath.documentId(), '==', user)


    useEffect(() => {
        entityRef
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
            );
    }, [])

    const renderEntity = ({item}) => {
        return (
            <View style={styles.container}>
                <View style={{ alignItems: 'center'}}>
                    <Image
                                source={{ uri: item.image }}
                                style={{ width: 250, height: 250 }}
                                PlaceholderContent={<ActivityIndicator />}
                                />
                </View>

                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 30, fontWeight: "bold",}}>
                        ข้อมูลส่วนตัว
                    </Text>
                </View>

            <View style={styles.formContainer}>

            <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D5D2D2',}}></View>
                <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D5D2D2'}}>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            ชื่อ
                        </Text>
                    </View>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            {item.fullName}
                        </Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D5D2D2'}}>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            เพศ
                        </Text>
                    </View>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            {item.gender}
                        </Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D5D2D2'}}>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            การศึกษา
                        </Text>
                    </View>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            {item.education}
                        </Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: '#D5D2D2'}}>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            ประสบการณ์
                        </Text>
                    </View>
                    <View style={{ width: '50%', marginTop: 10,marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: "bold", marginVertical: 5, marginTop: 5}}>
                            {item.exp}
                        </Text>
                    </View>
                </View>
               
            </View>

                    <View style={{borderBottomColor:'white', borderBottomWidth: 0.8, marginVertical:10, marginTop: 10}}></View>

                <View style={styles.entityButton}>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity 
                            style={styles.button} 
                            onPress={() =>
                                navigation.navigate(
                                    'EditProfile',
                                    { user: user }
                            )}>
                            <Text style={styles.buttonText}>แก้ไขโปรไฟล์</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
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
    )
}
