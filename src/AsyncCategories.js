import React from 'react';
import {ReduceStore, Container} from 'flux/utils';
import {Dispatcher} from 'flux';


const AsyncDispatcher = new Dispatcher();

const ActionTypes = {
    REQUEST_CATEGORIES: 'REQUEST_CATEGORIES',
    REQUEST_CATEGORIES_SUCCESS: 'REQUEST_CATEGORIES_SUCCESS',
    REQUEST_CATEGORIES_ERROR: 'REQUEST_CATEGORIES_ERROR',
};

const Actions = {
    requestSuccess(categories) {
        AsyncDispatcher.dispatch({
            type: ActionTypes.REQUEST_CATEGORIES_SUCCESS,
            categories,
            lastUpdated: Date.now(),
            status: 'SUCCESS'
        });
    },

    requestError(error) {
        AsyncDispatcher.dispatch({
            type: ActionTypes.REQUEST_CATEGORIES_ERROR,
            error,
            lastUpdated: Date.now(),
            status: 'ERROR'
        });
    },

    requestCategories() {
        AsyncDispatcher.dispatch({
            type: ActionTypes.REQUEST_CATEGORIES,
            lastUpdated: Date.now(),
            status: 'FETCHING'
        });
    },

    fetchCategories() {
        Actions.requestCategories();
        fetch('http://localhost:8000/categories')
        .then(res => res.json())
        .then(categories => Actions.requestSuccess(categories))
        .catch(error => Actions.requestError(error));
    }
};

class AsyncStore extends ReduceStore {
    constructor() {
        super(AsyncDispatcher);
    }

    getInitialState() {
        return {lastUpdated: Date.now(), status: 'INIT', categories: []};
    }

    reduce(state, action) {
        const baseState = {lastUpdated: action.lastUpdated, status: action.status, categories: []};

        switch(action.type) {
            case ActionTypes.REQUEST_CATEGORIES:
                return {...baseState};
            case ActionTypes.REQUEST_CATEGORIES_SUCCESS:
                return {...baseState, categories: action.categories};
            case ActionTypes.REQUEST_CATEGORIES_ERROR:
                return {...baseState, error: action.error};
            default:
                return state;
        }
    }
}

const store = new AsyncStore();


const CategoriesList = (props) => {
  return (
    <ul>
      {
          props.categories.map(category => <li key={category.id}>{category.categoryName}</li>)
      }
    </ul>
  );
}


const RequestButton = (props) => {
  return (
    <div>
        <button 
            type="button" 
            className="btn btn-primary" 
            onClick={props.fetchCategories}>
            Refresh Categories
        </button>
    </div>
  );
}


class AsyncCategoriesContainer extends React.Component {
    
    static getStores() {
        return [store];
    }

    static calculateState() {
        return {
            categories: store.getState().categories,
            error: store.getState().error,
            lastUpdated: store.getState().lastUpdated,
            status: store.getState().status,
            fetchCategories: Actions.fetchCategories,
        }
    }

    render() {
        return (
            <React.Fragment>
                <header>
                    <h2>Fetching categories</h2>
                </header>
                <RequestButton {...this.state}/>
                <CategoriesList {...this.state}/>
            </React.Fragment>
        );
    }
}

export default Container.create(AsyncCategoriesContainer);