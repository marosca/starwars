import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, of, throwError } from 'rxjs';
import { People, PeopleRequest } from '../models/people.model';
import { Film, FilmsRequest } from '../models/films.models';
import { getIdByUrl } from '../helpers/helpers';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  getPeople(page: number): Observable<PeopleRequest> {
    return this.http
      .get<PeopleRequest>(`${environment.apiUrl}/people/?page=${page}`)
      .pipe(
        map((item: PeopleRequest) => ({
          ...item,
          results: item.results.map((data: People) => ({
            ...data,
            id: getIdByUrl(data.url),
          })),
        }))
      );
  }

  getPeopleById(id: string): Observable<People> {
    return this.http.get<People>(`${environment.apiUrl}/people/${id}`).pipe(
      map((item: People) => ({
        ...item,
        id: getIdByUrl(item.url),
      }))
    );
  }

  getAllFilmsByPeopleId(id: string): Observable<Film[]> {
    return this.http.get<FilmsRequest>(`${environment.apiUrl}/films`).pipe(
      map((data) => {
        return data.results.filter((film) =>
          film.characters.some(
            (c) => c === `${environment.apiUrl}/people/${id}/`
          )
        );
      })
    );
  }

  getAllFilms(): Observable<Film[]> {
    return this.http
      .get<FilmsRequest>(`${environment.apiUrl}/films`)
      .pipe(map((data) => data.results));
  }
}
