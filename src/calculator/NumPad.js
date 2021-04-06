import React from 'react';
import PropTypes from 'prop-types';

import {  View } from 'react-native';
import CalculatorButton from './CalculatorButton'

export default class NumPad extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const calculatorHeight = this.props.calculatorHeight;
        const buttonHeight = calculatorHeight / 4;
        const buttonWidth = this.props.calculatorWidth / 3;
        const calculatorButtonPressed = this.props.calculatorButtonPressed;
        return (
            <View style={{ height: calculatorHeight }}>
                <View style={{ height: buttonHeight, flexDirection: 'row', alignItems: 'center' }}>
                    <CalculatorButton Number={1} onPressed={calculatorButtonPressed} dark width={buttonWidth} />
                    <CalculatorButton Number={2} onPressed={calculatorButtonPressed} width={buttonWidth} />
                    <CalculatorButton Number={3} onPressed={calculatorButtonPressed} dark width={buttonWidth} />
                </View>
                <View style={{ height: buttonHeight, flexDirection: 'row', alignItems: 'center' }}>

                    <CalculatorButton Number={4} onPressed={calculatorButtonPressed} width={buttonWidth} />
                    <CalculatorButton Number={5} onPressed={calculatorButtonPressed} dark width={buttonWidth} />
                    <CalculatorButton Number={6} onPressed={calculatorButtonPressed} width={buttonWidth} />
                </View>
                <View style={{ height: buttonHeight, flexDirection: 'row', alignItems: 'center' }}>
                    <CalculatorButton Number={7} onPressed={calculatorButtonPressed} dark width={buttonWidth} />
                    <CalculatorButton Number={8} onPressed={calculatorButtonPressed} width={buttonWidth} />
                    <CalculatorButton Number={9} onPressed={calculatorButtonPressed} dark width={buttonWidth} />
                </View>
                <View style={{ height: buttonHeight, flexDirection: 'row', alignItems: 'center' }}>
                    <CalculatorButton Number={'00'} onPressed={calculatorButtonPressed} width={buttonWidth} />
                    <CalculatorButton Number={0} onPressed={calculatorButtonPressed} dark width={buttonWidth} />
                    <CalculatorButton Number={'<'} onPressed={calculatorButtonPressed} width={buttonWidth} />
                </View>
            </View>
        )
    }
}

NumPad.PropTypes = {
    calculatorButtonPressed: PropTypes.func.isRequired,
    calculatorHeight: PropTypes.number.isRequired,
    calculatorWidth: PropTypes.number.isRequired
}