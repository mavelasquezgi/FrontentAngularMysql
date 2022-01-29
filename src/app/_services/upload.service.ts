import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  
  private URL = environment.url;

  constructor(private http: HttpClient) { }
  upload(formData: any, station: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}/upload/${station}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
