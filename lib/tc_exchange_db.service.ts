import { Injectable } from '@angular/core';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng/dist/main';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TcExchangeDbService {
    // CRUD for Data Store
    
    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcExchangeDbService');
    }
    
    // bcs - owner: any = undefined versus ?owner: any
    public create(
        domain: string,
        typeName: string,
        searchCommand: string,
        body: string,
        owner: any = undefined
    ): Observable<any> {
        this.logging.debug('domain', domain);
        this.logging.debug('typeName', typeName);
        
        let url = [
            this.spacesBase.tcApiPath,
            RESOURCE_TYPE.ExchangeDb.uri,
            domain,
            typeName,
            searchCommand
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .header('DB-Method', 'POST')
            .header('Content-Type', 'application/json')
            .body(body)
            .method('POST');
            
        if (domain === 'organization' && owner) {
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => {
                    try {
                        return res.json();
                    } catch (err) {
                        return {};
                    }
                },
                this.handleError
            );
    }
    
    public delete(
        domain: string,
        typeName: string,
        searchCommand: string,
        owner: any = undefined
    ) {
        this.logging.debug('domain', domain);
        this.logging.debug('typeName', typeName);

        let url = [
            this.spacesBase.tcApiPath,
            RESOURCE_TYPE.ExchangeDb.uri,
            domain,
            typeName,
            searchCommand
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .header('DB-Method', 'DELETE')
            .method('POST');
            
        if (domain === 'organization' && owner) {
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => {
                    try {
                        return res.json();
                    } catch (err) {
                        return {};
                    }
                },
                this.handleError
            );
    }

    public read(
        domain: string,
        typeName: string,
        searchCommand: string,
        owner: any = undefined
    ): Observable<any> {
        this.logging.debug('domain', domain);
        this.logging.debug('typeName', typeName);

        let url = [
            this.spacesBase.tcApiPath,
            RESOURCE_TYPE.ExchangeDb.uri,
            domain,
            typeName,
            searchCommand
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .header('DB-Method', 'GET')
            .method('POST');

        if (domain === 'organization' && owner) {
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => {
                    try {
                        return res.json();
                    } catch (err) {
                        return {};
                    }
                },
                this.handleError
            );
    }

    public update(
        domain: string,
        typeName: string,
        searchCommand: string,
        body: string,
        owner: any = undefined
    ) {
        this.logging.debug('domain', domain);
        this.logging.debug('typeName', typeName);

        let url = [
            this.spacesBase.tcApiPath,
            RESOURCE_TYPE.ExchangeDb.uri,
            domain,
            typeName,
            searchCommand
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .header('DB-Method', 'PUT')
            .header('Content-Type', 'application/json')
            .body(body)
            .method('POST');
            
        if (domain === 'organization' && owner) {
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => {
                    try {
                        return res.json();
                    } catch (err) {
                        return {};
                    }
                },
                this.handleError
            );
    }
    
    private handleError(error: string) {
        this.logging.error("Error on http Request", error);
    }
}
