import { Component, Input, OnInit } from '@angular/core';
import { People } from 'src/app/models/people.model';
import { paths } from '../../../../app-routing.paths';

@Component({
  selector: 'people-card',
  templateUrl: './people-card.component.html',
  styleUrls: ['./people-card.component.scss'],
})
export class PeopleCardComponent implements OnInit {
  @Input() person!: People;
  @Input() imgUrl!: string;
  constructor() {}

  paths = paths;
  ngOnInit(): void {}
}
