import React from 'react';
import createApp from './containers/App';
import {dataListener} from './containers/dataListenener';
import 'todomvc-app-css/index.css';

const app1 = createApp();
const {App:App1} = app1;
const app2= createApp();
const {App:App2} = app2;
const app3 = createApp();
const {App:App3} = app3;
const app4= createApp();
const {App:App4} = app4;

app1.subscribeOnState(dataListener(app2.dispatch.bind(app2)));
//app2.subscribeOnState(dataListener(app1.dispatch.bind(app1)));

app3.subscribeOnState(dataListener(app4.dispatch.bind(app2)));
app4.subscribeOnState(dataListener(app3.dispatch.bind(app1)));

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
