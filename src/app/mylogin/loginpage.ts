import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthenticationService } from '../providers/index';
import { CookieService } from 'angular2-cookie/core';
import { DataService } from '../myservice/data-service';
import { ValidationService } from './validation.service';

@Component({
  templateUrl: 'loginpage.html',
  styleUrls: ['./loginpage.scss']
})
export class LoginComponent {
  model: any = { username: "", password: "" };

  returnUrl: string;
  loginOK: boolean = true;
  registracijaOK: boolean = false;

  registracijaForm: boolean = false;
  zaboraviliForm: boolean = false;
  zaboravilijson: any[];
  zaboraviliodgovor: string;
  // newProduct : any ={} ;
  newProduct: any = { Korime: "", Pozinb: "", Lozinka: "" };
  registracijajson: any[];
  public form: FormGroup;
  public formreg: FormGroup;
  public formzaborav: FormGroup;

  zaboraviliValidateForm: any;
  zaboraviliOK: boolean = false;
  newProductzaborav: any = { Korime: "" };

  constructor(private dataService: DataService, private _cookieService: CookieService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authenticationService: AuthenticationService) {

  }
  ngOnInit() {

    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.form = this.formBuilder.group({
      'uname': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required]]
    });

    this.formreg = this.formBuilder.group({
      'korime': ['', [Validators.required, ValidationService.emailValidator]],
      'pozinb': ['', [Validators.required]],
      'lozinka': ['', [Validators.required]]

    });
    this.formzaborav = this.formBuilder.group({
      'korimezaborav': ['', [Validators.required, ValidationService.emailValidator]]


    });



  }

  onSubmit() {

    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      data => {
        this.loginOK = true;
        if (localStorage.getItem('user_uname') === null) {
          this.loginOK = false;

        }
        if (this.loginOK) {

          localStorage.setItem('user_username', this.model.username);
          this.router.navigate(['home']);
        }


      },
      error => {
      });
  }
  saveRegistracija(product) {
    this.registracijaOK = false;

    this.dataService.serviceWRegistracijaPhp(product.Korime, product.Pozinb, product.Lozinka).subscribe(

      data => {
        this.registracijajson = data;
        if (this.registracijajson[0].Odgovor === "UREDU") {
          this.registracijaOK = true;
        }

      },
      error => {

      });

  }

  saveZaboravili(product) {
    this.zaboraviliOK = false;

    this.dataService.serviceWZaboraviliLozPhp(product.Korime).subscribe(
      data => {
        this.zaboravilijson = data;
        if (this.zaboravilijson[0].Odgovor === "UREDU") {
          this.zaboraviliOK = true;
          this.zaboraviliodgovor = this.zaboravilijson[0].Odgovor;

        }
      },
      error => {

      });

  }




  showRegistracijaForm() {
    this.registracijaForm = true;
  }
  cancelNewForm() {
    this.registracijaForm = false;
    this.zaboraviliForm = false;

    this.registracijaOK = false;
  }
  showZaboraviliForm() {
    this.zaboraviliForm = true;
  }

}
