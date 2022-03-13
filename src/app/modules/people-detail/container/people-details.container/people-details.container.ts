import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, Subscription, take } from 'rxjs';
import { paths } from '../../../../app-routing.paths';
import { Film } from 'src/app/models/films.models';
import { People } from 'src/app/models/people.model';
import { PeopleService } from 'src/app/service/people-service.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-people-details.container',
  templateUrl: './people-details.container.html',
  styleUrls: ['./people-details.container.scss'],
})
export class PeopleDetailsContainer implements OnInit {
  id!: string;
  person!: People;
  imgURL = environment.apiImageUrl;
  // Subscriptions: Even with take(1) or first(),
  // we must AutoUnsubscribe them to prevent attempts to update
  // after component destroyed when waiting for the response to come
  subscriptions: Subscription[] = [];
  films: Film[] = [];
  paths = paths;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private peopleService: PeopleService
  ) {
    console.log('^^^', this.activatedRoute);
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => paramMap.get('id')),
        take(1)
      )
      .subscribe((peopleId) => {
        this.id = peopleId || '';
        this.imgURL = `${this.imgURL}/${this.id}.jpg`;
        this.subscriptions.push(
          this.peopleService.getPeopleById(this.id).subscribe((person) => {
            this.person = person;
          })
        );

        this.subscriptions.push(
          this.peopleService
            .getAllFilmsByPeopleId(this.id)
            .subscribe((films) => {
              this.films = films;
            })
        );
      });
  }
  ngOnInit(): void {}
}
