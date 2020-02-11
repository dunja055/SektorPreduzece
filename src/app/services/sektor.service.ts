import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sektor } from '../models/sektor';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class SektorService {
private readonly API_URL = 'http://localhost:8083/sektor/';
dataChange: BehaviorSubject<Sektor[]> = new BehaviorSubject<Sektor[]>([]);

constructor(private httpClient: HttpClient) {}

public getAllSektor(): Observable<Sektor[]> {
  this.httpClient.get<Sektor[]>(this.API_URL).subscribe(data => {
    this.dataChange.next(data);
  },
  (error: HttpErrorResponse) => {
    // tslint:disable-next-line:semicolon
    console.log(error.name + ' ' + error.message)
});
  return this.dataChange.asObservable();
}

public addSektor(sektor: Sektor): void {
  this.httpClient.post(this.API_URL, sektor).subscribe();
}

public updateSektor(sektor: Sektor): void {
  this.httpClient.put(this.API_URL, sektor).subscribe();
}
public deleteSektor(id: number): void {
  this.httpClient.delete(this.API_URL + id).subscribe();
}
}
