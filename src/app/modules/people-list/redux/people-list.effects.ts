import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from, of } from 'rxjs';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { SwapiError } from 'src/app/models/people.model';

import { PeopleService } from 'src/app/service/people-service.service';
import {
  getPeopleListAction,
  getPeopleListSuccessAction,
  getPeopleListErrorAction,
  setTotalPagesAction,
  setPeopleListLoading,
} from './people-list.actions';
import { selectPeopleListPage } from './people-list.selectors';

@Injectable()
export class PeopleListEffects {
  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store
  ) {}

  getPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeopleListAction),
      withLatestFrom(this.store),
      switchMap(([action, store]: [any, any]) => {
        // If we have data from payload page, then dont do requet to api
        const pageData = selectPeopleListPage(action.payload)(store);
        if (pageData?.length) {
          return of(setPeopleListLoading({ payload: false }));
        }
        // Only if we dont have information of current page, then request to api
        return this.peopleService.getPeople(action.payload).pipe(
          switchMap((data) => {
            return [
              setTotalPagesAction({ payload: data?.count }),
              getPeopleListSuccessAction({
                payload: { [action.payload]: data?.results },
              }),
            ];
          }),
          catchError((error: SwapiError) =>
            of(getPeopleListErrorAction({ payload: error }))
          )
        );
      })
    )
  );
}
