import React from 'react';
import {ReduceStore, Container} from 'flux/utils';
import {Dispatcher} from 'flux';

const CounterDispatcher = new Dispatcher();

const ActionTypes = {
    ADD_ONE: 'ADD_ONE',
    SUBTRACT_ONE: 'SUBTRACT_ONE'
};

const Actions = {
    //Action Generator/Creator
    addOne() {
        CounterDispatcher.dispatch({
            type: ActionTypes.ADD_ONE
        });
    },
    subtractOne() {
        CounterDispatcher.dispatch({
            type: ActionTypes.SUBTRACT_ONE
        });
    }
};

class CounterStore extends ReduceStore {
    constructor() {
        super(CounterDispatcher);
    }

    getInitialState() {
        return 0;
    }

    reduce( state, action ) {
        switch(action.type) {
            case ActionTypes.ADD_ONE:
                return state + 1;
            case ActionTypes.SUBTRACT_ONE:
                return state - 1;
            default:
                return state;
        }
    }
}

const store = new CounterStore();

class CounterContainer extends React.Component {

    static getStores() {
        return [store];
    }

    static calculateState() {
        return {
            value: store.getState(),
            increment: Actions.addOne,
            decrement: Actions.subtractOne,
        }
    }

    render() {
        return (
            <section>
                <h1>A Flux Counter</h1>
                <CounterDisplay {...this.state}/>
                <CounterButtons {...this.state}/>
            </section>
        );
    }
}

const CounterDisplay = (props) => {
    return(
        <div className="row">
                <div className="col">
                    <span>{props.value}</span>
                </div>
        </div>
    );
}

const CounterButtons = (props) => {
    return (
        <div>
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={props.increment}
                >Add One
            </button>
            <button 
                type="button" 
                className="btn btn-primary"
                onClick={props.decrement}
                >Subtract One
            </button>
        </div>
    )
}

export default Container.create(CounterContainer);