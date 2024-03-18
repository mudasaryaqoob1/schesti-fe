'use client';
import { useState, useContext, useEffect } from 'react';
import ModalComponent from '@/app/component/modal';
import ScaleModal from '../components/scale';
import ModalsWrapper from './components/ModalWrapper';
import { ColorPicker, InputNumber, Select } from 'antd';
import { ReportDataContext, ScaleContext, UploadFileContext } from '../context';
import { UploadFileContextProps } from '../context/UploadFileContext';
import {
  Measurements,
  ScaleInterface,
  Units,
  defaultMeasurements,
} from '../types';
import Image from 'next/image';
import { ScaleNavigation, DrawTable, Draw } from './components';
import { ScaleDataContextProps } from '../context/ScaleContext';
import { useRouter } from 'next/navigation';
import Button from '@/app/component/customButton/button';
import { ReportDataContextProps } from '../context/ReportDataContext';

export interface ScaleData {
  xScale?: string;
  yScale?: string;
  scale: string;
  precision: string;
}

export interface PageScale {
  [pageNumber: string]: ScaleData;
}

const Scale = () => {
  const router = useRouter();
  const [tool, setTool] = useState<ScaleInterface>({ selected: 'scale' });
  const [showModal, setShowModal] = useState(false);
  const [border, setBorder] = useState<number>(4);
  const [color, setColor] = useState<string>('#1677ff');
  const [unit, setUnit] = useState<number>(14);
  const [depth, setDepth] = useState<number>(0);
  const [measurements, setMeasurements] =
    useState<Measurements>(defaultMeasurements);

  const { scaleData, handleScaleData } = useContext(
    ScaleContext
  ) as ScaleDataContextProps;
  const { uploadFileData } = useContext(
    UploadFileContext
  ) as UploadFileContextProps;

  const { reportData } = useContext(
    ReportDataContext
  ) as ReportDataContextProps;

  console.log('scaleData: ', scaleData);

  if (!uploadFileData.length) router.push('/takeoff/upload');

  useEffect(() => {
    const newData: any = {};
    for (let i = 1; i <= uploadFileData.length; i++) {
      newData[i] = { scale: `1in=1in`, precision: '1' };
    }
    handleScaleData(newData);
  }, []);

  return (
    <>
      <>
        <section className="md:px-16 px-8 pb-4">
          <div className="flex justify-end pt-4">
            <div
              className="flex flex-row gap-x-3 cursor-pointer"
              onClick={() => router.push('/takeoff/report')}
            >
              <Button
                disabled={!uploadFileData.length || !reportData.length}
                text="Generate Report"
                icon="/plus.svg"
                iconwidth={20}
                iconheight={20}
              />
            </div>
          </div>
          <ScaleNavigation
            tool={tool}
            setTool={setTool}
            setShowModal={setShowModal}
          />
          <div className="bg-[#F2F2F2] h-[52px] flex flex-row items-center px-4 gap-6 rounded-lg">
            <div className="flex flex-row gap-2 items-center">
              <label>Totals:</label>
              <Select value="Length ----" />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label>Units:</label>
              <Select
                className="w-[64px]"
                value={unit}
                onChange={(value) => setUnit(value)}
              >
                {Units.map((item) => (
                  <Select.Option value={item} key={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label>Border:</label>
              <InputNumber
                min={1}
                max={76}
                value={border}
                onChange={(value) => value && setBorder(value)}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <label>Color:</label>
              <ColorPicker
                value={color}
                onChange={(color) => setColor(color.toHexString())}
              />
            </div>
            {tool.selected === 'volume' && (
              <InputNumber
                type="number"
                min={1}
                placeholder="Depth"
                onChange={(value) => value && setDepth(value)}
              />
            )}
          </div>

          <div className="py-6 h-[709px] relative">
            <div className="absolute bottom-48 left-10 flex gap-6 z-50 ">
              <Image src={'/cursor.svg'} alt="t" width={24} height={24} />
              <Image src={'/t1.svg'} alt="t" width={24} height={24} />
              <Image src={'/t1.svg'} alt="t" width={24} height={24} />
              <Image src={'/t1.svg'} alt="t" width={24} height={24} />
              <Image src={'/fx.svg'} alt="t" width={24} height={24} />
            </div>
            <div className="absolute top-10 right-10 flex flex-col gap-3 items-center z-50 bg-white px-3 py-2  rounded-sm drop-shadow-md ">
              <Image src={'/cursor.svg'} alt="t" width={24} height={24} />
              <Image src={'/pencil.svg'} alt="t" width={34} height={34} />
              <Image src={'/t1.svg'} alt="t" width={24} height={24} />
              <Image src={'/shapeTool.svg'} alt="t" width={34} height={34} />
              <Image src={'/stickyNotes.svg'} alt="t" width={34} height={34} />
              <Image src={'/fx.svg'} alt="t" width={24} height={24} />
              <Image src={'/calculator.svg'} alt="t" width={34} height={34} />
              <Image src={'/comments.svg'} alt="t" width={34} height={34} />
              <Image src={'/uploadFile.svg'} alt="t" width={34} height={34} />
              <Image src={'/library.svg'} alt="t" width={34} height={34} />
            </div>
            <div className={`absolute ${showModal ? 'block' : 'hidden'}`}>
              <ModalsWrapper
                tool={tool}
                setTool={setTool}
                setModalOpen={setShowModal}
                measurements={measurements}
              />
            </div>
            <div className="h-[527px] rounded-lg overflow-y-auto">
              {uploadFileData.map((file, index) => (
                <Draw
                  key={`draw-${index}`}
                  selectedTool={tool}
                  scale={
                    scaleData?.[`${index + 1}`] || {
                      scale: `1"=1"`,
                      precision: '1',
                    }
                  }
                  depth={depth}
                  color={color}
                  border={border}
                  unit={unit * 1.5}
                  uploadFileData={file}
                  pageNumber={index + 1}
                  handleScaleModal={(open) => setShowModal(open)}
                  handleChangeMeasurements={(measurements) =>
                    setMeasurements(measurements)
                  }
                />
              ))}
            </div>
            <DrawTable />
          </div>
          {tool.selected === 'scale' && (
            <ModalComponent open={showModal} setOpen={setShowModal}>
              <ScaleModal
                numOfPages={uploadFileData.length}
                setModalOpen={setShowModal}
              />
            </ModalComponent>
          )}
        </section>
      </>
    </>
  );
};

export default Scale;
