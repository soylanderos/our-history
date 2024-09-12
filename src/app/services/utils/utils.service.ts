import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key) as string); // Add type assertion here
  }
  
}
