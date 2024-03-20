import React from 'react';
import { ScaleLabel } from '../../scale/page';
import Length from '../length';
import Volume from '../volume';
import Count from '../count';
import Area from '../area';
import Dynamic from '../dynamic';
import { Measurements } from '../../types';

interface Props {
  scale: ScaleLabel;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  measurements: Measurements;
}

const ModalsWrapper: React.FC<Props> = ({
  scale,
  setModalOpen,
  measurements,
}) => {
  return (
    <div>
      <div>
        {scale === 'length' && (
          <Length measurements={measurements} setModalOpen={setModalOpen} />
        )}
      </div>
      <div>
        {scale === 'volume' && (
          <Volume measurements={measurements} setModalOpen={setModalOpen} />
        )}
      </div>
      <div>
        {scale === 'count' && (
          <Count measurements={measurements} setModalOpen={setModalOpen} />
        )}
      </div>
      <div>
        {scale === 'area' && (
          <Area measurements={measurements} setModalOpen={setModalOpen} />
        )}
      </div>
      <div>
        {scale === 'dynamic' && <Dynamic setModalOpen={setModalOpen} />}
      </div>
    </div>
  );
};

export default ModalsWrapper;
