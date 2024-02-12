import React from 'react';
import { ScaleLabel } from '../../scale/page';
import Length from '../length';
import Volume from '../volume';
import Count from '../count';
import Area from '../area';
import Dynamic from '../dynamic';

interface Props {
  scale: ScaleLabel;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: undefined;
}

const ModalsWrapper: React.FC<Props> = ({ scale, setModalOpen }) => {
  return (
    <div>
      <div>{scale === 'length' && <Length setModalOpen={setModalOpen} />}</div>
      <div>{scale === 'volume' && <Volume setModalOpen={setModalOpen} />}</div>
      <div>{scale === 'count' && <Count setModalOpen={setModalOpen} />}</div>
      <div>{scale === 'area' && <Area setModalOpen={setModalOpen} />}</div>
      <div>
        {scale === 'dynamic' && <Dynamic setModalOpen={setModalOpen} />}
      </div>
    </div>
  );
};

export default ModalsWrapper;
