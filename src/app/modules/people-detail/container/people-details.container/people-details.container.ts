import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { distinctUntilChanged, filter, map, Subscription, take } from 'rxjs';
import { paths } from '../../../../app-routing.paths';
import { Film } from 'src/app/models/films.models';
import { People } from 'src/app/models/people.model';
import { environment } from '../../../../../environments/environment';
import { Store } from '@ngrx/store';
import {
  getFilmsAction,
  getPeopleDetailAction,
} from '../../redux/people-detail.actions';
import {
  selectFilmsByPeopleId,
  selectPeopleDetailById,
  selectPeopleDetailError,
  selectPeopleDetailLoading,
} from '../../redux/people-detail.selectors';
@Component({
  selector: 'app-people-details.container',
  templateUrl: './people-details.container.html',
  styleUrls: ['./people-details.container.scss'],
})
export class PeopleDetailsContainer implements OnInit {
  id!: string;
  person!: People;
  imgURL = environment.apiImageUrl + '/characters';
  imgURLFilm = environment.apiImageUrl + '/films';
  // Subscriptions: Even with take(1) or first(),
  // we must AutoUnsubscribe them to prevent attempts to update
  // after component destroyed when waiting for the response to come
  subscriptions: Subscription[] = [];
  films: Film[] = [];
  paths = paths;
  error = false;
  loadingPage$ = this.store.select(selectPeopleDetailLoading);

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        take(1)
      )
      .subscribe((peopleId) => {
        this.id = peopleId || '';
        this.imgURL = `${this.imgURL}/${this.id}.jpg`;
        this.store.dispatch(getPeopleDetailAction({ payload: +this.id }));
        this.store.dispatch(getFilmsAction());

        this.subscriptions.push(
          this.store
            .select(selectPeopleDetailById(+this.id))
            .pipe(
              filter((data) => !!data),
              distinctUntilChanged()
            )
            .subscribe((person) => {
              this.person = person as People;
              this.error = false;
            })
        );

        this.subscriptions.push(
          this.store
            .select(selectFilmsByPeopleId(+this.id))
            .subscribe((films) => {
              this.films = films;
              console.log('**** this.films', films);
            })
        );
      });

    this.subscriptions.push(
      this.store
        .select(selectPeopleDetailError)
        .pipe(
          filter((error) => !!error),
          distinctUntilChanged()
        )
        .subscribe((error) => {
          if (!error?.ok) {
            this.error = true;
          }
        })
    );
  }
  ngOnInit(): void {}

  getFilmImgUrl(url: string) {
    const filmId = url
      .replace(`${environment.apiUrl}/films/`, '')
      .replace('/', '');
    console.log(this.imgURLFilm + '/' + filmId);
    return this.imgURLFilm + '/' + filmId + '.jpg';
  }
}
