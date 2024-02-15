import React, { useEffect } from 'react';
import { useContext, useState } from 'react';
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Group,
  Text as KonvaText,
} from 'react-konva';
import UploadFileContext, {
  UploadFileContextProps,
} from '../context/UploadFileContext';
import { useDraw } from '@/app/hooks';
import { KonvaEventObject } from 'konva/lib/Node';
import { LineCap } from 'konva/lib/Shape';
import { Measurements, defaultMeasurements } from './page';

const defaultCurrentLineState = { startingPoint: null, endingPoint: null };
const defaultPolyLineState: LineInterface = {
  points: [],
  stroke: '',
  strokeWidth: 0,
  textUnit: 18,
};

interface LineState {
  startingPoint: { x: number; y: number } | null;
  endingPoint: { x: number; y: number } | null;
}

interface CoordinatesInterface {
  x: number;
  y: number;
}

interface CountInterface extends CoordinatesInterface {}

interface LineInterface {
  points: number[];
  stroke: string;
  strokeWidth: number;
  lineCap?: LineCap;
  textUnit: number;
}

interface PolygonConfigInterface {
  points: number[];
  stroke: string;
  strokeWidth: number;
  area?: number;
  volume?: number;
  center: CoordinatesInterface;
  textUnit: number;
}

interface DrawInterface {
  line: LineInterface[];
  area: PolygonConfigInterface[];
  volume: PolygonConfigInterface[];
  dynamic: LineInterface[];
  count: CountInterface[];
}

interface Props {
  selected: string;
  depth: number;
  color: string;
  border: number;
  unit: number;
  handleChangeMeasurements: (data: Measurements) => void;
}

