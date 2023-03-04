import {JobField} from './constants';

export const jobTableColumns = Object.freeze([
    {
        id: JobField.Id,
        label: 'feature.dnntJobs.table.columns.id',
        width: 100,
        align: 'center'
    },
    {
        id: JobField.Title,
        label: 'feature.dnntJobs.table.columns.title',
        width: 100,
        align: 'center'
    },
    {
        id: JobField.Description,
        label: 'feature.dnntJobs.table.columns.description',
        width: 100,
        align: 'center'
    },
    {
        id: JobField.CronExpressionExplanation,
        label: 'feature.dnntJobs.table.columns.cronExpressionExplanation',
        width: 100,
        align: 'center'
    },
    {
        id: JobField.LastExecution,
        label: 'feature.dnntJobs.table.columns.lastExecution',
        width: 100,
        align: 'center'
    },
    {
        id: JobField.NextExecution,
        label: 'feature.dnntJobs.table.columns.nextExecution',
        width: 100,
        align: 'center'
    },
    {
        id: 'actions',
        label: 'feature.dnntJobs.table.columns.actions',
        maxWidth: 100,
        align: 'center',
    },
]);
