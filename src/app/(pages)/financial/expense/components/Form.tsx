import CustomButton from '@/app/component/customButton/button';
import { InputComponent } from '@/app/component/customInput/Input';
import { SelectComponent } from '@/app/component/customSelect/Select.component';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import { TextAreaComponent } from '@/app/component/textarea';
import Dragger from 'antd/es/upload/Dragger';
import Image from 'next/image';
import { toast } from 'react-toastify';

export function ExpenseForm() {
  return (
    <div className="space-y-2">
      <div>
        <Dragger
          name={'file'}
          accept="image/*,gif,application/pdf,.doc,.docx,.csv, .xls, .xlsx, .ppt, .pptx, .txt, .pdf, .zip, .rar"
          multiple={true}
          beforeUpload={(_file, FileList) => {
            for (const file of FileList) {
              const isLessThan500MB = file.size < 500 * 1024 * 1024; // 500MB in bytes
              if (!isLessThan500MB) {
                toast.error('File size should be less than 500MB');
                return false;
              }
            }
            return false;
          }}
          style={{
            borderStyle: 'dashed',
            borderWidth: 6,
          }}
          itemRender={() => {
            return null;
          }}
          onChange={() => {}}
        >
          <p className="ant-upload-drag-icon">
            <Image
              src={'/uploadcloud.svg'}
              width={50}
              height={50}
              alt="upload"
            />
          </p>
          <p className="text-[12px] py-2 leading-3 text-[#98A2B3]">
            Drop your image here, or browse
          </p>
          <p className="text-[12px] leading-3 text-[#98A2B3]">
            PNG, GIF, JPG, PDF, TXT, XLS, XLSX, PPT, PPTX
          </p>
        </Dragger>
      </div>

      <InputComponent
        label="Name"
        name="name"
        type="text"
        placeholder="Enter item name"
      />

      <TextAreaComponent
        label="Note"
        name="description"
        placeholder="Enter note"
      />

      <SelectComponent
        label="Expense Category"
        name="category"
        placeholder="Select category"
      />

      <DateInputComponent
        label="Expense Date"
        name="date"
        placeholder="Enter expense date"
      />

      <InputComponent
        label="Price"
        name="price"
        type="number"
        placeholder="Enter price"
      />

      <SelectComponent
        label="Project"
        name="project"
        placeholder="Select project"
      />

      <div>
        <div className="flex w-fit items-center space-x-2 cursor-pointer ">
          <p className="text-schestiPrimary text-[18px] leading-8 font-medium underline underline-offset-2 ">
            Advance Details
          </p>
          <div className="rounded-full px-2 py-1 bg-schestiLightSuccess">
            <Image
              src={'/chevron-right-cyan.svg'}
              width={24}
              height={23}
              alt="forward arrow icon"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SelectComponent label="Tax 1" name="tax1" placeholder="Select tax" />

          <SelectComponent label="Tax 2" name="tax2" placeholder="Select tax" />

          <SelectComponent
            label="Payment Method"
            name="paymentMethod"
            placeholder="Select payment method"
          />

          <InputComponent
            label="Reference#"
            name="reference"
            type="text"
            placeholder="Enter reference"
          />
        </div>

        <SelectComponent
          label="Repeat Every"
          name="repeat"
          placeholder="Select repeat"
        />
      </div>
      <CustomButton text="Add New Expense" />
    </div>
  );
}
