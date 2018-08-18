import React from 'react';
import { Text, TextInput, Button, View, Alert } from 'react-native';

export default class PortionCalculator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {bag: 0.0,
            price: 0.0,
            portionSize: 0.0,
            portionCost: 0.0
        };
        this.calculatePortionCost = this._calculatePortionCost.bind(this);
    }

    _calculatePortionCost () {
        if(this.state.price > 0)
        {
            const pricePerGram = this.state.price / (this.state.bag * 1000);
            console.log("price per gram: "+ pricePerGram);
            const pricePerPortion = pricePerGram * this.state.portionSize;
            this.setState({portionCost: pricePerPortion});
        }
    }
    render(){
        return (
            <View style={{padding: 10}}>
                <Text>Bag Weight (kg)</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="kg"
                    onChangeText={(text) => this.setState({bag: parseFloat(text)})}
                />
                <Text>Bag Price (R)</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="R"
                    onChangeText={(text) => this.setState({price: parseFloat(text)})}
                />
                <Text>Portion Size (g)</Text>
                <TextInput
                    style={{height: 40}}
                    placeholder="g"
                    onChangeText={(text) => this.setState({portionSize: parseFloat(text)})}
                />
                <Button
                    onPress={this.calculatePortionCost}
                    title="Press Me"
                />
                <Text>Rands/Meal</Text>
                <Text>{this.state.portionCost}</Text>
            </View>
        );
    }
}
