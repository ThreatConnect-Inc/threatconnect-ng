import { NgModule } from '@angular/core';

import { TcExchangeDbService } from './tc_exchange_db.service';
import { TcGroupService } from './tc_group.service';
import { TcIndicatorService } from './tc_indicator.service';
import { TcOwnerService } from './tc_owner.service';
import { TcSecurityLabelService } from './tc_security_labels.service';
import { TcUtilityService } from './tc_utility.service';
import { TcWhoAmIService } from './tc_whoami.service';
import {TcTypeService} from './tc_type.service';

import { SpacesModule } from 'spaces-ng';

@NgModule({
    imports: [
        SpacesModule,
    ],
    providers: [
        TcExchangeDbService,
        TcGroupService,
        TcIndicatorService,
        TcOwnerService,
        TcSecurityLabelService,
        TcUtilityService,
        TcWhoAmIService,
        TcTypeService
    ]
})
export class TcModule { }