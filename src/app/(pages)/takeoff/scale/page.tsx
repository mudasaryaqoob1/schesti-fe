'use client';
import { useState, useContext } from 'react';
import ModalComponent from '@/app/component/modal';
import ScaleModal from '../components/scale';
import ModalsWrapper from './components/ModalWrapper';
import { ColorPicker, InputNumber, Select } from 'antd';
import { UploadFileContext } from '../context';
import { UploadFileContextProps } from '../context/UploadFileContext';
import {
  Measurements,
  ScaleInterface,
  Units,
  defaultMeasurements,
} from '../types';
import { ScaleNavigation, Draw } from './components'; // DrawTable

// const selectedScale = {
//   "1" : {scale:  `3/8"=1'-0"`, precision: `1/34` }
//   "2" : {scale:  `3/8"=1'-0"`, precision: `1/34` }
//   "3" : {scale:  `3/8"=1'-0"`, precision: `1/34` }
// }

export interface ScaleData {
  scale: string;
  precision: string;
}

export interface PageScale {
  [pageNumber: string]: ScaleData;
}

const Scale = () => {
  const [tool, setTool] = useState<ScaleInterface>({ selected: 'scale' });
  const [showModal, setShowModal] = useState(false);
  const [border, setBorder] = useState<number>(4);
  const [color, setColor] = useState<string>('#1677ff');
  const [unit, setUnit] = useState<number>(14);
  const [depth, setDepth] = useState<number>(0);
  const [measurements, setMeasurements] =
    useState<Measurements>(defaultMeasurements);
  const [scaleData, setScaleData] = useState<PageScale | undefined>();

  const { uploadFileData } = useContext(
    UploadFileContext
  ) as UploadFileContextProps;

  console.log('scaleData: ', scaleData);

  return (
    <section className="mt-[96px] md:px-16 px-8 pb-4">
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
              scale={scaleData?.[`${index + 1}`]}
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
        {/* <DrawTable /> */}
      </div>

      {tool.selected === 'scale' && (
        <ModalComponent open={showModal} setOpen={setShowModal}>
          <ScaleModal
            numOfPages={uploadFileData.length}
            setModalOpen={setShowModal}
            setScaleData={setScaleData}
          />
        </ModalComponent>
      )}
    </section>
  );
};

export default Scale;
