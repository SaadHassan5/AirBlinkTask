import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, Platform, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { HomeStyles as Styles } from './home.style';
import { CustomHead1 } from '../../assets/components/CustomHeader/CustomHead1';
import { CustomBtn1 } from '../../assets/components/CustomButton/CustomBtn1';
import { HP, WP } from '../../assets/config';
import { connect } from 'react-redux';
import { ChangeBackgroundColor, GetUser } from '../../root/action';
import { getAllOfCollection, getData } from '../../Auth/fire';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertService from '../../Services/alertService';

const Home = (props) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getPosts();
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [])
    const getPosts = async () => {
        const pos = await getAllOfCollection("Posts")
        console.log("POSS", pos);
        setPosts(pos);
    }
    const onLogOut = async () => {
        AlertService.confirm("Are you sure you want to Logout?").then(async (res) => {
            if (res) {
                await AsyncStorage.removeItem("User");
                await AsyncStorage.removeItem("id");
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            { name: 'Login' },
                        ]
                    })
                );
            }
        })
    }
    const onProceed =async(item)=>{
        const myEmail = await AsyncStorage.getItem('User')
        props.navigation.navigate("ShowPost", { obj: item,myEmail })
    }
    return (
        <SafeAreaView style={{ ...Styles.container }}>
            <ScrollView contentContainerStyle={{ paddingBottom: HP(10) }}>
                <CustomHead1 save={() => { onLogOut() }} txt={"Timeline"} />
                <View style={{ paddingHorizontal: WP(5), paddingTop: HP(1) }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("AddPost")} style={{ marginTop: HP(2) }}>
                        <TextInput numberOfLines={3} editable={false} textAlignVertical={"top"} multiline={true} placeholderTextColor={"#B7C1DF"} onChangeText={(e) => { }} style={{ ...Styles.inp, color: 'black' }} placeholder={'Create Post ...'} />
                    </TouchableOpacity>
                    <View style={{ ...Styles.postView, paddingVertical: HP(2) }}>

                        <FlatList
                            numColumns={1}
                            data={posts}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                // <View style={{...Styles.shadow,}}>
                                <TouchableOpacity onPress={() => onProceed(item)} style={{ ...Styles.cardView, marginTop: HP(1) }}>
                                    <Text style={{ ...Styles.title }}>{item?.title}</Text>
                                    <Text style={{ ...Styles.desc }}>{item?.description}</Text>
                                    <Text style={{ ...Styles.userTxt }}>{item?.user}</Text>
                                </TouchableOpacity>
                                //  </View>
                            }
                        />
                    </View>
                </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);