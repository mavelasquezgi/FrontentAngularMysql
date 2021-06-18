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
  uploadVideo(formData: any, chanel: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}/uploadvideo/${chanel}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  uploadPress(formData: any, press: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}/uploadpress/${press}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  uploadAutoPress(formData: any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}/autoUploadpress`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  press(formData: any, press: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}/pressload/${press}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  public uploadtest(formData: any, press: string) {
    return this.http.post<any>(`${this.URL}/pressload/${press}`, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
  uploadWeb(formData: any, web: string): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.URL}/uploadweb/${web}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
  speech(formData:any): Observable<HttpEvent<any>> {    
    console.log(formData);
    const req = new HttpRequest('POST', `${this.URL}/speechtotextfile`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }
}
