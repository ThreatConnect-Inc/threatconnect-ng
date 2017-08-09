import { NgModule } from '@angular/core';

import { TcExchangeDbService } from './lib/tc_exchange_db.service';
import { TcGroupService } from './lib/tc_group.service';
import { TcIndicatorService } from './lib/tc_indicator.service';
import { TcOwnerService } from './lib/tc_owner.service';
import { TcSecurityLabelService } from './lib/tc_security_labels.service';
import { TcUtilityService } from './lib/tc_utility.service';

import { SpacesModule } from 'spaces-ng/main';

@NgModule({
    imports: [
        SpacesModule,
        TcExchangeDbService,
        TcGroupService,
        TcIndicatorService,
        TcOwnerService,
        TcSecurityLabelService,
        TcUtilityService,
    ],
    exports: [
        TcExchangeDbService,
        TcGroupService,
        TcIndicatorService,
        TcOwnerService,
        TcSecurityLabelService,
        TcUtilityService,
    ]
})
export class TcModule { }


export * from './lib/tc_resource_type';
export * from './lib/entities';