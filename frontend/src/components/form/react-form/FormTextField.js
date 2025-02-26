import {Controller} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {TextField} from "@material-ui/core";

export const FormTextField = ({
    name,
    label,
    placeholder,
    control,
    defaultValue = '',
    rules = {},
    fieldStyle = {},
    error,
    onChange: onChangeProp = null,
}) => {
    const {t} = useTranslation();
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field: { onChange, ...restProps } }) => (
                <TextField
                    label={t(label)}
                    placeholder={placeholder && t(placeholder)}
                    error={!!error}
                    helperText={error ? t(error.message) : ''}
                    onChange={(event) => {
                        onChange(event);
                        const selectedValue = event.target.value;
                        onChangeProp && onChangeProp(selectedValue);
                    }}
                    {...restProps}
                    {...fieldStyle}
                />
            )}
        />
    );
};
