import { Injectable } from '@angular/core';
import { Owner } from './entities';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng/main';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TcOwnerService {
    private emptyResults: Owner[] = [];

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcOwnerService');
    }

    public getById(
        id: number
    ): Observable<any> {
        this.logging.debug('id', id);

        let url = [
            this.spacesBase.tcApiPath,
            RESOURCE_TYPE.Owner.uri,
            id
        ].join('/')

        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
                        .map(res => <Owner[]> res.json().data.owner || this.emptyResults,
                            this.handleError);
    }

    public getByIndicator(
        indicator: string,
        indicatorType: any
    ): Observable<any> {
        this.logging.debug('indicator', indicator);

        let type = RESOURCE_TYPE[indicatorType];
        let url = [
            this.spacesBase.tcApiPath,
            type.uri,
            encodeURIComponent(indicator),
            'owners'
        ].join('/');

        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
                        .map(res => <Owner[]> res.json().data.owner || this.emptyResults,
                            this.handleError);
    }

    public getAll(): Observable<any> {
        this.logging.debug('getAll', '');

        let url = [
            this.spacesBase.tcApiPath,
            RESOURCE_TYPE.Owner.uri
        ].join('/');

        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
                        .map(res => <Owner[]> res.json().data.owner || this.emptyResults,
                            this.handleError);
    }

    private handleError(error: any) {
        return Promise.reject(error);
    }
}
