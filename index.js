import { createStore ,applyMiddleware,combineReducers} from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

const INC='increment';
const DEC='decrement';
const INCBYVALUE='incrementByAmount';
const INIT='init';
const store= createStore(combineReducers({
    account:accountReducer,
    bonus:bonusReducer
}),applyMiddleware(logger.default,thunk.default));

function accountReducer(state={amount:1},action){
    switch(action.type){
        case INIT:
            return {amount:action.payload}
        case INC :
            return {amount:state.amount+1}    
        case DEC :
            return {amount:state.amount-1}
        case INCBYVALUE :
            return {amount:state.amount + action.payload}
        default:
            return state;    
    }
}
function bonusReducer(state={points:0},action){
    switch(action.type){
        
        case INC :
            return {points:state.points+1}    
       
        default:
            return state;    
    }
}

//global state
console.log(store.getState());

//Action Creators
function getUser(id){
    return async (dispatch,getState) =>{
    const {data}= await axios.get(`http://localhost:3000/account/${id}`);
    dispatch(initUser(data.amount));
    }
}
function initUser(value){
    return {type:INIT,payload:value};
}
function increment(){
    return {type:INC}
}
function decrement(){
    return {type:DEC}
}
function incrementByAmount(value){
    return {type:INCBYVALUE,payload:value}
}

setInterval(()=>{
    store.dispatch(increment())
},2000);


console.log(store.getState());