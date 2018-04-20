import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng';
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

    private handleIncludes(
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

    public getById(
        id: string,
        type: string,
        owner: string,
        includeAttributes: boolean = false,
        includeTags: boolean = false
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

        tcRequest = this.handleIncludes(tcRequest, includeAttributes, includeTags);

        return tcRequest.request()
            .map(res => res.json().data[resourceType.dataField] || {},
                 this.handleError);
    }

    public getAll(
        resultLimit: number = 500,
        resultStart: number = 0,
        owner: any = undefined,
        type: string = 'Group',
        includeAttributes: boolean = false,
        includeTags: boolean = false
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

        tcRequest = this.handleIncludes(tcRequest, includeAttributes, includeTags);

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

    private handleError(error: any) {
        return Promise.reject(error);
    }
}
