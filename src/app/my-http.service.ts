import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, RouterStateSnapshot, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MyHttpService {


planets_api = 'https://findfalcone.herokuapp.com/planets';
vehicle_api = 'https://findfalcone.herokuapp.com/vehicles';
find_falclone_api_token = 'https://findfalcone.herokuapp.com/token';
find_falclone_api_request = 'https://findfalcone.herokuapp.com/find';

constructor(public http: Http, private route: Router) { }

canActivate(route, state: RouterStateSnapshot) {
  if (localStorage.getItem('token')) {
    return true;
  }
  this.route.navigate(['/']);
  return false;
}

get_planets() {
  return this.http.get(this.planets_api);
}

get_vehicles() {
  return this.http.get(this.vehicle_api);
}


post_token() {
  // tslint:disable-next-line:prefer-const
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  return this.http.post(this.find_falclone_api_token, '', {headers: headers});
}

post_resquest(body) {
  // tslint:disable-next-line:prefer-const
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  return this.http.post(this.find_falclone_api_request, body, {headers: headers});
}
}

