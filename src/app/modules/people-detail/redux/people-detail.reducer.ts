import { createReducer, on } from '@ngrx/store';
import { Film } from 'src/app/models/films.models';
import { People, SwapiError } from '../../../models/people.model';
import {
  getFilmsAction,
  getFilmsActionSuccess,
  getPeopleDetailAction,
  getPeopleDetailErrorAction,
  getPeopleDetailSuccessAction,
  setPeopleDetailLoading,
} from './people-detail.actions';

export interface PeopleListData {
  [key: number]: People;
}

export interface PeopleDetailState {
  people?: PeopleListData;
  loading: boolean;
  error?: SwapiError;
  films: Film[];
}

export const initialState: PeopleDetailState = {
  people: undefined,
  loading: false,
  error: undefined,
  films: [],
};

export const peopleDetailReducer = createReducer(
  initialState,
  on(getPeopleDetailAction, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getPeopleDetailSuccessAction, (state, action) => {
    return {
      ...state,
      people: { ...state.people, ...action.payload },
      loading: false,
      error: undefined,
    };
  }),
  on(getPeopleDetailErrorAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }),
  on(setPeopleDetailLoading, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  }),
  on(getFilmsActionSuccess, (state, action) => {
    return {
      ...state,
      films: action.payload,
    };
  })
);
