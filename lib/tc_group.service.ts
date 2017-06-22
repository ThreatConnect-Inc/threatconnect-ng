import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng/dist/main';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TcGroupService {

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcGroupService');
    }

    public getById(
        id: string,
        type: string,
        owner: string
    ): Observable<any> {
        this.logging.debug('id', id);
        
        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .param('owner', owner)
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data[resourceType.dataField] || {},
                 this.handleError);
    }

    public getAll(
        resultLimit: number = 500,
        resultStart: number = 0,
        owner: any = undefined,
        // normalize: boolean = false,
        type: string = 'Group'
    ): Observable<any> {
        this.logging.debug('owner', owner);
        
        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .param('resultLimit', resultLimit)
            .param('resultStart', resultStart)
            .method('GET');

        if (owner) {
            // tcRequest.param('owner', encodeURIComponent(owner));
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => {
                // if (normalize) {
                //     return this.normalize(res, type);
                // }
                // else {
                //     return <Indicator[] > res.json().data;
                // }
                return res.json().data;
            },
            this.handleError);
    }

    // private normalize(
    //     response: Response,
    //     type: any
    // ) {
    //     let data = JSON.parse(response.text(), function(prop, value) {
    //         var fileString = ' : : ';
    //         switch (prop) {
    //             case 'address':
    //                 if (type.type === 'EmailAddress') {
    //                     this.summary = value;
    //                     this.type = 'EmailAddress';
    //                     return value;
    //                 }
    //                 else {
    //                     this.indicator = value;
    //                     return;
    //                 }
    //             case 'emailAddress':
    //                 this.indicator = value;
    //                 return value;
    //             case 'file':
    //                 this.indicator = value;
    //                 return;
    //             case 'host':
    //                 this.indicator = value;
    //                 return;
    //             case 'hostName':
    //                 this.summary = value;
    //                 this.type = 'Host';
    //                 return value;
    //             case 'ip':
    //                 this.summary = value;
    //                 this.type = 'Address';
    //                 return value;
    //             case 'md5':
    //                 this.summary = fileString
    //                     .replace(/^ : /, value.toUpperCase() + ' : ');
    //                 this.type = 'File';
    //                 return value.toUpperCase();
    //             case 'sha1':
    //                 if (this.md5) {
    //                     fileString = fileString
    //                         .replace(/^ : /, this.md5 + ' : ');
    //                 }
    //                 this.summary = fileString
    //                     .replace(/ : : /, ' : ' + value.toUpperCase() + ' : ');
    //                 this.type = 'File';
    //                 return value.toUpperCase();
    //             case 'sha256':
    //                 if (this.md5) {
    //                     fileString = fileString
    //                         .replace(/^ : /, this.md5 + ' : ');
    //                 }
    //                 if (this.sha1) {
    //                     fileString = fileString
    //                         .replace(/ : : /, ' : ' + this.sha1 + ' : ');
    //                 }
    //                 this.summary = fileString
    //                     .replace(/ : $/, ' : ' + value.toUpperCase());
    //                 this.type = 'File';
    //                 return value.toUpperCase();
    //             case 'text':
    //                 this.summary = value;
    //                 this.type = 'URL';
    //                 return value;
    //             case 'url':
    //                 this.indicator = value;
    //                 return;
    //             default:
    //                 return value;
    //         }
    //     }).data;

    //     return data;
    // }
    
    private handleError(error: any) {
        return Promise.reject(error);
    }
}
