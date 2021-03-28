import React from 'react';
import PortionCalculator from './calculator/PortionCalculator'
import PortionList from './portions/PortionList'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { list: [] }
        // this.ListRef = React.createRef();
        this.onRememberMe = this._onRememberMe.bind(this);
    }
    _onRememberMe(currentValue) {
        let currentList = this.state.list;
        currentList.push(currentValue);
        currentList.forEach((item, index) => {
            item.key = index + 1;
        })
        this.setState(currentList);
    }
    render() {
        return (
            <>
                <PortionCalculator onRememberMe={this.onRememberMe} />
                {this.state.list.length > 0 && <PortionList list={this.state.list} />}
            </>
        );
    }
}

export default Main