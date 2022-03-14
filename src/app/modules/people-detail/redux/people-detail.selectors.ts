import { createFeatureSelector, createSelector } from '@ngrx/store';
import { environment } from '../../../../environments/environment';
import { PeopleDetailState } from './people-detail.reducer';

export const selectPeopleDetail =
  createFeatureSelector<PeopleDetailState>('peopleDetail');

export const selectPeopleDetailById = (id: number) =>
  createSelector(selectPeopleDetail, (state) => {
    if (id && state?.people) {
      return state.people[id] || null;
    } else {
      return null;
    }
  });

export const selectPeopleDetailLoading = createSelector(
  selectPeopleDetail,
  (state: PeopleDetailState) => state.loading
);

export const selectPeopleDetailError = createSelector(
  selectPeopleDetail,
  (state: PeopleDetailState) => state.error
);

export const selectFilms = createSelector(
  selectPeopleDetail,
  (state: PeopleDetailState) => state.films
);

export const selectFilmsByPeopleId = (id: number) =>
  createSelector(selectFilms, (state) => {
    if (state.length) {
      return state.filter((film) =>
        film.characters.some((c) => c === `${environment.apiUrl}/people/${id}/`)
      );
    } else {
      return [];
    }
  });
