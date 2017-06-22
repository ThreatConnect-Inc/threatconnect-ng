
export interface Address extends Indicator {
    ip?: string;
}

export interface Adversary extends Group {
}

export interface Attribute {
    id?: number;
    type?: string;
    source?: string;
    dateAdded?: Date;
    lastModified?: Date;
    displayed?: boolean;
    value?: string;
}

export interface BatchJobConfig {
    owner?: string;
    haltOnError?: boolean;
    // attributeWriteType?: AttributeWriteType;
    // action?: Action;
    attributeWriteType?: any;
    action?: any;
}

export interface BatchJobError {
    errorReason?: string;
    errorSource?: Indicator;
    errorMessage?: string;
    errorSourceJson?: any;
}

export interface BatchStatus {
    id?: number;
    // status?: Status;
    status?: any;
    errorCount?: number;
    successCount?: number;
    unprocessCount?: number;
}

export interface BulkStatus {
    name?: string;
    csvEnabled?: boolean;
    jsonEnabled?: boolean;
    nextRun?: Date;
    lastRun?: Date;
    status?: string;
}

export interface Community extends Owner {
}

export interface DnsResolution {
    resolutionDate?: Date;
    addresses?: Address[];
}

export interface Document extends Group {
    fileName?: string;
    fileSize?: number;
    status?: string;
    malware?: boolean;
    password?: string;
}

export interface Email extends Group {
    to?: string;
    from?: string;
    subject?: string;
    score?: number;
    header?: string;
    body?: string;
}

export interface EmailAddress extends Indicator {
    address?: string;
}

export interface FalsePositive {
    count?: number;
    lastReported?: Date;
}

export interface File extends Indicator {
    md5?: string;
    sha1?: string;
    sha256?: string;
    size?: number;
}

export interface FileOccurrence {
    id?: number;
    fileName?: string;
    path?: string;
    date?: Date;
}

export interface Group {
    id?: number;
    name?: string;
    type?: string;
    owner?: Owner;
    ownerName?: string;
    dateAdded?: Date;
    webLink?: string;
}

export interface Host extends Indicator {
    hostName?: string;
    dnsActive?: string;
    whoisActive?: string;
}

export interface Incident extends Group {
    eventDate?: Date;
}

export interface BaseIndicator {
    id?: number;
    owner?: Owner;
    ownerName?: string;
    type?: string;
    dateAdded?: Date;
    lastModified?: Date;
    rating?: number;
    confidence?: number;
    threatAssessRating?: number;
    threatAssessConfidence?: number;
    webLink?: string;
    // source?: string;
    description?: string;
    summary?: string;
    // attribute?: Attribute[];
    // tag?: Tag[];
    // observationCount?: number;
    // lastObserved?: Date;
    // falsePositiveCount?: number;
    // falsePositiveLastReported?: Date;
}

export interface Indicator {
    // required
    ownerName?: string;
    summary?: string;
    type?: string;
    
    // optional
    
    // owner?: Owner;
    dateAdded?: Date;
    id?: number;
    lastModified?: Date;
    rating?: number;
    confidence?: number;
    threatAssessRating?: number;
    threatAssessConfidence?: number;
    webLink?: string;
    
    // optional ???
    source?: string;
    description?: string;
    
    // ??? 
    observationCount?: number;
    lastObserved?: Date;
    
    falsePositiveCount?: number;
    falsePositiveLastReported?: Date;
}

export interface BulkIndicator extends Indicator {
    attribute?: Attribute[];
    tag?: Tag[];
}

export interface Individual extends Owner {
}

export interface Job {
    id?: number;
    lastExecution?: any;
}

export interface JobParameter {
    name?: string;
    value?: string;
    encrypted?: boolean;
}

export interface Observation {
    count?: number;
    dateObserved?: Date;
}

export interface ObservationCount {
    count?: number;
    lastObserved?: Date;
    yourCount?: number;
    yourLastObserved?: Date;
}

export interface Organization extends Owner {
}

export interface Owner {
    id?: number;
    name?: string;
    type?: string;
}

export interface OwnerMetric {
    metricDate?: Date;
    ownerName?: string;
    totalIndicator?: number;
    totalHost?: number;
    totalAddress?: number;
    totalEmailAddress?: number;
    totalFile?: number;
    totalUrl?: number;
    totalGroup?: number;
    totalThreat?: number;
    totalIncident?: number;
    totalEmail?: number;
    totalAdversary?: number;
    totalSignature?: number;
    totalTask?: number;
    totalDocument?: number;
    totalTag?: number;
    totalTrack?: number;
    totalResult?: number;
    totalIndicatorAttribute?: number;
    totalGroupAttribute?: number;
    averageIndicatorRating?: number;
    averageIndicatorConfidence?: number;
    totalEnrichedIndicator?: number;
    totalGroupIndicator?: number;
    totalObservationDaily?: number;
    totalObservationIndicator?: number;
    totalObservationAddress?: number;
    totalObservationEmailAddress?: number;
    totalObservationFile?: number;
    totalObservationHost?: number;
    totalObservationUrl?: number;
    totalFalsePositiveDaily?: number;
    totalFalsePositive?: number;
}

export interface SecurityLabel {
    name?: string;
    description?: string;
    dateAdded?: Date;
}

export interface Signature extends Group {
    fileType?: string;
    fileName?: string;
    fileText?: string;
}

export interface Source extends Owner {
}

export interface SpaceState {
    spaceId?: number;
    stateText?: string;
}

export interface Tag {
    name?: string;
    description?: string;
    webLink?: string;
}

export interface Task extends Group {
    status?: string;
    escalated?: boolean;
    reminded?: boolean;
    overdue?: boolean;
    dueDate?: Date;
    reminderDate?: Date;
    escalationDate?: Date;
    assignee?: User[];
    escalatee?: User[];
}

export interface Threat extends Group {
}

export interface Url extends Indicator {
    text?: string;
}

export interface User {
    userName?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export interface Victim {
    id?: number;
    name?: string;
    description?: string;
    org?: string;
    suborg?: string;
    workLocation?: string;
    nationality?: string;
    webLink?: string;
}

export interface VictimAsset {
    id?: number;
    name?: string;
    type?: string;
    webLink?: string;
}

export interface VictimEmailAddress extends VictimAsset {
    address?: string;
    addressType?: string;
}

export interface VictimNetworkAccount extends VictimAsset {
    account?: string;
    network?: string;
}

export interface VictimPhone extends VictimAsset {
    phoneType?: string;
}

export interface VictimSocialNetwork extends VictimAsset {
    account?: string;
    network?: string;
}

export interface VictimWebSite extends VictimAsset {
    webSite?: string;
}

// export type AttributeWriteType = "Append" | "Replace" | "Static";

// export type Action = "Create" | "Delete";

// export type Status = "Created" | "Queued" | "Running" | "Completed" | "Expired";
