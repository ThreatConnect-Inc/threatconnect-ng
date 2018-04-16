export const RESOURCE_TYPE = {
    Address: {
        'dataField': 'address',
        'postField': 'ip',
        'indicatorFields': ['ip'],
        'type': 'Address',
        'uri': 'v2/indicators/addresses',
    },
    
    Adversary: {
        'dataField': 'adversary',
        'type': 'Adversary',
        'uri': 'v2/groups/adversaries',
    },

    Campaign: {
        'dataField': 'campaign',
        'type': 'Campaign',
        'uri': 'v2/groups/campaigns',
    },
    
    Document: {
        'dataField': 'document',
        'type': 'Document',
        'uri': 'v2/groups/documents',
    },
    
    Email: {
        'dataField': 'email',
        'type': 'Email',
        'uri': 'v2/groups/emails',
    },
    
    EmailAddress: {
        'dataField': 'emailAddress',
        'postField': 'address',
        'indicatorFields': ['address'],
        'type': 'EmailAddress',
        'uri': 'v2/indicators/emailAddresses',
    },
    
    ExchangeDb: {
        'dataField': 'emailAddress',
        'postField': 'address',
        'indicatorFields': ['address'],
        'type': 'EmailAddress',
        'uri': 'v2/exchange/db',
    },
    
    File: {
        'dataField': 'file',
        'postField': '',
        'indicatorFields': ['md5', 'sha1', 'sha256'],
        'type': 'File',
        'uri': 'v2/indicators/files',
    },
    
    Group: {
        'dataField': 'group',
        'type': 'Group',
        'uri': 'v2/groups',
    },
    
    Host: {
        'dataField': 'host',
        'postField': 'hostName',
        'indicatorFields': ['hostName'],
        'type': 'Host',
        'uri': 'v2/indicators/hosts',
    },
    
    Incident: {
        'dataField': 'incident',
        'type': 'Incident',
        'uri': 'v2/groups/incidents',
    },
    
    Indicator: {
        'dataField': 'indicator',
        'type': 'Indicator',
        'indicatorFields': ['summary'],
        'uri': 'v2/indicators',
    },
    
    Md5: {
        'dataField': 'file',
        'postField': 'md5',
        'type': 'File',
        'uri': 'v2/indicators/files',
    },
    
    Owner: {
        'dataField': '',
        'type': 'Owner',
        'uri': 'v2/owners',
    },
    
    SecurityLabel: {
        'dataField': 'securityLabel',
        'type': 'securityLabels',
        'uri': 'v2/securityLabels',
    },
    
    Sha1: {
        'dataField': 'file',
        'postField': 'sha1',
        'type': 'File',
        'uri': 'v2/indicators/files',
    },
    
    Sha256: {
        'dataField': 'file',
        'postField': 'sha256',
        'type': 'File',
        'uri': 'v2/indicators/files',
    },
    
    Signature: {
        'dataField': 'signature',
        'type': 'Signature',
        'uri': 'v2/groups/signatures',
    },

    Tag: {
        'dataField': 'name',
        'type': 'Tag',
        'uri': 'v2/tags',
    },

    Task: {
        'dataField': 'task',
        'type': 'Task',
        'uri': 'v2/tasks',
    },
    
    Threat: {
        'dataField': 'threat',
        'type': 'Threat',
        'uri': 'v2/groups/threats',
    },
    
    Url: {
        'dataField': 'url',
        'postField': 'text',
        'indicatorFields': ['text'],
        'type': 'URL',
        'uri': 'v2/indicators/urls',
    },
    
    Victim: {
        'dataField': 'victim',
        'type': 'Victim',
        'uri': 'v2/victims',
    },
    
    VictimAsset: {
        'dataField': 'victimAsset',
        'type': 'VictimAsset',
        'uri': 'v2/victimAssets',
    },
    
    VictimAssetEmailAddresses: {
        'dataField': 'victimEmailAddress',
        'type': 'EmailAddress',
        'uri': 'v2/victimAssets/emailAddresses',
    },
    
    VictimAssetNetworkAccounts: {
        'dataField': 'victimNetworkAccount',
        'type': 'NetworkAccount',
        'uri': 'v2/victimAssets/networkAccounts',
    },
    
    VictimAssetPhoneNumbers: {
        'dataField': 'victimPhone',
        'type': 'Phone',
        'uri': 'v2/victimAssets/phoneNumbers',
    },
    
    VictimAssetSocailNetworks: {
        'dataField': 'victimSocialNetwork',
        'type': 'SocialNetwork',
        'uri': 'v2/victimAssets/socialNetworks',
    },
    
    VictimAssetWebsites: {
        'dataField': 'victimWebSite',
        'type': 'WebSite',
        'uri': 'v2/victimAssets/webSites',
    }
};