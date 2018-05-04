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
import { TCApiBaseService } from './tc_api_base.service';


@Injectable()
/**
 * Service for interacting with the ThreatConnect API endpoints that provide CRUD operations for indicators.
 */
export class TcIndicatorService extends TCApiBaseService {

    constructor(
        protected logging: SpacesLoggingService,
        protected request: SpacesRequestService,
        protected spacesBase: SpacesBaseService
    ) {
        super(logging, request, spacesBase);
        this.logging.moduleColor('#f26724', '#fff', 'TcIndicatorService');
    }

    /**
     * Map the 'summary' field of the given indicator to the correct Indicator Field required by the API. For example, given the indicator: {..., 'summary': '1.2.3.4', ...}, this function will return {..., 'ip': '1.2.3.4', ...} so that the IP address is created correctly.
     *
     * @param resourceType The resource type from https://github.com/ThreatConnect-Inc/threatconnect-ng/blob/master/lib/tc_resource_type.ts
     * @param indicatorSummary A string representing the indicator being created
     * @returns string The name of the indicator field for the given indicator
     */
    private getIndicatorField(resourceType: any, indicatorSummary: string) {
        if (resourceType.indicatorFields.length === 1) {
            return resourceType.indicatorFields[0];
        } else {
            if (resourceType.type === 'File') {
                if (indicatorSummary.length === 32) {
                    return 'md5';
                } else if (indicatorSummary.length === 40) {
                    return 'sha1';
                } else if (indicatorSummary.length === 64) {
                    return 'sha256';
                }
            }
        }
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

        if (indicator.summary) {
            let indicatorField = this.getIndicatorField(resourceType, indicator.summary);
            indicator[indicatorField] = indicator.summary;
        }

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
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getById(
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);
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
     * === Example Response =====================================================
     *     {
     *       'status' : 'Success',
     *       'data' : {
     *         'host' : {
     *           'id' : 12345,
     *           'owner' : {
     *             'id' : 1,
     *             'name' : 'Example Organization',
     *             'type' : 'Organization'
     *           },
     *           'dateAdded' : '2017-06-21T17:50:25-05:00',
     *           'lastModified' : '2017-07-13T17:50:25-05:00',
     *           'webLink' : 'https://app.threatconnect.com/auth/indicators/details/host.xhtml?host=example.com&owner=Example%20Organization',
     *           'observationCount' : 5,
     *           'lastObserved' : '2016-07-13T17:50:25-05:00',
     *           'falsePositiveCount' : 1,
     *           'falsePositiveLastReported' : '2017-07-13T17:50:25-05:00',
     *           'hostName' : 'example.com',
     *           'dnsActive' : 'false',
     *           'whoisActive' : 'false'
     *         }
     *       }
     *     }
     * ==========================================================================        *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getAdditionalData(
        id: string,
        type: string,
        owner: string
    ): Observable<any> {
        this.logging.debug(`${arguments}`);
        this.logging.debug('type', type);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id
        ].join('/');

        return this.get(url, owner, resourceType.dataField);
    }

