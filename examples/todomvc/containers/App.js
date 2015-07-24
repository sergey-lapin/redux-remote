import React, { Component } from 'react';
import TodoApp from './TodoApp';
import { createRedux, createDispatcher, composeStores} from 'redux';
import thunkMiddleware from 'redux/lib/middleware/thunk';
import { Provider } from 'redux/react';
import * as reducers from '../reducers';
import {SET_STATE} from '../constants/WireActions';
import {dataListener} from './dataListenener';

export default function createApp() {
    let passStoreUpdate = false;

    const onAction = (action)=> {
        console.log(action.type)
        console.log(SET_STATE)
        passStoreUpdate = action.type !== SET_STATE;
    };

    const subscribeOnState = (dataListener)=> {
        redux.subscribe(() => {
            console.log(redux.getState());
            console.log(passStoreUpdate);
            if (!passStoreUpdate)
                return;

            dataListener(redux.getState())
        });
    };

    const dispatcher = createDispatcher(
        composeStores(reducers),
            getState => [
            thunkMiddleware(getState),
                next => action => {
                onAction(action);
                return next(action);
            }
        ]
    );

    const redux = createRedux(dispatcher);

    class App extends Component {
        render() {
            return (
                <div>
                    <Provider redux={redux}>
                        {() => <TodoApp /> }
                    </Provider>
                </div>
            );
        }
    }

    return {
        App,
        dispatch:redux.dispatch.bind(redux),
        subscribeOnState
    }
}
