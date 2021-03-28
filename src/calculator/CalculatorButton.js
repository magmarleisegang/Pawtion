import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const style = StyleSheet.create({
    buttons: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 10
    }
});

export default class CalculatorButton extends React.Component {
    constructor(props) {
        super(props);
        this.handleTouch = this._handleTouch.bind(this)
    }

    _handleTouch() {
        if (this.props.onPressed) {
            this.props.onPressed(this.props.Number)
        }

    }

    render() {
        return (
            <View onTouchEnd={this.handleTouch}>
                <Text style={[style.buttons]}>{this.props.Number}</Text>
            </View>);
    }

}