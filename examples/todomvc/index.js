import React from 'react';
import { Provider } from 'react-redux';
import createStore from './containers/App';
import {dataListener} from './containers/dataListenener';
import 'todomvc-app-css/index.css';
import TodoApp from './containers/TodoApp';
import R from 'ramda';
import pure from 'react-pure-component';

const store1 = createStore();
const store2 = createStore();
const store3 = createStore();
const store4 = createStore();

store1.subscribeOnState(dataListener(store2.dispatch.bind(store2)));
//app2.subscribeOnState(dataListener(app1.dispatch.bind(app1)));

store3.subscribeOnState(dataListener(store4.dispatch.bind(store2)));
store4.subscribeOnState(dataListener(store3.dispatch.bind(store1)));

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
