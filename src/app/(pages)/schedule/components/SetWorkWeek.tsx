import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import TertiaryHeading from '@/app/component/headings/tertiary';
import { CloseOutlined } from '@ant-design/icons';
import { Space } from 'antd';

type Props = {
  onClose: () => void;
};

export function SetWorkWeek({ onClose }: Props) {
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
        />
      </div>

      <div className="grid my-2 grid-cols-12 gap-3 items-center">
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
          />
        </div>
      </div>

      <div>
        <Space.Compact size="large">
          <InputComponent
            placeholder="large size"
            label="Regular Working Days"
            name="regularWorkingDays"
            type="number"
            labelStyle="text-[#344054] font-normal"
            inputStyle="border-r-0 !rounded-none "
          />
          <InputComponent
            placeholder="large size"
            label="Regular Working Days"
            name="regularWorkingDays"
            type="number"
            labelStyle="text-[#344054] font-normal"
          />
        </Space.Compact>
      </div>
    </div>
  );
}