const Draw: React.FC<Props> = ({
  selected,
  depth,
  border,
  unit,
  color,
  handleChangeMeasurements,
}) => {
  const {
    calcLineDistance,
    calculateMidpoint,
    calculatePolygonArea,
    calculatePolygonPerimeter,
    calculatePolygonCenter,
    calculatePolygonVolume,
    calculateAngle,
  } = useDraw();

  const { src } = useContext(UploadFileContext) as UploadFileContextProps;
  const [draw, setDraw] = useState<DrawInterface>({
    line: [],
    area: [],
    volume: [],
    count: [],
    dynamic: [],
  });

  const [polyLine, setPolyLine] = useState<LineInterface>(defaultPolyLineState);
  const [dynamicPolyLine, setDynamicPolyLine] =
    useState<LineInterface>(defaultPolyLineState);
  const [currentLine, setCurrentLine] = useState<LineState>(
    defaultCurrentLineState
  );
  const [completingLine, setCompletingLine] = useState<LineState>(
    defaultCurrentLineState
  );
  const [endLiveEditing, setEndLiveEditing] = useState<boolean>(false);

  const [selectedShape, setSelectedShape] = useState<string>('');

  const myImage = new Image();
  myImage.src =
    src ||
    'https://wcs.smartdraw.com/floor-plan/img/house-design-example.png?bn=15100111902';

  const counterImage = new Image();
  counterImage.src = '/count-draw.png';

  // useEffect(() => {
  //   const svg = `<svg
  //         width="36"
  //         height="36"
  //         viewBox="0 0 36 36"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <g id="Icon  4">
  //           <path
  //             id="Oval"
  //             opacity="0.15"
  //             fill-rule="evenodd"
  //             clip-rule="evenodd"
  //             d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
  //             fill=${color}
  //           />
  //           <path
  //             id="Icon"
  //             d="M15.5976 23.7363L10.7051 18.873C10.5684 18.7363 10.5 18.5605 10.5 18.3457C10.5 18.1308 10.5684 17.9551 10.7051 17.8183L11.7891 16.7637C11.9258 16.6074 12.0967 16.5293 12.3018 16.5293C12.5068 16.5293 12.6875 16.6074 12.8437 16.7637L16.125 20.0449L23.1562 13.0137C23.3125 12.8574 23.4931 12.7793 23.6982 12.7793C23.9033 12.7793 24.0742 12.8574 24.2109 13.0137L25.2949 14.0684C25.4316 14.2051 25.5 14.3809 25.5 14.5957C25.5 14.8105 25.4316 14.9863 25.2949 15.123L16.6523 23.7363C16.5156 23.8926 16.3398 23.9707 16.125 23.9707C15.9101 23.9707 15.7344 23.8926 15.5976 23.7363Z"
  //             fill=${color}
  //           />
  //         </g>
  //       </svg>`;

  //   base64Ref.current = `data:image/svg+xml;base64,${btoa(svg)}`;
  // }, [color]);
  useEffect(() => {
    setCurrentLine(defaultCurrentLineState);
    setCompletingLine(defaultCurrentLineState);
    setEndLiveEditing(false);
  }, [selected]);

  useEffect(() => {
    if (selected !== 'count') handleChangeMeasurements(defaultMeasurements);
  }, [selected]);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (endLiveEditing) return;
    setSelectedShape('');

    const stage = e.target.getStage();
    const position = stage?.getPointerPosition();

    if (selected !== 'count') {
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
      };
      setDraw((prev) => ({ ...prev, line: [...prev.line, newLine] }));
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
            +calcLineDistance([
              ...polyLine.points.slice(0, 2),
              currentLine.endingPoint?.x,
              currentLine.endingPoint?.y,
            ]) <=
              6 / 72
          ) {
            prev.points.push(...polyLine.points.slice(0, 2));
            setCurrentLine({ startingPoint: null, endingPoint: null });
            setCompletingLine({ startingPoint: null, endingPoint: null });

            setDraw((prevDraw) => {
              const polygonCoordinates = prev.points;

              const polygonCenter = calculatePolygonCenter(polygonCoordinates);
              const parameter = calculatePolygonPerimeter(polygonCoordinates);

              if (selected === 'area') {
                const area = calculatePolygonArea(polygonCoordinates);

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
                  area,
                  center: polygonCenter,
                  textUnit: unit,
                };

                return {
                  ...prevDraw,
                  area: [...prevDraw.area, areaConfig],
                };
              } else {
                const volume = calculatePolygonVolume(
                  polygonCoordinates,
                  depth
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
                  volume,
                  center: polygonCenter,
                  textUnit: unit,
                };

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
      };

      setDraw((prev) => {
        handleChangeMeasurements({ count: [...prev.count, newCount].length });
        return { ...prev, count: [...prev.count, newCount] };
      });
    }

    if (selected === 'dynamic') {
      setDynamicPolyLine((prev) => {
        if (!prev.points.length) {
          return {
            points: [position?.x || 0, position?.y || 0],
            stroke: color,
            strokeWidth: border,
            textUnit: unit,
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
    const position = stage?.getPointerPosition();

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

      handleChangeMeasurements({
        angle,
        ...(completingLine.endingPoint
          ? {
              parameter: calculatePolygonPerimeter([
                ...polyLine.points,
                completingLine.endingPoint.x,
                completingLine.endingPoint.y,
              ]),
              area: calculatePolygonArea([
                ...polyLine.points,
                completingLine.endingPoint.x,
                completingLine.endingPoint.y,
              ]),
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

  // const [polygonArea, polygonCenter] = useMemo(() => {
  //   if (completingLine.endingPoint) {
  //     const polygonCoordinates = [
  //       ...polyLine.points,
  //       completingLine.endingPoint.x,
  //       completingLine.endingPoint.y,
  //     ];

  //     return [
  //       calculatePolygonArea(polygonCoordinates),
  //       calculatePolygonCenter(polygonCoordinates),
  //     ];
  //   }

  //   return [];
  // }, [completingLine, polyLine.points]);

  return (
    <div
      className="w-fit mx-auto relative"
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setCurrentLine(defaultCurrentLineState);
          setCompletingLine(defaultCurrentLineState);
          setPolyLine(defaultPolyLineState);
          setDynamicPolyLine(defaultPolyLineState);
          handleChangeMeasurements(defaultMeasurements);
        }
        if (e.key === 'Enter' && selected === 'dynamic') {
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
        width={600}
        height={600}
        className="flex justify-center cursor-pointer border"
      >
        <Layer onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}>
          <KonvaImage image={myImage} width={600} height={600} />

          {/* Drawing Line */}
          {draw.line.map(({ textUnit, ...rest }, index) => {
            // const circles = convertArrayIntoChunks(line.points);
            const id = `line-${index}`;
            const lineDistance = calcLineDistance(rest.points);
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
                <Line
                  key={index}
                  {...rest}
                  lineCap="round"
                  dash={selectedShape === id ? [10, 10] : []}
                  stroke={selectedShape === id ? 'maroon' : rest.stroke}
                />
                {/* {circles.map((circle: number[]) => {
                  const [x, y] = circle;
                  return (
                    <Circle key={x + y} x={x} y={y} fill="#ff0000" radius={4} />
                  );
                })} */}
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
          {draw.area.map(({ center, area, textUnit, ...rest }, index) => {
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
                  fontStyle="bold"
                />
              </Group>
            );
          })}

          {!!polyLine.points.length && (
            <Group>
              <Line {...polyLine} />
              {/* {polygonArea && (
                <>
                  <KonvaText
                    {...polygonCenter}
                    fontSize={unit}
                    text={polygonText}
                    offsetX={30}
                    fill="red"
                    fontStyle="bold"
                  />
                  <KonvaText
                    x={40}
                    y={480}
                    fontSize={unit}
                    text={`Perimeter: ${polygonPerimeter || ''}`}
                    offsetX={30}
                    fill="teal"
                    fontStyle="bold"
                  />
                </>
              )} */}
            </Group>
          )}

          {/* Drawing Volume */}
          {draw.volume.map(({ center, volume, textUnit, ...rest }, index) => {
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
                  fontStyle="bold"
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
          {/* <KonvaText
            fontSize={15}
            fontStyle="bold"
            draggable
            fill="red"
            text={`Count: ${draw.count.length}`}
            x={10}
            y={10}
          /> */}
        </Layer>
      </Stage>
    </div>
  );
};

export default Draw;
