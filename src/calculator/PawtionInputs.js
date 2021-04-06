import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    pawtionInputs: {
        flex: 1,
        fontSize: 20,
        textAlignVertical: 'center',
        textAlign: 'center'
    },
    right: {
        textAlign: 'right',
    },
    left: {
        textAlign: 'left',
    },

    pawtionUnits: {
        flex: 0.25,
        fontSize: 17,
    },
    pawtionInputRows: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: 50,
    },
    pawtionActiveInput: {
        // textWeight: '500',
        backgroundColor: '#28519077'
    }
})
export default class PawtionInputs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isEditing, bag, price, portionSize, onChangeEditing } = this.props;

        return (<View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={[styles.pawtionInputRows, isEditing === "bag" && styles.pawtionActiveInput]}
                onTouchEnd={() => onChangeEditing("bag")}>
                <Text style={[styles.pawtionInputs, styles.left]}>Bag Weight</Text>
                <Text style={[styles.pawtionInputs, styles.pawtionUnits]}>kg</Text>
                <Text
                    style={[styles.pawtionInputs, styles.right]}
                    placeholder="00.0">
                    {bag.toFixed(2)}
                </Text>
            </View>
            <View style={[styles.pawtionInputRows, isEditing === "price" && styles.pawtionActiveInput]}
                onTouchEnd={() => onChangeEditing("price")}>
                <Text style={[styles.pawtionInputs, styles.left]}>Bag Price</Text>
                <Text style={[styles.pawtionInputs, styles.pawtionUnits]}>R</Text>
                <Text
                    style={[styles.pawtionInputs, styles.right]}
                    placeholder="00.0">
                    {price.toFixed(2)}
                </Text>
            </View>
            <View style={[styles.pawtionInputRows, isEditing === "portion" && styles.pawtionActiveInput]}
                onTouchEnd={() => onChangeEditing("portion")}>
                <Text style={[styles.pawtionInputs, styles.left]}>Portion Size</Text>
                <Text style={[styles.pawtionInputs, styles.pawtionUnits]}>g</Text>
                <Text
                    style={[styles.pawtionInputs, styles.right]}
                    placeholder="00.0">
                    {portionSize.toFixed(2)}
                </Text>
            </View>
        </View>)
    }
}

PawtionInputs.propTypes = {
    isEditing: PropTypes.bool.isRequired,
    bag: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    portionSize: PropTypes.number.isRequired,
    onChangeEditing: PropTypes.func.isRequired
}