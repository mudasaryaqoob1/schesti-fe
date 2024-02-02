import CustomButton from '@/app/component/customButton/button';
import WhiteButton from '@/app/component/customButton/white';
import { InputComponent } from '@/app/component/customInput/Input';
import QuaternaryHeading from '@/app/component/headings/quaternary';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { IScheduleState } from '../type';

type Props = {
  onClose: () => void;
  info: IScheduleState;
  handleInfo<K extends keyof IScheduleState>(
    _key: K,
    _value: IScheduleState[K]
  ): void;
  onConfirm: () => void;
  onCancel: () => void;
};

export function SetWorkWeek({
  onClose,
  handleInfo,
  info,
  onCancel,
  onConfirm,
}: Props) {
  // write a function to update the value in the array at index
  const updateRegularWorkingDays = (
    index: number,
    value: (typeof arr)[number],
    arr: IScheduleState['regularWorkingDays'] = info.regularWorkingDays
  ) => {
    const newArr = [...arr];
    newArr[index] = value;
    handleInfo('regularWorkingDays', newArr);
  };

  return (
    <div className="px-4 py-2 bg-white border border-solid border-elboneyGray rounded-[4px] z-50">
      <div className="flex  py-2.5 justify-between">
        <TertiaryHeading title="Set Workweek" className="text-graphiteGray" />
        <CloseOutlined
          className="cursor-pointer"
          width={24}
          height={24}
          onClick={onClose}
        />
      </div>

      <div>
        <InputComponent
          label="Hours Per Day"
          name="hours"
          type="number"
          placeholder="Set number of hours per day"
          labelStyle="text-[#344054] font-normal"
          label2="Zero regular hours will result in a zero hourly rate for unpaid leave deductions."
          field={{
            value: info.hoursPerDay,
            onChange: (e) => {
              handleInfo('hoursPerDay', Number(e.target.value));
            },
          }}
        />
      </div>

      {/* <div className="grid my-2 grid-cols-12 gap-3 items-center">
        <div className="col-span-8">
          <SelectComponent
            label="Schedule"
            name="schedule"
            placeholder="Select Schedule"
            labelStyle="text-[#344054] font-normal"
            field={{
              options: [
                { label: 'Fixed, Mixed', value: 'fixed' },
                { label: 'Flexible', value: 'flexible' },
              ],
              className: '!mt-1',
              value: info.scheduleType,
              onChange: (e) => {
                handleInfo('scheduleType', e);
              },
            }}
          />
        </div>
        <div className="col-span-4">
          <InputComponent
            label="Full Days Per Week"
            name="fullDays"
            type="number"
            placeholder="Set number of full days per week"
            labelStyle="text-[#344054] font-normal"
            inputStyle="!py-2"
            field={{
              value: info.fullDaysPerWeek,
              onChange: (e) => {
                handleInfo('fullDaysPerWeek', Number(e.target.value));
              },
            }}
          />
        </div>
      </div> */}

      <div className="my-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <QuaternaryHeading title=" Regular Working Days" />
          </div>
          <div className="col-span-5">
            <QuaternaryHeading title="Hours" />
          </div>
        </div>

        {info.regularWorkingDays.map((item, index) => {
          return (
            <div className="grid grid-cols-12 gap-4 items-center" key={index}>
              <div className="col-span-2 pr-8">
                <Checkbox
                  checked={item.isChecked}
                  onChange={(e) => {
                    updateRegularWorkingDays(index, {
                      ...item,
                      isChecked: e.target.checked,
                    });
                  }}
                  className="border w-full px-3.5 py-[7px] mt-1.5 rounded-lg text-graphiteGray text-sm font-normal leading-6"
                >
                  {item.day}
                </Checkbox>
              </div>
              <div className="col-span-5">
                <InputComponent
                  label=""
                  name={item.day}
                  type="number"
                  placeholder="Enter Number of Hours"
                  labelStyle="text-[#344054] font-normal"
                  inputStyle="!py-2 border-gray-200"
                  field={{
                    value: item.hours,
                    onChange: (e) => {
                      updateRegularWorkingDays(index, {
                        ...item,
                        hours: Number(e.target.value),
                      });
                    },
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end space-x-4 mt-2">
        <WhiteButton text="Skip" className="!w-40" onClick={onCancel} />
        <CustomButton text="Setup" className="!w-40" onClick={onConfirm} />
      </div>
    </div>
  );
}
