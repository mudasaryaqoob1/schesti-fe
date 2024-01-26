import { Select, type SelectProps } from 'antd';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

type Props = {
    label: string;
    labelStyle?: ClassValue;
    name: string;
    placeholder?: string;
    hasError?: boolean;
    field?: SelectProps;
};

export function SelectComponent({
    label,
    labelStyle,
    name,
    placeholder,
    field,
    hasError,
}: Props) {
    return (
        <div>
            <label
                className={twMerge(
                    clsx(
                        'text-graphiteGray text-sm font-medium leading-6 capitalize',
                        labelStyle
                    )
                )}
                htmlFor={name}
            >
                {label}
            </label>

            {/* <Field name={name} id={name}>
      {({ field }: { field: any }) => ( */}
            <Select
                id={name}
                className={twMerge(
                    clsx(
                        ` p-0 h-full border ${hasError ? 'border-red-500' : 'border-gray-400'
                        } !w-full !rounded-lg focus:border-blue-500  ${field?.className}`
                    )
                )}
                style={{ border: 0 }}
                size='large'
                placeholder={placeholder}
                {...field}
            />

        </div>
    );
}
