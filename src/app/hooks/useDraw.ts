const useDraw = () => {
  const pixelToInchScale = 72;

  const convertPxIntoInches = (value: number): number => {
    if (value > 0) {
      return value / pixelToInchScale;
    } else return value;
  };

  const calculatePolygonArea = (coordinates: number[]): number => {
    if (coordinates.length < 6 || coordinates.length % 2 !== 0) {
      throw new Error('Invalid number of coordinates for a polygon');
    }

    const n = coordinates.length / 2;
    let area = 0;

    for (let i = 0; i < n - 1; i++) {
      area +=
        coordinates[2 * i] * coordinates[2 * i + 3] -
        coordinates[2 * i + 1] * coordinates[2 * i + 2];
    }

    area +=
      coordinates[2 * n - 2] * coordinates[1] -
      coordinates[0] * coordinates[2 * n - 1];

    area = Math.abs(area) / 2;

    return +(area / (pixelToInchScale * pixelToInchScale)).toFixed(4);
  };

  const calculatePolygonVolume = (
    coordinates: number[],
    depth: number
  ): number => {
    const polygonArea = calculatePolygonArea(coordinates);
    const depthInInches = convertPxIntoInches(depth);
    return polygonArea * depthInInches;
  };

  const calculatePolygonCenter = (
    coordinates: number[]
  ): { x: number; y: number } => {
    if (coordinates.length < 6 || coordinates.length % 2 !== 0) {
      throw new Error('Invalid number of coordinates for a polygon');
    }

    const n = coordinates.length / 2;

    const avgX =
      coordinates.reduce(
        (sum, val, index) => (index % 2 === 0 ? sum + val : sum),
        0
      ) / n;
    const avgY =
      coordinates.reduce(
        (sum, val, index) => (index % 2 === 1 ? sum + val : sum),
        0
      ) / n;

    const center = { x: avgX, y: avgY };
    return center;
  };

  const calculatePolygonPerimeter = (coordinates: number[]): string => {
    if (coordinates.length < 6 || coordinates.length % 2 !== 0) {
      throw new Error('Invalid number of coordinates for a polygon');
    }

    const n = coordinates.length / 2;
    let perimeter = 0;

    for (let i = 0; i < n - 1; i++) {
      const deltaX = coordinates[2 * (i + 1)] - coordinates[2 * i];
      const deltaY = coordinates[2 * (i + 1) + 1] - coordinates[2 * i + 1];
      perimeter += Math.sqrt(deltaX ** 2 + deltaY ** 2);
    }

    // Add the distance from the last vertex to the first to close the loop
    const lastVertexX = coordinates[0];
    const lastVertexY = coordinates[1];
    const firstVertexX = coordinates[coordinates.length - 2];
    const firstVertexY = coordinates[coordinates.length - 1];

    perimeter += Math.sqrt(
      (lastVertexX - firstVertexX) ** 2 + (lastVertexY - firstVertexY) ** 2
    );

    return convertPxIntoInches(perimeter).toFixed(3);
  };

  const calcLineDistance = (coordinates: number[]) => {
    const [x1, y1, x2, y2] = coordinates;

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return convertPxIntoInches(distance).toFixed(2);
  };

  const convertArrayIntoChunks = (data: number[]): number[][] => {
    return data.reduce((resultArray: any, item, index) => {
      const chunkIndex = Math.floor(index / 2);

      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = []; // start a new chunk
      }

      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
  };

  const calculateMidpoint = (coordinates: number[]) => {
    const [x1, y1, x2, y2] = coordinates;

    const midpoint = {
      x: (x1 + x2) / 2,
      y: (y1 + y2) / 2,
    };

    return midpoint;
  };

  const calculateAngle = (coordinates: number[]) => {
    const [x1, y1, x2, y2] = coordinates;
    // Calculate the angle using arctangent (atan2)
    const angleRadians = Math.atan2(y2 - y1, x2 - x1);

    // Convert radians to degrees and ensure the angle is positive
    let angleDegrees = (angleRadians * 180) / Math.PI;

    if (angleDegrees >= -90 && angleDegrees <= 270) angleDegrees += 90;
    else angleDegrees = 270 + (180 + angleDegrees);

    return +angleDegrees.toFixed(2);
  };

  // const getColoredTickSvg = (color: string): string => {
  //   const counterImage = new Image();

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

  //   counterImage.src = `data:image/svg+xml;base64,${btoa(svg)}`;

  //   return JSON.stringify(counterImage);
  // };

  return {
    calculatePolygonArea,
    calculatePolygonCenter,
    calculatePolygonPerimeter,
    calcLineDistance,
    convertArrayIntoChunks,
    calculateMidpoint,
    calculatePolygonVolume,
    calculateAngle,
  };
};

export default useDraw;
