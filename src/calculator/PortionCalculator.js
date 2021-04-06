import React from 'react';
import { Text, Button, View, StyleSheet, Modal, Alert, Dimensions } from 'react-native';
import NumPad from './NumPad'
import PawtionInputs from './PawtionInputs';
import pawtionInputs from './PawtionInputs'


export default class PortionCalculator extends React.Component {
    constructor(props) {
        super(props);
        const window = Dimensions.get("window");

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
            showModal: false,
            orienation: window.height > window.width ? 'portrait' : 'landscape'
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


        Dimensions.addEventListener('change', () => {
            const window = Dimensions.get("window");
            this.setState({
                orienation: window.height > window.width ? 'portrait' : 'landscape'
            })
        })
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
        if (isNaN(newFloatValue)) { newFloatValue = 0.00; }
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
        const { modalVisible, isEditing, bag, price, portionSize } = this.state;
        const screenHeight = Dimensions.get("window").height - 50;
        const screenWidth = Dimensions.get("window").width;
        const headerHeight = 50;
        const resultHeight = 80;
        const inputsHeight = 3 * 50;
        const calculatorHeight = screenHeight - resultHeight - inputsHeight - headerHeight;

        return (
            <View style={{ height: '100%', fontSize: 20 }} >
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
                <PawtionInputs
                    isEditing={isEditing}
                    bag={bag}
                    price={price}
                    portionSize={portionSize}
                    onChangeEditing={this.onChangeEditing}
                />
                <NumPad calculatorHeight={calculatorHeight}
                    calculatorWidth={screenWidth}
                    calculatorButtonPressed={this.calculatorButtonPressed} />
            </View>
        );
    }
}
