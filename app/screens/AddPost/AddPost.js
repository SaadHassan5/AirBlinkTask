import React, { useState } from 'react'
import { ActivityIndicator, FlatList, ToastAndroid, ImageBackground, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { AddPostStyles as Styles } from './addPost.style';
import { CustomHead1 } from '../../assets/components/CustomHeader/CustomHead1';
import { CustomBtn1 } from '../../assets/components/CustomButton/CustomBtn1';
import { HP, palette, WP } from '../../assets/config';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../../root/action';
import { Input } from '../../assets/components/Input/Input';
import Icon from "react-native-vector-icons/Ionicons"
import { saveData, uploadFile, uploadImageToStorage, uploadMultiFile } from '../../Auth/fire';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const AddPost = (props) => {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [imgs, setImgs] = useState([]);
    const onPost = async () => {
        if (title != "") {
            const value = await AsyncStorage.getItem("User")
            if (imgs.length > 0) {
                setActive(true)
                const allUri = await uploadMultiFile(imgs, value)
                //  await imgs.map(async(x)=>{
                //    await uploadFile(x?.uri,x?.fileName).then(async(res)=>{
                //     console.log("RESS",res);
                //     allImgsUri.push(res)
                //    });
                // })
                //    await console.log("All Images Uri",allImgsUri);
                setTimeout(async () => {
                    await console.log("alllll", allUri);
                    await saveData("Posts", "", { title: title, description: desc, user: value, Images: allUri })
                }, 4000 * imgs.length)
            }
            else {
                await saveData("Posts", "", { title: title, description: desc, user: value })
            }
            setTimeout(async () => {
                setActive(false)

                toastPrompt("Posted");
                props.navigation.navigate("Home");

            }, 4200 * imgs.length)
        }
        else
            toastPrompt("Enter Title")
    }
    const selectFile = () => {


        const options = {
            mediaType: 'photos',
            base64: true,
            selectionLimit: 5
        }

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else {
                let _img = response?.assets[0]?.uri;
                _img.replace("")
                console.log("image---->", response?.assets[0]);
                setImgs(response?.assets)
                // this.setState({
                //     image: response?.assets[0],
                //     mod: false,
                //     photoMod: false
                // });
                // this.imgToBin(response?.assets[0]?.uri,)
            }
        });

    };
    const toastPrompt = (msg) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            // alert(msg);
        }
    }
    return (
        <SafeAreaView style={{ ...Styles.container }}>
            <ScrollView contentContainerStyle={{ paddingBottom: HP(10) }}>
                <CustomHead1 onPressArrow={() => { props.navigation.goBack() }} txt={"Add Post"} />
                <View style={{ paddingHorizontal: WP(7), paddingVertical: HP(3) }}>
                    <Input placeTxt={"Title"} onChange={(e) => setTitle(e)} />
                    <TextInput numberOfLines={6}
                        onChangeText={(e) => setDesc(e)}
                        editable={true}
                        textAlignVertical={"top"}
                        multiline={true}
                        placeholderTextColor={"#B7C1DF"}
                        style={{ ...Styles.inp, color: 'black', marginTop: HP(2) }}
                        placeholder={'Create Post ...'} />
                    <TouchableOpacity disabled={active} onPress={() => { selectFile() }} style={{ paddingTop: HP(1), paddingLeft: WP(2) }}>
                        <Icon name={"images-outline"} size={35} color={palette.status_dot_bg_green} />
                    </TouchableOpacity>
                    <FlatList
                        numColumns={3}
                        data={imgs}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <View style={{ marginTop: HP(2), marginLeft: WP(5) }}>
                                <Image source={{ uri: item?.uri }} resizeMode={"cover"} style={{ ...Styles.img }} />
                            </View>
                        }
                    />
                    <View style={{ paddingTop: HP(5) }}>
                        <CustomBtn1 disable={active} onPress={() => { onPost() }} txt={"POST"} />

                    </View>
                </View>
                {active &&
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: "100%", width: "100%" }}>
                        <ActivityIndicator size="large" color="blue" />
                    </View>
                }
            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(AddPost);