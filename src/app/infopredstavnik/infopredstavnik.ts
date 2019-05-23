import { Component } from '@angular/core';
import { DataService } from '../myservice/data-service';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../providers/index';
import { InfoPredstavnikSlog } from './infopredstavnikslog';
import { SifrDataService } from '../myservice/sifrdata';
import { SlogCtrl } from './slogctrl';
import { DatePipe } from '@angular/common';
import generateBarcode from 'pdf417/build/index.js';
import * as pdfMake from 'pdfmake/build/pdfmake.min.js'
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'infopredstavnik',
  templateUrl: './infopredstavnik.html',
  styleUrls: ['./infopredstavnik.css']
  , providers: [DatePipe]

})
export class InfoPredstavnik {

  productFormVlStan: boolean = false;
  productFormStar: boolean = false;

  isNewFormVlStan: boolean;
  isNewFormStar: boolean;
  newProductVlStan: any = {};
  newProductStar: any = {};
  // private tt_price : number  ;
  editProductFormVlStan: boolean = false;
  editProductFormStar: boolean = false;
  editDeleteFormVlStan: boolean = false;
  editDeleteFormStar: boolean = false;
  editedProductVlStan: any = {};
  editedProductStar: any = {};

  editedProductStan: any = {};

  private tt_tipsel: string = "all";

  private timerSubscription: any;

  productsvlstan: any[];
  selectedVlStan: any = {};
  productsstar: any[];
  selectedStar: any = {};

  productsnase: any[];
  selectedNase: any = {};
  productszgra: any[];
  selectedZgra: any = {};
  productsnakn: any[];
  selectedNakn: any = {};
  productsaktv: any[];
  selectedAktv: any = {};
  productsulaz: any[];
  selectedUlaz: any = {};

  productsnamj: any[];
  selectedNamj: any = {};
  productsstat: any[];
  selectedStat: any = {};
  productsadrs: any[];
  selectedAdrs: any = {};

  // ????
  productspospvlstan: any[];
  selectedPospVlStan: any = {};
  productspospstar: any[];
  selectedPospStar: any = {};


  productspospaktvvlstan: any[];
  selectedPospAktvVlStan: any = {};
  productspospaktvslati: any[];
  selectedPospAktvSlati: any = {};
  productspospaktvstar: any[];
  selectedPospAktvStar: any = {};

  productsvlasstvstar: any[];
  selectedVlasstvStar: any = {};


  productFormNaknStan: boolean = false;
  isNewFormNaknStan: boolean;
  newProductNaknStan: any = {};
  editProductFormNaknStan: boolean = false;
  editDeleteFormNaknStan: boolean = false;
  editedProductNaknStan: any = {};


  productsproinakn: any[];
  selectedProiNakn: any = {};

  productsproizvod: any[];
  selectedProizvod: any = {};

  productsproizvodr: any[];
  selectedProizvodR: any = {};



  productsjedmjere: any[];
  selectedJedMjere: any = {};







  productskupdob: any[];
  selectedKupDob: any = {};

  userForm: any;
  userForm1: any;
  Iznos: string;


  pom_datum_drdoh: string;
  model_datum_drdoh: any = { date: "" };

  selectedStanar: string;
  productsposp: any[];
  selectedPosp: any = {};

  mybgcolor: string;
  productsbrut: any[];
  checkboxgotovo: boolean = false;

  productsfortxt: any[];


  fileNaziv: string;

  nazivPage: string;
  loaderInda: boolean;
  term: string;


  productsvrdokm: any[];
  selectedVrDokm: any = { Broj: 0, Naziv: "" };
  private pom_selvrdokm: string = "all";

  selectedPospPart: string;

  selectedUlazTapeAhead: string;
  productsulazta: any[];
  selectedUlazTA: any = {};

  pom_datum_racuna_od: string = "";
  model_datum_racuna_od: any = { date: "" };
  pom_datum_racuna_do: string = "";
  model_datum_racuna_do: any = { date: "" };

