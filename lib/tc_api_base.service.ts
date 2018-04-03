import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
    from 'spaces-ng';
import { Observable } from 'rxjs/Rx';


/**
 * Base class for services that interact with the ThreatConnect API.
 */
export class TCApiBaseService {

    constructor(
        protected logging: SpacesLoggingService,
        protected request: SpacesRequestService,
        protected spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcIndicatorService');
    }

    protected get(url: string, owner: string, dataKey: string): Observable<Object> {
        return this.requestHelper(url, owner, 'GET', dataKey);
    }

    protected delete(url: string, owner: string): Observable<Object> {
        return this.requestHelper(url, owner, 'DELETE', null);
    }

    protected post(url: string, owner: string, body?: any): Observable<Object> {
        return this.requestHelper(url, owner, 'POST', null, body);
    }

    protected postWithDataKey(url: string, owner: string, datakey: string, body?: any): Observable<Object> {
        return this.requestHelper(url, owner, 'POST', datakey, body);
    }
    protected put(url: string, owner: string, dataKey: string, body?: any): Observable<Object> {
        return this.requestHelper(url, owner, 'PUT', dataKey, body);
    }

    protected requestHelper(url: string, owner: string, method: string, dataKey: string, body?: any): Observable<Object> {
        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .param('owner', owner)
            .method(method);

        if (body !== undefined) {
            tcRequest.body(body);
        }

        return tcRequest.request()
            .map(
                res => {
                    if (dataKey) {
                        return res.json().data[dataKey] || {};
                    } else {
                        return res.json();
                    }
                },
                this.handleError
            );
    }

    protected handleError(error: any) {
        return Promise.reject(error);
    }
}