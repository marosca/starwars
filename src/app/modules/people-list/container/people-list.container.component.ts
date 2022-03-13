import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../../service/people-service.service';
import { People } from '../../../models/people.model';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, Subscription, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-people-list.container',
  templateUrl: './people-list.container.component.html',
  styleUrls: ['./people-list.container.component.scss'],
})
export class PeopleListContainer implements OnInit {
  people: People[] = [];
  currentPage!: number;
  totalPages!: number;
  imgURL = environment.apiImageUrl;
  // Subscriptions: Even with take(1) or first(),
  // we must AutoUnsubscribe them to prevent attempts to update
  // after component destroyed when waiting for the response to come
  subscriptions: Subscription[] = [];

  constructor(
    private peopleService: PeopleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
            this.subscriptions.push(
              this.peopleService
                .getPeople(this.currentPage)
                .subscribe((data) => {
                  if (data?.error?.code === 800) {
                    this.navigate(1);
                  }
                  this.people = data?.results || [];
                  this.totalPages = data?.count;
                })
            );
          }
        })
    );
  }

  ngOnInit(): void {}

  goToDetail(url: string) {
    console.log('****', url);
  }

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
