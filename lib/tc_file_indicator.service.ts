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
 * Service for interacting with the ThreatConnect API endpoints that provide CRUD operations for indicators.
 */
@Injectable()
export class FileIndicatorService extends TCApiBaseService {
    private resourceType = RESOURCE_TYPE['File'];

    constructor(
        protected logging: SpacesLoggingService,
        protected request: SpacesRequestService,
        protected spacesBase: SpacesBaseService
    ) {
        super(logging, request, spacesBase);
        this.logging.moduleColor('#f26724', '#fff', 'TcIndicatorService');
    }

    /**
     *  Retrieves occurrences for a file indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success',
     *       'data': {
     *         'fileOccurrence': {
     *           'id': 87534,
     *           'fileName': 'win999301.dll',
     *           'path': 'C:\\\\Windows\\System',
     *           'date': '2017-07-13T05:00:00Z'
     *         }
     *       }
     *     }
     * ==========================================================================
     *
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public getOccurrences(
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug('id', id);

        let url = [
            this.spacesBase.tcApiPath,
            this.resourceType.uri,
            id,
            'fileOccurrences'
        ].join('/');

        return this.get(url, owner, 'fileOccurrence');
    }

    /**
     *  Creates an occurrence for a file indicator.
     *
     * === Example Response =====================================================
     * {
     *   'status': 'Success',
     *   'data': {
     *     'fileOccurrence': {
     *       'id': 87534,
     *       'fileName': 'win999301.dll',
     *       'path': 'C:\\\\Windows\\System',
     *       'date': '2017-07-13T05:00:00Z'
     *     }
     *   }
     * }
     * ==========================================================================
     *
     * @param fileName the filename of the occurrence
     * @param path the path of the occurrence
     * @param date the date of the occurrence
     * @param id the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public createOccurrence(
        fileName: string,
        path: string,
        date: Date,
        id: string,
        owner: string
    ): Observable<Object> {
        this.logging.debug('id', id);

        let url = [
            this.spacesBase.tcApiPath,
            this.resourceType.uri,
            id,
            'fileOccurrences'
        ].join('/');

        const body = `
              {
                'fileName': '${fileName}',
                'path':     '${path}',
                'date':     '${date.toISOString()}'
              }  
        `;

        return this.get(url, owner, 'fileOccurrence');
    }

    /**
     *  Updates an occurrence for a file indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success',
     *       'data': {
     *         'fileOccurrence': {
     *           'id': 87534,
     *           'fileName': 'newFileName.exe',
     *           'path': 'C:\\\\Windows\\User32',
     *           'date': '2017-07-14T05:00:00Z'
     *         }
     *       }
     *     }
     * ==========================================================================
     *
     * @param fileName the filename of the occurrence
     * @param path the path of the occurrence
     * @param date the date of the occurrence
     * @param occurrenceId the id of the file occurrence to modify
     * @param fileId the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public updateOccurrence(
        fileName: string,
        path: string,
        date: Date,
        occurrenceId: string,
        fileId: string,
        owner: string
    ): Observable<Object> {
        let url = [
            this.spacesBase.tcApiPath,
            this.resourceType.uri,
            fileId,
            'fileOccurrences',
            occurrenceId
        ].join('/');

        const body = `
              {
                'fileName': '${fileName}',
                'path':     '${path}',
                'date':     '${date.toISOString()}'
              }  
        `;

        return this.get(url, owner, 'fileOccurrence');
    }

    /**
     *  Deletes a file occurrence for a file indicator.
     *
     * === Example Response =====================================================
     *     {
     *       'status': 'Success'
     *     }
     * ==========================================================================
     *
     * @param occurrenceId the id of the file occurrence to modify
     * @param fileId the value of the file indicator.
     * @param owner the ThreatConnect owner to read the indicator data from.
     * @returns {Observable<Object>} The JSON response from ThreatConnect
     */
    public deleteOccurrence(
        occurrenceId: string,
        fileId: string,
        owner: string
    ): Observable<Object> {
        let url = [
            this.spacesBase.tcApiPath,
            this.resourceType.uri,
            fileId,
            'fileOccurrences',
            occurrenceId
        ].join('/');

        return this.delete(url, owner);
    }
}