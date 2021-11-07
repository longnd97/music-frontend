import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor( private http:HttpClient) { }

  getAuthHeaders() {
    const token = localStorage.getItem('token')
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

  createPlaylist(data:any):Observable<any>{
    return this.http.post(environment.api_url + 'playlists/create-playlist',data,{headers:this.getAuthHeaders()})
  }

  getCategories(): Observable<any> {
    return this.http.get(environment.api_url + 'categories');
  }

}