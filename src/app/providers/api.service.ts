import { Injectable } from '@angular/core';
import { Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

  //  url: string = "http://app.fotopoint.hr/newmedicapi/";
 // --   url: string = "http://app.fotopoint.hr/demoupravitelj/";
    // http://app.fotopoint.hr/demowupravitelj/S_wkorlogin.php?username="1"&password="1"

url: string = "https://xxxxxx/";
  constructor(public http: Http) {
  }



  get(endpoint: string, params?: any, options?: RequestOptions) {
    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
