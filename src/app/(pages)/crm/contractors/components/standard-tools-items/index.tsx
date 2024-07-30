import Image from 'next/image';
import { PdfContractMode, ToolState } from '../../types';
import ModalComponent from '@/app/component/modal';
import { Popups } from '@/app/(pages)/bid-management/components/Popups';
import { DateInputComponent } from '@/app/component/cutomDate/CustomDateInput';
import dayjs from 'dayjs';
import { InputComponent } from '@/app/component/customInput/Input';
import { Spin, Tabs, Upload } from 'antd';
import CustomButton from '@/app/component/customButton/button';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  ChooseFont,
  ChooseFontType,
  SignatureFonts,
} from '@/app/component/fonts';
import AwsS3 from '@/app/utils/S3Intergration';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {
  item: ToolState;
  mode: PdfContractMode;
  onDelete?: () => void;
  onClick?: () => void;
  onClose?: () => void;
  selectedTool: ToolState | null;
  onChange?: (_item: ToolState, _shouldClose?: boolean) => void;
};
export function StandardToolItem({
  item,
  mode,
  onDelete,
  onClick,
  onClose,
  selectedTool,
  onChange,
}: Props) {
  if (mode === 'add-values') {
    return (
      <div
        style={{
          position: 'absolute',
          left: item.position.x,
          top: item.position.y,
          cursor: 'pointer',
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
        }}
      >
        {selectedTool ? (
          <ModalComponent
            open={true}
            setOpen={() => {}}
            width="300px"
            key={selectedTool.tool}
          >
            <Popups
              title="Add Standard Tools"
              onClose={onClose ? onClose : () => {}}
            >
              <StandardToolInput item={selectedTool} onChange={onChange} />
            </Popups>
          </ModalComponent>
        ) : null}
        <Item item={item} mode={mode} onClick={onClick} />
      </div>
    );
  } else if (mode === 'view-fields' || mode === 'view-values') {
    return (
      <div
        style={{
          position: 'absolute',
          left: item.position.x,
          top: item.position.y,
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
        }}
      >
        <Item item={item} mode={mode} />
      </div>
    );
  } else if (mode === 'edit-fields') {
    return <Item item={item} mode={mode} onDelete={onDelete} />;
  }
  return null;
}

type ItemProps = {
  item: ToolState;
  mode: PdfContractMode;
  onDelete?: () => void;
  onClick?: () => void;
};
function Item({ item, mode, onClick, onDelete }: ItemProps) {
  return (
    <div
      onClick={() => {
        if (mode == 'edit-fields') {
          return;
        }

        onClick?.();
      }}
      className="p-3 rounded-lg border-schestiPrimary border-2 h-fit relative font-semibold text-schestiPrimary flex items-center space-x-2 border-dashed bg-schestiLightPrimary m-0"
    >
      <Image
        src={`/${item.tool}.svg`}
        width={16}
        height={16}
        alt={`${item.tool}`}
      />

      <RenderStandardInputValue item={item} mode={mode} />

      {mode === 'edit-fields' && (
        <Image
          onClick={(e) => {
            onDelete?.();
            e.stopPropagation();
            console.log('Delete');
          }}
          src={'/close.svg'}
          className="cursor-pointer p-0.5 absolute -top-2 bg-schestiPrimary rounded-full -right-1"
          width={16}
          height={16}
          alt="delete"
        />
      )}
    </div>
  );
}

type InputProps = {
  item: ToolState;
  onChange?: (_item: ToolState, _shouldClose?: boolean) => void;
};

