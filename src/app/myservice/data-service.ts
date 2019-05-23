import { Http } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
export class DataService {
  public response3: any;


  static get parameters() {
    return [[Http]];
  }

  urldom: string = "https://xxxxxx/";

  constructor(private http: Http) {
  }

  serviceAllWKorisnikPhp(par_vrkor: string, par_brkor: string) {
    if (par_vrkor === undefined) {
      par_vrkor = "";
    }
    if (par_brkor === undefined) {
      par_brkor = "";
    }

    var url = this.urldom + 'S_wkorcombo.php'
      + '?vrkor="' + par_vrkor + '"'
      + '&brkor="' + par_brkor + '"'

   //  console.log(" serviceAllWKorisnikPhp " + url);
    var response = this.http.get(url).map(res => res.json());
    this.http.get(url).subscribe(res => { // console.log(res); ž
    });
    return response;
  }


  serviceWkorpregledPhp(stan: number) {

    var url = this.urldom + 'S_wkorpregleda.php'
      + '?stan="' + stan + '"'
      + '&kupdob=""'
      + '&datumod=""'
      + '&datumdo=""'


    var response = this.http.get(url).map(res => res.json());
    this.http.get(url).subscribe(res => { //console.log(res);
    });
    return response;
  }

  serviceWmajstorpregledPhp(majstor: string, ulaz: number, ) {
    var url = this.urldom + 'S_wkorpregledb.php'
      + '?ulaz="' + ulaz + '"'
      + '&kupdob="' + majstor + '"'
      + '&datumod=""'
      + '&datumdo=""'
    var response = this.http.get(url).map(res => res.json());
    this.http.get(url).subscribe(res => { //console.log(res); 
    });
    return response;
  }

  serviceWpredstavnikpregledPhp(ulaz: number, vrsta: string, kupdob: string, datumod: string, datumdo: string) {
    if (kupdob == undefined) {
      kupdob = "";
    }
    if (datumod == undefined) {
      datumod = "";
    }
    if (datumdo == undefined) {
      datumdo = "";
    }
    var url = this.urldom + 'S_wkorpregledc.php'
      + '?vrsta="' + vrsta + '"'
      + '&ulaz="' + ulaz + '"'
      + '&kupdob="' + kupdob + '"'
      + '&datumod="' + datumod + '"'
      + '&datumdo="' + datumdo + '"'
    var response = this.http.get(url).map(res => res.json());
    this.http.get(url).subscribe(res => {
    });
    return response;
  }
  getPospPartTypeAhead() {
    var url = this.urldom + 'S_poslpartcombo.php?firma=1'
    return this.http.get(url).map(res => res.json());
  }
  getUlazTypeAhead() {
    var url = this.urldom + 'S_ulazcombo.php?firma=1'
    return this.http.get(url).map(res => res.json());
  }



  ispisiPregObrJson(dataListCtrl) {
    var sendctrl = "[";
    for (var i = 0; i < dataListCtrl.length; i++) {
      sendctrl = sendctrl + '' + dataListCtrl[i].Broj
      if (i < dataListCtrl.length - 1) {
        sendctrl = sendctrl + ',';
      }

    }
    sendctrl = sendctrl + "]";
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    var url = this.urldom + 'S_racunjson.php?'
      + 'areajson=' + '"' + sendctrl + '"';

    var response = this.http.get(url).map(res => res.json());
    this.http.get(url).subscribe(res => { //console.log(res);
    });
    return response;

  }
  /////////////////////////////////////////////
  //////////////
  ispisiPregObrJsonPlin(dataListCtrl) {
    var sendctrl = "[";
    for (var i = 0; i < dataListCtrl.length; i++) {
      sendctrl = sendctrl + '' + dataListCtrl[i].Broj
      if (i < dataListCtrl.length - 1) {
        sendctrl = sendctrl + ',';
      }

    }
    sendctrl = sendctrl + "]";

    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    var url = this.urldom + 'S_racunjsonplin.php?'
      + 'areajson=' + '"' + sendctrl + '"';
    var response = this.http.get(url).map(res => res.json());
    this.http.get(url).subscribe(res => { //console.log(res); 
    });
    return response;
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  }


  serviceWRegistracijaPhp(korime: string, pozivnabroj: string, lozinka: string) {
    var url = this.urldom + 'S_wkorloginregistracija.php'
      + '?username="' + korime + '"'
      + '&broj="' + pozivnabroj + '"'
      + '&password="' + lozinka + '"'
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  serviceWIzmjenaLozPhp(korime: string, lozinka: string, lozinkanova: string) {
    var url = this.urldom + 'S_wkorloginizmjena.php'
      + '?username="' + korime + '"'
      + '&passwords="' + lozinka + '"'
      + '&passwordn="' + lozinkanova + '"'
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  serviceWZaboraviliLozPhp(korime: string) {
    var url = this.urldom + 'S_wkorloginkreiranje.php'
      + '?username="' + korime + '"'
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}