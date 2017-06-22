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
    ],
    providers: [
        TcExchangeDbService,
        TcGroupService,
        TcIndicatorService,
        TcOwnerService,
        TcSecurityLabelService,
        TcUtilityService,
    ]
})
class TcModule { }

export {
    TcExchangeDbService,
    TcGroupService,
    TcIndicatorService,
    TcOwnerService,
    TcSecurityLabelService,
    TcUtilityService,
    TcModule,
};

export * from './lib/tc_resource_type';
export * from './lib/entities';