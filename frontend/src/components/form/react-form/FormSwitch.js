import {FormControlLabel, Switch} from "@material-ui/core";
import React from "react";
import {useTranslation} from "react-i18next";
import {Controller} from "react-hook-form";

export const FormSwitch = ({
    name,
    label,
    control,
    rules = {},
    fieldStyle = {},
}) => {
    const {t} = useTranslation();
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field: { value, ...restProp } }) => (
                <FormControlLabel
                    control={
                        <Switch
                            checked={value}
                            {...restProp}
                            {...fieldStyle}
                        />
                    }
                    label={t(label)}
                />
            )}
        />
    );
};
