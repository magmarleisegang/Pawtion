import React from 'react';
import { View, Text } from 'react-native';

export default class PTable extends React.Component {
    renderCell(val, key) {
        return (
            <View key={key} style={{ flex: 1, alignSelf: 'stretch' }}><Text>{val}</Text></View>
        )
    }

    renderRow(dataObject) {
        return (
            <View key={dataObject.key} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                {
                    Object.values(dataObject).map((val, idx) => {
                        return this.renderCell(val, `${dataObject.key}-${idx}`)
                    })
                }
            </View>
        );
    }

    renderHeaderRow(dataObject) {
        return (
            <View key="header" style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                {
                    Object.getOwnPropertyNames(dataObject).map((val, idx) => {
                        return this.renderCell(val, `header-${idx}`)
                    })
                }
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {this.renderHeaderRow(this.props.data[0])}
                {
                    this.props.data.map((datum) => { // This will render a row for each data element.
                        console.log(datum)
                        return this.renderRow(datum);
                    })
                }
            </View>)
    }
}