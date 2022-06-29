import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, ToastAndroid } from 'react-native';
const toastPrompt = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else {
    // alert(msg);
  }
}
const Signup = async (email, password, props) => {
  await auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async (res) => {
      toastPrompt('User account created & signed in!');
      await AsyncStorage.setItem('User', email);
      await AsyncStorage.setItem('id', res?.user?.uid);

      props.navigation.goBack();
      props.navigation.navigate('Home')
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        toastPrompt('That email address is already in use!');
      }
      else if (error.code === 'auth/invalid-email') {
        toastPrompt('That email address is invalid!');
      }
      else if (error.code == "auth/network-request-failed")
        toastPrompt('Internet Problem')
      console.error(error);
    });
}
const Signin = async (email, password, props) => {
  await auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (res) => {
      toastPrompt('signed in!');
      console.log(res.user.uid);
      await AsyncStorage.setItem('User', email);
      await AsyncStorage.setItem('id', res?.user?.uid);
      props.navigation.navigate('Home')
      // props.navigation.replace('TabNavigator');

    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        toastPrompt('That email address is already in use!');
      }
      else if (error.code === 'auth/invalid-email') {
        toastPrompt('That email address is invalid!');
      }
      else if (error.code === 'auth/wrong-password') {
        toastPrompt('That password is invalid!');
      }
      else if (error.code == "auth/network-request-failed")
        toastPrompt('Internet Problem')
      else {
        toastPrompt("Unknown Error")
      }
      console.error(error.code);
    });
}
const Reset = async (email, props) => {

  auth().sendPasswordResetEmail(email)
    .then(() => {
      console.log('Success');
      toastPrompt('Email Sent!' + '\n' + 'Click on recieved email for further process.')
      props.navigation.goBack()
    })
    .catch(error => {
      if (error.code == "auth/user-not-found")
        toastPrompt('User not Found')
      if (error.code == "auth/network-request-failed")
        toastPrompt('Internet Problem')
      console.error(error);
      // alert(error)
    });

}
export const FireAuth = {
  Signup,
  Signin,
  Reset
}