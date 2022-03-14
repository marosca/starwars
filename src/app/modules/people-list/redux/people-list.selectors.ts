import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PeopleListState } from './people-list.reducer';

export const selectPeopleList =
  createFeatureSelector<PeopleListState>('peopleList');

export const selectPeopleListPage = (page: number) =>
  createSelector(selectPeopleList, (state) => {
    if (page && state?.pages) {
      return state.pages[page] || [];
    } else {
      return [];
    }
  });

export const selectPeopleListTotalPages = createSelector(
  selectPeopleList,
  (state: PeopleListState) => state.totalPages
);

export const selectPeopleListLoading = createSelector(
  selectPeopleList,
  (state: PeopleListState) => state.loading
);

export const selectPeopleListError = createSelector(
  selectPeopleList,
  (state: PeopleListState) => state.error
);
