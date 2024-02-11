const useDraw = () => {
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

    return area;
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

  const calculatePolygonPerimeter = (coordinates: number[]): number => {
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

    return perimeter;
  };

  const calcLineDistance = (coordinates: number[]) => {
    const [x1, y1, x2, y2] = coordinates;

    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

    return distance.toFixed(2);
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

  return {
    calculatePolygonArea,
    calculatePolygonCenter,
    calculatePolygonPerimeter,
    calcLineDistance,
    convertArrayIntoChunks,
    calculateMidpoint,
  };
};

export default useDraw;
