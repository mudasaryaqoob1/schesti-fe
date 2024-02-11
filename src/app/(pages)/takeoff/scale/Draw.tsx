import React, { useEffect, useMemo } from 'react';
import { useContext, useState } from 'react';
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Line,
  Group,
  Text as TextKonva,
  Circle,
  Text as KonvaText,
} from 'react-konva';
import UploadFileContext, {
  UploadFileContextProps,
} from '../context/UploadFileContext';
import { useDraw } from '@/app/hooks';
import { KonvaEventObject } from 'konva/lib/Node';
import { LineCap } from 'konva/lib/Shape';

interface LineState {
  startingPoint: { x: number; y: number } | null;
  endingPoint: { x: number; y: number } | null;
}

interface LineInterface {
  points: number[];
  stroke: string;
  strokeWidth: number;
  lineCap?: LineCap;
}

interface CoordinatesInterface {
  x: number;
  y: number;
}

interface PolygonConfigInterface {
  points: number[];
  stroke: string;
  strokeWidth: number;
  area?: number;
  volume?: number;
  center: CoordinatesInterface;
}

interface DrawInterface {
  line: LineInterface[];
  area: PolygonConfigInterface[];
  volume: PolygonConfigInterface[];
  dynamic: LineInterface[];
  count: CoordinatesInterface[];
}

const defaultCurrentLineState = { startingPoint: null, endingPoint: null };
const defaultPolyLineState = { points: [], stroke: '', strokeWidth: 0 };

interface Props {
  selected: string;
  depth: number;
}

