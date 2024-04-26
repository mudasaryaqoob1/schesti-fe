import { InputComponent } from "@/app/component/customInput/Input";
import { DateInputComponent } from "@/app/component/cutomDate/CustomDateInput";
import { TimeInputComponent } from "@/app/component/cutomDate/CustomTimeInput";
import { TextAreaComponent } from "@/app/component/textarea";
import { IBidManagement } from "@/app/interfaces/bid-management/bid-management.interface";
import dayjs from "dayjs";
import type { FormikProps } from "formik";
import Image from "next/image";

type Props = {
    formik: FormikProps<IBidManagement>;
}
export function EventOnSiteForm({ formik }: Props) {
    if (formik.values.preBiddingMeeting?.isChecked && formik.values.preBiddingMeeting?.type === 'Onsite') {

        return <div className='space-y-2 mt-3'>

            <div className='flex items-center space-x-3'>
                <div className='flex-1'>
                    <InputComponent
                        placeholder='Enter Location'
                        label=''
                        name='location'
                        type='text'
                        field={{
                            suffix: <Image src='/navigation-icon.svg' width={20} height={20} alt='location' />,
                            value: formik.values?.preBiddingMeeting?.location,
                            onChange: e => formik.setFieldValue('preBiddingMeeting.location', e.target.value)
                        }}
                    />
                </div>

                <div>
                    <DateInputComponent
                        label=''
                        name=''
                        placeholder='Select Date'
                        fieldProps={{
                            format: 'MM/DD/YYYY',
                            value: formik.values.preBiddingMeeting && formik.values.preBiddingMeeting.date ? dayjs(formik.values.preBiddingMeeting.date) : undefined,
                            onChange: (date, dateString) => {
                                formik.setFieldValue('preBiddingMeeting.date', dateString as string)
                            }
                        }}
                    />
                </div>
                <div>
                    <TimeInputComponent
                        label=''
                        name=''
                        placeholder='Select Time'
                        fieldProps={{
                            use12Hours: true,
                            format: "h:mm a",
                            value: formik.values.preBiddingMeeting && formik.values.preBiddingMeeting.time ? dayjs(formik.values.preBiddingMeeting.time, 'h:mm') : undefined,
                            onChange: (time, timeString) => {
                                formik.setFieldValue('preBiddingMeeting.time', timeString as string)
                            },
                            showNow: false,
                        }}
                    />
                </div>

            </div>
            <TextAreaComponent
                label=''
                name='instruction'
                placeholder='Meeting Instructions'
                field={{
                    value: formik.values.preBiddingMeeting?.instruction,
                    onChange: e => formik.setFieldValue('preBiddingMeeting.instruction', e.target.value)
                }}
            />
        </div>
    }
    return null;
}
