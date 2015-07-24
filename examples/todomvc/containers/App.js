import { createStore, createDispatcher, combineReducers, applyMiddleware} from 'redux';
import React, { Component } from 'react';
import TodoApp from './TodoApp';
import { Provider } from 'react-redux';
import * as reducers from '../reducers';
import {SET_STATE} from '../constants/WireActions';
import {dataListener} from './dataListenener';

export default function createApp() {
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

    const reducer = combineReducers(reducers);
    const createStoreWithMiddleware = applyMiddleware(actionCatchMiddleware)(createStore);
    const store = createStoreWithMiddleware(reducer);

    const subscribeOnState = (dataListener)=> {
        store.subscribe(() => {
            if (!passStoreUpdate && dataListener)
                return;

            dataListener(store.getState())
        });
    };

    class App extends Component {
        render() {
            return (
                <div>
                    <Provider store={store}>
                        {() => <TodoApp /> }
                    </Provider>
                </div>
            );
        }
    }

    return {
        App,
        dispatch: store.dispatch.bind(store),
        subscribeOnState
    }
}

