// import {Injectable} from '@angular/core';

// @Injectable()
// export class TcBaseService {
//     private _tcApiPath: string;
//     private _tcToken: string;
//     private _tcTokenExpiration: string;
    
//     get tcApiPath(): string {
//         return this._tcApiPath;
//     }
    
//     set tcApiPath(path: string) {
//         this._tcApiPath = path;
//     }
    
//     get tcProxyServer(): string {
//         return this._tcApiPath.replace('/api', '');
//     }
    
//     get tcToken(): string {
//         /* check if token is expired and if so renew */
//         return this._tcToken;
//     }
    
//     set tcToken(token: string) {
//         this._tcToken = token;
//     }
    
//     /* bcs - should this be pulled from the token? */
//     get tcTokenExpiration(): string {
//         return this._tcTokenExpiration;
//     }
    
//     set tcTokenExpiration(expiration: string) {
//         this._tcTokenExpiration = expiration;
//     }
// }