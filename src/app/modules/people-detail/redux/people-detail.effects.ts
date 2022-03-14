import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, switchMap, withLatestFrom } from 'rxjs/operators';
import { SwapiError } from 'src/app/models/people.model';

import { PeopleService } from 'src/app/service/people-service.service';
import { getPeopleListErrorAction } from '../../people-list/redux/people-list.actions';
import {
  getFilmsAction,
  getFilmsActionSuccess,
  getPeopleDetailAction,
  getPeopleDetailErrorAction,
  getPeopleDetailSuccessAction,
  setPeopleDetailLoading,
} from './people-detail.actions';
import { selectFilms, selectPeopleDetailById } from './people-detail.selectors';

@Injectable()
export class PeopleDetailEffects {
  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private store: Store
  ) {}

  getPeopleDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getPeopleDetailAction),
      withLatestFrom(this.store),
      switchMap(([action, store]: [any, any]) => {
        // If we have data from payload page, then dont do requet to api
        const peopleDetail = selectPeopleDetailById(action.payload)(store);
        if (peopleDetail) {
          return of(setPeopleDetailLoading({ payload: false }));
        }
        return this.peopleService.getPeopleById(action.payload).pipe(
          switchMap((data) => {
            const payload = {
              payload: {
                [action.payload]: data,
              },
            };
            return [getPeopleDetailSuccessAction(payload)];
          }),
          catchError((error: SwapiError) =>
            of(getPeopleDetailErrorAction({ payload: error }))
          )
        );
      })
    )
  );

  getFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFilmsAction),
      withLatestFrom(this.store),
      switchMap(([_action, store]: [any, any]) => {
        // If we have data from payload page, then dont do requet to api
        const films = selectFilms(store);
        if (films?.length) {
          return of(getFilmsActionSuccess({ payload: films }));
        }
        return this.peopleService.getAllFilms().pipe(
          switchMap((films) => {
            const payload = {
              payload: films,
            };
            return [getFilmsActionSuccess(payload)];
          })
        );
      })
    )
  );
}
