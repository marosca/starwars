import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../service/people-service.service';
import { People } from '../../../models/people.model';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Subscription, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Store } from '@ngrx/store';
import { getPeopleListAction } from '../redux/people-list.actions';
import {
  selectPeopleListTotalPages,
  selectPeopleListPage,
  selectPeopleListLoading,
  selectPeopleListError,
} from '../redux/people-list.selectors';
@Component({
  selector: 'app-people-list.container',
  templateUrl: './people-list.container.component.html',
  styleUrls: ['./people-list.container.component.scss'],
})
export class PeopleListContainer implements OnInit {
  people: People[] = [];
  currentPage!: number;
  totalPages$ = this.store.select(selectPeopleListTotalPages).pipe(
    filter((total) => !!total),
    take(1)
  );
  loadingPage$ = this.store.select(selectPeopleListLoading);
  error = false;

  imgURL = environment.apiImageUrl + '/characters';
  // Subscriptions: Even with take(1) or first(),
  // we must AutoUnsubscribe them to prevent attempts to update
  // after component destroyed when waiting for the response to come
  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
    this.subscriptions.push(
      this.activatedRoute.queryParamMap
        .pipe(
          map((queryParamMap) => queryParamMap.get('page')),
          distinctUntilChanged()
        )
        .subscribe((page) => {
          if (!page || page === '0') {
            this.currentPage = 1;
            this.navigate(this.currentPage);
          } else {
            this.currentPage = +page;

            this.store.dispatch(
              getPeopleListAction({ payload: this.currentPage })
            );

            this.subscriptions.push(
              this.store
                .select(selectPeopleListPage(this.currentPage))
                .pipe(
                  filter((data) => !!data?.length),
                  distinctUntilChanged()
                )
                .subscribe((result) => {
                  this.error = false;
                  this.people = result || [];
                })
            );

            this.subscriptions.push(
              this.store
                .select(selectPeopleListError)
                .pipe(
                  filter((error) => !!error),
                  distinctUntilChanged()
                )
                .subscribe((error) => {
                  // invalida page number
                  if (error?.error.detail === 'Not found') {
                    this.navigate(1);
                  }
                  if (!error?.ok) {
                    this.error = true;
                  }
                })
            );
          }
        })
    );
  }

  ngOnInit(): void {}

  navigate(page: number, replace = true) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      replaceUrl: replace,
      queryParams: {
        page,
      },
      queryParamsHandling: 'merge',
    });
  }

  getImage(id?: string) {
    return `${this.imgURL}/${id}.jpg`;
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
