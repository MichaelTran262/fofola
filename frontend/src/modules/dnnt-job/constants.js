export const JobField = Object.freeze({
    Id: 'id',
    LogFilePath: 'logFilePath',
    Title: 'title',
    Description: 'description',
    CronExpression: 'cronExpression',
    CronExpressionExplanation: 'cronExpressionExplanation',
    Active: 'active',
    SessionType: 'operation.sessionType',
    Direction: 'operation.direction',
    Requestor: 'operation.requestor',
    From: 'operation.range.from',
    To: 'operation.range.to',
    SolrQuery: 'operation.solr.query',
    SolrParameters: 'operation.solr.parameters',
    Created: 'created',
    LastExecution: 'lastExecution',
    NextExecution: 'nextExecution',
});

export const JobFormType = Object.freeze({
    Create: 'createJobForm',
    Update: 'updateJobForm',
});
