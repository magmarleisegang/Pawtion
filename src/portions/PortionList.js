import React from 'react';
import Table from './PTable';
import { Text } from 'react-native';
export default class PortionList extends React.Component{
    constructor(props) {
        super(props);
        // props.header = ["Name", "Pawtion"];
        this.state = {list: props.list || []}
    }
    addToList(pawtion)
    {
        const newList = this.state.list.concat(pawtion);
        console.log(newList)
        this.setState({list: newList});

    }
    render(){
        return (
            <>
            <Text>Portion List</Text>
            <Table data={this.state.list}/>
            </>
        );
    }
}
