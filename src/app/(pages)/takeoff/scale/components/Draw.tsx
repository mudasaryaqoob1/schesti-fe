import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Group,
  Text as KonvaText,
  Arrow,
  Circle,
} from 'react-konva';

import { UploadFileData } from '../../context/UploadFileContext';

import { KonvaEventObject } from 'konva/lib/Node';
import moment from 'moment';
import { DrawHistoryContext } from '../../context';
import { DrawHistoryContextProps } from '../../context/DrawHistoryContext';
import {
  CircleInterface,
  CountInterface,
  DrawInterface,
  LineInterface,
  LineState,
  Measurements,
  PolygonConfigInterface,
  ScaleInterface,
  defaultMeasurements,
} from '../../types';
import { ScaleData } from '../page';
import useWheelZoom from './useWheelZoom';
import useDraw from '../../../../hooks/useDraw';

const defaultCurrentLineState = { startingPoint: null, endingPoint: null };
const defaultPolyLineState: LineInterface = {
  points: [],
  stroke: '',
  strokeWidth: 0,
  textUnit: 18,
};

interface Props {
  selectedTool: ScaleInterface;
  scale: ScaleData;
  depth: number;
  color: string;
  border: number;
  unit: number;
  handleChangeMeasurements: (data: Measurements) => void;
  uploadFileData: UploadFileData;
  pageNumber: number;
  handleScaleModal: (open: boolean) => void;
}