    /**
     * Returns all indicators from ThreatConnect for the given owner.
     *
     * @param type The type of the indicators to read.  Note 'Indicator' will read all types.
     * @param resultLimit Maximum number of indicators to retrieve.
     * @param resultStart Results index to start at.
     * @param owner The ThreatConnect owner to read from.
     * @param normalize Flag to enable normalizing indicators.
     * @returns {Observable<Object>} The JSON results from ThreatConnect
     */
    public getAll(
        type: string = 'Indicator',
        resultLimit: number = 500,
        resultStart: number = 0,
        owner: any = undefined,
        normalize: boolean = false
    ): Observable<Object> {
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
                } else {
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
                    } else {
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

    /**
     *  Retrieves observation counts for an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success',
     *       'data': {
     *         'observationCount': {
     *           'count': 5,
     *           'lastObserved': '2016-07-13T17:50:25-05:00Z',
     *           'yourCount': 2,
     *           'yourLastObserved': '2016-07-13T17:50:25-05:00Z'
     *         }
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getObservationCount(
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'observationCount'
        ].join('/');

        return this.get(url, owner, 'observationCount');
    }

    /**
     *  Retrieves observations for an indicator.
     *
     * === Example Response =====================================================
     *      {
     *          'status': 'Success',
     *          'data': {
     *            'resultCount': 1,
     *            'observation': [
     *              {
     *                'count': 5,
     *                'dateObserved': '2016-07-13T17:50:25-05:00Z'
     *              }
     *            ]
     *          }
     *        }
     * ==========================================================================
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getObservations(
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'observations'
        ].join('/');

        return this.get(url, owner, 'observation');
    }

    /**
     *  Retrieves observations for an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param count the number of observations to add.
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public createObservations(
        count: number = 1,
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'observations'
        ].join('/');

        const body = `{'count': ${count}}`;

        return this.post(url, owner, body);
    }

    /**
     *  Add a false positive for an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success',
     *       'data': {
     *         'falsePositive': {
     *           'count': 1,
     *           'lastReported': '2017-07-13T17:04:54Z'
     *         }
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public addFalsePositive(
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'falsePositive'
        ].join('/');

        return this.postWithDataKey(url, owner, 'falsePositive');
    }

    /**
     *  Retrieve attributes for an indicator.
     *
     * === Example Response =====================================================
     * {
     *   'status': 'Success',
     *   'data': {
     *     'resultCount': 2,
     *     'attribute': [
     *       {
     *         'id': '54321',
     *         'type': 'Description',
     *         'dateAdded': '2016-07-13T17:50:17',
     *         'lastModified': '2017-05-02T18:40:22Z',
     *         'displayed': true,
     *         'value': 'Description Example'
     *       },
     *       {
     *         'id': '54322',
     *         'type': 'Source',
     *         'dateAdded': '2016-07-13T17:51:17',
     *         'lastModified': '2017-05-02T18:40:22Z',
     *         'displayed': true,
     *         'value': 'Source Example'
     *       }
     *     ]
     *   }
     * }
     * ==========================================================================
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getAttributes(
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'attributes'
        ].join('/');

        return this.get(url, owner, 'attribute');
    }

    /**
     *  Create an attribute for an indicator.
     *
     * === Example Response =====================================================
     * {
     *   'status': 'Success',
     *   'data': {
     *     'attribute': {
     *       'id': '54321',
     *       'type': 'Description',
     *       'dateAdded': '2017-07-13T17:50:17',
     *       'lastModified': '2017-07-13T17:50:17',
     *       'displayed': true,
     *       'value': 'Test Description'
     *     }
     *   }
     * }
     * ==========================================================================
     *
     * @param attributeType The type of the attribute.
     * @param value The value of the attribute.
     * @param displayed Whether or not the attribute should be displayed.
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param indicatorType the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public createAttribute(
        attributeType: string,
        value: string,
        displayed: boolean = true,
        indicatorType: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[indicatorType];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'attributes'
        ].join('/');

        const body = `{
                'type': '${attributeType}',
                'value': '${value},
                'displayed': ${displayed}   
            }`;

        return this.postWithDataKey(url, owner, 'attribute', body);

    }


    /**
     *  Removes an attribute from an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'apiCalls': 1,
     *       'resultCount': 0,
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param attributeId ID of the attribute to delete
     * @param indicatorId the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param indicatorType the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public deleteAttribute(
        attributeId: string,
        indicatorType: string = 'Indicator',
        indicatorId: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[indicatorType];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            indicatorId,
            'attributes',
            attributeId
        ].join('/');

        return this.delete(url, owner);
    }

    /**
     *  Retrieve tags for an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success',
     *       'data': {
     *         'resultCount': 1,
     *         'tag': [
     *           {
     *             'name': 'Nation State',
     *             'webLink': 'https://app.threatconnect.com/auth/tags/tag.xhtml?tag=Nation+State&owner=Common+Community'
     *           }
     *         ]
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getTags(
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'tags'
        ].join('/');

        return this.get(url, owner, 'tag');
    }

    /**
     *  Adds a tag to an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'apiCalls': 1,
     *       'resultCount': 0,
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param tag The tag to add to the indicator
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public addTag(
        tag: string,
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'tags',
            tag
        ].join('/');

        return this.post(url, owner);
    }

    /**
     *  Deletes a tag from an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'apiCalls': 1,
     *       'resultCount': 0,
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param tag The tag to remove from the indicator
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public removeTag(
        tag: string,
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'tags',
            tag
        ].join('/');

        return this.delete(url, owner);
    }

    /**
     *  Retrieve security labels for an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success',
     *       'data': {
     *         'resultCount': 1,
     *         'securityLabel': [
     *           {
     *             'name': 'TLP Amber',
     *             'description': 'TLP Amber information requires support to be effectively acted upon, yet carries risks to privacy, reputation, or operations if shared outside of the organizations involved.',
     *             'dateAdded': '2017-07-13T17:50:17'
     *           }
     *         ]
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getSecurityLabels(
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'securityLabels'
        ].join('/');

        return this.get(url, owner, 'securityLabel');
    }

    /**
     *  Adds a security Label to an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'apiCalls': 1,
     *       'resultCount': 0,
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param securityLabel The Security Label to add to the indicator
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public addSecurityLabel(
        securityLabel: string,
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'securityLabels',
            securityLabel
        ].join('/');

        return this.post(url, owner);
    }

    /**
     *  Deletes a security label from an indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'apiCalls': 1,
     *       'resultCount': 0,
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param securityLabel The security label to remove from the indicator
     * @param id the value of the indicator, e.g., '192.168.1.1', 'wwww.google.com', etc.
     * @param type the type of the indicator, e.g., 'Address', 'Host', etc.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public removeSecurityLabel(
        securityLabel: string,
        type: string = 'Indicator',
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(`${arguments}`);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'securitylabels',
            securityLabel
        ].join('/');

        return this.delete(url, owner);
    }

}
