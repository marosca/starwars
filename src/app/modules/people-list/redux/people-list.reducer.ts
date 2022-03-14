import { createReducer, on } from '@ngrx/store';
import { People, SwapiError } from '../../../models/people.model';
import {
  getPeopleListAction,
  getPeopleListSuccessAction,
  getPeopleListErrorAction,
  setTotalPagesAction,
  setPeopleListLoading,
} from './people-list.actions';

export interface PeopleListPage {
  [key: number]: People[];
}

export interface PeopleListState {
  pages?: PeopleListPage;
  totalPages?: number;
  loading: boolean;
  error?: SwapiError;
}

export const initialState: PeopleListState = {
  pages: undefined,
  totalPages: undefined,
  loading: false,
  error: undefined,
};

export const peopleListReducer = createReducer(
  initialState,
  on(setTotalPagesAction, (state, action) => {
    return {
      ...state,
      totalPages: action.payload,
    };
  }),
  on(getPeopleListAction, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  }),
  on(getPeopleListSuccessAction, (state, action) => {
    return {
      ...state,
      pages: { ...state.pages, ...action.payload },
      loading: false,
      error: undefined,
    };
  }),
  on(getPeopleListErrorAction, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  }),
  on(setPeopleListLoading, (state, action) => {
    return {
      ...state,
      loading: false,
    };
  })
);
