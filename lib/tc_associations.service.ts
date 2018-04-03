import { Injectable } from '@angular/core';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
    from 'spaces-ng';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Observable } from 'rxjs/Rx';
import { TCApiBaseService } from './tc_api_base.service';


/**
 * Service for interacting with the ThreatConnect API endpoints that provide CRUD operations for associations.
 */
@Injectable()
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
     *  Retrieves indicators associated with the given entity.
     *
     * === Example Response =====================================================
     * {
     *   "status": "Success",
     *   "data": {
     *     "resultCount": 1,
     *     "indicator": [
     *       {
     *         "id": "54321",
     *         "ownerName": "Example Organization",
     *         "type": "Address",
     *         "dateAdded": "2016-07-13T17:50:17",
     *         "lastModified": "2017-05-01T21:32:54Z",
     *         "rating": 3.0,
     *         "confidence": 55,
     *         "threatAssessRating": 3.0,
     *         "threatAssessConfidence": 55.0,
     *         "webLink": "https://app.threatconnect.com/auth/indicators/details/address.xhtml?address=0.0.0.0&owner=Example+Organization",
     *         "summary": "0.0.0.0"
     *       }
     *     ]
     *   }
     * }
     * ==========================================================================
     *
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getAssociatedIndicators(
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'indicators'
        ].join('/');

        return this.get(url, owner, 'indicator');
    }

    /**
     *  Retrieves groups associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "status": "Success",
     *       "data": {
     *         "resultCount": 1,
     *         "group": [
     *           {
     *             "id": "54321",
     *             "name": "New Incident",
     *             "type": "Incident",
     *             "ownerName": "Example Organization",
     *             "dateAdded": "2017-07-13T17:50:17",
     *             "webLink": "https://app.threatconnect.com/auth/incident/incident.xhtml?incident=54321"
     *           }
     *         ]
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getAssociatedGroups(
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'groups'
        ].join('/');

        return this.get(url, owner, 'group');
    }

    /**
     *  Retrieves victim assets associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "status": "Success",
     *       "data": {
     *         "resultCount": 2,
     *         "victimAsset": [
     *           {
     *             "id": "54321",
     *             "name": "bad@badguys.com",
     *             "type": "EmailAddress",
     *             "webLink": "https://app.threatconnect.com/auth/victim/victim.xhtml?victim=123"
     *           }
     *         ]
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getAssociatedVictimAssets(
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'victimAssets'
        ].join('/');

        return this.get(url, owner, 'victimAsset');
    }


    /**
     *  Retrieves victims associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "status": "Success",
     *       "data": {
     *         "resultCount": 1,
     *         "victim": [
     *           {
     *             "id": "54321",
     *             "name": "Bad Guy",
     *             "org": "Example Organization",
     *             "webLink": "https://app.threatconnect.com/auth/victim/victim.xhtml?victim=54321"
     *           }
     *         ]
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getAssociatedVictims(
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'victims'
        ].join('/');

        return this.get(url, owner, 'victim');
    }


    /**
     *  Disassociates an indicator associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "apiCalls": 1,
     *       "resultCount": 0,
     *       "status": "Success"
     *     }
     * ==========================================================================
     *
     * @param associationId Id of associated indicator.
     * @param associationType Type of associated indicator.
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public disassociateIndicator(
        associationId: string,
        associationType: string,
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'indicators',
            associationType,
            associationId
        ].join('/');

        return this.delete(url, owner);
    }

    /**
     *  Disassociates an indicator associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "apiCalls": 1,
     *       "resultCount": 0,
     *       "status": "Success"
     *     }
     * ==========================================================================
     *
     * @param associationId Id of associated group.
     * @param associationType Type of associated group.
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public disassociateGroup(
        associationId: string,
        associationType: string,
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'groups',
            associationType,
            associationId
        ].join('/');

        return this.delete(url, owner);
    }

    /**
     *  Disassociates a victim asset associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "apiCalls": 1,
     *       "resultCount": 0,
     *       "status": "Success"
     *     }
     * ==========================================================================
     *
     * @param associationId Id of associated victim asset.
     * @param associationType Type of associated victim asset.
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public disassociateVictimAsset(
        associationId: string,
        associationType: string,
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'victimAssets',
            associationType,
            associationId
        ].join('/');

        return this.delete(url, owner);
    }


    /**
     *  Disassociates a victim associated with the given entity.
     *
     * === Example Response =====================================================
     *     {
     *       "apiCalls": 1,
     *       "resultCount": 0,
     *       "status": "Success"
     *     }
     * ==========================================================================
     *
     * @param associationId Id of associated victim asset.
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public disassociateVictim(
        associationId: string,
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'victims',
            associationId
        ].join('/');

        return this.delete(url, owner);
    }


    /**
     *  Retrieves indicators associated with the given entity via a custom association.
     *
     * === Example Response =====================================================
     * {
     *     "status": "Success",
     *     "data": {
     *         "resultCount": 1,
     *         "indicator": [
     *             {
     *                 "id": 58,
     *                 "ownerName": "System",
     *                 "type": "User Agent",
     *                 "dateAdded": "2018-03-09T22:46:26-05:00",
     *                 "lastModified": "2018-03-09T22:46:26-05:00",
     *                 "threatAssessRating": 3,
     *                 "threatAssessConfidence": 50,
     *                 "webLink": "null/auth/indicators/details/customIndicator.xhtml?id=58&owner=System",
     *                 "summary": "foobar"
     *             }
     *         ]
     *     }
     * }
     * ==========================================================================
     *
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getCustomAssociationIndicators(
        id: string,
        type: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug(Array.from(arguments).toString());
        const resourceType = RESOURCE_TYPE[type];
        const url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'indicators'
        ].join('/');

        return this.get(url, owner, 'indicator');
    }
}