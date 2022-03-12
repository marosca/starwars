import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, map, take } from 'rxjs';

@Component({
  selector: 'app-people-details.container',
  templateUrl: './people-details.container.html',
  styleUrls: ['./people-details.container.scss'],
})
export class PeopleDetailsContainer implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('^^^', this.activatedRoute);
    this.activatedRoute.paramMap
      .pipe(
        map((paramMap) => console.log(paramMap)),
        take(1)
      )
      .subscribe((peopleId) => {
        console.log('****** id', peopleId);
      });
  }
  ngOnInit(): void {}
}
