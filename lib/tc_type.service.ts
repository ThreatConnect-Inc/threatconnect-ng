import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
    from 'spaces-ng';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TcTypeService {
    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcIndicatorService');
    }

    /**
     * Returns all indicator types from ThreatConnect
     *
     * @returns {Observable<Object>} The JSON results from ThreatConnect
     */
    public getAll(): Observable<Response> {

        let url = [
            this.spacesBase.tcApiPath,
            'v2/types/indicatorTypes'
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request();

    }

    /**
     * Returns a specific indicator type from ThreatConnect
     *
     * @returns {Observable<Object>} The JSON results from ThreatConnect
     */
    public getForType(type: string, getAdditionalDetails: boolean = false): Observable<Response> {

        let url = [
            this.spacesBase.tcApiPath,
            'v2/types/indicatorTypes',
            type
        ].join('/');



        const tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        if (getAdditionalDetails) {
            tcRequest.param('includeAdditional', 'true');
        }

        return tcRequest.request();
    }
}