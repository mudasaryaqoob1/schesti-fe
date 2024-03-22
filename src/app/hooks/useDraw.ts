import { DrawInterface } from '../(pages)/quantity-takeoff/manual/types';

const measurementUnits = [
  'in',
  'cm',
  'mm',
  'ft',
  `ft'in"`,
  "in'",
  'yd',
  'mi',
  'm',
  'km',
];

export const unitConversion: { [conversion: string]: number } = {
  'in-in': 1,
  'in-cm': 2.54,
  'in-mm': 25.4,
  'ft-in': 12,
  [`ft'in"-in`]: 12,
  "in'-in": 1,
  'yd-in': 36,
  'mi-in': 63360,
  'mm-in': 0.0393701,
  'cm-in': 0.393701,
  'm-in': 39.3701,
  'km-in': 39370.1,
  '---': 0,
};

export const improperPrecisionConverter: { [key: string]: number } = {
  '1': 1,
  '1/2': 0.1,
  '1/4': 0.01,
  '1/8': 0.001,
  '1/16': 0.0001,
  '1/32': 0.000001,
  '0.1': 0.1,
  '0.01': 0.01,
  '0.001': 0.001,
  '0.0001': 0.0001,
  '0.000001': 0.000001,
};

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
    return +(polygonArea * depthInInches).toFixed(4);
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

    return convertToFeetAndInches(convertPxIntoInches(perimeter));
  };

  const calcLineDistance = (coordinates: number[], format = false) => {
    const [x1, y1, x2, y2] = coordinates;

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    if (format)
      return convertToFeetAndInches(
        addScalerToValue(convertPxIntoInches(distance))
      );
    return convertPxIntoInches(distance);
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

  const getProjectAndCommentNameForTable = (
    key: keyof DrawInterface,
    points: number[],
    depth = 0
  ): { projectName: string; comment: string | number } => {
    if (key === 'line')
      return {
        projectName: 'Length Measurement',
        comment: points?.length ? calcLineDistance(points, true) : 0,
      };
    else if (key === 'area')
      return {
        projectName: 'Area Measurement',
        comment: points?.length ? calculatePolygonArea(points) : 0,
      };
    else if (key === 'volume')
      return {
        projectName: 'Volume Measurement',
        comment: points?.length ? calculatePolygonVolume(points, depth) : 0,
      };
    else if (key === 'count')
      return { projectName: 'Count Measurement', comment: '' };
    else return { projectName: 'Dynamic Measurement', comment: '' };
  };

  const convertToFeetAndInches = (inches: number, precision = '0.01') => {
    const convertedPrecision = improperPrecisionConverter[precision];
    const feet = Math.floor(inches / 12);
    const wholeInches = Math.floor(inches % 12);
    const chunksArray: number[] = [];

    const remainingInchesDecimal = +(inches - feet * 12 - wholeInches).toFixed(
      2
    );

    if (convertedPrecision === 1)
      return getFeetAndInchesFormat(feet, wholeInches);

    const decimalCount = convertedPrecision.toString().split('.')[1].length;

    const chunks = Math.pow(2, decimalCount);
    for (let index = 1; index < chunks + 1; index++) {
      chunksArray.push(index / chunks);
    }
    const closest = findClosestValue(chunksArray, remainingInchesDecimal);

    if (closest === 1) return getFeetAndInchesFormat(feet, wholeInches + 1);
    else {
      const len = closest.toString().length - 2;
      let denominator = Math.pow(10, len);
      let numerator = closest * denominator;

      const divisor = gcd(numerator, denominator);

      numerator /= divisor;
      denominator /= divisor;

      return getFeetAndInchesFormat(
        feet,
        wholeInches,
        `${numerator}/${denominator}`
      );
    }
  };

  const findClosestValue = (array: number[], target: number) => {
    // If the array is empty, return undefined
    if (array.length === 0) return target;

    // Initialize variables to keep track of the closest value and its difference
    let closest = array[0];
    let minDifference = Math.abs(target - closest);

    // Iterate through the array to find the closest value
    for (let i = 1; i < array.length; i++) {
      const difference = Math.abs(target - array[i]);
      // If the current value is closer than the previous closest, update the closest value and the difference
      if (difference < minDifference) {
        closest = array[i];
        minDifference = difference;
      }
    }

    return closest;
  };

  const gcd = (a: number, b: number): number => {
    if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.
    return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
  };

  const getFeetAndInchesFormat = (
    feet: number,
    inches: number,
    fractionalString?: string
  ) => {
    const inchesString = inches > 0 ? `${inches}` : '0';

    if (fractionalString) {
      return `${feet}'- ${inchesString} ${fractionalString}"`;
    } else return `${feet}'- ${inchesString}"`;
  };
  // scale = `3/8'=1'-0"`
  //"1cm=10in"
  //"21/11cm=10/11in"
  //"11111cm=22222in"
  //"21/11cm=10/11in"
  // scale = `1:20`
  const addScalerToValue = (value: number, scale = '1cm=10in'): number => {
    // HANDLING PRESET SCALE BELOW
    if (scale.includes(':')) {
      const multiplier = +scale.split(':')[1];
      return value * multiplier;
    } else if (
      scale.includes('=') &&
      !measurementUnits.some((unit) => scale.includes(unit))
    ) {
      const splittedScale = scale.split('=');

      if (scale.includes(`1'-0"`)) {
        const [numerator, denominator] = getInchesInFractionFromMixedFraction(
          splittedScale[0]
        ).split('/');

        return (12 * value * +denominator) / +numerator;
      } else {
        const multiplier = +splittedScale[1].substring(
          0,
          splittedScale[1].length - 1
        );
        return value * multiplier * 12;
      }
    } else {
      // HANDLING CUSTOM SCALE BELOW

      // Left Hand Side, Right Hand Side
      const [LHS, RHS] = scale.split('=');

      const LUnit =
        measurementUnits.find((unit) => LHS.indexOf(unit) >= 0) || '-';

      const LHSValues = LHS.substring(0, LHS.indexOf(LUnit));

      // Left Numerator(LN), Left Denominator (LD)
      const [LN, LD] = LHSValues.includes('/')
        ? LHSValues.split('/')
        : [LHSValues, 1];

      const RUnit =
        measurementUnits.find((unit) => RHS.indexOf(unit) >= 0) || '-';

      const RHSValues = RHS.substring(0, RHS.indexOf(RUnit));

      //Right Numerator (RN), Right Denominator (RD)
      const [RN, RD] = RHSValues.includes('/')
        ? RHSValues.split('/')
        : [RHSValues, 1];

      const scaledValue =
        (+RN *
          +LD *
          (value * unitConversion[`in-${LUnit}`]) *
          unitConversion[`${RUnit}-in`]) /
        (+LN * +RD);

      return scaledValue;
    }
  };

  const getInchesInFractionFromMixedFraction = (value = `1 1/2"`) => {
    const isFraction = value.split('/').length > 1;
    if (isFraction) return `${value}/1`;

    const isMixedFraction = value.split(' ');
    if (isMixedFraction.length > 1) {
      const [coefficient, fraction] = isMixedFraction;
      const [numerator, denominator] = fraction.includes(`"`)
        ? fraction.substring(0, fraction.length - 1).split('/')
        : fraction.split('/');

      return `${+numerator + +coefficient * +denominator}/${denominator}`;
    } else
      return value.includes(`"`) ? value.substring(0, value.length - 1) : value;
  };

  return {
    calculatePolygonArea,
    calculatePolygonCenter,
    calculatePolygonPerimeter,
    calcLineDistance,
    convertArrayIntoChunks,
    calculateMidpoint,
    calculatePolygonVolume,
    calculateAngle,
    getProjectAndCommentNameForTable,
    getInchesInFractionFromMixedFraction,
  };
};

export default useDraw;
