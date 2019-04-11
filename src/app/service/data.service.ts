import { Injectable } from '@angular/core';
import { DATA } from '../model/data.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;
  subjectData = new Subject<any>();
  localData: any;

  constructor() {
    if (localStorage.getItem('data') === null) {
      this.data = DATA;
      localStorage.setItem('data', JSON.stringify(this.data));
    } else {
      this.localData = localStorage.getItem('data');
      this.data = JSON.parse(this.localData);
    }
}

  //stocker jeu de donnée dans localStorage
  sendData(data: any) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  getData() {
      return this.data;
  }
}
