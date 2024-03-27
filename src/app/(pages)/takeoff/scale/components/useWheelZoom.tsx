import { useState } from 'react';

const useWheelZoom = (initialScale = 1, initialX = 0, initialY = 0) => {
  const [stageScale, setStageScale] = useState(initialScale);
  const [stageX, setStageX] = useState(initialX);
  const [stageY, setStageY] = useState(initialY);

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.02;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const pointerPosition = stage.getPointerPosition();
    const mousePointTo = {
      x: pointerPosition.x / oldScale - stage.x() / oldScale,
      y: pointerPosition.y / oldScale - stage.y() / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    setStageScale(newScale);
    setStageX(-(mousePointTo.x - pointerPosition.x / newScale) * newScale);
    setStageY(-(mousePointTo.y - pointerPosition.y / newScale) * newScale);
  };

  return { stageScale, stageX, stageY, handleWheel };
};

export default useWheelZoom;
