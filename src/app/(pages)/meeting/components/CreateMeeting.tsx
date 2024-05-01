import * as Yup from 'yup';
import { meetingService } from '@/app/services/meeting.service';
import { toast } from 'react-toastify';
import { AppDispatch } from '@/redux/store';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import WhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import { useFormik } from 'formik';
import ModalComponent from '@/app/component/modal';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { addNewMeetingAction } from '@/redux/meeting/meeting.slice';
import Description from '@/app/component/description';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { dayjs, disabledDate } from '@/app/utils/date.utils';
import TimezoneSelect, {
  type ITimezone,
  type ITimezoneOption,
} from 'react-timezone-select';

type Props = {
  showModal: boolean;
  setShowModal(): void;
};

const CreateMeetingSchema = Yup.object().shape({
  topic: Yup.string().required('Topic is required'),
  email: Yup.array()
    .min(1)
    .of(Yup.string().email('is invalid email\n').required('Email is required'))
    .required('Email is required'),
  startDate: Yup.date().required('Start Time is required'),
});
// let timezones = Intl.supportedValuesOf('timeZone');
export function CreateMeeting({ showModal, setShowModal }: Props) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [timezone, setTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      topic: '',
      email: undefined,
      startDate: dayjs()
        .tz((timezone as ITimezoneOption).value)
        .format('YYYY-MM-DDTHH:mm:ss'),
    },
    validationSchema: CreateMeetingSchema,
    onSubmit(values) {
      setIsScheduling(true);
      let roomName = `Schesti-${Math.random() * 1000}`;
      meetingService
        .httpCreateMeeting({
          startDate: dayjs(values.startDate).format('YYYY-MM-DDTHH:mm:ss'),
          endDate: dayjs(values.startDate)
            .add(40, 'minutes')
            .format('YYYY-MM-DDTHH:mm:ss'),
          invitees: values.email as unknown as string[],
          roomName,
          link: `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${roomName}`,
          topic: values.topic,
          timezone: getTimeZoneValue(timezone),
        })
        .then((response) => {
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
    },
  });

  function getTimeZoneValue(tz: string | ITimezoneOption) {
    if (typeof tz === 'string') {
      return tz;
    }
    return tz.value;
  }

  function handleCloseModal() {
    setShowModal();
    formik.resetForm();
  }

  return (
    <ModalComponent
      width="50%"
      open={showModal}
      setOpen={handleCloseModal}
      title="Schedule a meeting"
      destroyOnClose
    >
      <div className="bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
        <div className="flex px-6 py-2.5 justify-between bg-[#F9F5FF]">
          <TertiaryHeading
            title="Schedule a meeting"
            className="text-graphiteGray"
          />
          <CloseOutlined
            className="cursor-pointer"
            width={24}
            height={24}
            onClick={handleCloseModal}
          />
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="px-6 py-2.5 space-y-3">
            <InputComponent
              label="Title"
              type="text"
              placeholder="Title"
              name="topic"
              hasError={formik.touched.topic && !!formik.errors.topic}
              field={{
                value: formik.values.topic,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
              }}
              errorMessage={formik.errors.topic}
            />
            <SelectComponent
              label="Invite"
              placeholder="Client Email Address"
              name="email"
              hasError={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={
                formik.touched.email &&
                  Boolean(formik.errors.email) &&
                  Array.isArray(formik.errors.email)
                  ? formik.errors.email
                    .map(
                      (item: string, idx) =>
                        `'${formik.values.email![idx]}' ${item}`
                    )
                    .toString()
                  : formik.errors.email
              }
              field={{
                mode: 'tags',
                value: formik.values.email,
                onChange: (value) => formik.setFieldValue('email', value),
                onBlur: formik.handleBlur,
                status:
                  formik.touched.email && Boolean(formik.errors.email)
                    ? 'error'
                    : undefined,
              }}
            />
            <DateInputComponent
              label="Schedule Start Date"
              name="startDate"
              inputStyle={'border-gray-200'}
              hasError={formik.touched.startDate && !!formik.errors.startDate}
              errorMessage={formik.errors.startDate}
              fieldProps={{
                showTime: { format: 'HH:mm' },
                value: formik.values.startDate
                  ? dayjs(formik.values.startDate).tz(
                    (timezone as ITimezoneOption).value
                  )
                  : undefined,
                onChange(date, dateString) {
                  formik.setFieldValue(
                    'startDate',
                    dayjs(dateString as string).tz((timezone as ITimezoneOption).value).format('YYYY-MM-DDTHH:mm:ss')
                  );
                },
                onBlur: formik.handleBlur,
                status:
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                    ? 'error'
                    : undefined,
                use12Hours: true,
                onOk(date) {
                  formik.setFieldValue(
                    'startDate',
                    dayjs(date).tz((timezone as ITimezoneOption).value).format('YYYY-MM-DDTHH:mm:ss')
                  );
                },
                changeOnBlur: true,
                disabledDate: (curr) =>
                  disabledDate(curr, (timezone as ITimezoneOption).value) as boolean,
                // showSecond: false,
                renderExtraFooter: () => (
                  // <SelectComponent
                  //   label="Timezone"
                  //   placeholder="Timezone"
                  //   name="timezone"
                  //   field={{
                  //     options: timezones.map((tz) => ({
                  //       label: tz,
                  //       value: tz,
                  //     })),
                  //     className: 'my-2',
                  //     value: timezone,
                  //     onChange: (value) => {
                  //       setTimezone(value);
                  //     },
                  //   }}
                  // />
                  <TimezoneSelect
                    value={timezone}
                    onChange={setTimezone}
                    maxMenuHeight={300}
                    menuPlacement="top"
                    // remove select focus outline
                    className="z-50 !outline-none !*:border-none"
                  />
                ),
              }}
            />

            <Description title="Note: The duration of the meeting cannot be more than 40 minutes" />
          </div>
          <div className="flex justify-end px-6 py-2 space-x-2">
            <WhiteButton
              text="Cancel"
              className="!w-28"
              onClick={handleCloseModal}
            />
            <CustomButton
              text="Schedule"
              className="!w-28"
              type="submit"
              loadingText="Scheduling"
              isLoading={isScheduling}
            />
          </div>
        </form>
      </div>
    </ModalComponent>
  );
}
