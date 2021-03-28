import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'
// import logo from './paws.svg';

const headerStyles = StyleSheet.create({
    container: {
        backgroundColor: '#285190',
        color: 'white',
        width: '100%',
        height: 50,
        fontSize: 20,
        textAlignVertical: 'center',
        padding: 10
    },
    logo: {
        width: 25,
        height: 25,
        color: 'white'
    }
});

export default class Header extends Component {
    render() {
        return (
            <View>
                <Text style={[headerStyles.container]}>
                    <FontAwesomeIcon icon={faPaw} style={[headerStyles.logo]} />{' '}
                Welcome to Pawtion</Text>
            </View>
        )

    }
}
