import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image
} from 'react-native';
import logo from './paws.svg';

export default class Header extends Component {
    render() {
        return (
            <View>
                <Image source={logo} />
                <Text>Pawtion</Text>
            </View>
        )

    }
}
