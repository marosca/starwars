import { Action, createAction, props } from '@ngrx/store';
import { SwapiError } from 'src/app/models/people.model';
import { PeopleListPage } from './people-list.reducer';

export const GET_PEOPLE = 'people-list/GET_PEOPLE';
export const GET_PEOPLE_SUCCESS = 'people-list/GET_PEOPLE_SUCCESS';
export const GET_PEOPLE_ERROR = 'people-list/GET_PEOPLE_ERROR';
export const SET_TOTAL_PAGES = 'people-list/SET_TOTAL_PAGES';
export const SET_LOADING = 'people-list/SET_LOADING';

export const getPeopleListAction = createAction(
  GET_PEOPLE,
  props<{ payload: number }>()
);
export const getPeopleListSuccessAction = createAction(
  GET_PEOPLE_SUCCESS,
  props<{ payload: PeopleListPage }>()
);

export const getPeopleListErrorAction = createAction(
  GET_PEOPLE_ERROR,
  props<{ payload: SwapiError }>()
);

export const setTotalPagesAction = createAction(
  SET_TOTAL_PAGES,
  props<{ payload: number }>()
);

export const setPeopleListLoading = createAction(
  SET_LOADING,
  props<{ payload: boolean }>()
);
