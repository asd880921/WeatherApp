import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001';
  private format = 'JSON';

  constructor(private http: HttpClient) { }

  getWeatherData(authorization: string, locationName: string, elementName:string): Observable<any> {
    const params = new HttpParams()
    .set('format', this.format)
    .set('Authorization', authorization)
    .set('locationName', locationName)
    .set('elementName', elementName);
    return this.http.get(this.apiUrl, { params });
  }
}
