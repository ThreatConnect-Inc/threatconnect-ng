import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Tag } from './entities';
import { Observable } from 'rxjs/Rx';


@Injectable()
/**
 * Service for retrieving tags from the ThreatConnect API.
 */
export class TcTagService {

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcTagService');
    }

    /**
     *  Reads a tag from ThreatConnect.
     *
     * @param name the name of the tag
     * @param owner the ThreatConnect owner to read the indicator from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getByName(
        name: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug('name', name);

        let resourceType = RESOURCE_TYPE['Tag'];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            name
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

    /**
     * Returns all tags from ThreatConnect for the given owner.
     *
     * @param resultLimit Maximum number of tags to retrieve.
     * @param resultStart Results index to start at.
     * @param owner The ThreatConnect owner to read from.
     * @returns {Observable<Object>} The JSON results from ThreatConnect
     */
    public getAll(
        resultLimit: number = 500,
        resultStart: number = 0,
        owner: any = undefined,
    ): Observable<Object> {
        let resourceType = RESOURCE_TYPE['Tag'];
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
                return <Tag[]> res.json().data;
            },
            this.handleError);

    }

    private handleError(error: any) {
        return Promise.reject(error);
    }
}