const Draw: React.FC<Props> = ({ selected, depth }) => {
  const {
    calcLineDistance,
    convertArrayIntoChunks,
    calculateMidpoint,
    calculatePolygonArea,
    calculatePolygonPerimeter,
    calculatePolygonCenter,
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

  const myImage = new Image();
  myImage.src =
    src ||
    'https://wcs.smartdraw.com/floor-plan/img/house-design-example.png?bn=15100111902';

  const counterImage = new Image();
  counterImage.src = '/count-draw.png';

  useEffect(() => {
    setCurrentLine(defaultCurrentLineState);
    setCompletingLine(defaultCurrentLineState);
    setEndLiveEditing(false);
  }, [selected]);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (endLiveEditing) return;
    const stage = e.target.getStage();
    const position = stage?.getPointerPosition();

    setCurrentLine((prev) => ({
      ...prev,
      startingPoint: { x: position?.x || 0, y: position?.y || 0 },
    }));

    if (selected === 'length' && currentLine.startingPoint) {
      const { startingPoint } = currentLine;

      const newLine = {
        points: [
          startingPoint?.x,
          startingPoint?.y,
          position?.x,
          position?.y,
        ] as number[],
        stroke: '#7750F1',
        strokeWidth: 4,
      };
      setDraw((prev) => ({ ...prev, line: [...prev.line, newLine] }));
      setCurrentLine(defaultCurrentLineState);
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
            stroke: 'black',
            strokeWidth: 4,
          };
        } else {
          if (
            polyLine?.points.length &&
            currentLine.endingPoint &&
            +calcLineDistance([
              ...polyLine.points.slice(0, 2),
              currentLine.endingPoint?.x,
              currentLine.endingPoint?.y,
            ]) <= 6
          ) {
            prev.points.push(...polyLine.points.slice(0, 2));
            setCurrentLine({ startingPoint: null, endingPoint: null });
            setCompletingLine({ startingPoint: null, endingPoint: null });

            setDraw((prevDraw) => {
              const polygonCoordinates = prev.points.slice(
                0,
                polyLine.points.length - 2
              );

              const polygonArea = calculatePolygonArea(polygonCoordinates);

              const polygonCenter = calculatePolygonCenter(polygonCoordinates);

              if (selected === 'area') {
                const areaConfig: PolygonConfigInterface = {
                  ...prev,
                  center: polygonCenter,
                  area: polygonArea,
                };

                return {
                  ...prevDraw,
                  area: [...prevDraw.area, areaConfig],
                };
              } else {
                const volumeConfig: PolygonConfigInterface = {
                  ...prev,
                  center: polygonCenter,
                  volume: polygonArea * depth,
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
      const newCount = {
        x: position?.x - 2,
        y: position.y - 15,
      };

      setDraw((prev) => ({ ...prev, count: [...prev.count, newCount] }));
    }

    if (selected === 'dynamic') {
      setDynamicPolyLine((prev) => {
        if (!prev.points.length) {
          return {
            points: [position?.x || 0, position?.y || 0],
            stroke: 'black',
            strokeWidth: 4,
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
    }

    if (completingLine.startingPoint) {
      setCompletingLine((prev) => ({
        ...prev,
        endingPoint: { x: position?.x || 0, y: position?.y || 0 },
      }));
    }
  };

  const [polygonArea, polygonPerimeter, polygonCenter] = useMemo(() => {
    if (completingLine.endingPoint) {
      const polygonCoordinates = [
        ...polyLine.points,
        completingLine.endingPoint?.x,
        completingLine.endingPoint?.y,
      ];

      return [
        calculatePolygonArea(polygonCoordinates),
        calculatePolygonPerimeter(polygonCoordinates),
        calculatePolygonCenter(polygonCoordinates),
      ];
    }

    return [];
  }, [completingLine, polyLine.points]);

  const polygonText = useMemo(() => {
    if (selected === 'area') {
      return `${polygonArea?.toFixed(2) || ''} sq`;
    } else if (selected == 'volume') {
      return `${((polygonArea || 0) * depth).toFixed(2) || ''} cubic`;
    }
    return '';
  }, [polygonArea, depth, selected]);

  return (
    <div
      className="w-fit mx-auto"
      tabIndex={1}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          // setEndLiveEditing(true);
          setCurrentLine(defaultCurrentLineState);
          setCompletingLine(defaultCurrentLineState);
          setPolyLine(defaultPolyLineState);
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
                stroke: 'purple',
                lineCap: 'round',
              },
            ],
          }));

          setDynamicPolyLine(defaultPolyLineState);
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
          {draw.line.map((line, index) => {
            const circles = convertArrayIntoChunks(line.points);
            const lineDistance = calcLineDistance(line.points);
            const lineMidPoint = calculateMidpoint(line.points);
            return (
              <Group key={`lines-${index}`}>
                <Line key={index} {...line} />
                {circles.map((circle: number[]) => {
                  const [x, y] = circle;
                  return (
                    <Circle key={x + y} x={x} y={y} fill="#ff0000" radius={4} />
                  );
                })}
                <TextKonva
                  {...lineMidPoint}
                  fontSize={20}
                  text={lineDistance.toString()}
                  fill="red"
                />
              </Group>
            );
          })}

          {/* Drawing Dynamic Fill */}
          {draw.dynamic.map((dynamicPolyLine, index) => {
            return <Line key={index} {...dynamicPolyLine} />;
          })}
          {!!dynamicPolyLine.points.length && <Line {...dynamicPolyLine} />}

          {/* Drawing Area */}
          {draw.area.map(({ center, area, ...rest }, index) => {
            const text = `${area?.toFixed(2) || ''}sq`;
            return (
              <Group key={index}>
                <Line {...rest} />
                <TextKonva
                  {...center}
                  fontSize={15}
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
              {polygonArea && (
                <>
                  <TextKonva
                    {...polygonCenter}
                    fontSize={20}
                    text={polygonText}
                    offsetX={30}
                    fill="red"
                    fontStyle="bold"
                  />
                  <TextKonva
                    x={40}
                    y={480}
                    fontSize={20}
                    text={`Perimeter: ${polygonPerimeter?.toFixed(2) || ''}`}
                    offsetX={30}
                    fill="teal"
                    fontStyle="bold"
                  />
                </>
              )}
            </Group>
          )}

          {/* Drawing Volume */}
          {draw.volume.map(({ center, volume, ...rest }, index) => {
            const text = `${volume?.toFixed(2) || ''} cubic`;
            return (
              <Group key={index}>
                <Line {...rest} />
                <TextKonva
                  {...center}
                  fontSize={15}
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
                stroke="blue"
                strokeWidth={4}
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
                stroke="green"
                strokeWidth={4}
              />
            )}

          {/* Drawing Count */}
          {draw.count.map((tick) => (
            <KonvaImage
              key={`${tick.x}${tick.y}`}
              image={counterImage}
              width={20}
              height={20}
              {...tick}
            />
          ))}
          <KonvaText
            fontSize={15}
            fontStyle="bold"
            draggable
            fill="red"
            text={`Count: ${draw.count.length}`}
            x={10}
            y={10}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Draw;
