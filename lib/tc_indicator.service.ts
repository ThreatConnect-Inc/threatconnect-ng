import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Indicator } from './entities';
import { Observable } from 'rxjs/Rx';


@Injectable()
/**
 * Service for interacting with the ThreatConnect API endpoints that provide CRUD operations for indicators.
 */
export class TcIndicatorService {

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcIndicatorService');
    }

    /**
     * Creates a new indicator.
     *
     * @param indicator The indicator value, e.g. '192.168.1.1', 'www.google.com', etc.
     * @param owner The ThreatConnect owner to add the indicator to
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public createIndicator(indicator: Indicator, owner: string): Observable<Object> {
        let resourceType = RESOURCE_TYPE[indicator.type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .method('POST')
            .contentType('application/json')
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .body(JSON.stringify(indicator))
            .param('owner', owner);

        return tcRequest.request()
            .map(res => res.json().data[resourceType.dataField] || {},
                 this.handleError);
    }

    /**
     *  Reads an indicator from ThreatConnect.
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator from.
     * @returns {Observable<any>} The JSON response from ThreatConnect
     */
    public getById(
        id: string,
        type: string,
        owner: string
    ): Observable<any> {
        this.logging.debug('id', id);
        this.logging.debug('type', type);
        
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

    /**
     *  Reads additional indicator data from ThreatConnect
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator from.
     * @returns {Observable<any>} The JSON response from ThreatConnect
     */
    public getAdditionalData(
        id: string,
        type: string,
        owner: string
    ): Observable<any> {
        this.logging.debug('id', id);
        this.logging.debug('type', type);

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
            .param('includeAdditional', 'true')
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data || {},
                this.handleError);
    }

    /**
     * Returns all indicators from ThreatConnect for the given owner.
     *
     * @param type The type of the indicators to read.  Note 'Indicator' will read all types.
     * @param resultLimit Maximum number of indicators to retrieve.
     * @param resultStart Results index to start at.
     * @param owner The ThreatConnect owner to read from.
     * @param normalize Flag to enable normalizing indicators.
     * @returns {Observable<any>} The JSON results from ThreatConnect
     */
    public getAll(
        type: string = 'Indicator',
        resultLimit: number = 500,
        resultStart: number = 0,
        owner: any = undefined,
        normalize: boolean = false
    ): Observable<any> {
        this.logging.debug('type', type);
        this.logging.debug('normalize', normalize);
        
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
                if (normalize) {
                    return this.normalize(res, resourceType);
                }
                else {
                    return <Indicator[]> res.json().data;
                }
            },
            this.handleError);

    }

    private normalize(
        response: Response,
        resourceType: any
    ) {
        let data = JSON.parse(response.text(), function(prop, value) {
            var fileString = ' : : ';
            switch (prop) {
                case 'address':
                    if (resourceType.type === 'EmailAddress') {
                        this.summary = value;
                        this.type = 'EmailAddress';
                        return value;
                    }
                    else {
                        this.indicator = value;
                        return;
                    }
                case 'emailAddress':
                    this.indicator = value;
                    return value;
                case 'file':
                    this.indicator = value;
                    return;
                case 'host':
                    this.indicator = value;
                    return;
                case 'hostName':
                    this.summary = value;
                    this.type = 'Host';
                    return value;
                case 'ip':
                    this.summary = value;
                    this.type = 'Address';
                    return value;
                case 'md5':
                    this.summary = fileString
                        .replace(/^ : /, value.toUpperCase() + ' : ');
                    this.type = 'File';
                    return value.toUpperCase();
                case 'sha1':
                    if (this.md5) {
                        fileString = fileString
                            .replace(/^ : /, this.md5 + ' : ');
                    }
                    this.summary = fileString
                        .replace(/ : : /, ' : ' + value.toUpperCase() + ' : ');
                    this.type = 'File';
                    return value.toUpperCase();
                case 'sha256':
                    if (this.md5) {
                        fileString = fileString
                            .replace(/^ : /, this.md5 + ' : ');
                    }
                    if (this.sha1) {
                        fileString = fileString
                            .replace(/ : : /, ' : ' + this.sha1 + ' : ');
                    }
                    this.summary = fileString
                        .replace(/ : $/, ' : ' + value.toUpperCase());
                    this.type = 'File';
                    return value.toUpperCase();
                case 'text':
                    this.summary = value;
                    this.type = 'URL';
                    return value;
                case 'url':
                    this.indicator = value;
                    return;
                default:
                    return value;
            }
        }).data;

        return data;
    }
    
    private handleError(error: any) {
        return Promise.reject(error);
    }
}
