import { Component, OnInit } from '@angular/core';
import { paths } from 'src/app/app-routing.paths';

@Component({
  selector: 'app-home.container',
  templateUrl: './home.container.html',
  styleUrls: ['./home.container.scss'],
})
export class HomeContainer implements OnInit {
  constructor() {}
  paths = paths;
  ngOnInit(): void {}
}
