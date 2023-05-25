import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



export interface Model {
  status : string;
  data : any;
}

export const hostUrl = 'http://127.0.0.1:8080/'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  sendPost(url: string, data: any): Observable<Model> {
    let avt_url = hostUrl + url;
    
    const options = {
      withCredentials: true 
    };

    return this.http.post<any>(avt_url, data, options)
  }

  sendGet(url: string): Observable<Model> {
    let avt_url = hostUrl + url;
    
    const options = {
      withCredentials: true 
    };

    return this.http.get<any>(avt_url)
  }

  sendPut(url: string, data: any): Observable<Model> {
    let avt_url = hostUrl + url;
    
    const options = {
      withCredentials: true 
    };

    return this.http.put<any>(avt_url, data, options)
  }

}
