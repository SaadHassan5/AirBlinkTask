import React from 'react'
import { ImageBackground, Platform, StyleSheet, Text, View } from 'react-native';
import { HP, palette, WP } from '../../assets/config';
import fontFamily from '../../assets/config/fontFamily';

export const ShowPostStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inp: {
        fontFamily: fontFamily.regular,
        fontSize: 17,
        borderWidth: 1,
        borderColor: '#B7C1DF',
        borderRadius: WP(4),
        paddingHorizontal: WP(6),
        color: palette.black,
        // width: '100%',
    },
    title: {
        color: palette.black,
        fontSize: 20,
        fontFamily: fontFamily.semi_bold
    },
    desc: {
        color: palette.black,
        fontSize: 15,
        fontFamily: fontFamily.regular
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 1,
    },
    cardView: {
        paddingVertical: HP(2),
        paddingHorizontal: WP(3),
        borderWidth: 1,
        borderColor: palette.lightestGrey,
        borderRadius: WP(3)

    },
    userTxt: {
        textAlign: "right",
        fontFamily: fontFamily.light,
        color: palette.blackGray,
        fontSize: 13
    }
});