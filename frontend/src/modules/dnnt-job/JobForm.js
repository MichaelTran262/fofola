import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {closeJobForm} from './slice';
import React, {useEffect} from 'react';
import {Box, Button, Divider, Grid, makeStyles, Modal} from '@material-ui/core';
import {
    SugoAutomaticJobSessionType,
    sugoAutomaticJobSessionTypes,
    SugoSessionDirection,
    sugoSessionDirections,
} from '../constants';
import cronstrue from 'cronstrue';
import {formatAsEndOfDay, formatAsStartOfDay, isValidCron} from './utils';
import {JobField, JobFormType} from './constants';
import {useForm} from '../../effects/useForm';
import {submitCreateJobForm, submitUpdateJobForm} from './saga';
import {get, set} from 'tools';
import {defaultValues, fieldProps, rules, labels} from './form';

const createStyles = () => {
    const styles = {
        form: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            border: '1px solid rgb(212, 101, 3)',
            borderRadius: '5px',
            boxShadow: 24,
            padding: 4,
            width: '30%',
        },
        formBox: {
            margin: '20px',
        },
        fieldWrap: {
            width: '100%',
        },
        field: {
            width: '100%',
        },
    };
    return makeStyles(styles)();
}

export const JobForm = ({type}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = createStyles();
    const {
        handleSubmit,
        getValue,
        getValues,
        setValue,
        reset,
        components: {
            createTextField,
            createTextArea,
            createSelector,
            createSwitch,
            createDatepicker,
        }
    } = useForm({labels, rules, fieldProps, defaultValues});

    /* clean up function to be called when the component unmounts */
    useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const onSubmitFormDispatch = new Map([
        [JobFormType.Create, submitCreateJobForm],
        [JobFormType.Update, submitUpdateJobForm],
    ]);

    const onSubmit = (data) => {
        const closeCallback = async (success) => {
            if (success) {
                /* wait a bit until the submitting process of react-form-hook finished */
                /* otherwise it produces an error */
                await new Promise(resolve => setTimeout(resolve, 200));
                dispatch(closeJobForm());
            }
        }
        const processedData = set(data, {
            [JobField.From]: formatAsStartOfDay(get(JobField.From, data)),
            [JobField.To]: formatAsEndOfDay(get(JobField.To, data)),
        })
        dispatch(onSubmitFormDispatch.get(type)(processedData, closeCallback));
    };

    const onCancel = () => {
        dispatch(closeJobForm());
    };

    const refreshCronExplanation = (cronExpression) => {
        const explanation = isValidCron(cronExpression) ? cronstrue.toString(cronExpression) : '';
        setValue(JobField.CronExpressionExplanation, explanation);
    };

    const formFromTo = (
        <Grid item xs={12}>
            <Grid container direction={'row'} alignItems={'flex-start'} spacing={2} alignContent={'center'}>
                <Grid item xs={6} className={classes.fieldWrap}>
                    {createDatepicker({
                        fieldName: JobField.From,
                        className: classes.field,
                    })}
                </Grid>
                <Grid item xs={6} className={classes.fieldWrap}>
                    {createDatepicker({
                        fieldName: JobField.To,
                        className: classes.field,
                    })}
                </Grid>
            </Grid>
        </Grid>
    );

    const formCustom = (
        <Grid item xs={12}>
            <Grid container direction={'column'} alignItems={'flex-start'} spacing={2} alignContent={'center'}>
                <Grid item xs={12} className={classes.fieldWrap}>
                    {createTextArea({
                        fieldName: JobField.SolrQuery,
                        className: classes.field,
                    })}
                </Grid>
                <Grid item xs={12} className={classes.fieldWrap}>
                    {createTextArea({
                        fieldName: JobField.SolrParameters,
                        className: classes.field,
                    })}
                </Grid>
            </Grid>
        </Grid>
    );

    const sectionByJobSessionType = new Map([
        [SugoAutomaticJobSessionType.Full.value, formFromTo],
        [SugoAutomaticJobSessionType.Changes.value, formFromTo],
        [SugoAutomaticJobSessionType.Custom.value, formCustom],
    ]);

    const generalSection = (
        <Grid container alignItems={'center'} direction={'row'} spacing={2}>
            <Grid item xs={6}>
                <Grid container alignItems={'center'} direction={'column'} spacing={2}>
                    <Grid item className={classes.fieldWrap}>
                        {createTextField({
                            fieldName:JobField.Title,
                            className: classes.field,
                        })}
                    </Grid>
                    <Grid item className={classes.fieldWrap}>
                        {createSelector({
                            fieldName: JobField.Direction,
                            options: sugoSessionDirections.filter((item) => item !== SugoSessionDirection.Rest2Dst),
                            className: classes.field,
                        })}
                    </Grid>
                    <Grid item className={classes.fieldWrap}>
                        {createSelector({
                            fieldName: JobField.SessionType,
                            options: sugoAutomaticJobSessionTypes,
                            className: classes.field,
                            onChange: (value) => {
                                /* clear session specific fields */
                                const cleared = set(getValues(), {
                                    [JobField.From]: null,
                                    [JobField.To]: null,
                                    [JobField.SolrQuery]: null,
                                    [JobField.SolrParameters]: null,
                                });
                                const keepOptions = {
                                    keepValues: true,
                                    keepErrors: true,
                                    keepDirty: true,
                                    keepTouched: true,
                                    keepDirtyValues: true,
                                };
                                reset(cleared, keepOptions);
                            }
                        })}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container alignItems={'center'} direction={'column'} spacing={1}>
                    <Grid item className={classes.fieldWrap}>
                        {createTextArea({
                            fieldName: JobField.Description,
                            className: classes.field,
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    const periodicitySection = (
        <Grid container alignItems={'flex-start'} direction={'row'} spacing={2}>
            <Grid item xs={6}>
                <Grid container alignItems={'center'} direction={'column'} spacing={2}>
                    <Grid item className={classes.fieldWrap}>
                        {createTextField({
                            fieldName: JobField.CronExpression,
                            className: classes.field,
                            onChange: (value) => refreshCronExplanation(value),
                        })}
                    </Grid>
                    <Grid item>
                        {createSwitch({ fieldName: JobField.Active })}
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container alignItems={'center'} direction={'column'} spacing={1}>
                    <Grid item className={classes.fieldWrap}>
                        {createTextArea({
                            fieldName: JobField.CronExpressionExplanation,
                            className: classes.field,
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );

    const footer = (
        <Grid container alignItems={'center'} direction={'row'} spacing={3}>
            <Grid item xs={6} align={'right'}>
                <Button
                    onClick={handleSubmit(onSubmit)}
                    color={'primary'}
                >
                    {t('feature.dnntJobs.form.buttons.submit.title')}
                </Button>
            </Grid>
            <Grid item xs={6} align={'left'}>
                <Button
                    onClick={onCancel}
                    color={'primary'}
                >
                    {t('feature.dnntJobs.form.buttons.cancel.title')}
                </Button>
            </Grid>
        </Grid>
    );

    return (
        <Modal
            open={true}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <form>
                <Box className={classes.form}>
                    <Box className={classes.formBox}>
                        <Grid container direction={'column'} spacing={4}>
                            <Grid item>
                                {generalSection}
                            </Grid>
                            <Divider variant={'middle'} />
                            <Grid item>
                                {periodicitySection}
                            </Grid>
                            <Divider variant={'middle'} />
                            <Grid item>
                                {sectionByJobSessionType.get(getValue(JobField.SessionType))}
                            </Grid>
                            <Grid item>
                                {footer}
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
};
