import * as redux from 'redux';
import React, { Component } from 'react';

import * as reducers from '../reducers';
import {SET_STATE} from '../constants/WireActions';
import {dataListener} from './dataListenener';
import pure from 'react-pure-component';

const { createDispatcher, combineReducers, applyMiddleware}  = redux;

export default function createStore() {
    let passStoreUpdate = false;

    const onAction = (action)=> {
        console.log(action.type);
        console.log(SET_STATE);
        passStoreUpdate = action.type !== SET_STATE;
    };

    const actionCatchMiddleware = ({dispatch}) => next => action => {
        console.log(action);
        onAction(action);
        next(action);
    };

    const createStoreWithMiddleware = applyMiddleware(actionCatchMiddleware)(redux.createStore);
    const store = createStoreWithMiddleware(combineReducers(reducers));

    const subscribeOnState = (dataListener)=> {
        store.subscribe(() => {
            if (!passStoreUpdate && dataListener)
                return;

            dataListener(store.getState())
        });
    };

    return {
        dispatch: store.dispatch.bind(store),
        getState: store.getState.bind(store),
        subscribe: store.subscribe.bind(store),
        subscribeOnState
    }
}

