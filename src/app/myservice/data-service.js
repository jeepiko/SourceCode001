"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
// import 'rxjs/add/operator/catch';
require("rxjs/add/operator/map");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    Object.defineProperty(DataService, "parameters", {
        get: function () {
            return [[http_1.Http]];
        },
        enumerable: true,
        configurable: true
    });
   
    DataService.prototype.servicAllLoginPhp = function () {
        var url = 'http://127.0.0.1/xxxxxx/product/CCitProduct.php';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        this.http.get(url).subscribe(function (res) { console.log(res); });
        return response;
    };
    DataService.prototype.deleteData = function (tt_id) {
        var _this = this;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = 'http://127.0.0.1//xxxxxx/product/angdelete.php';
        this.http.post(url, { tt_id: tt_id }, options).map(function (res) { return res.json(); }).subscribe(function (data) { return _this.response3 = data; });
        console.log("this.response3 :" + this.response3);
        location.reload();
    };
    DataService.prototype.updateData = function (tt_id, tt_name, tt_description, tt_price) {
        var _this = this;
        var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = 'http://127.0.0.1//xxxxxx/product/angupdate.php';
        this.http.post(url, { tt_id: tt_id, tt_name: tt_name, tt_description: tt_description, tt_price: tt_price }, options).map(function (res) { return res.json(); }).subscribe(function (data) { return _this.response3 = data; });
        location.reload();
       
    };
    DataService.prototype.addData = function (tt_name, tt_description, tt_price) {
        var _this = this;
          var productsend = [
            { tt_name: 'aaaa', tt_description: 'qqqqqqqqqqqqqq' }
        ];
          var headers = new http_2.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        var options = new http_2.RequestOptions({ headers: headers });
        var url = 'http://127.0.0.1//xxxxxx/product/anginsert.php';
          this.http.post(url, { tt_name: tt_name, tt_description: tt_description, tt_price: tt_price }, options).map(function (res) { return res.json(); }).subscribe(function (data) { return _this.response3 = data; });
        location.reload();

    };
       DataService.prototype.LoadData = function () {
    
    };
    return DataService;
}());
exports.DataService = DataService;
