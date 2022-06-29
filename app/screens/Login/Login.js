import React from 'react'
import { ActivityIndicator, ImageBackground, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { CustomHead1 } from '../../assets/components/CustomHeader/CustomHead1';
import { Input } from '../../assets/components/Input/Input';
import { HP, WP } from '../../assets/config';
import { IMAGES, SVGS } from '../../assets/imgs';
import { LoginStyles as Styles } from './login-style';
import Icon from 'react-native-vector-icons/Ionicons';
import { CustomBtn1 } from '../../assets/components/CustomButton/CustomBtn1';
import { FireAuth } from '../../Auth/socialAuth';
class Login extends React.Component {
  state = {
    eye: true,
    email: '',
    password: '',
    signed: true,
    active: false,
  }
  componentDidMount() {

  }

  async checkLogin() {
    if (this.state.email.trim() != '' && this.state.password.trim() != '') {
      let reg = /[a-zA-Z0-9]{0,}([.]?[a-zA-Z0-9]{1,})[@](gmail.com|hotmail.com|yahoo.com|outlook.com)/;
      if (reg.test(this.state.email)) {
        this.setState({ active: true })
        await FireAuth.Signin(this.state.email,this.state.password,this.props);
        this.setState({ active: false })
      }
      else {
        this.toastPrompt('Enter Valid Email')
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
          <CustomHead1 txt={'Log In'} />
          <View style={{ ...Styles.whiteView, paddingTop: HP(1.5), paddingHorizontal: WP(6) }}>
            <Text style={{ ...Styles.logTxt }}>Log In</Text>
            <View style={{ justifyContent: 'center', width: '100%', marginTop: HP(3), }}>
              <Input keyboardType='email-address' onChange={(e) => { this.setState({ email: e }) }} placeTxt={"Username"} />
              <SVGS.userIcon style={{ position: 'absolute', right: WP(5) }} />
            </View>
            <View style={{ justifyContent: 'center', width: '100%', marginTop: HP(3), }}>
              <Input onChange={(e) => { this.setState({ password: e }) }} eye={this.state.eye} password placeTxt={"Password"} />
              <TouchableOpacity onPress={() => { this.setState({ eye: !this.state.eye }) }} style={{ position: 'absolute', right: WP(5) }} >
                {this.state.eye ?
                  <Icon name='eye' size={25} color={'#B7C1DF'} />
                  :
                  <Icon name='eye-off' size={25} color={'#B7C1DF'} />
                }
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: HP(3) }}>
              <CustomBtn1 txt={'Sign In'} onPress={() => this.checkLogin()} />
              {/* this.props.navigation.navigate('Signup') */}
            </View>
            {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('PasswordReset')}>
              <Text style={{ ...Styles.forgotTxt }}>Forgot Password</Text>
            </TouchableOpacity> */}
            {/* <Text style={{ ...Styles.orTxt }}>or login with</Text> */}
            {/* <LoginIcons  /> */}
            <TouchableOpacity style={{ marginTop: HP(4), paddingVertical: HP(2) }} onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={{ ...Styles.dontTxt }}>Don’t have an account? <Text style={{ color: '#0118B5' }}>Sign Up</Text></Text>
            </TouchableOpacity>
          </View>

        </ImageBackground>
        {this.state.active &&
                    <View style={{ width: '100%', height: "100%", backgroundColor: 'transparent', alignSelf: 'center', justifyContent: 'center', alignItems: 'center', position: 'absolute', }}>
                        <ActivityIndicator size={"large"} color="#00ff00" />
                    </View>
                }
      </View>
    );
  }
}
export default Login;