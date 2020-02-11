import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Preduzece } from '../models/preduzece';

@Injectable()
export class PreduzeceService {
  private readonly API_URL = 'http://localhost:8083/preduzece/';

  dataChange: BehaviorSubject<Preduzece[]> = new BehaviorSubject<Preduzece[]>([]);

  constructor(private httpClient: HttpClient) {}

public getAllPreduzece(): Observable<Preduzece[]> {
  this.httpClient.get<Preduzece[]>(this.API_URL).subscribe(data => {
    this.dataChange.next(data);
  },
  (error: HttpErrorResponse) => {

    console.log(error.name + ' ' + error.message);

    });

  return this.dataChange.asObservable();



}
public addPreduzece(preduzece: Preduzece): void {
  this.httpClient.post(this.API_URL, preduzece).subscribe();
}

public updatePreduzece(preduzece: Preduzece): void {
  this.httpClient.put(this.API_URL, preduzece).subscribe();
}

public deletePreduzece(id: number): void {
  console.log(this.API_URL + id);
  this.httpClient.delete(this.API_URL + id).subscribe();
}

}