const Draw: React.FC<Props> = ({
  selectedTool,
  scale,
  depth,
  border,
  unit,
  color,
  handleChangeMeasurements,
  uploadFileData,
  pageNumber,
}) => {
  const { selected, subSelected = null } = selectedTool;
  const {
    calcLineDistance,
    calculateMidpoint,
    calculatePolygonArea,
    calculatePolygonPerimeter,
    calculatePolygonCenter,
    calculatePolygonVolume,
    calculateAngle,
  } = useDraw();

  const [draw, setDraw] = useState<DrawInterface>({
    line: [],
    area: [],
    volume: [],
    count: [],
    dynamic: [],
  });
  const { deleteDrawHistory, updateDrawHistory } = useContext(
    DrawHistoryContext
  ) as DrawHistoryContextProps;
  const [polyLine, setPolyLine] = useState<LineInterface>(defaultPolyLineState);
  const [dynamicPolyLine, setDynamicPolyLine] =
    useState<LineInterface>(defaultPolyLineState);
  const [currentLine, setCurrentLine] = useState<LineState>(
    defaultCurrentLineState
  );
  const [completingLine, setCompletingLine] = useState<LineState>(
    defaultCurrentLineState
  );
  const [endLiveEditing, setEndLiveEditing] = useState(false);
  const [selectedShape, setSelectedShape] = useState('');
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [circle, setCircle] = useState<CircleInterface[]>([]);

  const myImage = new Image();
  myImage.src =
    uploadFileData.src ||
    'https://wcs.smartdraw.com/floor-plan/img/house-design-example.png?bn=15100111902';

  const counterImage = new Image();
  counterImage.src = '/count-draw.png';

  useEffect(() => {
    setCurrentLine(defaultCurrentLineState);
    setCompletingLine(defaultCurrentLineState);
    setEndLiveEditing(false);
  }, [selected]);

  useEffect(() => {
    if (subSelected === 'clear') {
      setDraw((prev) => ({ ...prev, dynamic: [] }));
      setCircle([]);
    }
  }, [subSelected]);

  useEffect(() => {
    if (selected !== 'count') handleChangeMeasurements(defaultMeasurements);
  }, [selected]);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (endLiveEditing) return;
    setSelectedShape('');

    const stage = e.target.getStage();
    const position = getRelativePointerPosition(stage);

    if (subSelected === 'fill') {
      setIsMouseDown(true);
      setCircle((prev) => {
        prev.push({
          x: position?.x || 0,
          y: position?.y || 0,
          fill: color,
          radius: 10,
        });
        return prev;
      });
      return;
    }

    if (
      selected === 'length' ||
      selected === 'area' ||
      selected === 'volume' ||
      subSelected === 'create'
    ) {
      setCurrentLine((prev) => ({
        ...prev,
        startingPoint: { x: position?.x || 0, y: position?.y || 0 },
      }));
    }

    if (selected === 'length' && currentLine.startingPoint) {
      const { startingPoint } = currentLine;

      const newLine: LineInterface = {
        points: [
          startingPoint?.x,
          startingPoint?.y,
          position?.x,
          position?.y,
        ] as number[],
        stroke: color,
        strokeWidth: border,
        textUnit: unit,
        dateTime: moment().toDate(),
      };
      setDraw((prev) => ({ ...prev, line: [...prev.line, newLine] }));

      updateDrawHistory(pageNumber.toString(), 'line', newLine);

      setCurrentLine(defaultCurrentLineState);
      handleChangeMeasurements(defaultMeasurements);
    }

    if (selected === 'area' || selected === 'volume') {
      if (polyLine?.points.length && !completingLine.startingPoint) {
        const [x, y] = polyLine.points;
        setCompletingLine((prev) => ({ ...prev, startingPoint: { x, y } }));
      }

      setPolyLine((prev) => {
        if (!prev.points.length) {
          return {
            points: [position?.x || 0, position?.y || 0],
            stroke: color,
            strokeWidth: border,
            textUnit: unit,
          };
        } else {
          if (
            polyLine?.points.length &&
            currentLine.endingPoint &&
            +calcLineDistance(
              [
                ...polyLine.points.slice(0, 2),
                currentLine.endingPoint?.x,
                currentLine.endingPoint?.y,
              ],
              scale
            ) <=
              6 / 72
          ) {
            prev.points.push(...polyLine.points.slice(0, 2));
            setCurrentLine({ startingPoint: null, endingPoint: null });
            setCompletingLine({ startingPoint: null, endingPoint: null });

            setDraw((prevDraw) => {
              const polygonCoordinates = prev.points;
              const parameter = calculatePolygonPerimeter(
                polygonCoordinates,
                scale
              );

              console.log('parameter', parameter);

              if (selected === 'area') {
                const area = calculatePolygonArea(polygonCoordinates, scale);

                handleChangeMeasurements({
                  area: area,
                  parameter,
                  ...(currentLine.startingPoint && {
                    angle: calculateAngle([
                      currentLine.startingPoint.x,
                      currentLine.startingPoint.y,
                      position?.x || 0,
                      position?.y || 0,
                    ]),
                  }),
                });

                const areaConfig: PolygonConfigInterface = {
                  ...prev,
                  textUnit: unit,
                  dateTime: moment().toDate(),
                };

                updateDrawHistory(pageNumber.toString(), 'area', areaConfig);

                return {
                  ...prevDraw,
                  area: [...prevDraw.area, areaConfig],
                };
              } else {
                const volume = calculatePolygonVolume(
                  polygonCoordinates,
                  depth,
                  scale
                );

                handleChangeMeasurements({
                  volume,
                  parameter,
                  ...(currentLine.startingPoint && {
                    angle: calculateAngle([
                      currentLine.startingPoint.x,
                      currentLine.startingPoint.y,
                      position?.x || 0,
                      position?.y || 0,
                    ]),
                  }),
                });

                const volumeConfig: PolygonConfigInterface = {
                  ...prev,
                  depth,
                  textUnit: unit,
                  dateTime: moment().toDate(),
                };

                updateDrawHistory(
                  pageNumber.toString(),
                  'volume',
                  volumeConfig
                );

                return {
                  ...prevDraw,
                  volume: [...prevDraw.volume, volumeConfig],
                };
              }
            });

            return defaultPolyLineState;
          } else prev.points.push(...[position?.x || 0, position?.y || 0]);

          return { ...prev };
        }
      });
    }

    if (selected === 'count' && position) {
      const newCount: CountInterface = {
        x: position?.x - 2,
        y: position.y - 15,
        dateTime: moment().toDate(),
      };

      setDraw((prev) => {
        handleChangeMeasurements({ count: [...prev.count, newCount].length });
        return { ...prev, count: [...prev.count, newCount] };
      });

      updateDrawHistory(pageNumber.toString(), 'count', newCount);
    }

    if (subSelected === 'create') {
      setDynamicPolyLine((prev) => {
        if (!prev.points.length) {
          return {
            points: [position?.x || 0, position?.y || 0],
            stroke: color,
            strokeWidth: border,
            textUnit: unit,
            dateTime: moment().toDate(),
          };
        } else {
          prev.points.push(...[position?.x || 0, position?.y || 0]);
          return {
            ...prev,
          };
        }
      });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (endLiveEditing) return;
    const stage = e.target.getStage();
    const position = getRelativePointerPosition(stage);

    if (subSelected === 'fill') {
      if (isMouseDown) {
        setCircle((prev) => {
          prev.push({
            x: position?.x || 0,
            y: position?.y || 0,
            fill: color,
            radius: 10,
          });
          return prev;
        });
      }
      return;
    }

    if (currentLine.startingPoint) {
      setCurrentLine((prev) => ({
        ...prev,
        endingPoint: { x: position?.x || 0, y: position?.y || 0 },
      }));

      const angle = calculateAngle([
        currentLine.startingPoint.x,
        currentLine.startingPoint.y,
        position?.x || 0,
        position?.y || 0,
      ]);

      const parameter = calcLineDistance(
        [
          currentLine.startingPoint.x,
          currentLine.startingPoint.y,
          position?.x || 0,
          position?.y || 0,
        ],
        scale,
        true
      ) as string;

      handleChangeMeasurements({
        angle,
        ...(selected === 'length' && { parameter }),
        ...(completingLine.endingPoint
          ? {
              parameter: calculatePolygonPerimeter(
                [
                  ...polyLine.points,
                  completingLine.endingPoint.x,
                  completingLine.endingPoint.y,
                ],
                scale
              ),
              area: calculatePolygonArea(
                [
                  ...polyLine.points,
                  completingLine.endingPoint.x,
                  completingLine.endingPoint.y,
                ],
                scale
              ),
              volume: calculatePolygonVolume(
                [
                  ...polyLine.points,
                  completingLine.endingPoint.x,
                  completingLine.endingPoint.y,
                ],
                depth,
                scale
              ),
            }
          : 0),
      });
    }

    if (completingLine.startingPoint) {
      setCompletingLine((prev) => ({
        ...prev,
        endingPoint: { x: position?.x || 0, y: position?.y || 0 },
      }));
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const { stageScale, stageX, stageY, handleWheel } = useWheelZoom();
  return (
    <div
      className="outline-none"
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setCurrentLine(defaultCurrentLineState);
          setCompletingLine(defaultCurrentLineState);
          setPolyLine(defaultPolyLineState);
          setDynamicPolyLine(defaultPolyLineState);
          handleChangeMeasurements(defaultMeasurements);
        }
        if (e.key === 'Enter' && subSelected === 'create') {
          setCurrentLine(defaultCurrentLineState);

          setDraw((prevDraw) => ({
            ...prevDraw,
            dynamic: [
              ...prevDraw.dynamic,
              {
                ...dynamicPolyLine,
                strokeWidth: 10,
                stroke: color,
                lineCap: 'round',
                id: `dynamic-${draw.dynamic.length + 1}`,
              },
            ],
          }));

          setDynamicPolyLine(defaultPolyLineState);
        }

        if (e.key === 'Delete' && selectedShape) {
          const [shapeName, shapeNumber] = selectedShape.split('-');

          setDraw((prev) => {
            const tempPrevShapeData = [
              ...prev[shapeName as keyof DrawInterface],
            ];
            tempPrevShapeData.splice(+shapeNumber, 1);

            if (selected === 'count')
              handleChangeMeasurements({ count: tempPrevShapeData.length });

            deleteDrawHistory(pageNumber.toString(), {
              ...prev,
              [shapeName]: tempPrevShapeData,
            });

            return {
              ...prev,
              [shapeName]: tempPrevShapeData,
            };
          });

          setSelectedShape('');
        }
      }}
    >
      <Stage
        width={uploadFileData.width || 600}
        height={uploadFileData.height || 600}
        onWheel={handleWheel}
        scaleX={stageScale}
        scaleY={stageScale}
        x={stageX}
        y={stageY}
        className="flex justify-center cursor-pointer"
      >
        <Layer
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <KonvaImage
            image={myImage}
            width={uploadFileData.width || 600}
            height={uploadFileData.height || 600}
          />
          {/* Drawing Line */}
          {draw.line.map(({ textUnit, ...rest }, index) => {
            const id = `line-${index}`;
            const lineDistance = calcLineDistance(rest.points, scale, true);
            const lineMidPoint = calculateMidpoint(rest.points);

            return (
              <Group
                id={id}
                key={id}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  setSelectedShape(e.currentTarget.attrs?.id || '');
                }}
              >
                <Arrow
                  key={index}
                  {...rest}
                  lineCap="round"
                  dash={selectedShape === id ? [10, 10] : []}
                  stroke={selectedShape === id ? 'maroon' : rest.stroke}
                  pointerAtEnding={true}
                  pointerAtBeginning={true}
                />
                <KonvaText
                  {...lineMidPoint}
                  fontSize={textUnit}
                  text={lineDistance.toString()}
                  fill="red"
                />
              </Group>
            );
          })}

          {/* Drawing Dynamic Fill */}
          {draw.dynamic.map(({ ...rest }, index) => {
            const id = `dynamic-${index}`;

            return (
              <Group
                key={id}
                id={id}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  setSelectedShape(e.currentTarget.attrs?.id || '');
                }}
              >
                <Line
                  {...rest}
                  dash={selectedShape === id ? [10, 10] : []}
                  lineCap={selectedShape === id ? 'square' : rest.lineCap}
                  stroke={selectedShape === id ? 'maroon' : rest.stroke}
                />
              </Group>
            );
          })}
          {!!dynamicPolyLine.points.length && <Line {...dynamicPolyLine} />}

          {/* Drawing Area */}
          {draw.area.map(({ textUnit, ...rest }, index) => {
            const polygonCoordinates = rest.points;
            const center = calculatePolygonCenter(polygonCoordinates);
            const area = calculatePolygonArea(polygonCoordinates, scale);

            const text = `${area?.toFixed(4) || ''}sq`;
            const id = `area-${index}`;

            return (
              <Group
                id={id}
                key={id}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  setSelectedShape(e.currentTarget.attrs?.id || '');
                }}
              >
                <Line
                  {...rest}
                  id={id}
                  closed={true}
                  dash={selectedShape === id ? [10, 10] : []}
                  stroke={selectedShape === id ? 'maroon' : rest.stroke}
                  onMouseDown={(e) => {
                    e.cancelBubble = true;
                    setSelectedShape(e.currentTarget.attrs?.id || '');
                  }}
                />
                <KonvaText
                  {...center}
                  fontSize={textUnit}
                  text={text}
                  offsetX={30}
                  fill="red"
                />
              </Group>
            );
          })}

          {!!polyLine.points.length && <Line {...polyLine} />}

          {/* Drawing Volume */}
          {draw.volume.map(({ depth, textUnit, ...rest }, index) => {
            const polygonCoordinates = rest.points;
            const center = calculatePolygonCenter(polygonCoordinates);
            const volume = calculatePolygonVolume(
              polygonCoordinates,
              depth || 0,
              scale
            );
            const text = `${volume?.toFixed(2) || ''} cubic`;
            const id = `volume-${index}`;

            return (
              <Group
                id={id}
                key={id}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  setSelectedShape(e.currentTarget.attrs?.id || '');
                }}
              >
                <Line
                  {...rest}
                  closed={true}
                  id={id}
                  dash={selectedShape === id ? [10, 10] : []}
                  stroke={selectedShape === id ? 'maroon' : rest.stroke}
                  onMouseDown={(e) => {
                    e.cancelBubble = true;
                    setSelectedShape(e.currentTarget.attrs?.id || '');
                  }}
                />
                <KonvaText
                  {...center}
                  fontSize={textUnit}
                  text={text}
                  offsetX={30}
                  fill="red"
                />
              </Group>
            );
          })}

          {currentLine.startingPoint &&
            currentLine.endingPoint &&
            selected !== 'count' &&
            selected !== 'scale' && (
              <Line
                points={[
                  currentLine.startingPoint.x,
                  currentLine.startingPoint.y,
                  currentLine.endingPoint.x,
                  currentLine.endingPoint.y,
                ]}
                stroke={color}
                strokeWidth={border}
              />
            )}

          {completingLine.startingPoint &&
            completingLine.endingPoint &&
            (selected === 'area' || selected === 'volume') && (
              <Line
                points={[
                  completingLine.startingPoint.x,
                  completingLine.startingPoint.y,
                  completingLine.endingPoint.x,
                  completingLine.endingPoint.y,
                ]}
                stroke="gray"
                strokeWidth={border}
              />
            )}

          {/* Drawing Count */}
          {draw.count.map(({ ...rest }, index) => {
            const id = `count-${index}`;

            return (
              <KonvaImage
                id={`count-${index}`}
                key={`count-${index}`}
                image={counterImage}
                fill={selectedShape === id ? 'gray' : ''}
                width={20}
                height={20}
                {...rest}
                onMouseDown={(e) => {
                  e.cancelBubble = true;
                  setSelectedShape(e.currentTarget.attrs?.id || '');
                }}
              />
            );
          })}

          {/* Drawing Fill Color Dynamic */}
          {/* <Circle x={10} y={10} radius={10} fill="red" /> */}
          {circle.map(({ x, y, fill, radius }, index) => (
            <Circle key={index} x={x} y={y} radius={radius} fill={fill} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Draw;

const getRelativePointerPosition = (node: any) => {
  if (node) {
    const transform = node?.getAbsoluteTransform().copy();
    transform.invert();
    const pos = node.getStage().getPointerPosition();
    return transform.point(pos);
  }
};