function StandardToolInput({ item, onChange }: InputProps) {
  const [isUploadingStamp, setIsUploadingStamp] = useState(false);

  if (item.tool === 'date') {
    return (
      <DateInputComponent
        label="Date"
        name="date"
        fieldProps={{
          value: item.value ? dayjs(item.value as string) : undefined,
          onChange(_date, dateString) {
            if (onChange) {
              onChange({ ...item, value: dateString as string });
            }
          },
        }}
      />
    );
  } else if (item.tool === 'initials') {
    return <GetInitialToolValue item={item} onChange={onChange} />;
  } else if (item.tool === 'stamp') {
    return (
      <Spin spinning={isUploadingStamp} indicator={<LoadingOutlined spin />}>
        <Upload.Dragger
          name={'file'}
          accept=".png, .jpeg, .jpg,"
          beforeUpload={async (_file, FileList) => {
            for (const file of FileList) {
              const isLessThan500MB = file.size < 500 * 1024 * 1024; // 500MB in bytes
              if (!isLessThan500MB) {
                toast.error('File size should be less than 500MB');
                return false;
              }
            }
            if (onChange) {
              setIsUploadingStamp(true);
              const url = await new AwsS3(_file).getS3URL();
              onChange({
                ...item,
                tool: 'stamp',
                value: {
                  extension: _file.name.split('.').pop() || '',
                  name: _file.name,
                  type: _file.type,
                  url: url,
                },
              });

              setIsUploadingStamp(false);
            }
            return false;
          }}
          style={{
            borderStyle: 'dashed',
            borderWidth: 2,
            marginTop: 12,
            backgroundColor: 'transparent',
            borderColor: '#E2E8F0',
          }}
          itemRender={() => {
            return null;
          }}
        >
          <p className="ant-upload-drag-icon">
            <Image
              src={'/uploadcloudcyan.svg'}
              width={50}
              height={50}
              alt="upload"
            />
          </p>
          <p className="text-[18px] font-semibold py-2 leading-5 text-[#2C3641]">
            Drop your files here, or browse
          </p>

          <p className="text-sm font-normal text-center py-2 leading-5 text-[#2C3641]">
            or
          </p>

          <CustomButton
            text="Select File"
            className="!w-fit !px-6 !bg-schestiLightPrimary !text-schestiPrimary !py-2 !border-schestiLightPrimary"
          />
        </Upload.Dragger>
      </Spin>
    );
  } else if (item.tool === 'signature') {
    return <GetSignatureValue item={item} onChange={onChange} />;
  }

  return '';
}

function RenderStandardInputValue({
  item,
  mode,
}: {
  item: ToolState;
  mode: PdfContractMode;
}) {
  if (mode === 'add-values' || mode === 'view-values') {
    if (item.value) {
      if (typeof item.value === 'string') {
        return <p className="capitalize">{item.value}</p>;
      } else if ('url' in item.value) {
        return (
          <Image alt="stamp" src={item.value.url} width={20} height={20} />
        );
      } else if (item.tool === 'signature' && 'font' in item.value) {
        return (
          <ChooseFont text={item.value.value} chooseFont={item.value.font} />
        );
      }
    } else {
      return <p className="capitalize">{item.tool}</p>;
    }
  } else {
    return <p className="capitalize">{item.tool}</p>;
  }
}

type TypeSignatureProps = {
  onChange?: (_item: ToolState, _shouldClose?: boolean) => void;
  item: ToolState;
};

