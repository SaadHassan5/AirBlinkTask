import React from 'react'
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { HP, palette, WP } from '../../assets/config';
import fontFamily from '../../assets/config/fontFamily';

export const LoginStyles = StyleSheet.create({
    container:{
        flex:1,
    },
    whiteView:{
        marginTop:HP(35),
        backgroundColor:'white',
        flex:1,
        borderTopLeftRadius:WP(7),
        borderTopRightRadius:WP(7),
    },
    logTxt:{
        fontSize:20,
        fontFamily:fontFamily.bold,
        color:palette.black,
    },
    forgotTxt:{
        color:'#0118B5',
        fontSize:14,
        fontFamily:fontFamily.bold,
        paddingTop:HP(1),
    },
    orTxt:{
        fontFamily:fontFamily.regular,
        fontSize:17,
        color:'#979797',
        textAlign:'center',
        paddingTop:HP(2)
    },
    dontTxt:{
        fontSize:14,
        lineHeight:17,
        fontFamily:fontFamily.semi_bold,
        textAlign:'center',
        paddingTop:HP(3),
        color:"#979797",
    },
})