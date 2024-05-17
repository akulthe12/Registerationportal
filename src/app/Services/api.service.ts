import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getRegistrationDetails()
  {
   return this.http.get("http://localhost:3000/registration")
  }
  postRegistrationDetails(obj: any) {
    return this.http.post("http://localhost:3000/registration",obj);
  }
  deleteRegistrationDetails(id:Number): Observable<any>
  {
    return this.http.delete("http://localhost:3000/registration/" +id);
  }
  updateRegistrationDetails(id: Number,obj:any): Observable<any> {
    return this.http.put("http://localhost:3000/registration/"+id, obj); 
  }
}