  selectedRow: Number;
  setClickedRow: Function;


  username: string;
  user_id: string;
  //  productskorisnik: any[];
  productswpredstavnikpregled: any[];
  productsforpdf: any[];
  dataListCtrl: SlogCtrl[] = [];
  uplatnicavirm: string;
  content = [];
  pom_ispis: string = '0';


  private readonly pdfFonts: any;
  pdfMake: any;
  constructor(private datePipe: DatePipe, public sifrdataservice: SifrDataService, private authenticationService: AuthenticationService, private formBuilder: FormBuilder, public router: Router, private http: Http, private dataService: DataService) {


  }
  public disabled = false;
  public status: { isopen: boolean } = { isopen: false };
  logout() {
    this.router.navigate(['login']);
    this.authenticationService.logout();


  }
  public toggled(open: boolean): void {
    console.log('--------- Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
    console.log('--------- toggleDropdown: ', open);
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }



  ngOnInit() {
    this.setClickedRow = function (index) {
      this.selectedRow = index.Broj;
    }



    this.username = localStorage.getItem('user_uname');
    this.user_id = localStorage.getItem('user_id');

    this.mybgcolor = '';
    this.getPospPartTypeAhead();
    this.getUlazTypeAhead();
    console.log(" ----- usao u infopredstavnik s----> ");
    this.readMyAllWpredstavnikpregled();

    this.uplatnicavirman();

  }
  readMyDatumData() {
    console.log(" ----- readMyDatumData()a ----> ");

    this.readMyAllWpredstavnikpregled();
  }
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
    showSelectorArrow: true,


  };
  public myDatePickerOptionsTop: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
    //    dateFormat: 'yyyy-mm-dd',
    showSelectorArrow: false,
    openSelectorTopOfInput: true,