function TypeSignature({ onChange, item }: TypeSignatureProps) {
  const [font, setFont] = useState<ChooseFontType>('satisfyFont');
  const [value, setValue] = useState((item.value as any)?.value || '');

  return (
    <div className="h-[400px]">
      <InputComponent
        label="Type Signature"
        name="typeSignature"
        placeholder="Type Signature"
        type="text"
        field={{
          value: value ? value : undefined,
          onChange: (e) => {
            setValue(e.target.value);
          },
        }}
      />

      <div className="grid grid-cols-4 gap-4 mt-4 justify-center overflow-y-auto">
        {Object.keys(SignatureFonts).map((signatureFont) => {
          return (
            <div
              key={signatureFont}
              onClick={() => setFont(signatureFont as ChooseFontType)}
              className={`border rounded-md text-2xl leading-8 flex items-center mx-auto text-center cursor-pointer p-4 ${font === signatureFont ? 'border-schestiPrimary text-schestiPrimary' : ''}`}
            >
              <ChooseFont
                text={value ? value : 'John Doe'}
                chooseFont={signatureFont as ChooseFontType}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end  items-center">
        <CustomButton
          text="Add Signature"
          className="!w-fit !bg-schestiLightPrimary !text-schestiPrimary !py-2 !border-schestiLightPrimary"
          onClick={() => {
            if (value && onChange) {
              onChange({
                ...item,
                tool: 'signature',
                value: {
                  font,
                  value,
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
}

function GetInitialToolValue({
  item,
  onChange,
}: {
  onChange?: (_item: ToolState, _shouldClose?: boolean) => void;
  item: ToolState;
}) {
  const [value, setValue] = useState(
    typeof item.value === 'string' || typeof item.value === 'undefined'
      ? item.value
      : ''
  );
  return (
    <div className="space-y-3">
      <InputComponent
        label="Initials"
        name="initials"
        type="text"
        placeholder="Initials"
        field={{
          value: value,
          onChange(e) {
            setValue(e.target.value);
          },
        }}
      />

      <div className="flex justify-end">
        <CustomButton
          text="Add Initials"
          className="!w-fit !bg-schestiLightPrimary !text-schestiPrimary !py-2 !border-schestiLightPrimary"
          onClick={() =>
            onChange &&
            onChange({
              ...item,
              tool: 'initials',
              value: value,
            })
          }
        />
      </div>
    </div>
  );
}

function GetSignatureValue({
  item,
  onChange,
}: {
  onChange?: (_item: ToolState, _shouldClose?: boolean) => void;
  item: ToolState;
}) {
  const [activeTab, setActiveTab] = useState('type');
  const [isUploadingSignature, setIsUploadingSignature] = useState(false);

  return (
    <div>
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={['type', 'upload'].map((type) => {
          return {
            key: type,
            label:
              type === activeTab ? (
                <p className="capitalize text-base text-schestiPrimary">
                  {type}
                </p>
              ) : (
                <p className="capitalize text-base">{type}</p>
              ),
          };
        })}
      />
      {activeTab === 'upload' ? (
        <div className="h-[400px]">
          <Spin
            spinning={isUploadingSignature}
            indicator={<LoadingOutlined spin />}
          >
            <Upload.Dragger
              name={'file'}
              accept=".png, .jpeg, .jpg,"
              beforeUpload={async (_file, FileList) => {
                for (const file of FileList) {
                  const isLessThan500MB = file.size < 500 * 1024 * 1024; // 500MB in bytes
                  if (!isLessThan500MB) {
                    toast.error('File size should be less than 500MB');
                    return false;
                  }
                }
                if (onChange) {
                  setIsUploadingSignature(true);
                  const url = await new AwsS3(_file).getS3URL();
                  onChange({
                    ...item,
                    tool: 'signature',
                    value: {
                      extension: _file.name.split('.').pop() || '',
                      name: _file.name,
                      type: _file.type,
                      url: url,
                    },
                  });
                  setIsUploadingSignature(false);
                }
                return false;
              }}
              style={{
                borderStyle: 'dashed',
                borderWidth: 2,
                marginTop: 12,
                backgroundColor: 'transparent',
                borderColor: '#E2E8F0',
              }}
              itemRender={() => {
                return null;
              }}
            >
              <p className="ant-upload-drag-icon">
                <Image
                  src={'/uploadcloudcyan.svg'}
                  width={50}
                  height={50}
                  alt="upload"
                />
              </p>
              <p className="text-[18px] font-semibold py-2 leading-5 text-[#2C3641]">
                Drop your files here, or browse
              </p>

              <p className="text-sm font-normal text-center py-2 leading-5 text-[#2C3641]">
                or
              </p>

              <CustomButton
                text="Select File"
                className="!w-fit !px-6 !bg-schestiLightPrimary !text-schestiPrimary !py-2 !border-schestiLightPrimary"
              />
            </Upload.Dragger>
          </Spin>
        </div>
      ) : activeTab === 'type' ? (
        <TypeSignature item={item} onChange={onChange} />
      ) : null}
    </div>
  );
}
