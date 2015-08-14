import React from 'react';
import { Provider } from 'react-redux';
import {createSubscribeOnStateStore} from '../../src';
import 'todomvc-app-css/index.css';
import TodoApp from './containers/TodoApp';
import * as reducers from './reducers';
import R from 'ramda';
import pure from 'react-pure-component';
import * as redux from 'redux';

const SET_STATE = "@@@@SET_STATE";
const setState = (state) =>({type: SET_STATE, state});

const oldTodos = reducers.todos;

reducers.todos = (state, action)=>{
    switch (action.type) {
        case SET_STATE:
            return action.state.todos;
        default:
            return oldTodos(state, action)
    }
};

const store1 = createSubscribeOnStateStore(redux, SET_STATE, reducers);
const store2 = createSubscribeOnStateStore(redux, SET_STATE, reducers);
const store3 = createSubscribeOnStateStore(redux, SET_STATE, reducers);
const store4 = createSubscribeOnStateStore(redux, SET_STATE, reducers);

const dispatchState = (store)=>(state)=>store.dispatch(setState(state));

store1.subscribeOnState((data)=>dispatchState(store2)(data));
//app2.subscribeOnState((data)=>dispatchState(store2)(data)));
store3.subscribeOnState((data)=>dispatchState(store4)(data));
store4.subscribeOnState((data)=>dispatchState(store3)(data));

const createApp = R.curry((UserApp, store) => pure(()=>(
    <Provider store={store}>
        {() => <UserApp /> }
    </Provider>
)));

const createTodoApp = createApp(TodoApp);

const App1 = createTodoApp(store1);
const App2 = createTodoApp(store2);
const App3 = createTodoApp(store3);
const App4 = createTodoApp(store4);

React.render(
    <App1 />,
    document.getElementById('root1')
);

React.render(
    <App2 />,
    document.getElementById('root2')
);

React.render(
    <App3 />,
    document.getElementById('root3')
);

React.render(
    <App4 />,
    document.getElementById('root4')
);
