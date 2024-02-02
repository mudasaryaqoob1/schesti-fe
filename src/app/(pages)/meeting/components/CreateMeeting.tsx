import * as Yup from 'yup';
import { meetingService } from '@/app/services/meeting.service';
import { toast } from 'react-toastify';
import { AppDispatch } from "@/redux/store";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch } from "react-redux";
import WhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import { useFormik } from "formik";
import ModalComponent from '@/app/component/modal';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { addNewMeetingAction } from '@/redux/meeting/meeting.slice';

type Props = {
    showModal: boolean;
    setShowModal(): void;
}


const CreateMeetingSchema = Yup.object().shape({
    topic: Yup.string().required('Topic is required'),
    email: Yup.string().email().required('Email is required'),
    date: Yup.date().required('Date is required'),
})

export function CreateMeeting({ showModal, setShowModal }: Props) {
    const [isScheduling, setIsScheduling] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        initialValues: {
            topic: '',
            email: '',
            date: new Date(),
        },
        validationSchema: CreateMeetingSchema,
        onSubmit(values) {
            setIsScheduling(true);
            let roomName = `Schesti-${Math.random() * 1000}`;
            meetingService.httpCreateMeeting({
                date: dayjs(values.date).format('YYYY-MM-DDTHH:mm:ss'),
                invitees: [values.email],
                roomName,
                link: `http://localhost:3000/meeting/${roomName}}`,
                topic: values.topic
            }).then((response) => {
                if (response.data) {
                    dispatch(addNewMeetingAction(response.data.meeting));
                }
                setIsScheduling(false);
                setShowModal();
                formik.resetForm();
            })
                .catch(({ response }: any) => {
                    setIsScheduling(false);
                    toast.error(response.data.message);
                });
        }
    })

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current < dayjs().endOf('day');
    };
    return <ModalComponent width='50%' open={showModal} setOpen={setShowModal} title='Schedule a meeting'>
        <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
            <div className="flex px-6 py-2.5 justify-between bg-mistyWhite">
                <TertiaryHeading
                    title="Schedule a meeting"
                    className="text-graphiteGray"
                />
                <CloseOutlined
                    className="cursor-pointer"
                    width={24}
                    height={24}
                    onClick={setShowModal}
                />
            </div>

            <form onSubmit={formik.handleSubmit}>
                <div className="px-6 py-2.5 space-y-3">
                    <InputComponent
                        label="Topic"
                        type="text"
                        placeholder="Topic"
                        name="topic"
                        hasError={formik.touched.topic && !!formik.errors.topic}
                        field={{
                            value: formik.values.topic,
                            onChange: formik.handleChange,
                            onBlur: formik.handleBlur,
                        }}
                    />
                    <InputComponent
                        label="Email Address"
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        hasError={formik.touched.email && !!formik.errors.email}
                        field={{
                            value: formik.values.email,
                            onChange: formik.handleChange,
                            onBlur: formik.handleBlur,
                        }}
                    />
                    <DateInputComponent
                        label='Schedule Date'
                        name='date'
                        inputStyle={"border-gray-200"}
                        hasError={formik.touched.date && !!formik.errors.date}
                        fieldProps={{
                            showTime: { defaultValue: dayjs('00:00:00', 'HH:mm:ss') },
                            value: formik.values.date ? dayjs(formik.values.date) : undefined,
                            onChange(date) {
                                formik.setFieldValue('date', date);
                            },
                            onBlur: formik.handleBlur,
                            disabledDate,
                        }}

                    />
                </div>
                <div className="flex justify-end px-6 py-2 space-x-2">
                    <WhiteButton text="Cancel" className="!w-28" onClick={setShowModal} />
                    <CustomButton
                        text="Schedule"
                        className="!w-28"
                        type='submit'
                        loadingText='Scheduling'
                        isLoading={isScheduling}
                    />
                </div>
            </form>
        </div>
    </ModalComponent>
}