// import {
//     Injectable
// }
// from '@angular/core';

// import {
//     Headers,
//     Http,
//     Request,
//     RequestMethod,
//     RequestOptions,
//     Response,
//     URLSearchParams
// }
// from '@angular/http';

// import {
//     Observable
// }
// from 'rxjs/Rx';

// import {
//     SpacesBaseService,
//     SpacesLoggingService
// }
// from 'spaces-ng/main';

// import {
//     TcUtilityService
// }
// from './tc_utility.service';


// @Injectable()
// export class TcRequestService {
//     /**
//      * Generic Request Module for ThreatConnect API
//      */

//     private debug: boolean;
//     private headers = new Headers();
//     private params = new URLSearchParams();  // must be above options
//     private options = new RequestOptions({
//         headers: this.headers,
//         method: RequestMethod.Get,
//         search: this.params
//     });
//     private useProxy: boolean;
//     private requestUrl: string;

//     constructor(
//         private http: Http,
//         private logging: SpacesLoggingService,
//         private spacesBase: SpacesBaseService
//     ) {
//         this.debug = (TcUtilityService.getParameterByName('debug', window.location) === 'true');
//         this.logging.moduleColor('#f26724', '#fff', 'TcRequestService');
//     }
    
//     public method(data: string) {
//         /**
//          * Set the HTTP method
//          * @param {string} data - The HTTP Method (DELETE, GET, POST, PUT)
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         switch (data.toUpperCase()) {
//             case 'DELETE':
//                 this.options.method = RequestMethod.Delete;
//                 break;
//             case 'GET':
//                 this.options.method = RequestMethod.Get;
//                 break;
//             case 'POST':
//                 this.options.method = RequestMethod.Post;
//                 break;
//             case 'PUT':
//                 this.options.method = RequestMethod.Put;
//                 break;
//             default:
//                 this.options.method = RequestMethod.Get;
//                 break;
//         }
//         return this;
//     }
    
//     public proxy(data: boolean) {
//         /**
//          * Use secureProxy
//          * @param {boolean} data - Enable/Disable proxy
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.useProxy = data;
//         return this;
//     }

//     public url(data: string) {
//         /**
//          * Set the request URI
//          * @param {string} data - The URL for the request
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.requestUrl = data;
//         return this;
//     }

//     //
//     // headers
//     //

//     public header(key: string, val: any) {
//         /**
//          * Add a header to the request
//          * @param {string} key - The header key
//          * @param {string} val - The header value
//          * @return {RequestService} The RequestService Object
//          */
//         this.headers.set(key, val);
//         this.logging.debug('key', key);
//         this.logging.debug('val', val);
//         return this;
//     }

//     // common headers

//     public authorization(data: string) {
//         /**
//          * Helper method to set common authorization header
//          * @param {string} data - The authorization header
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.header('Authorization', data);
//         return this;
//     }

//     public contentType(data: string) {
//         /**
//          * Helper method to set common content-type header
//          * @param {string} data - The content-type header
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.header('Content-Type', data);
//         return this;
//     }

//     //
//     // body
//     //
    
//     public body(data: any) {
//         /**
//          * The body for the request
//          * @param {any} data - The body contents
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.options.body = data;
//         return this;
//     }

//     //
//     // params
//     //

//     public param(key: string, val: any) {
//         /**
//          * Add a query string parameter to the request
//          * @param {string} key - The parameter key
//          * @param {string} val - The parameter value
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('key', key);
//         this.logging.debug('val', val);
//         this.params.set(key, val);
//         return this;
//     }

//     // common paramaeters

//     public createActivityLog(data: boolean) {
//         /**
//          * Helper method to set common createActivityLog query string parameter
//          * @param {boolean} data - The createActivityLog boolean value
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.param('createActivityLog', String(data));
//         return this;
//     }

//     public modifiedSince(data: string) {
//         /**
//          * Helper method to set common modifiedSince query string parameter
//          * @param {string} data - The modifiedSince value
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.param('modifiedSince', data);
//         return this;
//     }

//     public owner(data: string) {
//         /**
//          * Helper method to set common owner query string parameter
//          * @param {string} data - The owner value
//          * @return {RequestService} The RequestService Object
//          */
//         this.param('owner', data);
//         return this;
//     }

//     public resultLimit(data: number) {
//         /**
//          * Helper method to set common resultLimit query string parameter
//          * @param {number} data - The resultLimit value for pagination
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.param('resultLimit', String(data));
//         return this;
//     }

//     public resultStart(data: number) {
//         /**
//          * Helper method to set common resultStart query string parameter
//          * @param {number} data - The resultStart value for pagination
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.debug('data', data);
//         this.param('resultStart', String(data));
//         return this;
//     }

//     private debugInfo() {
//         /**
//          * Debug Method
//          */
//         this.logging.debug('this.requestUrl', this.requestUrl);
//         this.logging.debug('this.options', this.options);
//         this.logging.debug('this.useProxy', this.useProxy);
//     }
    
//     private proxyUrl() {
//         /**
//          * Proxify the request using secureProxy
//          */
//         let params = new URLSearchParams();
//         params.set('_targetUrl', this.requestUrl);
//         params.appendAll(this.params);
//         this.params.replaceAll(params);
        
//         if (this.spacesBase.tcProxyServer) {
//             this.requestUrl = this.spacesBase.tcProxyServer + '/secureProxy';
//         } else {
//             this.requestUrl = window.location.protocol + '//' +
//                 window.location.host + '/secureProxy';
//         }
//         this.logging.debug('this.requestUrl', this.requestUrl);
//     }
    
//     public request() {
//         /**
//          * Execute the API request
//          * @param {number} data - The resultStart value for pagination
//          * @return {Response} The http Response Object
//          */
//         if (this.debug) { this.debugInfo(); }
//         if (this.useProxy) { this.proxyUrl(); }
        
//         var response = this.http.request(this.requestUrl, this.options);
        
//         /* bcs - show requested url */
//         response.subscribe(res => {
//             this.logging.info('res.url', res.url);
//         })
        
//         return response.toPromise()
//             .catch(this.handleAjaxError);
//     }

//     public resetOptions() {
//         /**
//          * Reset request options
//          * @return {RequestService} The RequestService Object
//          */
//         this.logging.info('resetOptions', 'resetOptions');
//         this.headers = new Headers();
//         this.params = new URLSearchParams();
//         this.useProxy = false;
//         this.options = new RequestOptions({
//             headers: this.headers,
//             method: RequestMethod.Get,
//             search: this.params
//         });
//         return this;
//     }

//     private handleAjaxError(error: Response) {
//         /**
//          * Execute the API request
//          * @param {Response} err - The https Response Object
//          */
//         var errorText = error.text();
//         this.logging.error('Error', 'request to ' + error.url + 
//             ' failed with: ' + errorText);
//         return Promise.reject(errorText || error);
//     }
// }
