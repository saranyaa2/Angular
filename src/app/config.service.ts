import { Injectable } from '@angular/core';
import { configuration} from './configuration';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Post } from './post';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  config = configuration;
  apiUrl = 'api/posts';
  constructor(private http: HttpClient) { }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getConfig(){
    return this.config;
  }
  getPosts(): Observable<Post[]>{
      return this.http.get<any>(this.apiUrl).pipe(
        tap(
          post=> console.log(post)
        ),
        catchError(this.handleError('Get Posts', []))
      );
  }

  getPostById(id: number){
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(
        post=> console.log(post)
      ),
      catchError(this.handleError('Get Posts by ID', []))
    );
  }
}
