import * as Yup from 'yup';
import { meetingService } from '@/app/services/meeting.service';
import { toast } from 'react-toastify';
import { AppDispatch } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import WhiteButton from '@/app/component/customButton/white';
import CustomButton from '@/app/component/customButton/button';
import { useFormik } from 'formik';
import ModalComponent from '@/app/component/modal';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { InputComponent } from '@/app/component/customInput/Input';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import {
  addNewMeetingAction,
  updateMeetingAction,
} from '@/redux/meeting/meeting.slice';
import Description from '@/app/component/description';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { dayjs, disabledDate } from '@/app/utils/date.utils';
import TimezoneSelect, {
  type ITimezone,
  type ITimezoneOption,
} from 'react-timezone-select';
import { IMeeting } from '@/app/interfaces/meeting.type';
import { ShouldHaveAtLeastCharacterRegex } from '@/app/utils/regex.util';
import { Checkbox } from 'antd';
import dj from 'dayjs';

type Props = {
  showModal: boolean;
  setShowModal(): void;
  onSuccess?: (_meeting: IMeeting) => void;
  isInviteOptional?: boolean;
  meeting?: IMeeting;
};

// let timezones = Intl.supportedValuesOf('timeZone');
export function CreateMeeting({
  showModal,
  setShowModal,
  onSuccess,
  meeting,
  isInviteOptional = false,
}: Props) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [timezone, setTimezone] = useState<ITimezone>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const dispatch = useDispatch<AppDispatch>();

  const CreateMeetingSchema = Yup.object().shape({
    topic: Yup.string()
      .matches(
        ShouldHaveAtLeastCharacterRegex,
        'Topic should have atleast 1 character.'
      )
      .required('Topic is required'),
    email: isInviteOptional
      ? Yup.array().of(Yup.string().email('is invalid\n'))
      : Yup.array()
        .min(1)
        .of(
          Yup.string()
            .email('is invalid email\n')
            .required('Email is required')
        )
        .required('Email is required'),
    startDate: Yup.date().required('Start Time is required'),
  });

  useEffect(() => {
    if (meeting) {
      setTimezone(meeting.timezone);
    }
  }, [meeting]);

  const formik = useFormik({
    initialValues: meeting
      ? {
        topic: meeting.topic,
        email: meeting.invitees,
        startDate: dayjs(meeting.startDate)
          .tz((timezone as ITimezoneOption).value)
          .format('YYYY-MM-DDTHH:mm:ss'),
      }
      : {
        topic: '',
        email: [],
        startDate: dayjs()
          .tz((timezone as ITimezoneOption).value)
          .format('YYYY-MM-DDTHH:mm:ss'),
        recurrence: undefined as IMeeting['recurrence']
      },
    validationSchema: CreateMeetingSchema,
    enableReinitialize: meeting ? true : false,
    onSubmit(values) {
      setIsScheduling(true);
      if (meeting) {
        meetingService
          .httpUpdateMeeting(meeting._id, {
            startDate: dayjs(values.startDate).format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dayjs(values.startDate)
              .add(40, 'minutes')
              .format('YYYY-MM-DDTHH:mm:ss'),
            invitees: values.email as unknown as string[],
            link: meeting.link,
            roomName: meeting.roomName,
            timezone: getTimeZoneValue(timezone),
            topic: values.topic,
          })
          .then((response) => {
            if (response.data) {
              dispatch(updateMeetingAction(response.data.meeting));
              if (onSuccess) {
                onSuccess(response.data.meeting);
              }
            }
            setIsScheduling(false);
            setShowModal();
            formik.resetForm();
          })
          .catch(({ response }: any) => {
            setIsScheduling(false);
            toast.error(response.data.message);
          });
      } else {
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
              if (onSuccess) {
                onSuccess(response.data.meeting);
              }
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
        <div className="flex px-6 py-2.5 justify-between bg-schestiLightPrimary">
          <TertiaryHeading
            title="Schedule a meeting"
            className="text-graphiteGray"
          />
          <CloseOutlined
            className="cursor-pointer"
            style={{ width: '24px', height: '24px' }}
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
              hasError={formik.touched.topic && Boolean(formik.errors.topic)}
              field={{
                value: formik.values.topic,
                onChange: formik.handleChange,
                onBlur: formik.handleBlur,
              }}
              errorMessage={
                formik.touched.topic && formik.errors.topic
                  ? formik.errors.topic
                  : undefined
              }
            />
            <SelectComponent
              label="Invite"
              placeholder="Email Address"
              name="email"
              hasError={formik.touched.email && Boolean(formik.errors.email)}
              errorMessage={
                (formik.touched.email &&
                  Boolean(formik.errors.email)) ? (
                  Array.isArray(formik.errors.email)
                    ? formik.errors.email
                      .map(
                        (item: string, idx) =>
                          `'${formik.values.email![idx]}' ${item}`
                      )
                      .toString()
                    : (formik.errors.email as string))
                  : ""
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

            {/* Recurrence */}
            <div>
              <Checkbox
                value={formik.values.recurrence?.isChecked}
                onChange={(e) => {
                  formik.setFieldValue('recurrence.isChecked', e.target.checked);
                }}
              >
                <span className="text-graphiteGray">Add Recurrence</span>
              </Checkbox>

              {formik.values.recurrence?.isChecked ? <>
                <SelectComponent
                  label='Recurrence Type'
                  name='recurrence.frequency'
                  placeholder='Select Recurrence Type'
                  field={{
                    value: formik.values.recurrence?.frequency,
                    options: [
                      { label: "Daily", value: "daily" },
                      { label: "Weekly", value: "weekly" },
                      { label: "Monthly", value: "monthly" },
                      { label: "Custom", value: "custom" },
                    ],
                    onChange: (value) => {
                      formik.setFieldValue('recurrence.frequency', value);
                    },
                    onBlur: formik.handleBlur,
                  }}
                />

                {formik.values.recurrence?.frequency === 'weekly' ? <>
                  <SelectComponent
                    label='Select Days'
                    name='recurrence.days'
                    placeholder='Select Days'
                    field={{
                      value: formik.values.recurrence?.days,
                      options: [
                        { label: "Monday", value: 1 },
                        { label: "Tuesday", value: 2 },
                        { label: "Wednesday", value: 3 },
                        { label: "Thursday", value: 4 },
                        { label: "Friday", value: 5 },
                        { label: "Saturday", value: 6 },
                        { label: "Sunday", value: 0 }
                      ],
                      mode: "multiple",
                      onChange: (value) => {
                        formik.setFieldValue('recurrence.days', value);
                      },
                      onBlur: formik.handleBlur,
                    }}
                  />
                </> : null}

                {formik.values.recurrence?.frequency === "custom" ? <>
                  <DateInputComponent
                    label='Select Date'
                    name='recurrence.dates'
                    fieldProps={{
                      // @ts-ignore
                      value: 'dates' in formik.values.recurrence ? formik.values.recurrence?.dates.map(date => dj(date)) : undefined,
                      multiple: true,
                      maxTagCount: "responsive",
                      onChange(date, dateString) {
                        formik.setFieldValue('recurrence.dates', dateString);
                      },
                      format: 'MM/DD/YYYY',
                    }}
                  />

                  <SelectComponent
                    label='Ends On'
                    name='recurrence.endsOn'
                    placeholder='Select Ends On'
                    field={{
                      value: formik.values.recurrence?.endsOn,
                      options: [
                        { label: "Never", value: "never" },
                        { label: "Date", value: "date" },
                      ],
                      onChange: (value) => {
                        formik.setFieldValue('recurrence.endsOn', value);
                      },
                      onBlur: formik.handleBlur,
                    }}
                  />

                  {formik.values.recurrence?.endsOn === "date" ? <>
                    <DateInputComponent
                      label='Select Date'
                      name='recurrence.endDate'
                      fieldProps={{
                        value: "endDate" in formik.values.recurrence ? dj(formik.values.recurrence?.endDate) : undefined,
                        onChange(date, dateString) {
                          formik.setFieldValue('recurrence.endDate', dateString);
                        },
                        format: 'MM/DD/YYYY',
                        onBlur: formik.handleBlur,
                      }}
                    />
                  </> : null}
                </> : null}
              </> : null}



            </div>
            {/* END Recurrence */}

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
                onChange(date) {
                  formik.setFieldValue(
                    'startDate',
                    dayjs(date)
                      .tz((timezone as ITimezoneOption).value)
                      .format('YYYY-MM-DDTHH:mm:ss')
                  );
                },
                // onBlur: formik.handleBlur,
                status:
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                    ? 'error'
                    : undefined,
                use12Hours: true,

                // changeOnBlur: true,
                // needConfirm: false,
                disabledDate: (curr) =>
                  disabledDate(
                    curr,
                    (timezone as ITimezoneOption).value
                  ) as boolean,
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
