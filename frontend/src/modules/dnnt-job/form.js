import {create} from 'tools';
import {SugoSessionRequestor} from '../constants';
import moment from 'moment';
import {JobField} from './constants';

export const defaultValues = create({
    [JobField.Active]: true,
    [JobField.Title]: '',
    [JobField.Description]: '',
    [JobField.CronExpression]: '',
    [JobField.CronExpressionExplanation]: '',
    [JobField.SessionType]: '',
    [JobField.Direction]: '',
    [JobField.Requestor]: SugoSessionRequestor.Auto.value,
    [JobField.From]: null,
    [JobField.To]: null,
    [JobField.SolrQuery]: '',
    [JobField.SolrParameters]: '',
});

export const labels = new Map([
    [JobField.Title, 'feature.dnntJobs.form.fields.title.title'],
    [JobField.Description, 'feature.dnntJobs.form.fields.description.title'],
    [JobField.CronExpression, 'feature.dnntJobs.form.fields.cronExpression.title'],
    [JobField.CronExpressionExplanation, 'feature.dnntJobs.form.fields.cronExpressionExplanation.title'],
    [JobField.Active, 'feature.dnntJobs.form.fields.active.title'],
    [JobField.SessionType, 'feature.dnntJobs.form.fields.sessionType.title'],
    [JobField.From, 'feature.dnntJobs.form.fields.from.title'],
    [JobField.To, 'feature.dnntJobs.form.fields.to.title'],
    [JobField.Direction, 'feature.dnntJobs.form.fields.direction.title'],
    [JobField.SolrQuery, 'feature.dnntJobs.form.fields.solrQuery.title'],
    [JobField.SolrParameters, 'feature.dnntJobs.form.fields.solrParameters.title'],
]);

export const rules = new Map([
    [JobField.Title, { required: 'common.form.field.error.notNull' }],
    [JobField.Direction, { required: 'common.form.field.error.notNull' }],
    [JobField.SolrQuery, { required: 'common.form.field.error.notNull' }],
    [JobField.SolrParameters, { required: 'common.form.field.error.notNull' }],
    [JobField.SessionType, { required: 'common.form.field.error.notNull' }],
    [JobField.From, { required: 'common.form.field.error.notNull' }],
    [
        JobField.CronExpression,
        {
            required: 'common.form.field.error.notNull',
            pattern: {
                value: /^(\*|[0-9,-/])+(\s+(\*|[0-9,-/])+){4,5}$/,
                message: 'feature.dnntJobs.form.fields.cronExpression.error.invalidFormat',
            },
        },
    ],
    [
        JobField.To,
        {
            required: 'common.form.field.error.notNull',
            validate: {
                isAfterStartDate: (value, allValues) => {
                    const rawFrom = allValues[JobField.From];
                    if (!rawFrom) {
                        return true;
                    }
                    return moment(new Date(value)).isSameOrAfter(moment(new Date(rawFrom))) ||
                        'feature.dnntJobs.form.fields.to.error.cantBeAfterFromDate'
                },
            },
        }
    ],
]);

const textFieldProps = {
    variant: 'outlined',
    size: 'small',
    type: 'text',
};

const textAreaFieldProps = {
    variant: 'outlined',
    size: 'small',
    type: 'text',
    multiline: true,
};

const selectorFieldProps = {
    variant: 'outlined',
    size: 'small',
};

const datePickerProps = {
    variant: 'outlined',
    size: 'small',
};

const switchProps = {
    variant: 'outlined',
    size: 'small',
};

export const fieldProps = new Map([
    [JobField.Title, textFieldProps],
    [JobField.Description, {...textAreaFieldProps, minRows: 6}],
    [JobField.Direction, selectorFieldProps],
    [JobField.SessionType, selectorFieldProps],
    [JobField.CronExpression, textFieldProps],
    [JobField.CronExpressionExplanation, {...textAreaFieldProps, minRows: 3}],
    [JobField.Active, switchProps],
    [JobField.From, datePickerProps],
    [JobField.To, datePickerProps],
    [JobField.SolrQuery, {...textAreaFieldProps, minRows: 3}],
    [JobField.SolrParameters, {...textAreaFieldProps, minRows: 3}],
]);
