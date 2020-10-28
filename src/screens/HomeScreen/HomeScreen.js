import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, ActivityIndicator, Image, ScrollView } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import { useNavigation } from '@react-navigation/native'
import { Updates } from 'expo'

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
                                // source={{ uri: item.image }}
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
        <View style={{ backgroundColor: '#FFC700'}}>
            <View>
                <View>
                    <ScrollView 
                            horizontal= {true}
                            showsVerticalScrollIndicator= {false}
                            style= {{ backgroundColor: 'white'}}
                    > 
            
                        <View style={{flex: 2}}>            
                            <View style={{ alignItems: 'center', marginLeft: 5, height: 180}}>
                                <Image
                                    style={{ width: 380, height: '100%', marginVertical: 5, borderRadius: 10}}
                                    source={{
                                    uri: 'https://2.bp.blogspot.com/-LYsLvoKXQpc/VQ5tbN5xk8I/AAAAAAAAAFU/HDEsbe17hic/s1600/Screenshots_2015-03-21-15-29-17.png',
                                    }}
                                />              
                            </View>
                        </View>

                        <View style={{flex: 2}}>            
                            <View style={{ alignItems: 'center', marginLeft: 5, height: 180}}>
                                <Image
                                    style={{ width: 380, height: '100%', marginVertical: 5, borderRadius: 10}}
                                    source={{
                                    uri: 'https://2.bp.blogspot.com/-LYsLvoKXQpc/VQ5tbN5xk8I/AAAAAAAAAFU/HDEsbe17hic/s1600/Screenshots_2015-03-21-15-29-17.png',
                                    }}
                                />              
                            </View>
                        </View>

                        <View style={{flex: 2}}>            
                            <View style={{ alignItems: 'center', marginLeft: 5, height: 180}}>
                                <Image
                                    style={{ width: 380, height: '100%', marginVertical: 5, borderRadius: 10}}
                                    source={{
                                    uri: 'https://2.bp.blogspot.com/-LYsLvoKXQpc/VQ5tbN5xk8I/AAAAAAAAAFU/HDEsbe17hic/s1600/Screenshots_2015-03-21-15-29-17.png',
                                    }}
                                />              
                            </View>
                        </View>
                        

                    </ScrollView>
                </View>
                    <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', margin: 10}}></View>
            <View>
                    
                    <Text style={{marginHorizontal: 10, fontWeight: 'bold', fontSize: 15}}>
                        ประเภทงาน
                    </Text>
                    
                </View>

                <View style={{ marginTop: 20, height: 130}}>  

                    <ScrollView 
                        horizontal= {true}
                        showsVerticalScrollIndicator= {false}
                    > 

                        <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: 'white', borderRadius: 20 }}>   
                            <View style={{ flex: 2 }}>
                                <Image
                                    style={{ flex: 1, width: null, height: null, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                                    source={{
                                    uri: 'https://static.posttoday.com/media/content/2018/12/23/D484B8DD44154064A9F5ED2D8B079816.jpg',
                                    }}
                                />  
                                <View style={{ alignItems: 'center', padding: 5 , backgroundColor: 'white', borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold'}}>
                                        นายก
                                    </Text>
                                </View>            
                            </View>
                        </View>

                        <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: 'white', borderRadius: 20 }}>   
                            <View style={{ flex: 2 }}>
                                <Image
                                    style={{ flex: 1, width: null, height: null, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                                    source={{
                                    uri: 'https://miro.medium.com/max/705/1*YbPmk3qTqvgAjhcaNwPcpA@2x.jpeg',
                                    }}
                                />  
                                <View style={{ alignItems: 'center', padding: 5 , backgroundColor: 'white', borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold'}}>
                                        วิศวะกร
                                    </Text>
                                </View>            
                            </View>
                        </View>

                        <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: 'white', borderRadius: 20 }}>   
                            <View style={{ flex: 2 }}>
                                <Image
                                    style={{ flex: 1, width: null, height: null, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                                    source={{
                                    uri: 'https://nanasara.net/wp-content/uploads/2019/05/accountant-300x149.png',
                                    }}
                                />  
                                <View style={{ alignItems: 'center', padding: 5 , backgroundColor: 'white', borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold'}}>
                                        บัญชี
                                    </Text>
                                </View>            
                            </View>
                        </View>

                        <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: 'white', borderRadius: 20 }}>   
                            <View style={{ flex: 2 }}>
                                <Image
                                    style={{ flex: 1, width: null, height: null, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                                    source={{
                                    uri: 'https://houseofjuneau.files.wordpress.com/2015/05/architect.png?w=470',
                                    }}
                                />  
                                <View style={{ alignItems: 'center', padding: 5 , backgroundColor: 'white', borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold'}}>
                                        สถาปนิก
                                    </Text>
                                </View>            
                            </View>
                        </View>

                        <View style={{ width: 130, height: 130, marginLeft: 20, borderWidth: 0.5, borderColor: 'white', borderRadius: 20 }}>   
                            <View style={{ flex: 2 }}>
                                <Image
                                    style={{ flex: 1, width: null, height: null, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                                    source={{
                                    uri: 'https://lh3.googleusercontent.com/proxy/0ow3wbDpzraB75tFHdU3dODtZYBeveB855D-B00lNbvLU_zyzzmBad57ka2HdPi_hVbYY74EiBD95ncybgn8_BUqM-IszN6ejkWKf6z-kByDBQ7FCsGBI-T5yRekqQ',
                                    }}
                                />  
                                <View style={{ alignItems: 'center', padding: 5 , backgroundColor: 'white', borderBottomEndRadius: 20, borderBottomLeftRadius: 20}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold'}}>
                                        นักข่าว
                                    </Text>
                                </View>            
                            </View>
                        </View>
                        
                    </ScrollView>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', borderBottomWidth: 1, borderColor: 'white', marginTop: 10}}></View>
                <View style={{flexDirection:'row', justifyContent: 'space-between'}}>   

                {/* <View style={styles.entityButton}>
                    <View style={{alignItems: "center"}}>             
                        <View style={styles.entityButton}>
                            <TouchableOpacity style={styles.button2} 
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
                    </View> */}
                </View>

                <View style={styles.entityButton}>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.button2} 
                                onPress={() =>
                                    navigation.navigate(
                                        'Profile',
                                        { user: userID }
                                    )}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>โปรไฟล์</Text>
                        </TouchableOpacity>
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
