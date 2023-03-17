import { useForm as originalUseForm } from 'react-hook-form';
import {FormTextField} from "../components/form/react-form/FormTextField";
import React from "react";
import {FormSelector} from "../components/form/react-form/FormSelector";
import {FormDatepicker} from "../components/form/react-form/FormDatepicker";
import {FormSwitch} from "../components/form/react-form/FormSwitch";
import {MenuItem} from "@material-ui/core";
import {useTranslation} from "react-i18next";

export const useForm = ({
    labels = new Map(),
    rules = new Map(),
    fieldProps = new Map(),
    defaultValues = {},
    mode = 'onChange',
}) => {
    const {
        watch,
        control,
        handleSubmit,
        getValues,
        setValue,
        reset,
        formState: { errors, isSubmitting, isSubmitSuccessful},
    } = originalUseForm({defaultValues, mode});
    const {t} = useTranslation();

    const getErrorForField = (fieldName, errors) => fieldName.split('.').reduce((o, k) => (o || {})[k], errors);

    const createTextField = ({fieldName, className, onChange}) => (
        <FormTextField
            name={fieldName}
            label={labels.get(fieldName) || ''}
            control={control}
            rules={rules.get(fieldName) || {}}
            error={getErrorForField(fieldName, errors)}
            onChange={onChange}
            fieldStyle={{
                ...fieldProps.get(fieldName),
                className: className,
            }}
        />
    );

    const createTextArea = ({fieldName, className}) => (
        <FormTextField
            name={fieldName}
            label={labels.get(fieldName) || ''}
            control={control}
            rules={rules.get(fieldName) || {}}
            error={getErrorForField(fieldName, errors)}
            fieldStyle={{
                ...fieldProps.get(fieldName),
                className: className,
            }}
        />
    );

    const createSelectorOptions = (options) => options.map((option, index) => (
        <MenuItem key={index} value={option.value}>
            {t(option.text)}
        </MenuItem>
    ));

    const createSelector = ({fieldName, options, onChange, className}) => {
        const convertedOptions = createSelectorOptions(options);
        return (
            <FormSelector
                name={fieldName}
                label={labels.get(fieldName)}
                options={convertedOptions}
                control={control}
                rules={rules.get(fieldName)}
                error={getErrorForField(fieldName, errors)}
                onChange={onChange}
                fieldStyle={{
                    ...fieldProps.get(fieldName),
                    className: className,
                }}
            />
        );
    };

    const createDatepicker = ({fieldName, className}) => (
        <FormDatepicker
            name={fieldName}
            label={labels.get(fieldName)}
            control={control}
            rules={rules.get(fieldName)}
            error={getErrorForField(fieldName, errors)}
            fieldStyle={{
                ...fieldProps.get(fieldName),
                className: className,
            }}
        />
    );

    const createSwitch = ({fieldName}) => (
        <FormSwitch
            name={fieldName}
            label={labels.get(fieldName)}
            control={control}
            fieldStyle={fieldProps.get(fieldName)}
        />
    );

    return {
        watch,
        control,
        handleSubmit,
        setValue,
        getValues,
        getValue: (fieldName) => getValues(fieldName),
        reset,
        state: {
            errors,
            isSubmitting,
            isSubmitSuccessful,
        },
        components: {
            createTextField,
            createTextArea,
            createSelector,
            createSwitch,
            createDatepicker,
        },
    };
};
