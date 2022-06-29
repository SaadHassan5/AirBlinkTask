import React, { useEffect, useState, useRef } from 'react'
import { Image, FlatList, ImageBackground, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { ShowPostStyles as Styles } from './ShowPost.style';
import { CustomHead1 } from '../../assets/components/CustomHeader/CustomHead1';
import { CustomBtn1 } from '../../assets/components/CustomButton/CustomBtn1';
import { HP, palette, WP } from '../../assets/config';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../../root/action';
import { getAllOfCollection, getData, readRealMessage, writeMessage } from '../../Auth/fire';
import Icon from "react-native-vector-icons/Entypo"
import IconSend from "react-native-vector-icons/Ionicons"
import { Input } from '../../assets/components/Input/Input';
import { IMAGES } from '../../assets/imgs';
import { GiftedChat } from 'react-native-gifted-chat'
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowPost = (props) => {
    const [posts, setPosts] = useState([]);
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);
    const refFlat = useRef();
    useEffect(() => {
        console.log(props.route);
        const onValueChange = database()
            .ref(`/${props.route.params?.obj?.id}/msgs`)
            .on('value', snapshot => {
                console.log('User data: ', snapshot?.val());
               if(snapshot?.val()!=null) {
                    setMessages(snapshot?.val())
                    refFlat?.current?.scrollToEnd({ animated: true })
                }
            });

        // Stop listening for updates when no longer required
        return () => database().ref(`/${props.route.params?.obj?.id}/msgs`).off('value', onValueChange);
    }, [props.route.params?.obj?.id]);
    // useEffect(() => {
    //     console.log(props.route);
    //     const unsubscribe = props.navigation.addListener('focus', async () => {
    //         onRecieve();
    //         // The screen is focused
    //         // Call any action
    //         // getPosts();
    //     });

    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     return unsubscribe;
    // }, [])
    const onSend = async () => {
        const myEmail = await AsyncStorage.getItem("User")
        console.log(myEmail);
        const obj = {
            message: msg,
            created_at: '',
            // created_at: new Date().toString(),
            user: {
                email: myEmail,
            },
        }
        let ms = [];
        if (messages.length > 0)
            ms = [...messages, obj]
        else
            ms = [obj]
        console.log(ms, "Len", ms.length);
        await writeMessage(props.route.params?.obj?.id, ms)
        // console.log(new Date().toString());
        setMsg('')
        refFlat?.current?.scrollToEnd({ animated: true })
    }
    const onRecieve = async () => {
        const realMsgs = await readRealMessage(props.route.params?.obj?.id);
        setTimeout(() => {
            console.log("Real", realMsgs);
            setMessages(realMsgs);
        }, 2000)
    }
    return (
        <SafeAreaView style={{ ...Styles.container }}>
            <ScrollView contentContainerStyle={{ paddingBottom: HP(10), flex: 1 }}>
                <CustomHead1 txt={props.route.params?.obj?.title} />
                <View style={{ paddingHorizontal: WP(5) }}>
                    <Text style={{ ...Styles.desc, fontSize: 18, paddingVertical: HP(4) }}>{props.route.params?.obj?.description}</Text>
                    <View style={{ ...Styles.postView, paddingVertical: HP(2) }}>
                        <FlatList
                            numColumns={3}
                            data={props.route.params?.obj?.Images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <View>
                                    <Image defaultSource={IMAGES.Loading} source={{ uri: item }} style={{ width: WP(30), height: WP(30), borderWidth: .5, borderColor: palette.lighBlueBtnTitle }} />
                                </View>
                            }
                        />
                        <Icon name='chat' size={30} style={{ marginLeft: WP(5) }} color={palette.lighBlueBtnTitle} />
                    </View>
                    <View style={{ width: "100%", height: "70%", borderWidth: .3 }}>
                        <FlatList
                            numColumns={1}
                            ref={refFlat}
                            data={messages}
                            initialScrollIndex={messages[messages.length]}
                            keyExtractor={(item, index) => index.toString()}
                            onLayout={() => refFlat?.current?.scrollToEnd({ animated: true })}
                            renderItem={({ item }) =>
                                <View style={{
                                    paddingHorizontal: WP(4), marginHorizontal: WP(2), marginVertical: HP(2), paddingVertical: HP(1),
                                    backgroundColor: props.route.params?.myEmail == item?.user?.email ? palette.lighBlueBtn : palette.lightestGrey,
                                    width: '70%',
                                    alignSelf: props.route.params?.myEmail == item?.user?.email ? 'flex-end' : 'flex-start'
                                }}>
                                    <Text style={{ ...Styles.title, fontSize: 15 }}>{item?.user?.email}</Text>
                                    <Text style={{ ...Styles.userTxt, textAlign: 'left' }}>{item?.message}</Text>
                                </View>
                                // <Text style={{ ...Styles.userTxt, textAlign: 'left' }}>ssss</Text>
                            }
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={{ paddingBottom: HP(.5), paddingHorizontal: WP(4), justifyContent: 'center' }}>
                <Input value={msg} multi={true} onChange={(e) => setMsg(e)} placeTxt={"Enter Message"} />
                <TouchableOpacity onPress={() => { onSend() }} style={{ position: 'absolute', right: 0, paddingRight: WP(7) }}>
                    <IconSend name={"send"} size={30} color={palette.lighBlueBtnTitle} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
const mapStateToProps = (state) => {
    const { backgroundColor } = state;
    const { user } = state;
    // alert(backgroundColor);
    // alert(Imgs);
    // console.log(backgroundColor);
    console.log('Redux User=>', user);

    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        changeBackgroundColor: (bg) => dispatch(ChangeBackgroundColor(bg)),
        getUser: (userInfo) => dispatch(GetUser(userInfo)),
    }
}
// export default Home
export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);