import { Action, createAction, props } from '@ngrx/store';
import { Film } from 'src/app/models/films.models';
import { SwapiError } from 'src/app/models/people.model';
import { PeopleListData } from './people-detail.reducer';

export const GET_PEOPLE_DETAIL = 'people-details/GET_PEOPLE_DETAIL';
export const GET_FILMS = 'people-details/GET_FILMS';
export const GET_PEOPLE_DETAIL_SUCCESS =
  'people-details/GET_PEOPLE_DETAIL_SUCCESS';
export const GET_PEOPLE_DETAIL_ERROR = 'people-details/GET_PEOPLE_DETAIL_ERROR';
export const SET_LOADING = 'people-details/SET_LOADING';
export const GET_FILMS_SUCCESS = 'people-details/GET_FILMS_SUCCESS';

export const getPeopleDetailAction = createAction(
  GET_PEOPLE_DETAIL,
  props<{ payload: number }>()
);
export const getPeopleDetailSuccessAction = createAction(
  GET_PEOPLE_DETAIL_SUCCESS,
  props<{ payload: PeopleListData }>()
);

export const getPeopleDetailErrorAction = createAction(
  GET_PEOPLE_DETAIL_ERROR,
  props<{ payload: SwapiError }>()
);

export const setPeopleDetailLoading = createAction(
  SET_LOADING,
  props<{ payload: boolean }>()
);

export const getFilmsAction = createAction(GET_FILMS);

export const getFilmsActionSuccess = createAction(
  GET_FILMS_SUCCESS,
  props<{ payload: Film[] }>()
);
