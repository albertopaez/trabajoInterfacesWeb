import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  public API_ENDPOINT = 'http://localhost:3000/api/';
  
  constructor() { }
}
