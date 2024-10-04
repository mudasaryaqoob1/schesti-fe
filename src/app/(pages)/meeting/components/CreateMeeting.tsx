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
import {
  // dayjs,
  disabledDate
} from '@/app/utils/date.utils';
import TimezoneSelect, {
  type ITimezoneOption,
  useTimezoneSelect
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

const dateValidation = Yup.date().required('Date is required');

const recurrenceSchema = Yup.object().shape({
  isChecked: Yup.boolean(),
  frequency: Yup.mixed()
    .oneOf(['daily', 'weekly', 'monthly', 'custom'], 'Invalid frequency type')
    .when('isChecked', {
      is: true,
      then: () => Yup.string().required('Recurrence frequency is required'),
      otherwise: () => Yup.string().notRequired(),
    }),
  days: Yup.array()
    .of(Yup.string().required('Day is required'))
    .min(1, 'At least one day is required')
    .when('frequency', {
      is: 'weekly',
      then: () =>
        Yup.array()
          .required()
          .min(1, 'Select at least one day')
          .required('Days are required'),
      otherwise: () => Yup.array().notRequired(),
    }),
  dates: Yup.array()
    .of(dateValidation)
    .when('frequency', {
      is: 'custom',
      then: () =>
        Yup.array()
          .of(dateValidation)
          .min(1, 'At least one custom date is required')
          .required('Dates are required'),
      otherwise: () => Yup.array().notRequired(),
    }),
  endsOn: Yup.string()
    .oneOf(['never', 'date'], 'Invalid end option')
    .when('frequency', {
      is: 'custom',
      then: () =>
        Yup.string().required('End option is required for custom recurrence'),
      otherwise: () => Yup.string().notRequired(),
    }),
  endDate: Yup.date().when('endsOn', {
    is: 'date',
    then: () => dateValidation.required('End date is required'),
    otherwise: () => Yup.date().notRequired(),
  }),
});

export function CreateMeeting({
  showModal,
  setShowModal,
  onSuccess,
  meeting,
  isInviteOptional = false,
}: Props) {
  const [isScheduling, setIsScheduling] = useState(false);
  const [timezone, setTimezone] = useState<any>(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const dispatch = useDispatch<AppDispatch>();

  const timezoneHook = useTimezoneSelect({

  });

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
    recurrence: Yup.lazy((value) => {
      if (!value || !value.isChecked) {
        return Yup.mixed().notRequired();
      }
      return recurrenceSchema;
    }),
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
        startDate: dj(meeting.startDate)
          // .tz((timezone as ITimezoneOption).value)
          .format('YYYY-MM-DDTHH:mm:ss'),
        timezoneData: timezoneHook.parseTimezone(timezone),
      }
      : {
        topic: '',
        email: [],
        // startDate: dayjs()
        //   .tz((timezone as ITimezoneOption).value)
        //   .format('YYYY-MM-DDTHH:mm:ss'),
        startDate: dj().format('YYYY-MM-DDTHH:mm:ss'),
        recurrence: {
          isChecked: false,
        } as IMeeting['recurrence'],
        timezoneData: timezoneHook.parseTimezone(timezone)
      },
    validationSchema: CreateMeetingSchema,
    enableReinitialize: meeting ? true : false,
    onSubmit(values) {
      setIsScheduling(true);
      if (meeting) {
        meetingService
          .httpUpdateMeeting(meeting._id, {
            startDate: dj(values.startDate).format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dj(values.startDate)
              .add(40, 'minutes')
              .format('YYYY-MM-DDTHH:mm:ss'),
            invitees: values.email as unknown as string[],
            link: meeting.link,
            roomName: meeting.roomName,
            timezone: getTimeZoneValue(timezone),
            topic: values.topic,
            recurrence: values.recurrence,
            timezoneData: values.timezoneData,
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
            startDate: dj(values.startDate).format('YYYY-MM-DDTHH:mm:ss'),
            endDate: dj(values.startDate)
              .add(40, 'minutes')
              .format('YYYY-MM-DDTHH:mm:ss'),
            invitees: values.email as unknown as string[],
            roomName,
            link: `${process.env.NEXT_PUBLIC_APP_URL}/meeting/${roomName}`,
            topic: values.topic,
            timezone: getTimeZoneValue(timezone),
            recurrence: values.recurrence,
            timezoneData: values.timezoneData,
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

  console.log('timezone', timezoneHook.parseTimezone(timezone));
  const recurrenceTouched = formik.touched.recurrence as any;
  const recurrenceError = formik.errors.recurrence as any;
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
                formik.touched.email && Boolean(formik.errors.email)
                  ? Array.isArray(formik.errors.email)
                    ? formik.errors.email
                      .map(
                        (item: string, idx) =>
                          `'${formik.values.email![idx]}' ${item}`
                      )
                      .toString()
                    : (formik.errors.email as string)
                  : ''
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
                  formik.setFieldValue(
                    'recurrence.isChecked',
                    e.target.checked
                  );
                }}
              >
                <span className="text-graphiteGray">Add Recurrence</span>
              </Checkbox>

              {formik.values.recurrence?.isChecked ? (
                <>
                  <SelectComponent
                    label="Recurrence Type"
                    name="recurrence.frequency"
                    placeholder="Select Recurrence Type"
                    field={{
                      value: formik.values.recurrence?.frequency,
                      options: [
                        { label: 'Daily', value: 'daily' },
                        { label: 'Weekly', value: 'weekly' },
                        { label: 'Monthly', value: 'monthly' },
                        { label: 'Custom', value: 'custom' },
                      ],
                      onChange: (value) => {
                        formik.setFieldValue('recurrence.frequency', value);
                      },
                      onBlur: formik.handleBlur,
                    }}
                    hasError={
                      recurrenceTouched &&
                      recurrenceError &&
                      recurrenceTouched.frequency &&
                      Boolean(recurrenceError.frequency)
                    }
                    errorMessage={
                      recurrenceError && Boolean(recurrenceError.frequency)
                        ? recurrenceError.frequency
                        : undefined
                    }
                  />

                  {formik.values.recurrence?.frequency === 'weekly' ? (
                    <>
                      <SelectComponent
                        label="Select Days"
                        name="recurrence.days"
                        placeholder="Select Days"
                        field={{
                          value: formik.values.recurrence?.days,
                          options: [
                            { label: 'Monday', value: 1 },
                            { label: 'Tuesday', value: 2 },
                            { label: 'Wednesday', value: 3 },
                            { label: 'Thursday', value: 4 },
                            { label: 'Friday', value: 5 },
                            { label: 'Saturday', value: 6 },
                            { label: 'Sunday', value: 0 },
                          ],
                          mode: 'multiple',
                          onChange: (value) => {
                            formik.setFieldValue('recurrence.days', value);
                          },
                          onBlur: formik.handleBlur,
                        }}
                        hasError={
                          recurrenceTouched &&
                          recurrenceError &&
                          (recurrenceTouched as any).days &&
                          Boolean((recurrenceError as any).days)
                        }
                        // @ts-ignore
                        errorMessage={
                          recurrenceError && Boolean((recurrenceError as any).days)
                            ? (recurrenceError as any).days
                            : undefined
                        }
                      />
                    </>
                  ) : null}

                  {formik.values.recurrence?.frequency === 'custom' ? (
                    <>
                      <DateInputComponent
                        label="Select Date"
                        name="recurrence.dates"
                        fieldProps={{
                          // @ts-ignore
                          value:
                            'dates' in formik.values.recurrence
                              ? formik.values.recurrence?.dates.map((date) =>
                                dj(date)
                              )
                              : undefined,
                          multiple: true,
                          maxTagCount: 'responsive',
                          onChange(date, dateString) {
                            formik.setFieldValue(
                              'recurrence.dates',
                              dateString
                            );
                          },
                          format: 'MM/DD/YYYY',
                        }}
                        // @ts-ignore
                        hasError={
                          recurrenceTouched &&
                          recurrenceError &&
                          recurrenceTouched.dates &&
                          Boolean(recurrenceError.dates)
                        }
                        // @ts-ignore
                        errorMessage={
                          recurrenceError && Boolean(recurrenceError.dates)
                            ? recurrenceError.dates
                            : undefined
                        }
                      />

                      <SelectComponent
                        label="Ends On"
                        name="recurrence.endsOn"
                        placeholder="Select Ends On"
                        field={{
                          value: formik.values.recurrence?.endsOn,
                          options: [
                            { label: 'Never', value: 'never' },
                            { label: 'Date', value: 'date' },
                          ],
                          onChange: (value) => {
                            formik.setFieldValue('recurrence.endsOn', value);
                          },
                          onBlur: formik.handleBlur,
                        }}
                        // @ts-ignore
                        hasError={
                          recurrenceTouched &&
                          recurrenceError &&
                          recurrenceTouched.endsOn &&
                          Boolean(recurrenceError.endsOn)
                        }
                        // @ts-ignore
                        errorMessage={
                          recurrenceError && Boolean(recurrenceError.endsOn)
                            ? recurrenceError.endsOn
                            : undefined
                        }
                      />

                      {formik.values.recurrence?.endsOn === 'date' ? (
                        <>
                          <DateInputComponent
                            label="Select Date"
                            name="recurrence.endDate"
                            fieldProps={{
                              value:
                                'endDate' in formik.values.recurrence
                                  ? dj(formik.values.recurrence?.endDate)
                                  : undefined,
                              onChange(date, dateString) {
                                formik.setFieldValue(
                                  'recurrence.endDate',
                                  dateString
                                );
                              },
                              format: 'MM/DD/YYYY',
                              onBlur: formik.handleBlur,
                            }}
                            // @ts-ignore
                            hasError={
                              recurrenceTouched &&
                              recurrenceError &&
                              recurrenceTouched.endDate &&
                              Boolean(recurrenceError.endDate)
                            }
                            // @ts-ignore
                            errorMessage={
                              recurrenceError && recurrenceError.endDate
                                ? recurrenceError.endDate
                                : undefined
                            }
                          />
                        </>
                      ) : null}
                    </>
                  ) : null}
                </>
              ) : null}
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
                format: {
                  format: "MMM Do, YYYY HH:mm a"
                },
                value: formik.values.startDate
                  ? dj(formik.values.startDate)
                  // .tz(
                  //   (timezone as ITimezoneOption).value
                  // )
                  : undefined,
                onChange(date) {
                  formik.setFieldValue(
                    'startDate',
                    dj(date)
                      // .tz((timezone as ITimezoneOption).value)
                      .toISOString()
                  );
                },
                // onBlur: formik.handleBlur,
                status:
                  formik.touched.startDate && Boolean(formik.errors.startDate)
                    ? 'error'
                    : undefined,
                use12Hours: true,
                showNow: false,
                allowClear: false,
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
