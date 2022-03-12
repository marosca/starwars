import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, of, throwError } from 'rxjs';
import { People, PeopleRequest } from '../models/people.model';
import { isNgTemplate } from '@angular/compiler';
import { Film, FilmsRequest } from '../models/films.models';

const apiUrl = 'https://swapi.dev/api';
@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    // swapi error when there is no results
    // we send our own code to container y manage error and
    // send user to a valid page
    if (error.error.detail === 'Not found') {
      return of({ error: { code: 800 } } as PeopleRequest);
    }
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  getPeople(page: number): Observable<PeopleRequest> {
    return this.http.get<PeopleRequest>(`${apiUrl}/people/?page=${page}`).pipe(
      map((item: PeopleRequest) => ({
        ...item,
        results: item.results.map((data: People) => ({
          ...data,
          id: data.url
            .replace('https://swapi.dev/api/people/', '')
            .replace('/', ''),
        })),
      })),
      catchError(this.handleError)
    );
  }

  getPeopleById(id: string): Observable<PeopleRequest> {
    return this.http.get<PeopleRequest>(`${apiUrl}/people/${id}`);
  }

  getAllFilmsByPeopleUrl(url: string): Observable<Film[]> {
    return this.http.get<FilmsRequest>(`${apiUrl}/films`).pipe(
      map((data) => {
        return data.results.filter((film) =>
          film.characters.some((c) => c === url)
        );
      })
    );
  }
}
