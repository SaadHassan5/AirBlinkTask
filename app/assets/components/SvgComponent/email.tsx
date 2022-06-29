import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import Svg, { Path, Rect } from "react-native-svg";

export class EmailIcon extends React.Component {
  render() {
    return (
      <Svg width="20" height="15" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M4.85963 0.210059C8.28009 -0.0700195 11.7199 -0.0700197 15.1404 0.210059L16.7883 0.344997C17.8853 0.434827 18.8249 1.0512 19.3118 1.93287C19.374 2.04566 19.3274 2.18223 19.2126 2.24915L12.3753 6.23612C10.9089 7.09121 9.05987 7.10915 7.57508 6.28269L0.692091 2.45152C0.580889 2.38962 0.529846 2.2622 0.579961 2.15007C1.02533 1.15349 2.02664 0.442034 3.21169 0.344997L4.85963 0.210059Z" fill={this.props.col}/>
        <Path d="M0.57436 4.17683C0.404175 4.0821 0.187027 4.18404 0.167189 4.3693C-0.109682 6.95501 -0.0426718 9.56519 0.368221 12.1391C0.584836 13.4959 1.76048 14.5362 3.21169 14.655L4.85963 14.7899C8.28009 15.07 11.7199 15.07 15.1404 14.7899L16.7883 14.655C18.2395 14.5362 19.4152 13.4959 19.6318 12.1391C20.0546 9.49019 20.1133 6.80285 19.8077 4.14331C19.7863 3.95674 19.5655 3.85668 19.3961 3.95546L13.2368 7.54704C11.2529 8.70393 8.75124 8.7282 6.7424 7.61005L0.57436 4.17683Z" fill={this.props.col} />
      </Svg>

    )
  }
}