import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
    from 'spaces-ng';
import { Observable } from 'rxjs/Rx';
import {TCApiBaseService} from "./tc_api_base.service";


@Injectable()
export class TcTypeService extends TCApiBaseService {
    constructor(
        protected logging: SpacesLoggingService,
        protected request: SpacesRequestService,
        protected spacesBase: SpacesBaseService
    ) {
        super(logging, request, spacesBase);
        this.logging.moduleColor('#f26724', '#fff', 'TcIndicatorService');
    }

    /**
     * Returns all indicator types from ThreatConnect
     *
     * @returns {Observable<Object>} The JSON results from ThreatConnect
     */
    public getIndicatorTypes(): Observable<Response> {

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
    public getIndicatorType(type: string, getAdditionalDetails: boolean = false): Observable<Response> {

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