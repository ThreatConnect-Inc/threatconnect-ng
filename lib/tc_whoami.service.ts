/**
 * Created by cblades on 10/5/2017.
 */
import { Injectable } from '@angular/core';
import { Owner } from './entities';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
    from 'spaces-ng';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TcWhoAmIService {
    private emptyResults: Owner[] = [];

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcWhoAmIService');
    }

    public getWhoAmI(): Observable<any> {
        this.logging.debug('getWhoAmI', '');

        let url = [
            this.spacesBase.tcApiPath,
            'v2/whoami'
        ].join('/');

        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    }

    private handleError(error: any) {
        return Promise.reject(error);
    }
}
