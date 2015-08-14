export default (redux, SET_STATE_ACTION, reducers)=> {
    let passStoreUpdate = false;

    const onAction = (action)=> {
        console.log(action.type);
        passStoreUpdate = action.type !== SET_STATE_ACTION;
    };

    const actionCatchMiddleware = ({dispatch}) => next => action => {
        console.log(action);
        onAction(action);
        next(action);
    };

    const createStoreWithMiddleware = redux.applyMiddleware(actionCatchMiddleware)(redux.createStore);
    const store = createStoreWithMiddleware(redux.combineReducers(reducers));

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

