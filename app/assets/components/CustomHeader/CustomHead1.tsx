import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HP, palette, WP } from '../../config';
import fontFamily from '../../config/fontFamily';
import { SVGS } from '../../imgs';
import IconLogOut from 'react-native-vector-icons/AntDesign';

export class CustomHead1 extends React.Component {
  render() {
    return (
      <View style={{ marginTop: HP(1), flexDirection: 'row', justifyContent: 'center' }}>
        {this.props.onPressArrow &&
          <TouchableOpacity onPress={this.props.onPressArrow} style={{ position: 'absolute', padding: WP(4), left: WP(4) }}>
            <SVGS.backArrow />
          </TouchableOpacity>
        }
        <Text style={{ textAlign: 'center', color: palette.black, fontSize: 17, paddingTop: HP(1), fontFamily: fontFamily.bold }}>{this.props.txt}</Text>
        {this.props.save &&
          <TouchableOpacity onPress={this.props.save} style={{ position: 'absolute', padding: WP(3), right: WP(4) }}>
            {/* <Text style={{ color: '#0118B5', fontFamily: fontFamily.bold }}>Save</Text> */}
            <IconLogOut name='logout' color={'black'} size={30}/>
          </TouchableOpacity>
        }
        {this.props.txt2 &&
          <TouchableOpacity onPress={this.props.onPressTxt2} style={{ position: 'absolute', padding: WP(3), right: WP(4) }}>
            <Text style={{ color: '#0118B5', fontFamily: fontFamily.bold }}>{this.props.txt2}</Text>
          </TouchableOpacity>
        }
      </View>
    );
  }
}
