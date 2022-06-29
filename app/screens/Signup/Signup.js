import React from 'react'
import { ActivityIndicator, ImageBackground, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { CustomHead1 } from '../../assets/components/CustomHeader/CustomHead1';
import { Input } from '../../assets/components/Input/Input';
import { HP, WP } from '../../assets/config';
import { IMAGES, SVGS } from '../../assets/imgs';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomBtn1 } from '../../assets/components/CustomButton/CustomBtn1';
import { SignupStyles as Styles } from './signup-style';
import { FireAuth } from '../../Auth/socialAuth';

// export interface Props { }
// export interface State {
//     count: 0,
// }

export class Signup extends React.Component {
    state = {
        eye1: true,
        eye2: true,
        email: '',
        password: '',
        RepeatPass: '',
        user_name: '',
        active: false,
    }
    async checkRegister() {
        if (this.state.email.trim() != '' && this.state.password.trim() != '') {
            if (this.state.password == this.state.RepeatPass) {
                let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                if (reg.test(this.state.email)) {
                    this.setState({ active: true })
                    // await Api.Register(this.state.email, this.state.password, this.state.user_name, this.props);
                    await FireAuth.Signup(this.state.email, this.state.password, this.props)
                    this.setState({ active: false })
                    // props.navigation.goBack();
                    // this.props.navigation.replace('Home')
                }
                else {
                    this.toastPrompt('Enter Valid Email')
                }

            }
            else {
                this.toastPrompt(`Password and Repeated Password doesn't matched!`)
            }
        }
        else {
            this.toastPrompt('Enter Email / Password')
        }
    }
    toastPrompt(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            // alert(msg);
        }
    }

    render() {
        return (
            <View style={{ ...Styles.container }}>
                <ImageBackground source={IMAGES.splashBack} style={{ width: '100%', height: '100%' }}>
                    <CustomHead1 txt={'Sign Up'} onPressArrow={() => this.props.navigation.goBack()} />
                    <View style={{ ...Styles.whiteView, paddingTop: HP(1.5), paddingHorizontal: WP(6) }}>
                        <Text style={{ ...Styles.signupTxt }}>Sign Up</Text>
                        {/* <Text style={{ ...Styles.orTxt }}>or register with e-mail</Text> */}
                        <View style={{ justifyContent: 'center', width: '100%', marginTop: HP(3), }}>
                            <Input onChange={(e) => this.setState({ email: e })} placeTxt={"E-mail"} />
                            <SVGS.email style={{ position: 'absolute', right: WP(5) }} />
                        </View>
                        <View style={{ justifyContent: 'center', width: '100%', marginTop: HP(3), }}>
                            <Input onChange={(e) => this.setState({ password: e })} eye={this.state.eye1} password placeTxt={"Password"} />
                            <TouchableOpacity onPress={() => this.setState({ eye1: !this.state.eye1 })} style={{ position: 'absolute', right: WP(5) }} >
                                {this.state.eye1 ?
                                    <Icon name='eye' size={25} color={'#B7C1DF'} />
                                    :
                                    <Icon name='eye-off' size={25} color={'#B7C1DF'} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: 'center', width: '100%', marginTop: HP(3), }}>
                            <Input onChange={(e) => this.setState({ RepeatPass: e })} eye={this.state.eye2} password placeTxt={"Repeat Password"} />
                            <TouchableOpacity onPress={() => this.setState({ eye2: !this.state.eye2 })} style={{ position: 'absolute', right: WP(5) }} >
                                {this.state.eye2 ?
                                    <Icon name='eye' size={25} color={'#B7C1DF'} />
                                    :
                                    <Icon name='eye-off' size={25} color={'#B7C1DF'} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingTop: HP(6) }}>
                            <CustomBtn1 txt={'Sign Up'} onPress={() => this.checkRegister()} />
                        </View>
                        <TouchableOpacity style={{ marginTop: HP(4), paddingVertical: HP(2) }} onPress={() => { this.props.navigation.navigate('Login') }}>
                            <Text style={{ ...Styles.dontTxt }}>Already have an account?<Text style={{ color: '#0118B5' }}> Log In </Text></Text>
                        </TouchableOpacity>

                    </View>
                </ImageBackground>
                {this.state.active &&
                    <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                        <ActivityIndicator size={"large"} color="#00ff00" />
                    </View>
                }
            </View>
        )
    }
}