import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  searchValue: any;

  constructor(private http:HttpClient) { }
  getappNoti(busqueda?: string) {
    let url = 'https://www.hostcatedral.com/api/appNoti/public/buscar/';
    if (busqueda) {
      url += busqueda;
    }
    return this.http.get(url);
  }
}

