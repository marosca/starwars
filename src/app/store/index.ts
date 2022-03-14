import { ActionReducerMap } from '@ngrx/store';
import { PeopleListEffects } from '../modules/people-list/redux/people-list.effects';
import {
  peopleListReducer,
  PeopleListState,
} from '../modules/people-list/redux/people-list.reducer';

export interface AppState {
  peopleList: PeopleListState;
}

export const allReducers = {
  peopleList: peopleListReducer,
};

export const allEffects = [PeopleListEffects];