    sunHighlight: true,
    inline: false,
    alignSelectorRight: true,


  };


  onDateChanged_datum_racuna_od(event: IMyDateModel) {
    this.pom_datum_racuna_od = event.formatted;

  }
  onDateChanged_datum_racuna_do(event: IMyDateModel) {
    this.pom_datum_racuna_do = event.formatted;

  }



  ngOnDestroy() {
    if (this.timerSubscription)
      this.timerSubscription.unsubscribe();
  }
  readMyAllWpredstavnikpregled() {


    var ulaz = this.sifrdataservice.serviceVariableWKorSlog.BrojUlaza;
    var vrsta = this.sifrdataservice.serviceVariableWKorSlog.Vrsta;
    var kupdob = this.selectedPospPart;
    var datumod = this.pom_datum_racuna_od;
    var datumdo = this.pom_datum_racuna_do;

    this.dataService.serviceWpredstavnikpregledPhp(ulaz, vrsta, kupdob, datumod, datumdo).subscribe(

      data => {

        this.productswpredstavnikpregled = data;

        setTimeout(() => { this.loaderInda = true; }, 1000);

        ;
      },
      err => {
        console.log(err);
      },
      () => console.log('Data Search Complete  /  search')
    );
  }





  cancelEditsStan() {

    this.router.navigate(['/administracija/drugidoh']);
  }

  onSelect() {
    console.log("-------- ovo smo odabrali --->>   " + this.selectedNase.Broj);
  }

  typeaheadOnSelect1(event): void {
    this.selectedPospPart = event.item.Broj;
  }
  typeaheadNoResults1(event): void {

    this.selectedPospPart = "";

  }
  getPospPartTypeAhead() {
    this.dataService.getPospPartTypeAhead()
      .subscribe(data => {
        this.productsposp = data;
        console.log(this.productsposp)
      })

  }

  typeaheadOnSelect2(event): void {

    this.selectedUlazTapeAhead = event.item.Broj;

  }
  typeaheadNoResults2(event): void {
    console.log(' --------------typeaheadNoResults: ');
    this.selectedUlazTapeAhead = "";

  }
  getUlazTypeAhead() {
    this.dataService.getUlazTypeAhead()
      .subscribe(data => {
        this.productsulazta = data;
        console.log(this.productsulazta)
      })

  }





  ispisiPregObrStan(productwkorpregled: InfoPredstavnikSlog) {
    this.dataListCtrl = [];

    const slogCtrl = new SlogCtrl(productwkorpregled.Racun);
    this.dataListCtrl.push(slogCtrl);


    this.dataService.ispisiPregObrJson(this.dataListCtrl).subscribe(
      data => {
        this.productsforpdf = data;


        this.read_productsforpdf(data);
      },
      err => {
        console.log(err);
      },
      () => console.log('Data Search Complete  /  search')
    );

  }


  p: number = 1;


  ovojepage() {
    this.nazivPage = "homepage";
  }

  ////////
  public onMenuClose() {
    console.log("menu closed");
  }
  public onMenuOpen() {
    console.log("menu Opened");
  }
  private onItemSelect(item: any) {
    console.log("2homepage--" + item);
  }


  read_productsforpdf(pdfjson) {

    console.log("aaaaaa---read_productsforpdf")
    this.content = [];



    for (var i = 0; i < pdfjson.length; i++) {



      this.content.push({ text: 'Stambena zgrada ', margin: [0, 0, 0, 8], fontSize: 8, alignment: 'center' });
      this.content.push({ text: pdfjson[i].rZgradaUlica, margin: [0, 0, 0, 0], fontSize: 12, bold: true, alignment: 'center' });
      this.content.push({ text: pdfjson[i].rZgradaMjesto, margin: [0, 0, 0, 0], fontSize: 12, bold: true, alignment: 'center' });
      this.content.push({ text: 'IBAN:   ' + pdfjson[i].rZgradaIBAN, margin: [0, 0, 0, 8], fontSize: 10, alignment: 'center' });

      this.content.push({ text: ' Zastupano po upravitelju', margin: [0, 0, 0, 0], fontSize: 8, alignment: 'center' });

      this.content.push({ text: pdfjson[i].rUpraviteljNaziv.substr(0, 15) + ' ' + pdfjson[i].rUpraviteljUlica.substr(0, 22) + ' , ' + pdfjson[i].rUpraviteljMjesto.substr(0, 15), margin: [0, 0, 0, 0], fontSize: 10, alignment: 'center' });
      this.content.push({ text: 'OIB:   ' + pdfjson[i].rUpraviteljOIB, margin: [0, 0, 0, 0], fontSize: 10, alignment: 'center' });

      this.content.push({ text: 'e-mail: ' + pdfjson[i].rUpraviteljMail, margin: [0, 0, 0, 20], fontSize: 10, alignment: 'center' });
      this.content.push({ text: pdfjson[i].rVlasnikNaziv, margin: [17, 0, 0, 0], fontSize: 12, bold: true });
      this.content.push({ text: pdfjson[i].rVlasnikUlica, margin: [17, 0, 0, 0], fontSize: 12, bold: true });
      this.content.push({ text: pdfjson[i].rVlasnikMjesto, margin: [17, 0, 0, 0], fontSize: 12, bold: true });



      this.content.push({ text: 'Obračun broj: ' + pdfjson[i].rBrojObracuna, margin: [0, 0, 0, 0], fontSize: 10, alignment: 'right' }, );
      this.content.push({ text: 'Za stan: ' + pdfjson[i].rStanUlica, margin: [0, 0, 0, 0], fontSize: 10, alignment: 'right' });
      this.content.push({ text: pdfjson[i].rStanMjesto, margin: [0, 0, 0, 0], fontSize: 10, alignment: 'right' });
      this.content.push({ text: 'OIB: ' + pdfjson[i].rVlasnikOIB, margin: [0, 0, 0, 5], fontSize: 10, alignment: 'right' });


      this.content.push({
        style: 'tableExample', fontSize: 8, alignment: 'center',
        table: {
          widths: ['50%', '50%'],
          body: [
            // 	['Column 1', 'Column 2', 'Column 3']
            ['Datum obračuna: ' + pdfjson[i].rDatumObracuna, 'Poziv na broj za ovaj račun je : ' + pdfjson[i].rPozivNaBroj],
            ['Datum dospijeća: ' + pdfjson[i].rDatumDospijeca, ""],
            ['Datum isporuke:  ' + pdfjson[i].rDatumIsporuke, ""],
          ]

        }
        ,
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? '#a9aba1' : '#ddd2c1';
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? '#a9aba1' : '#ddd2c1';
          }
        }
      });
      this.content.push({ text: '', margin: [0, 0, 0, 5], fontSize: 8 });



      var rows = [];
      // rows.push(['Naknada za sredstva zajedničke pričuve stambene zgrade za mjesec: '+pdfjson[i].rMjesec ]);
      //  rows.push(['Naknada za sredstva zajedničke pričuve stambene zgrade za mjesec: ' +pdfjson[i].rMjesec]  );
      for (var y = 0; y < pdfjson[i].naknade.length; y++) {
        rows.push([pdfjson[i].naknade[y].opis + ' ' + pdfjson[i].naknade[y].iznos + ' kn          ']);
      }

      //  rows.push( ['Ukupno za platiti : ' +pdfjson[i].vIznos ]  );
      this.content.push({ text: 'Naknada za sredstva zajedničke pričuve stambene zgrade za mjesec: ' + pdfjson[i].rMjesec, margin: [17, 0, 0, 3], fontSize: 10, bold: true, alignment: 'center' });
      //  rows.push([' dodatak']  );
      //  rows.push([' dodatak']  );
      //   rows.push([' dodatak']  );

      this.content.push({
        style: 'tableExample', margin: [160, 0, 160, 3], fontSize: 8, alignment: 'right',
        table: {
          widths: ['*'],
          body: rows
        },
        layout: {
          hLineWidth: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? 2 : 1;
          },
          vLineWidth: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? 2 : 1;
          },
          hLineColor: function (i, node) {
            return (i === 0 || i === node.table.body.length) ? '#a9aba1' : '#ddd2c1';
          },
          vLineColor: function (i, node) {
            return (i === 0 || i === node.table.widths.length) ? '#a9aba1' : '#ddd2c1';
          }
        }
      });




      this.content.push({ text: 'Ukupno za platiti : ' + pdfjson[i].vIznos + ' kn          ', margin: [0, 0, 164, 5], fontSize: 10, bold: true, alignment: 'right' });

      for (var yy = 0; yy < 6 - pdfjson[i].naknade.length; yy++) {
        this.content.push({ text: ' ', margin: [0, 0, 0, 5], fontSize: 8 });
      }

      //   this.content.push({text:'', margin: [ 0, 0,0,5 ],fontSize:8});
      this.content.push({ text: 'Zajednička pričuva stambene zgrade obračunata je prema Međuvlasničkom ugovoru i Ugovoru o upravljanju ', margin: [10, 0, 0, 0], fontSize: 9 });





      this.content.push({ text: 'br. ' + pdfjson[i].rUgovorBroj + ' od  ' + pdfjson[i].rUgovorDatum + ' godine. ', margin: [10, 0, 0, 5], fontSize: 9 });
      this.content.push({ text: 'NAPOMENA: PDV nije obračunat - doprinos za zajedničku pričuvu  nije predmet oporezivanja  temeljem  ', margin: [10, 0, 0, 0], fontSize: 9 });
      this.content.push({ text: 'članka 4 Zakona o PDV-u. ', margin: [10, 0, 0, 0], fontSize: 9 });
      this.content.push({ text: 'Eventualne reklamacije stanar je dužan izvršiti bez odlaganja, a najkasnije u roku od 8 dana od primitka obračuna. ', margin: [10, 0, 0, 5], fontSize: 9 });
      this.content.push({ text: 'Kod prekoračenja roka plaćanja izračunavamo zateznu kamatu. ', margin: [10, 0, 0, 0], fontSize: 9 });
      this.content.push({ text: 'Obračun je punovaljan bez žiga i potpisa jer je tiskan elektroničkim računalom. ', margin: [10, 0, 0, 1], fontSize: 9 });



      // this.content.push({text: 'Stambena zgrada:', margin: [ 320, 0,0,0 ],fontSize:10,alignment: 'right'});
      this.content.push({ text: 'Stambena zgrada:', margin: [0, 0, 0, 0], fontSize: 10, alignment: 'right' });
      this.content.push({ text: pdfjson[i].rZgradaUlica1 + ' ' + pdfjson[i].rZgradaMjesto1, margin: [0, 0, 0, 8], fontSize: 10, alignment: 'right' });
      this.content.push({ text: 'Upravitelj: ' + pdfjson[i].rUpraviteljNaziv1, margin: [0, 0, 0, 0], fontSize: 10, alignment: 'right' });
      this.content.push({ text: 'Direktor  : ' + pdfjson[i].rUpraviteljDirektor, margin: [0, 0, 0, 4], fontSize: 10, alignment: 'right' });


      this.content.push({ text: 'U slučaju neispunjavanja dospjele novčane obveze, vjerovnik može zatražiti određivanje ovrhe na temelju vjerodostojne isprave.', margin: [10, 0, 0, 24], fontSize: 8 });

      var iznosnaloga = pdfjson[i].vIznos



      this.content.push({
        columns: [
          { text: pdfjson[i].vValuta, margin: [175, 0, 0, 0], fontSize: 8 },
          { text: this.padleft(iznosnaloga, 15, "*"), margin: [110, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vValuta + ' ' + this.padleft(iznosnaloga, 15, "*"), margin: [0, 0, 40, 0], fontSize: 8, alignment: 'right' }
        ]
      });




      this.content.push({ text: '', margin: [0, 0, 0, 9], fontSize: 8 });


      this.content.push({
        columns: [
          { text: pdfjson[i].vPlatiteljNaziv, margin: [-20, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vPlatiteljNaziv, margin: [0, 0, -15, 0], fontSize: 8, alignment: 'right' }
        ]
      });





      this.content.push({ text: pdfjson[i].vPlatiteljUlica, margin: [-20, 0, 0, 0], fontSize: 8 });
      this.content.push({ text: pdfjson[i].vPlatiteljMjesto, margin: [-20, 0, 0, 0], fontSize: 8 });

      this.content.push({ text: '', margin: [0, 0, 0, 12], fontSize: 8 });




      this.content.push({
        columns: [
          { width: 350, text: pdfjson[i].vPrimateljIBAN, margin: [180, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vPrimateljIBAN, margin: [0, 0, -15, 0], fontSize: 8, alignment: 'right' }
        ]
      });









      this.content.push({ text: '', margin: [0, 0, 0, 15], fontSize: 8 });


      this.content.push({
        columns: [
          { text: pdfjson[i].vModel, margin: [112, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vPozivNaBrojPrim, margin: [25, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vPozivNaBrojPrim, margin: [30, 0, -15, 0], fontSize: 8, alignment: 'right' }
        ]
      });

      this.content.push({ text: pdfjson[i].vPrimateljNaziv, margin: [-20, 0, 0, 0], fontSize: 8 });
      this.content.push({ text: pdfjson[i].vPrimateljUlica, margin: [-20, 0, 0, 0], fontSize: 8 });

      this.content.push({
        columns: [
          { text: pdfjson[i].vPrimateljMjesto, margin: [-20, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vSifraNamjene, margin: [-16, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vOpis1, margin: [-56, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vOpis1, margin: [-10, 0, -15, 0], fontSize: 7, alignment: 'right' }
        ]
      });




      this.content.push({
        columns: [
          { width: 350, text: pdfjson[i].vOpis2, margin: [200, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vOpis2, margin: [0, 0, -15, 0], fontSize: 7, alignment: 'right' }
        ]
      });
      this.content.push({
        columns: [
          { width: 350, text: pdfjson[i].vOpis3, margin: [200, 0, 0, 0], fontSize: 8 },
          { text: pdfjson[i].vOpis3, margin: [0, 0, -15, 0], fontSize: 7, alignment: 'right' }
        ]
      });

      this.content.push({ text: '', margin: [0, 0, 0, 14], fontSize: 8 });


      this.content.push({
        image: this.pdf417code(pdfjson[i]),

        width: 145,
        height: 45,
        margin: [-20, 7, 0, 0]
      });







      this.content.push({ text: '', margin: [0, 0, 0, 17], fontSize: 8 });
      this.content.push({
        text: 'xxxxxx   Osijek '
          + '                                                                                                 '
          + 'xxxxxx   Osijek', margin: [120, 0, -5, 0], fontSize: 8
      });
      if (i + 1 < pdfjson.length) {
        this.content.push({ text: '', margin: [0, 0, 0, 0], fontSize: 8, pageBreak: 'after' });
      }

    }

    let dateFormat = this.datePipe.transform(Date.now(), 'dd/MM/yyyy');
    console.log('datePipeTest' + dateFormat);
    var pdfname = "xxxxxx-" + dateFormat;


    var docDefinitionemail = {

      pageMargins: [40, 10, 40, 20],
      background:
      {
        image: this.uplatnicavirm,
        width: 595, height: 285,
        margin: [1, 567, 0, 0]
      },



      content: this.content,

      styles: {
        header: {
          fontSize: 12,
          bold: true
        },
        anotherStyle: {
          italic: true,
          alignment: 'right'
        }

      }
    }
    var docDefinition = {

      pageMargins: [40, 10, 40, 20],

      content: this.content,
      styles: {
        header: {
          fontSize: 12,
          bold: true
        },
        anotherStyle: {
          italic: true,
          alignment: 'right'
        }

      }
    }
    this.pom_ispis = '0';



    if (this.pom_ispis === '1') {
      pdfMake.createPdf(docDefinition).download(pdfname);
    } else {
      pdfMake.createPdf(docDefinitionemail).download(pdfname);
    }



  }
  pdf417code(pdfjsontext) {

    var pom = this.removechar(pdfjsontext.vIznos, ".");

    var pdf417text = 'HRVHUB30' + '\n'
      + pdfjsontext.vValuta.substr(0, 3) + '\n'
      + this.padleft(pom, 15, "0") + '\n'
      + pdfjsontext.vPlatiteljNaziv.substr(0, 30) + '\n'
      + pdfjsontext.vPlatiteljUlica.substr(0, 27) + '\n'
      + pdfjsontext.vPlatiteljMjesto.substr(0, 27) + '\n'
      + pdfjsontext.vPrimateljNaziv.substr(0, 25) + '\n'
      + pdfjsontext.vPrimateljUlica.substr(0, 25) + '\n'
      + pdfjsontext.vPrimateljMjesto.substr(0, 27) + '\n'
      + pdfjsontext.vPrimateljIBAN.substr(0, 21) + '\n'
      + pdfjsontext.vModel.substr(0, 4) + '\n'
      + pdfjsontext.vPozivNaBrojPrim.substr(0, 22) + '\n'
      + pdfjsontext.vSifraNamjene.substr(0, 4) + '\n'
      + pdfjsontext.vOpis1.substr(0, 35);





    const imgsrc = generateBarcode(pdf417text, 1, 2);

    return imgsrc;


  }

  padleft(number: string, size: number, znak: string): string {
    let s = number + "";
    while (s.length < size) s = znak + s;
    return s;
  }
  removechar(number: string, znak: string): string {
    let s = number + "";
    s = number.replace(znak, "");
    return s;
  }







  uplatnicavirman() {
    this.uplatnicavirm = 'data:image/png;base64,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';
  }
}

