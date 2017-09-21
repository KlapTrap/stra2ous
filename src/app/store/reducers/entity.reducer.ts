import { mergeState } from './../helpers/reducer.helper';
import { EntitiesState } from './entity.reducer';
import { ApiActionTypes } from './../actions/api.actions';
import { Action } from '@ngrx/store';

export interface EntitiesState {
    application: any;
    stack: any;
    space: any;
}

export const defaultEntitiesState = {
     application: {},
     stack: {},
     space: {}
};

export function entitiesReducer(state: EntitiesState = defaultEntitiesState, action) {
    switch (action.apiType) {
        case ApiActionTypes.API_REQUEST_SUCCESS:
            return mergeState(state, action.response.entities);
        default:
            return state;
    }
}
