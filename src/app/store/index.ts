import { PeopleDetailEffects } from '../modules/people-detail/redux/people-detail.effects';
import {
  peopleDetailReducer,
  PeopleDetailState,
} from '../modules/people-detail/redux/people-detail.reducer';
import { PeopleListEffects } from '../modules/people-list/redux/people-list.effects';
import {
  peopleListReducer,
  PeopleListState,
} from '../modules/people-list/redux/people-list.reducer';

export interface AppState {
  peopleList: PeopleListState;
  peopleDetail: PeopleDetailState;
}

export const allReducers = {
  peopleList: peopleListReducer,
  peopleDetail: peopleDetailReducer,
};

export const allEffects = [PeopleListEffects, PeopleDetailEffects];
