import React from 'react';
import { Text, Button, View, StyleSheet, Modal, Alert } from 'react-native';
import CalculatorButton from './CalculatorButton'

const styles = StyleSheet.create({
    pawtionInputs: {
        flex: 1,
        fontSize: 15,
        textAlign: 'right',
    },
    pawtionLabels: {
        flex: 1,
        fontSize: 15,
        textAlign: 'left'
    },
    pawtionUnits: {
        flex: 0.25,
        textAlign: 'right'
    },
    pawtionInputRows: {
        flexDirection: 'row',
        padding: 5
    },
    pawtionActiveInput: {
        // textWeight: '500',
        backgroundColor: 'lightgreen'
    },
    buttons: {

    }
})

export default class PortionCalculator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bag: 0.0,
            price: 0.0,
            portionSize: 0.0,
            Text: {
                bag: "0",
                price: "0",
                portionSize: "0",
            },
            isEditing: "bag",
            showModal: false
        };
        this.calculatePortionCost = this._calculatePortionCost.bind(this);
        this.canCalculatePortionCost = this._canCalculatePortionCost.bind(this);

        this.rememberMe = this._rememberMe.bind(this);
        this.calculatorButtonPressed = this._calculatorButtonPressed.bind(this);
        this.getCurrentEditingText = this.getCurrentEditingText.bind(this);
        this.setCurrentEditingValue = this.setCurrentEditingValue.bind(this);
        this.onChangeEditing = this._onChangeEditing.bind(this);
        // this.isEditing = "bag"
        this.actions = {
            clear: "<",
            zeros: "00"
        }
    }

    _calculatePortionCost() {
        if (this.canCalculatePortionCost()) {
            const mealsPerBag = this.state.bag * 1000.00 / this.state.portionSize;
            const pricePerMeal = this.state.price / mealsPerBag;
            return pricePerMeal.toFixed(2);
        }
        return "0.00"
    }

    _canCalculatePortionCost() {
        return this.state.price > 0
            && this.state.bag > 0
            && this.state.portionSize > 0
    }

    _calculatorButtonPressed(char) {
        let currentText = this.getCurrentEditingText();

        if (char === this.actions.clear) {
            currentText = currentText.substring(0, currentText.length - 1)
        } else if (char === this.actions.zeros) {
            currentText += "00";
        } else {
            currentText += char;
        }

        this.setCurrentEditingValue(currentText);
    }

    getCurrentEditingText() {
        const isEditing = this.state.isEditing;

        switch (isEditing) {
            case "bag":
                return this.state.Text.bag || "0";
            case "price":
                return this.state.Text.price || "0";
            case "portion":
                return this.state.Text.portionSize || "0";
            default:
                break;
        }
    }

    setCurrentEditingValue(val) {
        let newFloatValue = parseFloat(val) / 100;
        const isEditing = this.state.isEditing;
        switch (isEditing) {
            case "bag":
                this.setState({ bag: newFloatValue, Text: { bag: val } });
                break;
            case "price":
                this.setState({ price: newFloatValue, Text: { price: val } });
                break;
            case "portion":
                this.setState({ portionSize: newFloatValue, Text: { portionSize: val } });
                break;
            default:
                break;
        }
    }

    _rememberMe() {
        this.setState({ modalVisible: true })
        const portionCost = parseFloat(this.calculatePortionCost())
        const currentValue = {
            bag: this.state.bag,
            price: this.state.price,
            portionSize: this.state.portionSize,
            portionCost: portionCost
        };
        if (this.props.onRememberMe)
            this.props.onRememberMe(currentValue);
    }

    _onChangeEditing(isEditing) {
        if (this.state.isEditing !== isEditing) {
            this.setState({ isEditing: isEditing });
        }
    }

    render() {
        const modalVisible = this.state.showModal;
        return (
            <View style={{ borderColor: 'red', borderWidth: 1, height: '100%', fontSize: 20 }} >
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                    }}
                ></Modal>
                <View style={{ height: 80 }}>
                    <Text style={{ textAlign: 'center' }}>Price/Portion</Text>
                    <Text style={{ fontSize: 30, textAlign: 'center', paddingTop: 5 }}>
                        {this.canCalculatePortionCost() &&
                            this.calculatePortionCost()}
                        {!this.canCalculatePortionCost() &&
                             'Add bag/price/portion'
                             }
                    </Text>
                </View>
                <View>
                    <Button onPress={this.rememberMe}
                        disabled={!this.canCalculatePortionCost()}
                        title="Remember Me" />
                </View>
                <View>
                    <View style={[styles.pawtionInputRows, this.state.isEditing === "bag" && styles.pawtionActiveInput]}
                        onTouchEnd={() => this.onChangeEditing("bag")}>
                        <Text style={[styles.pawtionLabels]}>Bag Weight</Text>
                        <Text style={[styles.pawtionUnits]}>kg</Text>

                        <Text
                            style={[styles.pawtionInputs]}
                            placeholder="00.0">
                            {this.state.bag.toFixed(2)}
                        </Text>
                    </View>
                    <View style={[styles.pawtionInputRows, this.state.isEditing === "price" && styles.pawtionActiveInput]}
                        onTouchEnd={() => this.onChangeEditing("price")}>

                        <Text style={[styles.pawtionLabels]}>Bag Price</Text>
                        <Text style={[styles.pawtionUnits]}>R</Text>
                        <Text
                            style={[styles.pawtionInputs]}
                            placeholder="00.0">
                            {this.state.price.toFixed(2)}
                        </Text>
                    </View>
                    <View style={[styles.pawtionInputRows, this.state.isEditing === "portion" && styles.pawtionActiveInput]}
                        onTouchEnd={() => this.onChangeEditing("portion")}>
                        <Text style={[styles.pawtionLabels]}>Portion Size</Text>
                        <Text style={[styles.pawtionUnits]}>g</Text>

                        <Text
                            style={[styles.pawtionInputs]}
                            placeholder="00.0">
                            {this.state.portionSize.toFixed(2)}
                        </Text>
                    </View>
                </View>
                <View style={{ height: 400, justifyContent: 'space-evenly' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <CalculatorButton Number={1} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={2} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={3} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                        <CalculatorButton Number={4} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={5} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={6} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <CalculatorButton Number={7} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={8} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={9} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <CalculatorButton Number={'00'} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={0} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                        <CalculatorButton Number={'<'} style={{ flex: 1 }} onPressed={this.calculatorButtonPressed} />
                    </View>
                </View>
            </View>
        );
    }
}
