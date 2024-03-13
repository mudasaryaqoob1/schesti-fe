import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image as KonvaImage, Line, Circle } from 'react-konva';
import Konva from 'konva';
import { DrawHistoryContextInterface } from '@/app/(pages)/takeoff/context/DrawHistoryContext';
import { DrawInterface } from '@/app/(pages)/takeoff/types';
import UploadFileContext, {
  UploadFileContextProps,
} from '@/app/(pages)/takeoff/context/UploadFileContext';
import { LineCap } from 'konva/lib/Shape';
import ReportCard from '../reportCard';
import { Text } from 'konva/lib/shapes/Text';
import { useDraw } from '@/app/hooks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from 'antd';
import generatePDF from './generatePdf';
import { ReportDataContext } from '@/app/(pages)/takeoff/context';
import {
  ReportDataContextProps,
  ReportDataInterface,
} from '@/app/(pages)/takeoff/context/ReportDataContext';

export interface dataInterface {
  image: string;
  details: ReportDataInterface;
}

const CaptureComponent = (
  {
    // itemsToCapture,
    // onCapture,
  }: {
    itemsToCapture: DrawHistoryContextInterface;
    onCapture: (url: string, key: number) => void;
  }
) => {
  const {
    calcLineDistance,
    calculateMidpoint,
    calculatePolygonArea,
    calculatePolygonPerimeter,
    calculatePolygonCenter,
    calculatePolygonVolume,
    calculateAngle,
  } = useDraw();

  const stageRef = useRef<Konva.Stage>(null);
  const [data, setData] = useState<dataInterface[]>([]);

  const { uploadFileData } = useContext(
    UploadFileContext
  ) as UploadFileContextProps;

  const { reportData } = useContext(
    ReportDataContext
  ) as ReportDataContextProps;

  useEffect(() => {
    const loadImage = (src: string) => {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
      });
    };

    const captureShape = async (
      shape: any,
      background: HTMLImageElement,
      shapeType: string
    ) => {
      // Create a temporary container for off-screen stage
      const container = document.createElement('div');
      container.style.display = 'none'; // Hide the container
      document.body.appendChild(container); // This is required for Konva.Stage initialization

      return new Promise<string>((resolve) => {
        // Initialize a temporary stage with the container
        const tempStage = new Konva.Stage({
          container: container,
          width: background.width,
          height: background.height,
        });

        const layer = new Konva.Layer();
        tempStage.add(layer);

        // Add the background image to the layer
        const bgImage = new Konva.Image({
          image: background,
          width: background.width,
          height: background.height,
        });
        layer.add(bgImage);

        let minX: number, minY: number, maxX: number, maxY: number;

        // Initialize variables to ensure they cover the shape with margins later
        minX = minY = Number.MAX_SAFE_INTEGER;
        maxX = maxY = 0;

        // Determine the type of shape and render accordingly
        switch (shapeType) {
          case 'count':
            // Example for a circle shape
            const { x, y, radius = 20, fill = '#FF3434' } = shape;
            const circle = new Konva.Circle({ x, y, radius, fill });
            layer.add(circle);

            // Adjust bounds for the circle, considering the radius and a margin
            minX = x - radius - 20;
            minY = y - radius - 20;
            maxX = x + radius + 20;
            maxY = y + radius + 20;
            break;

          case 'line':
          case 'dynamic':
          case 'area':
          case 'volume':
            // Example for a line or polygon shape
            const { points, stroke, strokeWidth, lineCap } = shape;
            const line = new Konva.Line({
              points,
              stroke,
              strokeWidth,
              lineCap,
              closed: shapeType === 'area' || shapeType === 'volume', // Close path for areas and volumes
            });
            layer.add(line);

            // Calculate bounds for lines and polygons, include margin
            const xs = points.filter((_: any, i: number) => i % 2 === 0);
            const ys = points.filter((_: any, i: number) => i % 2 !== 0);
            minX = Math.min(...xs) - 20;
            minY = Math.min(...ys) - 20;
            maxX = Math.max(...xs) + 20;
            maxY = Math.max(...ys) + 20;
            break;

          default:
            console.error('Unknown shape type:', shapeType);
            return;
        }

        layer.draw(); // Force drawing the layer to render shapes

        // Use toImage to capture the specified region
        tempStage.toImage({
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY,
          callback: (img) => {
            // Create a canvas to get the cropped image data
            const canvas = document.createElement('canvas');
            canvas.width = maxX - minX;
            canvas.height = maxY - minY;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
              const dataURL = canvas.toDataURL();
              resolve(dataURL); // Resolve the promise with the cropped image data URL
            }
            // Cleanup: remove the temporary container from the document
            document.body.removeChild(container);
          },
        });
      });
    };

    // const captureShapes = async () => {
    //   const background = await loadImage(uploadFileData[0].src);
    //   const newData: dataInterface[] = [];
    //   // const urls: string[] = [];

    //   // for (const [page, drawData] of Object.entries(itemsToCapture)) {
    //   //   for (const shapeType of [
    //   //     'line',
    //   //     'area',
    //   //     'volume',
    //   //     'dynamic',
    //   //     'count',
    //   //   ]) {
    //   //     for (const shape of drawData[shapeType as keyof DrawInterface]) {
    //   //       const details = {
    //   //         type: shapeType,
    //   //         ...shape,
    //   //       };
    //   //       const url = await captureShape(shape, background, shapeType);
    //   //       urls.push(url);
    //   //       newData.push({
    //   //         image: url,
    //   //         details: details,
    //   //       });

    //   //       onCapture(url, urls.length - 1);
    //   //     }
    //   //   }
    //   // }

    //   setData(newData as dataInterface[]);
    // };

    const captureShapes = async () => {
      const background = await loadImage(uploadFileData[0]?.src || ''); // Update based on actual data structure
      const promises = reportData.map(async (item) => {
        const url = await captureShape(item.config, background, item.type);
        return {
          image: url,
          details: { ...item },
        };
      });

      const newData = await Promise.all(promises);
      setData(newData);
    };

    if (reportData.length) {
      captureShapes();
    }
  }, [reportData.length]);

  console.log(reportData, 'reportData');
  console.log('data', data);
  return (
    <div>
      <Stage
        ref={stageRef}
        width={800}
        height={1800}
        style={{ display: 'none' }}
      >
        <Layer></Layer>
      </Stage>
      <div>
        <div className="grid grid-cols-2 gap-4 m-12 " id="capture">
          {data.map((entity, index) => (
            <div
              key={index}
              className="w-full flex flex-col border-[1px] border-gray-300 rounded-2xl justify-between p-4"
            >
              <ReportCard entity={[entity]} />
            </div>
          ))}
        </div>
        <Button onClick={() => generatePDF('capture')}>Download</Button>
      </div>
    </div>
  );
};

export default CaptureComponent;
