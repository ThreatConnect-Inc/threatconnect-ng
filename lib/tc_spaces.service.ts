import { Injectable } from '@angular/core';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng';
import { Owner } from './entities';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class TcSpacesService {
    private emptyResults: any = {};

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcSpacesService');
    }
    
    public commitFile(
        fileName: string
    ) {
        /* POST - /v2/exchange/spaces/{element id}/file/{name} */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'file',
            fileName
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .header('Content-Type', 'multipart/form-data')
            .method('POST');
            
        return tcRequest.request()
                        .map(res => res.json().data || this.emptyResults,
                             this.handleError);
    };
    
    public commitJob(
        stateParams: string,
        stateText: string
    ): Observable<any> {
        /* POST - /v2/exchange/spaces/{element id}/job */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'job'
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('POST')
            .body(stateParams, stateText); // bcs - what should these values be?
        // bcs - example below
        // var post = $.extend(this.sData.stateParams, this.sData.stateText);

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    public commitState(): Observable<any> {
        /* POST - /v2/exchange/spaces/{element id}/state */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'state'
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('POST')
            .body(stateParams, stateText); // bcs - what should these values be?
        // bcs - example below
        // var post = $.extend(this.sData.stateParams, this.sData.stateText);

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    /* bcs - what the difference between this and commitJob? */
    public executeJob(
        stateParams: string,
        stateText: string
    ): Observable<any> {
        /* POST - /v2/exchange/spaces/{element id}/job/execute */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'job'
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('POST')
            .body(stateParams, stateText); // bcs - what should these values be?
        // bcs - example below
        // var post = $.extend(this.sData.stateParams, this.sData.stateText);

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    public deleteFile(
        fileName: string
    ): Observable<any> {
        /* DELETE - /v2/exchange/spaces/{element id}/file/{name} */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'file',
            fileName
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('DELETE');

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    public retrieveFile(
        fileName: string
    ): Observable<any> {
        /* GET - /v2/exchange/spaces/{element id}/file/{name} */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'file',
            fileName
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    public retrieveFiles(): Observable<any> {
        /* GET - /v2/exchange/spaces/{element id}/file */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'file'
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    public retrieveJob(): Observable<any> {
        /* GET - /v2/exchange/spaces/{element id}/job */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'job'
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };
    
    public retrieveState(): Observable<any> {
        /* GET - /v2/exchange/spaces/{element id}/state */
        
        let url = [
            this.spacesBase.tcApiPath,
            'exchange/spaces',
            this.spacesBase.tcSpaceElementId,
            'state'
        ].join('/')
        
        let tcRequest = this.request
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .method('GET');

        return tcRequest.request()
            .map(res => res.json().data || this.emptyResults,
                this.handleError);
    };

    private handleError(error: any) {
        return Promise.reject(error);
    }
}
