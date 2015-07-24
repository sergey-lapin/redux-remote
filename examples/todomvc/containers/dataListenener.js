import {diff, patch} from 'jsondiffpatch';
import R from 'ramda';
import {setState} from '../actions/WireActions';

const differ = (initialState = {})=> {
    let oldState = initialState;
    return (data)=> {
        const myDiff = diff(oldState, data);
        oldState = data;
        return myDiff;
    }
};

const collecter = (initialState = {})=> {
    let oldState = initialState;
    return (diffChunk)=> {
        const nextState = patch(oldState, diffChunk);
        oldState = nextState;
        return nextState;
    }
};

const collecterInstFunc = collecter();
const differInstFunc = differ();

export const dataListener = R.curry((dispatch, data)=> {
    const clone = (d)=>JSON.parse(JSON.stringify(d));
    //const obj = {...b}

    //console.log(data == data)
    //console.log(data === b)
    //console.log(data === clone(b))
    console.log(data)
    //console.log(JSON.stringify(data))
    //console.log(b)
    //console.log(JSON.stringify(b))
    //console.log(JSON.stringify(clone(b)))

    setTimeout(()=>dispatch(setState(
        //R.compose(clone, collecterInstFunc, differInstFunc)
        (data))), 0)
});