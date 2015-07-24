import React, { Component } from 'react';
import { createRedux, composeStores, compose } from 'redux';
import {Connector} from 'react-redux';
import * as reducers from '../reducers';

export default class JsonApp extends Component {
    render() {
        return (
            <Connector select={({todos}) => { todos }}>
                {this.renderChild}
            </Connector>
        );
    }

    renderChild(data) {
        return (
            <div>
                {JSON.stringify(data, null, 2)}
            </div>
        );
    }
}