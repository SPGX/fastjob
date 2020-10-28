import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function JobScreen({ navigation, route }) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const user = route.params.user
    const itemId = route.params.id
    const company = route.params.company

    const entityRef = firebase.firestore().collection('CompanyEntities').where(firebase.firestore.FieldPath.documentId(), '==', itemId)
    const contactRef = firebase.firestore().collection('CompanyContact')


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
            )
    }, [])

    const onAddButtonPress = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            companyID: company,
            userID: user,
            itemID: itemId,
            createdAt: timestamp,
        };
        contactRef
            .add(data)
            .then(_doc => {
                setEntityText('')
                Keyboard.dismiss()
                
            })
            .catch((error) => {
                alert(error)
            });
        
    }

    const renderEntity = ({item}) => {
        return (
            
            <View style={styles.entityButton}>
                <View style={styles.container}>
                    
                    <View style={{ alignItems: 'center'}}>
                        <Image
                            source={{ uri: 'https://www.sansiri.com/images_2014/investor/corporate-info/img-main.jpg' }}
                            style={{ width: 250, height: 250 }}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </View>
            
                    {/* <View style={styles.entityButton}>
                        <Image
                                    source={{ uri: item.image }}
                                    style={{ width: 100, height: 100 }}
                                    PlaceholderContent={<ActivityIndicator />}
                        /> */}
                </View>

                <View style={styles.formContainer}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            {item.text}
                        </Text>
                        <Text style={{fontWeight: "bold"}}>
                            จังหวัด:
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            {item.province}
                        </Text>
                        <Text style={{fontWeight: "bold"}}>
                            ที่อยู่:
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            {item.address}
                        </Text>
                        {/* <Text style={{fontWeight: "bold"}}>
                            รายได้: {item.Profit}
                        </Text> */}
                        <Text style={{fontWeight: "bold"}}>
                            รายละเอียด:
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            {item.description}
                        </Text>
                </View>            
                    {/* <View style={styles.formContainer3}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            คุณสมบัติผู้สมัคร
                        </Text>
                    </View> */}

                    {/* <View style={styles.formContainer2}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            ประสบการณ์
                        </Text>
                        <Text style={{fontWeight: "bold"}}>
                            + {item.requitment}
                        </Text>
                    </View> */}

                    <View style={styles.formContainer2}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            ตำแหน่งงาน
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            + {item.job}
                        </Text>
                    </View>

                    <View style={styles.formContainer2}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            ทักษะ
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            + {item.requirement}
                        </Text>
                        
                    </View>

                    <View style={styles.formContainer2}>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>
                            รายได้
                        </Text>
                        <Text style={{ marginLeft: 20 }}>
                            + {item.Profit} บาท
                        </Text>
                    </View>
                

                <View style={styles.entityButton}>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.button} onPress={onAddButtonPress}>
                            <Text style={styles.buttonText}>สมัคร</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
        
    }



    return (
        
        <View><ScrollView> 
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
                {/* <Text>
                    {itemId}
                </Text> */}</ScrollView> 
        </View>
    )
}
