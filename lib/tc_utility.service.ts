import {
    Injectable,
    Pipe,
    PipeTransform
} from '@angular/core';

import {
    SpacesRequestService
}
from 'spaces-ng';

@Injectable()
export class TcUtilityService {
    // public static x2js = new X2JS();

    constructor() { /* do nothing */ }

    static toCamelCase(str: string) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
            return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
        }).replace(/\s+/g, '');
    }

    // static formatDate(d: Date) {
    //     d = new Date(d.toString());
    //     var date = d.getDate().toString(),
    //         month = (d.getMonth() + 1).toString(),
    //         year = d.getFullYear().toString();
    // 
    //     if (date.length === 1) {
    //         date = '0' + date;
    //     }
    // 
    //     if (month.length === 1) {
    //         month = '0' + month;
    //     }
    //
    //     return month + '-' + date + '-' + year;
    // }

    static getParameterByName(name: String, location: any) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search);

        return results === null ? '' : decodeURIComponent(
            results[1].replace(/\+/g, ' '));
    }

    static handleIncludes(
        tcRequest: SpacesRequestService,
        includeAttributes: boolean = false,
        includeTags: boolean = false
    ) {
        if (includeAttributes) {
            tcRequest.param('includeAttributes', true);
        }
        if (includeTags) {
            tcRequest.param('includeTags', true);
        }
        return tcRequest;
    }
}

// @Pipe({name: 'tcDate'})
// export class DatePipe implements PipeTransform {
//     transform(dateStr: string): string {
//         let d = new Date(dateStr.toString());

//         var date = d.getDate().toString(),
//             month = (d.getMonth() + 1).toString(),
//             year = d.getFullYear().toString();

//         if (date.length === 1) {
//             date = '0' + date;
//         }

//         if (month.length === 1) {
//             month = '0' + month;
//         }

//         return month + '-' + date + '-' + year;
//     }
// }
