import {
    Control,
    FieldPath,
    FieldValues,
    UseControllerProps,
} from "react-hook-form";

export type BaseFormFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TProps = {}
> = UseControllerProps<TFieldValues, TName> &
    TProps & {
        control?: Control<TFieldValues>;
        name: TName;
        label?: string;
        description?: string;
        required?: boolean;
        maxLength?: number;
    };

