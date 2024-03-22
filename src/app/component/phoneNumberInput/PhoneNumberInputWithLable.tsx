import PhoneInput, { type Props as PhoneInputProps } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

export function PhoneNumberInputWithLable(props: PhoneInputProps<{ label: string }>) {
    return <div>
        <label
            className={`text-graphiteGray text-sm font-medium leading-6 capitalize`}
        >
            {props.label}
        </label>
        <PhoneInput
            className="custom-phone-input ant-input css-dev-only-do-not-override-2rgkd4 border !w-full !rounded-lg focus:border-blue-500 !px-3.5 !py-2.5 !mt-1.5 css-dev-only-do-not-override-2rgkd4
            space-x-2"
            international
            defaultCountry="PK"
            {...props}
        />
    </div>
}