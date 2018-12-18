import { createStore, combineReducers } from 'redux';

const initialState = {
    characters: [],
};

// Acciones
export const actions = {
    addChar: (ch) => {
        return {
            type: "ADD_CHAR",
            payload: ch
        };
    },
    setChars: (characters) => {
        return {
            type: "SET_CHAR",
            payload: { characters: characters }
        };
    },

    incr: () => { return { type: "INCR" } },
    decr: () => { return { type: "DECR" } },
};

// Reducers
function charReducer(state = [], action) {
    switch (action.type) {
        case "ADD_CHAR": {
            let newst = [ ...state ];
            let ch = { ...action.payload, id: newst.length + 1 };
            newst.push(ch);
            return newst;
        }
        case "SET_CHAR": {
            return action.payload.characters;
        }
        default:
            return state;
    }
}

const appReducer = combineReducers({ characters: charReducer });

// Store

export const store = createStore(appReducer, initialState);

// Debug
window.store = store;
window.actions = actions;
