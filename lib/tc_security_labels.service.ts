import { Injectable } from '@angular/core';
import {
    SpacesBaseService,
    SpacesLoggingService,
    SpacesRequestService
}
from 'spaces-ng';
import { RESOURCE_TYPE } from './tc_resource_type';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TcSecurityLabelService {

    constructor(
        private logging: SpacesLoggingService,
        private request: SpacesRequestService,
        private spacesBase: SpacesBaseService
    ) {
        this.logging.moduleColor('#f26724', '#fff', 'TcSecurityLabelService');
    }

    public getAll(
        owner: any = undefined,
        resultLimit: number = 500,
        resultStart: number = 0
    ): Observable<any> {
        this.logging.debug('owner', owner);
        let resourceType = RESOURCE_TYPE.SecurityLabel;
 
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
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
                        .map(res => res.json().data[resourceType.dataField] || {},
                            this.handleError);
    }

    public getById(
        id: string,
        type: string,
        owner: string,
        resultLimit: number = 500,
        resultStart: number = 0
    ): Observable<any> {
        this.logging.debug('id', id);
        
        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'securityLabels'
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .param('resultLimit', resultLimit)
            .param('resultStart', resultStart)
            .method('GET');

        if (owner) {
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => res.json().data[RESOURCE_TYPE.SecurityLabel.dataField] || {},
                this.handleError);
    }

    public getAttributeById(
        id: string,
        type: string,
        attributeId: string,
        owner: string,
        resultLimit: number = 500,
        resultStart: number = 0
    ): Observable<any> {
        this.logging.debug('id', id);

        let resourceType = RESOURCE_TYPE[type];
        let url = [
            this.spacesBase.tcApiPath,
            resourceType.uri,
            id,
            'attributes',
            attributeId,
            'securityLabels'
        ].join('/');

        let tcRequest = this.request
            .resetOptions()
            .url(url)
            .header('Authorization', 'TC-Token ' + this.spacesBase.tcToken)
            .param('resultLimit', resultLimit)
            .param('resultStart', resultStart)
            .method('GET');

        if (owner) {
            tcRequest.param('owner', owner);
        }

        return tcRequest.request()
            .map(res => res.json().data[RESOURCE_TYPE.SecurityLabel.dataField] || {},
                this.handleError);
    }

    private handleError(error: any) {
        return Promise.reject(error);
    }
}

/*
/v2/groups/adversaries/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/groups/adversaries/{uniqueId}/securityLabels
/v2/groups/documents/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/groups/documents/{uniqueId}/securityLabels
/v2/groups/emails/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/groups/emails/{uniqueId}/securityLabels
/v2/groups/incidents/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/groups/incidents/{uniqueId}/securityLabels
/v2/groups/signatures/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/groups/signatures/{uniqueId}/securityLabels
/v2/groups/threats/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/groups/threats/{uniqueId}/securityLabels
/v2/indicators/addresses/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/indicators/addresses/{uniqueId}/securityLabels
/v2/indicators/emailAddresses/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/indicators/emailAddresses/{uniqueId}/securityLabels
/v2/indicators/files/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/indicators/files/{uniqueId}/securityLabels
/v2/indicators/hosts/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/indicators/hosts/{uniqueId}/securityLabels
/v2/indicators/urls/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/indicators/urls/{uniqueId}/securityLabels
/v2/securityLabels
/v2/tasks/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/tasks/{uniqueId}/securityLabels
/v2/victims/{uniqueId}/attributes/{attributeId}/securityLabels
/v2/victims/{uniqueId}/securityLabels
*/
